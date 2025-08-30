import { PartialType } from '@nestjs/swagger';
import { CreateSqliteDto } from '@src/modules/sqlite/dto/create-sqlite.dto';
export class UpdateSqliteDto extends PartialType(CreateSqliteDto) {}
