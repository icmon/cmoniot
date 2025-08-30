import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sd_iot_mqtt', { schema: 'public' })
export class Mqtt {
  @PrimaryGeneratedColumn('increment')
  mqtt_id: number;

  @Column({ nullable: true })
  mqtt_type_id: number;

  @Column({ default: 1 })
  sort: number;

  @Column({ nullable: true })
  mqtt_name: string;

  @Column({ nullable: true })
  host: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  secret: string;

  @Column({ nullable: true })
  expire_in: string;

  @Column({ nullable: true })
  token_value: string;

  @Column({ nullable: true })
  org: string;

  @Column({ nullable: true })
  bucket: string;

  @Column({ nullable: true })
  envavorment: string;

  @CreateDateColumn()
  createddate: Date;

  @UpdateDateColumn()
  updateddate: Date;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'int', default: 1, nullable: true })
  location_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  latitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  longitude: string;
}