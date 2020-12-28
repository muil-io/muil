import { Module } from '@nestjs/common';
import { MailerModule } from 'shared/modules/mailer';
import { ProjectsModule } from 'projects';
import { SmtpModule } from 'smtp';
import { UsersModule } from 'users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, ProjectsModule, MailerModule, SmtpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
