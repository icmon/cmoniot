import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManualService } from './manual.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';

@Controller('manual')
export class ManualController {
  constructor(private readonly manualService: ManualService) {}

  @Post()
  create(@Body() createManualDto: CreateManualDto) {
    return this.manualService.create(createManualDto);
  }

  @Get()
  findAll() {
    return this.manualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManualDto: UpdateManualDto) {
    return this.manualService.update(+id, updateManualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manualService.remove(+id);
  }
}
