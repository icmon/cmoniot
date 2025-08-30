import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IotalarmService } from './iotalarm.service';
import { CreateIotalarmDto } from './dto/create-iotalarm.dto';
import { UpdateIotalarmDto } from './dto/update-iotalarm.dto';

@Controller('iotalarm')
export class IotalarmController {
  constructor(private readonly iotalarmService: IotalarmService) {}

  @Post()
  create(@Body() createIotalarmDto: CreateIotalarmDto) {
    return this.iotalarmService.create(createIotalarmDto);
  }

  @Get()
  findAll() {
    return this.iotalarmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iotalarmService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIotalarmDto: UpdateIotalarmDto,
  ) {
    return this.iotalarmService.update(+id, updateIotalarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iotalarmService.remove(+id);
  }
}
