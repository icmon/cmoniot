import { Injectable } from '@nestjs/common';
import { CreateIotalarmDto } from './dto/create-iotalarm.dto';
import { UpdateIotalarmDto } from './dto/update-iotalarm.dto';

@Injectable()
export class IotalarmService {
  create(createIotalarmDto: CreateIotalarmDto) {
    return 'This action adds a new iotalarm';
  }

  findAll() {
    return `This action returns all iotalarm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iotalarm`;
  }

  update(id: number, updateIotalarmDto: UpdateIotalarmDto) {
    return `This action updates a #${id} iotalarm`;
  }

  remove(id: number) {
    return `This action removes a #${id} iotalarm`;
  }
}
