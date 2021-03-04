import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { TemplatesService } from 'templates';
import { Project } from './types';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private templatesService: TemplatesService,
    private readonly configService: ConfigService,
  ) {}

  async get(projectId: string) {
    return this.prisma.projects.findFirst({ where: { id: projectId } });
  }

  async exists(projectId: string) {
    return (await this.get(projectId)) !== null;
  }

  async create(project: Project) {
    const data = {
      name: project.name ?? uuid(),
      plan: project.plan ?? 'free',
    };

    const cloudMode = this.configService.get<string>('ENV') === 'CLOUD';
    if (cloudMode) {
      const sampleTemplatesDirectory = this.configService.get<string>('SAMPLE_TEMPLATES_DIRECTORY');
      const filenames = await fs.promises.readdir(sampleTemplatesDirectory);

      const filesPromises = filenames.map((originalname) =>
        fs.promises.readFile(path.resolve(sampleTemplatesDirectory, originalname), 'utf8'),
      );
      const filesBufferArray = await Promise.all(filesPromises);

      const files = filenames.map((originalname, index) => ({
        originalname,
        buffer: filesBufferArray[index] as string,
      }));

      this.templatesService.upload(data.name, 'master', files);
    }

    return this.prisma.projects.create({ data });
  }

  async updatePlan(projectId: string, id: string, plan: 'free' | 'pro') {
    await this.prisma.projects.updateMany({
      where: { id },
      data: { plan },
    });

    return this.get(projectId);
  }
}
