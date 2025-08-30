import { Module } from '@nestjs/common';
import { SqliteService } from '@src/modules/sqlite/sqlite.service';
import { SqliteController } from '@src/modules/sqlite/sqlite.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@src/modules/sqlite/entities/product.entity';
import { ProductType } from '@src/modules/sqlite/entities/productype.entity';
@Module({
  imports: [SequelizeModule.forFeature([Product, ProductType])],
  controllers: [SqliteController],
  providers: [SqliteService],
})
export class SqliteModule {}
