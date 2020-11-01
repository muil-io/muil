import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuardWithApiKey } from 'shared/guards';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @UseGuards(AuthGuardWithApiKey)
  async getProject(@Req() { user: { projectId } }) {
    return this.projectService.get(projectId);
  }
}
