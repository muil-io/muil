import { Module } from '@nestjs/common';
import { TemplatesRendererModule } from '@muil/templates-renderer';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [TemplatesRendererModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
