import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { encryptPassword } from 'shared/utils/password';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    await this.initDB();
  }

  async initDB() {
    const cloudMode = this.configService.get<string>('ENV') === 'CLOUD';
    const email = this.configService.get<string>('ADMIN_USERNAME');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    const defaultProject = await this.projects.findFirst({ where: { id: 'default' } });
    if (!defaultProject) {
      await this.projects.create({ data: { id: 'default', name: 'default', plan: 'free' } });
    }

    if (cloudMode) {
      const muilProject = await this.projects.findFirst({ where: { id: 'muil' } });
      if (!muilProject) {
        await this.projects.create({ data: { id: 'muil', name: 'muil', plan: 'pro' } });
      }
    }

    if (email && password) {
      const adminUser = await this.users.findFirst({ where: { email } });
      if (!adminUser) {
        const encryptedPassword = await encryptPassword(password);
        await this.users.create({
          data: {
            email,
            password: encryptedPassword,
            projectId: cloudMode ? 'muil' : 'default',
            role: cloudMode ? 'muilAdmin' : 'admin',
            name: 'admin',
          },
        });
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
