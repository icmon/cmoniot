import { Module } from '@nestjs/common';
import { IotalarmService } from './iotalarm.service';
import { IotalarmController } from './iotalarm.controller';

@Module({
  controllers: [IotalarmController],
  providers: [IotalarmService],
})
export class IotalarmModule {}
