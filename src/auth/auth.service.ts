import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'shared/modules/prisma';
import { ConflictError } from 'shared/exceptions';
import { encryptPassword } from 'shared/utils/password';
import { User } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    try {
      const { password, ...user } = await this.prisma.users.findOne({ where: { email } });
      return user;
    } catch (err) {
      return null;
    }
  }

  async createUser(email: string, password: string, name: string): Promise<User> {
    const userExists = await this.getUser(email);
    if (userExists) {
      throw new ConflictError(`User with email '${email}' already exists`);
    }

    const id = uuidv4();
    const hash = await encryptPassword(password);

    await this.prisma.users.create({
      data: {
        id,
        email,
        name,
        password: hash,
      },
    });

    return { id, email, name };
  }
}
