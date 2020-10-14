import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as sha512 from 'crypto-js/sha512';
import { NotFoundError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';
import { ApiKey } from './types';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  async findAll(projectId: string): Promise<ApiKey[]> {
    return (await this.prisma.apiKeys.findMany({ where: { projectId } })).map(
      ({ name, apiKeyPrefix, createdAt, enabled }) => ({
        name,
        apiKeyPrefix,
        createdAt,
        enabled: enabled === 1,
      }),
    );
  }

  async create(projectId: string, name: string): Promise<ApiKey[]> {
    const apiKeyRaw = uuid().replace(/-/g, '');
    const apiKeyPrefix = apiKeyRaw.slice(0, 8);
    const apiKey = `${apiKeyPrefix}.${apiKeyRaw.slice(8)}.${projectId}`;
    const apiKeyHash = sha512(apiKey).toString();
    const createdAt = new Date().toISOString();

    await this.prisma.apiKeys.create({
      data: {
        name,
        apiKeyPrefix,
        apiKeyHash,
        createdAt,
        projectId,
        enabled: 1,
      },
    });

    return this.findAll(projectId);
  }

  async setEnabled(projectId: string, apiKeyPrefix: string, enabled: boolean): Promise<ApiKey[]> {
    const apiKey = await this.prisma.apiKeys.findOne({ where: { apiKeyPrefix } });
    if (!apiKey || apiKey.projectId !== projectId) {
      throw new NotFoundError(`Api Key '${apiKeyPrefix}' doesn't exists`);
    }

    await this.prisma.apiKeys.update({
      where: { apiKeyPrefix },
      data: {
        enabled: enabled ? 1 : 0,
      },
    });

    return this.findAll(projectId);
  }

  async delete(projectId: string, apiKeyPrefix: string): Promise<ApiKey[]> {
    const apiKey = await this.prisma.apiKeys.findOne({ where: { apiKeyPrefix } });
    if (!apiKey || apiKey.projectId !== projectId) {
      throw new NotFoundError(`Api Key '${apiKeyPrefix}' doesn't exists`);
    }

    await this.prisma.apiKeys.delete({ where: { apiKeyPrefix } });
    return this.findAll(projectId);
  }
}
