import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as g from 'glob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/modules/prisma';
import { File } from './types';

const glob = promisify(g);

@Injectable()
export class TemplatesService {
  constructor(private configService: ConfigService, private prisma: PrismaService) {}

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

  async upload(projectId: string, branch: string, files: File[]) {
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

  async delete(projectId: string, branch: string, templateId: string) {
    const templatesDirectory = path.join(
      this.configService.get<string>('TEMPLATES_DIRECTORY'),
      projectId,
      branch,
    );

    await Promise.all([
      fs.promises.unlink(path.join(templatesDirectory, `${templateId}.js`)),
      fs.promises.unlink(path.join(templatesDirectory, `${templateId}.css`)),
      fs.promises.unlink(path.join(templatesDirectory, `${templateId}.json`)),
    ]);
  }
}
