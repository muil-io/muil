import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async getAll(projectId: string, from?: string) {
    return (
      await this.prisma.logs.findMany({ where: { projectId, AND: [{ datetime: { gte: from } }] } })
    ).map(({ projectId: pId, ...log }) => log);
  }

  async write(log: Prisma.LogsCreateInput) {
    await this.prisma.logs.create({
      data: { ...log },
    });
  }
}
