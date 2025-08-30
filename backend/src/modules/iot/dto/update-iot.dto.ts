import { PartialType } from '@nestjs/swagger';
import { CreateIotDto } from '@src/modules/iot/dto/create-iot.dto';

export class UpdateIotDto extends PartialType(CreateIotDto) {}
