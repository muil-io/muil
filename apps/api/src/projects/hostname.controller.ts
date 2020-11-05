import { Controller, UseGuards, Get, Post, Req, Body } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { SetHostnameDto } from './hostname.dto';
import { HostnameService } from './hostname.service';

@Controller('hostname')
export class HostnameController {
  constructor(private readonly hostnameService: HostnameService) {}

  @Get()
  @UseGuards(AuthGuard)
  async get(@Req() { user: { projectId } }) {
    return this.hostnameService.get(projectId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async set(@Req() { user: { projectId } }, @Body() { hostname }: SetHostnameDto) {
    return this.hostnameService.set(projectId, hostname);
  }
}
