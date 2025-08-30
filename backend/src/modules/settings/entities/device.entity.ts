import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('sd_iot_device', { schema: 'public' }) // Specifies the table name
export class Device {
  //@PrimaryColumn()
  @PrimaryGeneratedColumn('increment') // จะเป็น auto-increment primary key
  device_id: number;

  @Column({ type: 'int', nullable: true })
  setting_id: number;

  @Column({ type: 'int', nullable: true })
  type_id: number;
  
  @Column({ type: 'int', nullable: true })
  location_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  device_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sn: string;

  @Column({ type: 'int', nullable: true })
  hardware_id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  status_warning: string;
  
  @Column({ type: 'varchar', length: 150, nullable: true })
  recovery_warning: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  status_alert: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  recovery_alert: string;

  @Column({ type: 'int', nullable: true })
  time_life: number=1;  
  
  @Column({ type: 'varchar', length: 150, nullable: true })
  period: string;

  @Column({ type: 'int', nullable: true })
  work_status: number=1; // 1=on , 2=off

  @Column({ type: 'varchar', length: 150, nullable: true })
  max: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  min: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  model: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vendor: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  comparevalue: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  unit: string;

  @Column({ type: 'int', nullable: true })
  mqtt_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  oid: string;

  @Column({ type: 'int', nullable: true })
  action_id: number;

  @Column({ type: 'int', nullable: true })
  status_alert_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mqtt_data_value: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mqtt_data_control: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  measurement: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mqtt_control_on: string='1';

  @Column({ type: 'varchar', length: 255, nullable: true })
  mqtt_control_off: string='0';

  @Column({ type: 'varchar', length: 255 })
  org: string;

  @Column({ type: 'varchar', length: 255 })
  bucket: string;

  @ApiProperty({ description: 'created at' })
  @CreateDateColumn()
  createddate: Date;

  @ApiProperty({ description: 'updated at' })
  @UpdateDateColumn()
  updateddate: Date;
  
  @Column({ type: 'int', nullable: true })
  status: number;

  @Column({ type: 'varchar', length: 255 })
  mqtt_device_name: string;

  @Column({ type: 'varchar', length: 255 })
  mqtt_status_over_name: string;

  @Column({ type: 'varchar', length: 255 })
  mqtt_status_data_name: string;

  @Column({ type: 'varchar', length: 255 })
  mqtt_act_relay_name: string;

  @Column({ type: 'varchar', length: 255 })
  mqtt_control_relay_name: string;
}
/*******************/
/*
    {
      "setting_id": "1",
      "type_id": "1",
      "location_id": "1",
      "device_name": "Exhaust fan1", // // temperature  Exhaust fan2
      "sn": "Cmon-2025-03-19-01-C01",
      "max": "35",
      "min": "30",
      "mqtt_id": "1",
      "hardware_id": "1",
      "status_warning": "32",
      "recovery_warning": "30",
      "status_alert": "35",
      "recovery_alert": "30.5",
      "time_life": "36000",
      "period": "36000",
      "work_status": "1",
      "model": "Cmon-01-SP09",
      "vendor": "kongnakorn",
      "comparevalue": "0",
      "unit":"°C", 
      "oid":"12421111", 
      "action_id": "0",
      "status_alert_id": "0",
      "mqtt_data_value": "BAACTW06/DATA",
      "mqtt_data_control": "BAACTW06/CONTROL",
      "measurement": "fan1",
      "mqtt_control_on":  "1",  
      "mqtt_control_off": "0",
      "org": "cmon_org",
      "bucket": "BAACTW06"
  }
*/