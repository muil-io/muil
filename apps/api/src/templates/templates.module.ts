import { Module } from '@nestjs/common';
import { TemplatesRendererModule } from '@muil/templates-renderer';
import { ProjectsModule } from 'projects';
import { MailerModule } from 'shared/modules/mailer';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [TemplatesRendererModule, ProjectsModule, MailerModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
