import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { USER_TYPE } from '@src/types';
import { BaseModel } from '@src/modules/common/entities/baseModel.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '@src/modules/auth/enums/role.enum';
@Entity('sd_user', { schema: 'public' })
export class User extends BaseModel {
  @Column({ type: 'int4', nullable: false })
  role_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_temp?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fullname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nickname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  idcard?: string;

  @UpdateDateColumn()
  lastsignindate?: Date;

  @Column({ type: 'int2', nullable: false })
  status!: number;

  @Column({ type: 'int2', nullable: true })
  active_status?: number;

  @Column({ type: 'int4', nullable: true })
  network_id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remark?: string;

  @Column({ type: 'int2', nullable: true })
  infomation_agree_status?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  online_status?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message?: string;

  @Column({ type: 'int4', nullable: true })
  network_type_id?: number;

  @Column({ type: 'int2', nullable: true })
  public_status?: number;

  @Column({ type: 'int4', nullable: true })
  type_id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarpath?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  refresh_token?: string;

  @Column({ type: 'int2', nullable: true })
  loginfailed?: number;

  @Column({ type: 'int2', nullable: true, default: 0  })
  public_notification?: number = 0;

  @Column({ type: 'int2', nullable: true, default: 0  })
  sms_notification?: number = 0;

  @Column({ type: 'int2', nullable: true, default: 0 })
  email_notification?: number = 0;

  @Column({ type: 'int2', nullable: true, default: 0 })
  line_notification?: number = 0;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mobile_number?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lineid?: string;
}