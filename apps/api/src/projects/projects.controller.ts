import { Controller, UseGuards, Get, Post, Req, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { ProjectsService } from './projects.service';
import { SmtpDto } from './projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProject(@Req() { user: { projectId } }) {
    return this.projectService.get(projectId);
  }

  @Get('/smtp')
  @UseGuards(JwtAuthGuard)
  async getProjectSmtp(@Req() { user: { projectId } }) {
    return this.projectService.getSmtp(projectId);
  }

  @Post('/smtp')
  @UseGuards(JwtAuthGuard)
  async setProjectSmtp(@Req() { user: { projectId } }, @Body() smtpDto: SmtpDto) {
    return this.projectService.setSmtp(projectId, smtpDto);
  }

  @Delete('/smtp')
  @UseGuards(JwtAuthGuard)
  async deleteProjectSmtp(@Req() { user: { projectId } }) {
    return this.projectService.deleteSmtp(projectId);
  }
}
