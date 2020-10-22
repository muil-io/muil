import { Controller, UseGuards, Post, NotImplementedException } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('/:fileName')
  @UseGuards(AuthGuard)
  async upload() {
    return NotImplementedException;
  }
}
