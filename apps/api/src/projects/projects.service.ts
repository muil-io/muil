import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { Projects } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma';
import { Project } from './types';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string): Promise<Projects> {
    return this.prisma.projects.findOne({ where: { id: projectId } });
  }

  async exists(projectId: string) {
    return (await this.get(projectId)) !== null;
  }

  async create(project: Project) {
    const data = {
      id: uuid(),
      name: project.name ?? uuid(),
      plan: project.plan ?? 'free',
    };

    await this.prisma.projects.create({ data });

    return data;
  }
}
