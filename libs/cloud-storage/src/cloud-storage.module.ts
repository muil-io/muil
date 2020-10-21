import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';

@Module({
  providers: [CloudStorageService],
  exports: [CloudStorageService],
})
export class CloudStorageModule {}
