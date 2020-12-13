import { Module } from '@nestjs/common';
import { HostnameController } from './hostname.controller';
import { HostnameService } from './hostname.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController, HostnameController],
  providers: [ProjectsService, HostnameService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
