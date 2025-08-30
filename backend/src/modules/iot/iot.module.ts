import {
  Module,
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IotService } from '@src/modules/iot/iot.service';
import { IotController } from '@src/modules/iot/iot.controller';

@Module({
  controllers: [IotController],
  providers: [IotService],
})
export class IotModule {}
