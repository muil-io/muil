import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { ConflictError } from 'shared/exceptions';
import { encryptPassword } from 'shared/utils/password';
import { User, NewUser } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser(query: any): Promise<User> {
    try {
      const { password, ...user } = await this.prisma.users.findOne({ where: { ...query } });
      return user;
    } catch (err) {
      return null;
    }
  }

  async createUser(newUser: NewUser): Promise<User> {
    const userExists = await this.getUser({ email: newUser.email });
    if (userExists) {
      throw new ConflictError(`User with email '${newUser.email}' already exists`);
    }

    const projectExists = await this.getUser({ projectId: newUser.projectId });
    if (projectExists) {
      throw new ConflictError(`Project ID '${newUser.projectId}' already exists`);
    }

    const id = uuidv4();
    const { password, ...user } = newUser;
    const hash = await encryptPassword(password);

    await this.prisma.users.create({
      data: {
        ...user,
        id,
        password: hash,
      },
    });

    return { id, ...user };
  }
}
