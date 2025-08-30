import { Module } from '@nestjs/common';
import { MaService } from './ma.service';
import { MaController } from './ma.controller';

@Module({
  controllers: [MaController],
  providers: [MaService],
})
export class MaModule {}
