import { Injectable } from '@nestjs/common';
import sha512 from 'crypto-js/sha512';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  async findAll(projectId: string) {
    return (await this.prisma.apiKeys.findMany({ where: { projectId } })).map(
      ({ name, id, createdAt, enabled }) => ({
        name,
        id,
        createdAt,
        enabled: enabled === 1,
      }),
    );
  }

  async create(projectId: string, name: string) {
    const apiKeyRaw = uuid().replace(/-/g, '');
    const id = apiKeyRaw.slice(0, 8);
    const apiKey = `${id}.${apiKeyRaw.slice(8)}.${projectId}`;
    const apiKeyHash = sha512(apiKey).toString();

    const key = await this.prisma.apiKeys.create({
      data: {
        id,
        name,
        apiKeyHash,
        projectId,
        enabled: 1,
      },
    });

    return {
      id,
      apiKey,
      name,
      createdAt: key.createdAt,
      enabled: true,
    };
  }

  async setEnabled(projectId: string, id: string, enabled: boolean) {
    const apiKey = await this.prisma.apiKeys.findFirst({ where: { id } });
    if (!apiKey || apiKey.projectId !== projectId) {
      throw new NotFoundError(`Api Key '${id}' doesn't exists`);
    }

    await this.prisma.apiKeys.update({
      where: { id },
      data: {
        enabled: enabled ? 1 : 0,
      },
    });

    return this.findAll(projectId);
  }

  async delete(projectId: string, id: string) {
    const apiKey = await this.prisma.apiKeys.findFirst({ where: { id } });
    if (!apiKey || apiKey.projectId !== projectId) {
      throw new NotFoundError(`Api Key '${id}' doesn't exists`);
    }

    await this.prisma.apiKeys.delete({ where: { id } });
    return this.findAll(projectId);
  }
}
