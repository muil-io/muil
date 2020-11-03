/* eslint-disable no-param-reassign */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ProjectsService } from 'projects/projects.service';
import { PrismaService } from 'shared/modules/prisma';
import { ConflictError } from 'shared/exceptions';
import { encryptPassword, comparePassword } from 'shared/utils/password';
import { User } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private projectsService: ProjectsService) {}

  async getUser(query: any): Promise<User> {
    try {
      const { password, ...user } = await this.prisma.users.findOne({
        where: { ...query },
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  async createUser({ password, email, name, projectId, projectName }: User): Promise<User> {
    const userExists = await this.getUser({ email });
    if (userExists) {
      throw new ConflictError(`User with email '${email}' already exists`);
    }

    if (projectName) {
      const { id } = await this.projectsService.create({ name: projectName });
      projectId = id;
    } else {
      projectId = 'default';
      projectName = 'default';
    }

    const userId = uuid();
    const hash = await encryptPassword(password);

    await this.prisma.users.create({
      data: {
        email,
        name,
        id: userId,
        password: hash,
        projectId,
      },
    });

    return { id: userId, email, name, projectId };
  }

  async updateUser(id: string, name: string) {
    const { password, ...user } = await this.prisma.users.update({
      where: { id },
      data: { name },
    });

    return user;
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const { password: storedPassword } = await this.prisma.users.findOne({
      where: { id },
    });
    if (!storedPassword || !(await comparePassword(oldPassword, storedPassword))) {
      throw new UnauthorizedException();
    }

    const hash = await encryptPassword(newPassword);
    const { password, ...user } = await this.prisma.users.update({
      where: { id },
      data: { password: hash },
    });

    return user;
  }
}
