import { Injectable } from '@nestjs/common';
import { CreateMaDto } from './dto/create-ma.dto';
import { UpdateMaDto } from './dto/update-ma.dto';

@Injectable()
export class MaService {
  create(createMaDto: CreateMaDto) {
    return 'This action adds a new ma';
  }

  findAll() {
    return `This action returns all ma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ma`;
  }

  update(id: number, updateMaDto: UpdateMaDto) {
    return `This action updates a #${id} ma`;
  }

  remove(id: number) {
    return `This action removes a #${id} ma`;
  }
}
