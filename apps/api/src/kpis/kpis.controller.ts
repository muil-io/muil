import {
  Controller,
  UseGuards,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard, MuilAdminOnly } from 'shared/guards';
import { KpisService } from './kpis.service';

@Controller('kpis')
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Get('/stats')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async getKpis(@Body() { from }) {
    return this.kpisService.getKpis(from);
  }

  @Get('/projects')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async getProjects(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(100), ParseIntPipe) perPage: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDirection') orderByDirection?: string,
  ) {
    return this.kpisService.getProjects(page, perPage, orderBy, orderByDirection);
  }

  @Get('/users')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async getUsers(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(100), ParseIntPipe) perPage: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDirection') orderByDirection?: string,
  ) {
    return this.kpisService.getUsers(page, perPage, orderBy, orderByDirection);
  }
}
