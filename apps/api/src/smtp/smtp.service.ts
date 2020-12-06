import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import { NotFoundError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';
import { SmtpOptions } from 'shared/modules/mailer';

@Injectable()
export class SmtpService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string) {
    const smtp = await this.prisma.smtp.findOne({
      where: { projectId },
    });

    if (smtp?.host) {
      const { pass, ...data } = smtp;
      return data;
    }

    return {
      defaultFrom: null,
      host: null,
      port: null,
      secure: null,
      user: null,
      pass: null,
    };
  }

  async getConfiguration(projectId: string) {
    const smtp = await this.prisma.smtp.findOne({
      where: { projectId },
    });

    if (smtp?.host) {
      return {
        ...smtp,
        pass: CryptoJS.AES.decrypt(smtp.pass, this.configService.get<string>('SECRET')).toString(
          CryptoJS.enc.Utf8,
        ),
        secure: smtp.secure === 1,
      };
    }

    if (!this.configService.get<string>('SMTP_HOST')) {
      throw new NotFoundError('SMTP settings is not defined');
    }

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
    await this.prisma.smtp.upsert({
      where: { projectId },
      update: {
        projectId,
        ...smtp,
        pass: CryptoJS.AES.encrypt(smtp.pass, this.configService.get<string>('SECRET')).toString(),
        secure: smtp.secure ? 1 : 0,
      },
      create: {
        projectId,
        ...smtp,
        pass: CryptoJS.AES.encrypt(smtp.pass, this.configService.get<string>('SECRET')).toString(),
        secure: smtp.secure ? 1 : 0,
      },
    });

    return {
      defaultFrom: smtp.defaultFrom,
      host: smtp.host,
      user: smtp.user,
      port: smtp.port,
      secure: smtp.secure ? 1 : 0,
    };
  }

  async deleteSmtp(projectId: string) {
    await this.prisma.smtp.delete({ where: { projectId } });
  }
}
