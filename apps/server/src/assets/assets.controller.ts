import { Controller, UseGuards, Post, NotImplementedException } from '@nestjs/common';
import { JwtAuthGuard } from 'shared/guards';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('/:fileName')
  @UseGuards(JwtAuthGuard)
  async upload() {
    return NotImplementedException;
  }
}
