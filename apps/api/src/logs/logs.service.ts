import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async getAll(
    projectId: string,
    page: number = 0,
    perPage: number = 100,
    orderBy: string = 'datetime',
    orderByDirection: string = 'desc',
    from?: string,
  ) {
    const data = await this.prisma.logs.findMany({
      where: { projectId, AND: [{ datetime: { gte: from } }] },
      orderBy: [
        {
          [orderBy]: orderByDirection,
        },
      ],
      skip: page * perPage,
      take: perPage,
    });
    const total = await this.prisma.logs.count();

    return {
      data: data.map(({ projectId: pId, ...log }) => log),
      total,
    };
  }

  async write(log: Prisma.LogsCreateInput) {
    await this.prisma.logs.create({
      data: { ...log },
    });
  }
}
