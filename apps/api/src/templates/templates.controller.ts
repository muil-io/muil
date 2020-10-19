import {
  Controller,
  UseGuards,
  UseInterceptors,
  Req,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'shared/guards';
import { TemplatesService } from './templates.service';
import { File } from './types';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Req() { user: { projectId } }) {
    return this.templatesService.findAll(projectId);
  }

  @Put('/:branch?')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  async upload(
    @UploadedFiles() files: File[],
    @Req() { user: { projectId } },
    @Param('branch') branch: string = 'master',
  ) {
    this.templatesService.upload(projectId, branch, files);
  }

  @Delete('/:branch?/:templateId')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Req() { user: { projectId } },
    @Param('branch') branch: string = 'master',
    @Param('templateId') templateId: string,
  ) {
    this.templatesService.delete(projectId, branch, templateId);
  }

  @Post('/:branch?/:templateId')
  @UseGuards(JwtAuthGuard)
  async postRender(
    @Req() { user: { projectId } },
    @Param('branch') branch: string = 'master',
    @Param('templateId') templateId: string,
    @Query() { type, inlineCss, minifyHtml },
    @Body() { props },
  ) {
    return this.templatesService.render(projectId, branch, templateId, props, {
      type,
      inlineCss: inlineCss !== 'false',
      minifyHtml: minifyHtml !== 'false',
    });
  }

  @Get('/:branch?/:templateId')
  @UseGuards(JwtAuthGuard)
  async getRender(
    @Req() { user: { projectId } },
    @Param('branch') branch: string = 'master',
    @Param('templateId') templateId: string,
    @Query() { type, inlineCss, minifyHtml, props },
  ) {
    return this.templatesService.render(projectId, branch, templateId, props, {
      type,
      inlineCss: inlineCss !== 'false',
      minifyHtml: minifyHtml !== 'false',
    });
  }
}