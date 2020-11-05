import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { HostnameController } from './hostname.controller';
import { HostnameService } from './hostname.service';

@Module({
  controllers: [ProjectsController, HostnameController],
  providers: [ProjectsService, HostnameService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
