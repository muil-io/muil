import { Module } from '@nestjs/common';
import { TemplatesModule } from 'templates';
import { HostnameController } from './hostname.controller';
import { HostnameService } from './hostname.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TemplatesModule],
  controllers: [ProjectsController, HostnameController],
  providers: [ProjectsService, HostnameService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
