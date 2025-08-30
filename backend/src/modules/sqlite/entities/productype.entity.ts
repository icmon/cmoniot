import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
@Table({
  tableName: 'product_type',
})
export class ProductType extends Model {
  @ApiProperty({ description: 'sqlite product_type' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  type_id: number;

  @HasMany(() => Product)
  products: Product[];

  @Column(DataType.STRING)
  type_name: string;

  @Column(DataType.STRING)
  description: string;
}
