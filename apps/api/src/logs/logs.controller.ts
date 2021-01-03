import {
  Controller,
  UseGuards,
  Get,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProjectLogs(
    @Req() { user: { projectId } },
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(100), ParseIntPipe) perPage: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDirection') orderByDirection?: string,
    @Query('from') from?: string,
  ) {
    return this.logsService.getAll(projectId, page, perPage, orderBy, orderByDirection, from);
  }
}
