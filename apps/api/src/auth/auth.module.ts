import { Module } from '@nestjs/common';
import { MailerModule } from 'shared/modules/mailer';
import { ProjectsModule } from 'projects';
import { SmtpModule } from 'smtp';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ProjectsModule, MailerModule, SmtpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
