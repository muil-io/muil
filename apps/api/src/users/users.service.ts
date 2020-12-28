import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ConflictError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';
import { encryptPassword, comparePassword } from 'shared/utils/password';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async get(searchString: string) {
    try {
      const { password, ...user } = await this.prisma.users.findFirst({
        where: {
          OR: [{ id: searchString }, { email: searchString }],
        },
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  async getAll(projectId: string) {
    const users = await this.prisma.users.findMany({ where: { projectId } });
    return users.map(({ password, ...u }) => u);
  }

  async create({ name, email, password, projectId }: Prisma.UsersCreateInput) {
    const userExists = await this.get(email);
    if (userExists) {
      throw new ConflictError(`User with email '${email}' already exists`);
    }

    const encryptedPassword = await encryptPassword(password);
    const { password: pass, ...user } = await this.prisma.users.create({
      data: {
        projectId,
        email,
        name,
        password: encryptedPassword,
      },
    });

    return user;
  }

  async update(projectId: string, id: string, name: string) {
    await this.prisma.users.updateMany({
      where: { AND: [{ projectId }, { id }] },
      data: { name },
    });

    return this.getAll(projectId);
  }

  updatePassword(token: string, newPassword: string): Promise<any>;
  updatePassword(id: string, newPassword: string, oldPassword?: string): Promise<any>;
  async updatePassword(tokenOrId: string, newPassword: string, oldPassword?: string) {
    let id: string;

    if (oldPassword) {
      id = tokenOrId;
      const { password: storedPassword } = await this.prisma.users.findUnique({
        where: { id },
      });
      if (!storedPassword || !(await comparePassword(oldPassword, storedPassword))) {
        throw new UnauthorizedException();
      }
    } else {
      id = this.jwtService.verify(tokenOrId).id;
    }

    const encryptedPassword = await encryptPassword(newPassword);
    const { password, ...user } = await this.prisma.users.update({
      where: { id },
      data: { password: encryptedPassword },
    });

    return user;
  }
}
