import { Injectable } from '@nestjs/common';
import { CreateODto } from '@src/modules/os/dto/create-o.dto';
import { UpdateODto } from '@src/modules/os/dto/update-o.dto';

@Injectable()
export class OsService {
  create(createODto: CreateODto) {
    return 'This action adds a new o';
  }

  findAll() {
    return `This action returns all os`;
  }

  findOne(id: number) {
    return `This action returns a #${id} o`;
  }

  update(id: number, updateODto: UpdateODto) {
    return `This action updates a #${id} o`;
  }

  remove(id: number) {
    return `This action removes a #${id} o`;
  }
}
