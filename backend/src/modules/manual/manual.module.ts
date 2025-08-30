import { Module } from '@nestjs/common';
import { ManualService } from './manual.service';
import { ManualController } from './manual.controller';

@Module({
  controllers: [ManualController],
  providers: [ManualService],
})
export class ManualModule {}
