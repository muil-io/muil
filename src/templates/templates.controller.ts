import { Controller, UseGuards, Post, NotImplementedException } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { TemplatesService } from './templates.service';

@Controller('assets')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post('/:fileName')
  @UseGuards(JwtAuthGuard)
  async upload() {
    return NotImplementedException;
  }
}
