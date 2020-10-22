import { Controller, UseGuards, Req, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { CreateApiKeyDto } from './apiKeys.dto';
import { ApiKeysService } from './apiKeys.service';

@Controller('apiKeys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Req() { user: { projectId } }) {
    return this.apiKeysService.findAll(projectId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() { user: { projectId } }, @Body() { name }: CreateApiKeyDto) {
    return this.apiKeysService.create(projectId, name);
  }

  @Post('/:id/:action(enable|disable)')
  @UseGuards(AuthGuard)
  async action(@Req() { user: { projectId } }, @Param() { id, action }) {
    return this.apiKeysService.setEnabled(projectId, id, action === 'enable');
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Req() { user: { projectId } }, @Param() { id }) {
    return this.apiKeysService.delete(projectId, id);
  }
}
