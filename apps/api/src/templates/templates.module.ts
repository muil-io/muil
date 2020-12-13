import { Module } from '@nestjs/common';
import { TemplatesRendererModule } from '@muil/templates-renderer';
import { MailerModule } from 'shared/modules/mailer';
import { LogsModule } from 'logs';
import { SmtpModule } from 'smtp';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [TemplatesRendererModule, LogsModule, MailerModule, SmtpModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
