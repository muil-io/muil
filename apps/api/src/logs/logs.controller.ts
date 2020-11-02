import { Controller, UseGuards, Get, Req, Query } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProjectLogs(@Req() { user: { projectId } }, @Query('from') from?: string) {
    return this.logsService.getAll(projectId, from);
  }
}
