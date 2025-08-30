// src/dto/create-sqlite.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateSqliteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type_id: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}
