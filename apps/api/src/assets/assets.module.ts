import { Module } from '@nestjs/common';
import { CloudStorageModule } from '@muil/cloud-storage';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { AssetsSettingsController } from './assetsSettings.controller';
import { AssetsSettingsService } from './assetsSettings.service';

@Module({
  imports: [CloudStorageModule],
  controllers: [AssetsController, AssetsSettingsController],
  providers: [AssetsService, AssetsSettingsService],
})
export class AssetsModule {}
