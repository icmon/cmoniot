// src/dto/create-sqlite.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  type_name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
