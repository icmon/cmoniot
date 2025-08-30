import { Injectable } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';

@Injectable()
export class ManualService {
  create(createManualDto: CreateManualDto) {
    return 'This action adds a new manual';
  }

  findAll() {
    return `This action returns all manual`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manual`;
  }

  update(id: number, updateManualDto: UpdateManualDto) {
    return `This action updates a #${id} manual`;
  }

  remove(id: number) {
    return `This action removes a #${id} manual`;
  }
}
