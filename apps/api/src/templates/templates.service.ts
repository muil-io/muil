import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import g from 'glob';
import rimraf from 'rimraf';
import { TemplatesRendererService } from '@muil/templates-renderer';
import { NotFoundError } from 'shared/exceptions';
import { MailerService, EmailOptions } from 'shared/modules/mailer';
import { LogsService } from 'logs';
import { SmtpService } from 'smtp';
import { File, RenderOptions } from './types';

const glob = promisify(g);

@Injectable()
export class TemplatesService {
  constructor(
    private configService: ConfigService,
    private logsService: LogsService,
    private smtpService: SmtpService,
    private templatesRendererService: TemplatesRendererService,
    private mailerService: MailerService,
  ) {}

  async findAll(projectId: string) {
    const templatesDirectory = path.join(
      this.configService.get<string>('TEMPLATES_DIRECTORY'),
      projectId,
    );

    const jsonPaths = await glob(`${templatesDirectory}/**/*.json`);

    return Promise.all(
      jsonPaths.map(async (p) => {
        const splittedPath = p.split('/');
        const branch = splittedPath[splittedPath.length - 2];
        const [templateId] = splittedPath[splittedPath.length - 1].split('.');
        const { birthtime } = await fs.promises.stat(p);
        const { dynamicProps, displayName } = JSON.parse(await fs.promises.readFile(p, 'utf8'));
        return { projectId, branch, templateId, created: birthtime, dynamicProps, displayName };
      }),
    );
  }

  async upload(projectId: string, branch: string = 'master', files: File[]) {
    const templatesDirectory = path.join(
      this.configService.get<string>('TEMPLATES_DIRECTORY'),
      projectId,
      branch,
    );

    await fs.promises.rmdir(templatesDirectory, { recursive: true });
    await fs.promises.mkdir(templatesDirectory, { recursive: true });

    files
      .filter(({ originalname }) => !originalname.includes('..') && !originalname.includes('/'))
      .map(({ originalname, buffer }) =>
        fs.promises.writeFile(path.join(templatesDirectory, originalname.toLowerCase()), buffer),
      );
    await Promise.all(files);
  }

  async delete(projectId: string, branch: string = 'master') {
    const templatesDirectory = path.join(
      this.configService.get<string>('TEMPLATES_DIRECTORY'),
      projectId,
      branch,
    );

    if (!fs.existsSync(templatesDirectory)) {
      throw new NotFoundError(`Branch '${branch}' not found`);
    }

    rimraf.sync(templatesDirectory);
  }

  async render(
    projectId: string,
    branch: string = 'master',
    templateId: string,
    props = {},
    {
      type = 'html',
      inlineCss,
      minifyHtml,
      pdfFormat,
      pdfOrientation,
      writeLog = true,
    }: RenderOptions,
  ) {
    try {
      const templatePath = path.join(
        this.configService.get<string>('TEMPLATES_DIRECTORY'),
        projectId,
        branch,
        `${templateId}.js`,
      );
      if (!fs.existsSync(templatePath)) {
        throw new NotFoundError(`Template '${templateId}' doesn't exists`);
      }

      const templateCssPath = path.join(
        this.configService.get<string>('TEMPLATES_DIRECTORY'),
        projectId,
        branch,
        `${templateId}.css`,
      );

      const html = await this.templatesRendererService.render({
        type,
        templatePath,
        templateCssPath: fs.existsSync(templateCssPath) ? templateCssPath : undefined,
        props,
        inlineCss,
        minifyHtml,
        pdfFormat,
        pdfOrientation,
      });

      if (writeLog) {
        await this.logsService.write({
          projectId,
          branch,
          templateId,
          type,
          status: 'success',
        });
      }

      return html;
    } catch (err) {
      if (writeLog) {
        await this.logsService.write({
          projectId,
          branch,
          templateId,
          type,
          status: 'error',
          errorMessage: err.message,
        });
      }
      throw new Error(`Template render failure: ${err.message}`);
    }
  }

  async email(
    projectId: string,
    branch: string = 'master',
    templateId: string,
    props = {},
    attachments: any[] = [],
    renderOptions: RenderOptions,
    emailOptions: EmailOptions,
  ) {
    const smtpOptions = await this.smtpService.getConfiguration(projectId);

    const html = (await this.render(projectId, branch, templateId, props, renderOptions)) as string;

    const muilAttachments = attachments.filter((a) => a.templateId);
    const regularAttachments = attachments.filter((a) => !a.templateId);
    const muilAttachmentsPromises = muilAttachments.map(async (attachment) => {
      const content = (await this.render(
        projectId,
        branch,
        attachment.templateId,
        attachment.props,
        {
          type: attachment.type,
          inlineCss: renderOptions.inlineCss,
          minifyHtml: renderOptions.minifyHtml,
        },
      )) as string;

      return {
        filename: attachment.filename,
        content,
      };
    });

    const attachmentsContent = [
      ...(await Promise.all(muilAttachmentsPromises)),
      ...regularAttachments,
    ];

    try {
      await this.mailerService.send(html, attachmentsContent, emailOptions, smtpOptions);

      await this.logsService.write({
        projectId,
        branch,
        templateId,
        type: 'email',
        status: 'success',
        from: emailOptions.from,
        to: emailOptions.to?.toString(),
        cc: emailOptions.cc?.toString(),
        bcc: emailOptions.bcc?.toString(),
        subject: emailOptions.subject,
      });
    } catch (err) {
      this.logsService.write({
        projectId,
        branch,
        templateId,
        type: 'email',
        status: 'error',
        errorMessage: err.message,
        from: emailOptions.from,
        to: emailOptions.to?.toString(),
        cc: emailOptions.cc?.toString(),
        bcc: emailOptions.bcc?.toString(),
        subject: emailOptions.subject,
      });
      throw err;
    }
  }
}
