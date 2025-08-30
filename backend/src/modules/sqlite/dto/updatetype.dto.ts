// src/dto/create-sqlite.dto.ts
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateTypeDto {
  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @IsString()
  @IsNotEmpty()
  type_name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
