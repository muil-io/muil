/* eslint-disable no-param-reassign */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { ConflictError } from 'shared/exceptions';
import { MailerService } from 'shared/modules/mailer';
import { PrismaService } from 'shared/modules/prisma';
import { encryptPassword, comparePassword } from 'shared/utils/password';
import { ProjectsService } from 'projects/projects.service';
import { SmtpService } from 'smtp';
import { User } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private smtpService: SmtpService,
  ) {}

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

  async sendResetPasswordEmail(url: string, email: string) {
    const userExists = await this.getUser({ email });
    if (!userExists) {
      return;
    }

    const token = this.jwtService.sign({
      id: userExists.id,
      email: userExists.email,
      projectId: userExists.projectId,
    });

    const html = `
      Hello,<br/>
      Please follow this link to reset your Muil account password<br/>

      <a href='${url}/#/reset/${token}'>Reset your password here</a>.<br/><br/>
    
      If you didn’t ask to reset your password, you can ignore this email. <br/>
    
      Thanks,<br/>
      Muil
    `;

    const smtpOptions = await this.smtpService.getConfiguration(userExists.projectId);

    this.mailerService.send(
      html,
      null,
      {
        to: userExists.email,
        subject: 'Reset your password for Muil',
      },
      smtpOptions,
    );
  }

  async resetPassword(token: string, newPassword: string) {
    const { id } = this.jwtService.verify(token);

    const hash = await encryptPassword(newPassword);
    const { password, ...user } = await this.prisma.users.update({
      where: { id },
      data: { password: hash },
    });

    return user;
  }
}
