import { PartialType } from '@nestjs/swagger';
import { CreateMaDto } from './create-ma.dto';

export class UpdateMaDto extends PartialType(CreateMaDto) {}
