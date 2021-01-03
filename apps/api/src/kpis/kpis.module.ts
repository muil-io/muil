import { Module } from '@nestjs/common';
import { KpisController } from './kpis.controller';
import { KpisService } from './kpis.service';

@Module({
  controllers: [KpisController],
  providers: [KpisService],
})
export class KpisModule {}
