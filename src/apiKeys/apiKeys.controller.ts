import { Controller, UseGuards, Req, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { CreateApiKeyDto } from './apiKeys.dto';
import { ApiKeysService } from './apiKeys.service';

@Controller('apiKeys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() { user: { projectId } }) {
    return this.apiKeysService.findAll(projectId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() { user: { projectId } }, @Body() { name }: CreateApiKeyDto) {
    return this.apiKeysService.create(projectId, name);
  }

  @Post('/:apiKeyPrefix/:action(enable|disable)')
  @UseGuards(JwtAuthGuard)
  async action(@Req() { user: { projectId } }, @Param() { apiKeyPrefix, action }) {
    return this.apiKeysService.setEnabled(projectId, apiKeyPrefix, action === 'enable');
  }

  @Delete('/:apiKeyPrefix')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() { user: { projectId } }, @Param() { apiKeyPrefix }) {
    return this.apiKeysService.delete(projectId, apiKeyPrefix);
  }
}
