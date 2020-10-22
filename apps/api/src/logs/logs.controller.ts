import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProjectLogs(@Req() { user: { projectId } }) {
    return this.logsService.getAll(projectId);
  }
}
