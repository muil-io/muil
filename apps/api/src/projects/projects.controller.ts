import { Controller, UseGuards, Get, Post, Param, Body, Req } from '@nestjs/common';
import { AuthGuard, AllowApiKey, MuilAdminOnly } from 'shared/guards';
import { UpdateProjectPlanDto } from './projects.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @AllowApiKey()
  @UseGuards(AuthGuard)
  async getProject(@Req() { user: { projectId } }) {
    return this.projectService.get(projectId);
  }

  @Post('/:id/plan')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async updateRole(
    @Req() { user: { projectId } },
    @Param() { id },
    @Body() { plan }: UpdateProjectPlanDto,
  ) {
    return this.projectService.updatePlan(projectId, id, plan);
  }
}
