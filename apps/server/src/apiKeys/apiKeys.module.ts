import { Module } from '@nestjs/common';
import { ApiKeysController } from './apiKeys.controller';
import { ApiKeysService } from './apiKeys.service';

@Module({
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
})
export class ApiKeysModule {}
