import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class HostnameService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string) {
    return {
      hostname:
        (await this.prisma.projects.findOne({ where: { id: projectId } }))?.hostname ||
        this.configService.get<string>('HOST_NAME'),
    };
  }

  async set(projectId: string, hostname: string) {
    await this.prisma.projects.update({ where: { id: projectId }, data: { hostname } });
  }
}
