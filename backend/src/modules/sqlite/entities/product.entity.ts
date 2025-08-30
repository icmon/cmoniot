import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ProductType } from './productype.entity';
import { ApiProperty } from '@nestjs/swagger';
@Table({
  tableName: 'product',
})
export class Product extends Model {
  @ApiProperty({ description: 'sqlite product' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ProductType)
  @Column
  type_id: number;

  @BelongsTo(() => ProductType)
  productType: ProductType;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  price: string;
}
