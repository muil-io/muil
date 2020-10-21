import { Module } from '@nestjs/common';
import { MailerModule } from 'shared/modules/mailer';
import { SmtpController } from './smtp.controller';
import { SmtpService } from './smtp.service';

@Module({
  imports: [MailerModule],
  controllers: [SmtpController],
  providers: [SmtpService],
  exports: [SmtpService],
})
export class SmtpModule {}
