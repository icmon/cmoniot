import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsStrongPassword,
  IsOptional 
} from 'class-validator';
export class CreateMqttDto {
  @ApiProperty({ description: 'mqtt_type_id', nullable: true })
  @IsNumber()
  @IsNotEmpty()
  mqtt_type_id: number | null;

  @ApiProperty({ description: 'sort' })
  @IsNumber()
  @IsOptional()
  sort?: number = 1;

  @ApiProperty({ description: 'mqtt_name' })
  @IsString()
  @IsNotEmpty()
  mqtt_name: string;

  @ApiProperty({ description: 'host' })
  @IsString()
  @IsNotEmpty()
  host: string;

  @ApiProperty({ description: 'port', nullable: true })
  @IsNumber()
  @IsNotEmpty()
  port: number | null;

  @ApiProperty({ description: 'username', nullable: true })
  @IsString()
  @IsOptional()
  username?: string | null;

  @ApiProperty({ description: 'password', nullable: true })
  @IsString()
  @IsOptional()
  password?: string | null;

  @ApiProperty({ description: 'secret', nullable: true })
  @IsString()
  @IsOptional()
  secret?: string | null;

  @ApiProperty({ description: 'expire_in', nullable: true })
  @IsString()
  @IsOptional()
  expire_in?: string | null;

  @ApiProperty({ description: 'token_value' })
  @IsString()
  @IsOptional()
  token_value?: string; // เปลี่ยนจาก token_value เป็น token_value

  @ApiProperty({ description: 'org', nullable: true })
  @IsString()
  @IsOptional()
  org?: string | null;

  @ApiProperty({ description: 'bucket', nullable: true })
  @IsString()
  @IsOptional()
  bucket?: string | null;

  @ApiProperty({ description: 'envavorment', nullable: true })
  @IsString()
  @IsOptional()
  envavorment?: string | null;

  @ApiProperty({ description: 'status' })
  @IsNumber()
  @IsOptional()
  status?: number = 0;

  @ApiProperty({ description: 'port', nullable: true })
  @IsNumber()
  location_id?: number | null;

  @ApiProperty({ description: 'latitude', nullable: true })
  @IsString()
  latitude?: string | null;

  @ApiProperty({ description: 'longitude', nullable: true })
  @IsString() 
  longitude: string | null;
}
