import { Controller, UseGuards, Req, Get, Post, Delete, Body } from '@nestjs/common';
import { AuthGuard, AllowApiKey } from 'shared/guards';
import { CloudStorageSetDto } from './assets.dto';
import { AssetsSettingsService } from './assetsSettings.service';

@Controller('assetsSettings')
export class AssetsSettingsController {
  constructor(private readonly assetsSettingsService: AssetsSettingsService) {}

  @Get()
  @AllowApiKey()
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
