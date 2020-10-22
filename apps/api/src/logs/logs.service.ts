import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/modules/prisma';
import { Log } from './types';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async getAll(projectId: string) {
    return (await this.prisma.logs.findMany({ where: { projectId } })).map(
      ({ projectId: pId, ...log }) => log,
    );
  }

  async write(log: Log) {
    await this.prisma.logs.create({
      data: { ...log, datetime: new Date().toISOString() },
    });
  }
}
