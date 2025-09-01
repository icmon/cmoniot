import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsStrongPassword,
} from 'class-validator';
export class DeviceDto { 
  @IsNumber()
  @IsNotEmpty()
  setting_id: number = 1;

  @IsNumber()
  @IsNotEmpty()
  type_id: number = 1;

  @IsNumber()
  @IsNotEmpty()
  location_id: number = 1;
 
  @IsString()
  @IsNotEmpty()
  device_name: string;

  @IsString()
  @IsNotEmpty()
  sn: string;

  @IsString()
  @IsNotEmpty()
  max: string;

  @IsString()
  @IsNotEmpty()
  min: string;

  @IsNumber() 
  hardware_id: number;

  @IsString() 
  status_warning: string;

  @IsString() 
  recovery_warning: string;

  @IsString()
  status_alert: string;

  @IsString()
  recovery_alert: string;

  @IsNumber()
  time_life: number;

  @IsNumber()
  period: number;

  @IsString() 
  model: string;

  @IsString() 
  vendor: string;

  @IsString() 
  comparevalue: string;

  @IsString() 
  unit: string;

  @IsNumber() 
  mqtt_id: number;

  @IsString() 
  oid: string;

  @IsNumber() 
  action_id: number;

  @IsNumber() 
  status_alert_id: number;

  @IsString() 
  mqtt_data_value: string;

  @IsString() 
  mqtt_data_control: string;

  @IsString() 
  measurement: string;

  @IsNumber() 
  work_status: number;

  @IsString() 
  mqtt_control_on: string;

  @IsString() 
  mqtt_control_off: string;

  @IsString() 
  org: string;

  @IsString() 
  bucket: string;

  createddate: Date;
  updateddate: Date;
  @ApiProperty({
    description: 'status',
  })
  @IsNumber()
  @IsNotEmpty()
  status: number = 1;

  @IsString() 
  mqtt_device_name: string; 
  
  @IsString() 
  mqtt_status_over_name: string;
  
  @IsString() 
  mqtt_status_data_name: string;
  
  @IsString() 
  mqtt_act_relay_name: string;
  
  @IsString() 
  mqtt_control_relay_name: string;
}

/*


    {
        "device_name": "Temperature",
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
        "model": "Cmon-01-SP09",
        "vendor": "kongnakorn",
        "comparevalue": "0",
        "unit":"°C", 
        "oid":"-", 
        "action_id": "0",
        "status_alert_id": "0",
        "mqtt_data_value": "BAACTW02/DATA",
        "mqtt_data_control": "BAACTW02/CONTROL",
        "measurement": "temperature",
        "mqtt_control_on":  "1",  
        "mqtt_control_off": "0",
        "org": "cmon_org",    
        "bucket": "BAACTW02"
    }

     {
        "device_name": "Exhaust Fan1",
        "sn": "Cmon-2025-03-19-01-C02",
        "max": "1",
        "min": "0",
        "mqtt_id": "1",
        "hardware_id": "1",
        "status_warning": "32",
        "recovery_warning": "30",
        "status_alert": "35",
        "recovery_alert": "30.5",
        "time_life": "36000",
        "period": "36000",
        "model": "Cmon-01-SP09",
        "vendor": "kongnakorn",
        "comparevalue": "0",
        "unit":"", 
        "oid":"-", 
        "action_id": "0",
        "status_alert_id": "0",
        "mqtt_data_value": "BAACTW02/DATA",
        "mqtt_data_control": "BAACTW02/CONTROL",
        "measurement": "fan1",
        "mqtt_control_on":  "1",  
        "mqtt_control_off": "0",
        "org": "cmon_org",    
        "bucket": "BAACTW02"
    }

*/