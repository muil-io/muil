import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { SmtpOptions } from 'shared/modules/mailer';
import { Project } from './types';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string, { withSmtpPass = false } = {}): Promise<Project> {
    const project = await this.prisma.projects.findOne({ where: { id: projectId } });
    return project
      ? {
          id: project.id,
          name: project.name,
          plan: project.plan as 'free' | 'pro',
          smtp: project.smtpHost
            ? {
                defaultFrom: project.smtpDefaultFrom,
                host: project.smtpHost,
                user: project.smtpUser,
                pass: withSmtpPass ? project.smtpPass : undefined,
                port: project.smtpPort,
                secure: project.smtpSecure === 1,
              }
            : undefined,
        }
      : null;
  }

  async exists(projectId: string) {
    return (await this.get(projectId)) !== null;
  }

  async create(project: Project) {
    const id = uuid();

    await this.prisma.projects.create({
      data: {
        id,
        name: project.name ?? uuid(),
        plan: project.plan ?? 'free',
        smtpDefaultFrom: project.smtp?.defaultFrom,
        smtpHost: project.smtp?.host,
        smtpUser: project.smtp?.user,
        smtpPass: CryptoJS.AES.encrypt(
          project.smtp?.pass,
          this.configService.get<string>('ENCRYPTION_KEY'),
        ).toString(),
        smtpPort: project.smtp?.port,
        smtpSecure: project.smtp?.secure ? 1 : 0,
      },
    });

    const { pass, ...smtpWithoutPass } = project.smtp;
    return { id, ...project, smtp: smtpWithoutPass };
  }

  async getSmtp(projectId: string) {
    const { smtp } = await this.get(projectId, { withSmtpPass: true });
    if (smtp?.host)
      return {
        ...smtp,
        pass: CryptoJS.AES.decrypt(
          smtp.pass,
          this.configService.get<string>('ENCRYPTION_KEY'),
        ).toString(CryptoJS.enc.Utf8),
      };

    return {
      defaultFrom: this.configService.get<string>('SMTP_DEFAULT_FROM'),
      host: this.configService.get<string>('SMTP_HOST'),
      port: parseInt(this.configService.get<string>('SMTP_PORT')),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      user: this.configService.get<string>('SMTP_USER'),
      pass: this.configService.get<string>('SMTP_PASS'),
    };
  }

  async setSmtp(projectId: string, smtp: SmtpOptions) {
    await this.prisma.projects.update({
      where: { id: projectId },
      data: {
        smtpDefaultFrom: smtp.defaultFrom,
        smtpHost: smtp.host,
        smtpUser: smtp.user,
        smtpPass: CryptoJS.AES.encrypt(
          smtp.pass,
          this.configService.get<string>('ENCRYPTION_KEY'),
        ).toString(),
        smtpPort: smtp.port,
        smtpSecure: smtp.secure ? 1 : 0,
      },
    });

    return (await this.get(projectId)).smtp;
  }

  async deleteSmtp(projectId: string) {
    await this.prisma.projects.update({
      where: { id: projectId },
      data: {
        smtpDefaultFrom: null,
        smtpHost: null,
        smtpUser: null,
        smtpPass: null,
        smtpPort: null,
        smtpSecure: 1,
      },
    });
  }
}
