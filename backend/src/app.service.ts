import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/users/entities/user.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Cmon App Restful API!';
  }
  getHi(): string {
    return 'Hello World!';
  }
  async checkHealthStatus(): Promise<boolean> {
    await this.userRepository.findOneBy({ active_status: 1 });
    return true;
  }
}
