import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConflictError } from 'shared/exceptions';
import { MailerService } from 'shared/modules/mailer';
import { SmtpService } from 'smtp';
import { UsersService } from 'users';
import { User } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private smtpService: SmtpService,
  ) {}

  async sendResetPasswordEmail(url: string, email: string) {
    const userExists = await this.usersService.get(email);
    if (!userExists) {
      return;
    }

    const token = this.jwtService.sign(
      {
        id: userExists.id,
        email: userExists.email,
        projectId: userExists.projectId,
      },
      { expiresIn: '10m' },
    );

    const html = `
      Hello,<br/>
      Please follow this link to reset your Muil account password<br/>

      <a href='${url}/#/reset/${token}'>Reset password</a>.<br/><br/>
    
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
    return this.usersService.updatePassword(token, newPassword);
  }

  async sendInviteUserEmail(user: User, origin: string, email: string) {
    const userExists = await this.usersService.get(email);
    if (!userExists) {
      throw new ConflictError(`User with email '${email}' already exists`);
    }

    const token = this.jwtService.sign({ projectId: user.projectId }, { expiresIn: '10m' });

    const html = `
      Hello,<br/>
      ${user.name} (${user.email}) has invited you to their Muil project.
      Please follow this link to create a Muil account<br/>

      <a href='${origin}/invite/${token}'>Accept invitation</a>.<br/><br/>
        
      Welcome and thanks!,<br/>
      The Muil Team
    `;

    const smtpOptions = await this.smtpService.getConfiguration(user.projectId);

    this.mailerService.send(
      html,
      null,
      {
        to: email,
        subject: `${user.name} (${user.email}) invited you to Muil`,
      },
      smtpOptions,
    );
  }
}
