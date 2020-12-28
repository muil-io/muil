import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { Project } from './types';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.projects.create({ data });
  }
}
