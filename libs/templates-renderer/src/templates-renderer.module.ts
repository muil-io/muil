import { Module } from '@nestjs/common';
import { TemplatesRendererService } from './templates-renderer.service';

@Module({
  providers: [TemplatesRendererService],
  exports: [TemplatesRendererService],
})
export class TemplatesRendererModule {}
