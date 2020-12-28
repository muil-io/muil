import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    await this.initDefaultProject();
  }

  async initDefaultProject() {
    const defaultProject = await this.projects.findFirst({ where: { id: 'default' } });
    if (!defaultProject) {
      await this.projects.create({ data: { id: 'default', name: 'default', plan: 'free' } });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
