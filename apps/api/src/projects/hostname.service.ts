import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class HostnameService {
  constructor(private prisma: PrismaService) {}

  async get(projectId: string) {
    return {
      hostname: (await this.prisma.projects.findOne({ where: { id: projectId } })).hostname,
    };
  }

  async set(projectId: string, hostname: string) {
    await this.prisma.projects.update({ where: { id: projectId }, data: { hostname } });
  }
}
