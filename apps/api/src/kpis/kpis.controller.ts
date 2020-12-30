import { Controller, UseGuards, Body, Get } from '@nestjs/common';
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
  async getProjects() {
    return this.kpisService.getProjects();
  }

  @Get('/users')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async getUsers() {
    return this.kpisService.getUsers();
  }
}
