import { Controller, UseGuards, Req, Get, Post, Delete, Body } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { AssetsSettingsService } from './assetsSettings.service';
import { CloudStorageSetDto } from './assets.dto';

@Controller('assetsSettings')
export class AssetsSettingsController {
  constructor(private readonly assetsSettingsService: AssetsSettingsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async get(@Req() { user: { projectId } }) {
    return this.assetsSettingsService.get(projectId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async set(@Req() { user: { projectId } }, @Body() data: CloudStorageSetDto) {
    return this.assetsSettingsService.set({ projectId, ...data });
  }

  @Delete()
  @UseGuards(AuthGuard)
  async delete(@Req() { user: { projectId } }) {
    return this.assetsSettingsService.delete(projectId);
  }
}
