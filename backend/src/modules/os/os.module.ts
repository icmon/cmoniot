import { Module } from '@nestjs/common';
import { OsService } from '@src/modules/os/os.service';
import { OsController } from '@src/modules/os/os.controller';

@Module({
  controllers: [OsController],
  providers: [OsService]
})
export class OsModule {}
