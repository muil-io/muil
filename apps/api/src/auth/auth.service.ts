/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ProjectsService } from 'projects/projects.service';
import { PrismaService } from 'shared/modules/prisma';
import { ConflictError, NotFoundError } from 'shared/exceptions';
import { encryptPassword } from 'shared/utils/password';
import { User, NewUser } from './types';

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

  async createUser({ password, email, name, projectId, projectName }: NewUser): Promise<User> {
    const userExists = await this.getUser({ email });
    if (userExists) {
      throw new ConflictError(`User with email '${email}' already exists`);
    }

    if (projectId) {
      const projectExists = await this.projectsService.exists(projectId);
      if (!projectExists) {
        throw new NotFoundError(`Project '${projectId}' doesn't exists`);
      }
    } else if (!projectId && projectName) {
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

    return { id: userId, email, name };
  }
}
