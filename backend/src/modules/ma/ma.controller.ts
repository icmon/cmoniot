import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaService } from './ma.service';
import { CreateMaDto } from './dto/create-ma.dto';
import { UpdateMaDto } from './dto/update-ma.dto';

@Controller('ma')
export class MaController {
  constructor(private readonly maService: MaService) {}

  @Post()
  create(@Body() createMaDto: CreateMaDto) {
    return this.maService.create(createMaDto);
  }

  @Get()
  findAll() {
    return this.maService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaDto: UpdateMaDto) {
    return this.maService.update(+id, updateMaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maService.remove(+id);
  }
}
