import { Controller, UseGuards, Get, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProject(@Req() { user: { projectId } }) {
    return this.projectService.get(projectId);
  }

  @Get('/:projectId')
  async projectExists(@Param('projectId') projectId: string) {
    const project = await this.projectService.get(projectId);
    return {
      exists: project !== null,
    };
  }
}
