import { PartialType } from '@nestjs/swagger';
import { CreateIotalarmDto } from './create-iotalarm.dto';

export class UpdateIotalarmDto extends PartialType(CreateIotalarmDto) {}
