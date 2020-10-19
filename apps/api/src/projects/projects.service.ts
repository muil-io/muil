import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { Project, Smtp } from './types';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async get(projectId: string): Promise<Project> {
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
                pass: project.smtpPass,
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
        smtpPass: project.smtp?.pass,
        smtpPort: project.smtp?.port,
        smtpSecure: project.smtp?.secure ? 1 : 0,
      },
    });

    return { id, ...project };
  }

  async getSmtp(projectId: string) {
    const project = await this.get(projectId);
    return project.smtp;
  }

  async setSmtp(projectId: string, smtp: Smtp) {
    await this.prisma.projects.update({
      where: { id: projectId },
      data: {
        smtpDefaultFrom: smtp.defaultFrom,
        smtpHost: smtp.host,
        smtpUser: smtp.user,
        smtpPass: smtp.pass,
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
