import { PartialType } from '@nestjs/swagger';
import { CreateODto } from './create-o.dto';

export class UpdateODto extends PartialType(CreateODto) {}
