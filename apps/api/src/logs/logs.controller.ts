import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjectLogs(@Req() { user: { projectId } }) {
    return this.logsService.getAll(projectId);
  }
}
