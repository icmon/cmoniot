import { forwardRef, Module } from '@nestjs/common';
import { SyslogService } from '@src/modules/syslog/syslog.service';
import { SyslogController } from '@src/modules/syslog/syslog.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmModule,getRepositoryToken  } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { RolesService } from '@src/modules/roles/roles.service';
import { RolesController } from '@src/modules/roles/roles.controller';
import { CreateRoleDto } from '@src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from '@src/modules/roles/dto/update-role.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '@src/modules/users/users.service';
import { UsersController } from '@src/modules/users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@src/modules/auth/auth.module';
import { AuthService } from '@src/modules/auth/auth.service';
import { IotService } from '@src/modules/iot/iot.service';
/****entity****/
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';   
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
/****entity****/
import { DeviceType } from '@src/modules/settings/entities/devicetype.entity';
import { Setting } from '@src/modules/settings/entities/setting.entity';
import { Location } from '@src/modules/settings/entities/location.entity';
import { Type } from '@src/modules/settings/entities/type.entity';
import { Sensor } from '@src/modules/settings/entities/sensor.entity';
import { Group } from '@src/modules/settings/entities/group.entity';
import { Mqtt } from '@src/modules/settings/entities/mqtt.entity';
import { Deviceaction } from '@src/modules/settings/entities/deviceaction.entity';
import { Deviceactionlog } from '@src/modules/settings/entities/deviceactionlog.entity';
import { Deviceactionuser } from '@src/modules/settings/entities/deviceactionuser.entity';
import { Devicealarmaction } from '@src/modules/settings/entities/devivicealarmaction.entity';
import { Telegram } from '@src/modules/settings/entities//telegram.entity';
import { Api } from '@src/modules/settings/entities/api.entity';
import { Device } from '@src/modules/settings/entities/device.entity';
import { Email } from '@src/modules/settings/entities/email.entity';
import { Host } from '@src/modules/settings/entities/host.entity';
import { Influxdb } from '@src/modules/settings/entities/influxdb.entity';
import { Line } from '@src/modules/settings/entities/line.entity';
import { Nodered } from '@src/modules/settings/entities/nodered.entity';
import { Schedule } from '@src/modules/settings/entities/schedule.entity';
import { Sms } from '@src/modules/settings/entities/sms.entity';
import { Token } from '@src/modules/settings/entities/token.entity';
import { scheduleDevice } from '@src/modules/settings/entities/scheduledevice.entity';
import { alarmDevice } from '@src/modules/settings/entities/alarmdevice.entity';
import { alarmDeviceEvent } from '@src/modules/settings/entities/alarmdeviceevent.entity';
import { scheduleprocesslog } from '@src/modules/settings/entities/scheduleprocesslog.entity';
import { alarmprocesslog } from '@src/modules/settings/entities/alarmprocesslog.entity';
import { alarmprocesslogtemp } from '@src/modules/settings/entities/alarmprocesslogtemp.entity';
import { alarmprocesslogemail } from '@src/modules/settings/entities/alarmprocesslogemail.entity'; 
import { alarmprocesslogline } from '@src/modules/settings/entities/alarmprocesslogline.entity';
import { alarmprocesslogsms } from '@src/modules/settings/entities/alarmprocesslogsms.entity'; 
import { alarmprocesslogtelegram } from '@src/modules/settings/entities/alarmprocesslogtelegram.entity';
import { mqtthost } from '@src/modules/settings/entities/mqtthost.entity';
/****entity****/
import { DeviceLog } from '@src/modules/syslog/entities/devicelog.entity';
import { UserLog } from '@src/modules/syslog/entities/userlog.entity';
import { UserLogtype } from '@src/modules/syslog/entities/userlogtype.entity';    
import { Role } from '@src/modules/roles/entities/role.entity';
import { Rolesaccess } from '@src/modules/roles/entities/rolesaccess.entity';
import { MqttService } from '@src/modules/mqtt/mqtt.service';
import { MqttController } from '@src/modules/mqtt/mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// https://medium.com/@manav23soni/mqtt-integration-with-nestjs-application-with-simple-example-1a6609e88f47
/******ENV******/
import * as moment from 'moment-timezone';
import { SettingsService } from '@src/modules/settings/settings.service';
const ENV = process.env.NODE_ENV;
console.log('NODE_ENV: '+ENV);
console.log('MQTT_HOST: '+process.env.MQTT_HOST);
@Module({
    imports: [
    // 2. Import Module อื่นที่จำเป็นต้องใช้ (ถ้ามี)
     TypeOrmModule.forFeature([DeviceLog,
                User,UserLog, UserLogtype,Role,Rolesaccess,User,SdUserRole,UserFile,SdUserRolesAccess,
                UserRolePermission,Setting, Location, Type, Sensor, Group, Mqtt,
                User,Api,Device,DeviceType,Email,Host,Influxdb,Line,Nodered,Schedule,Sms,Token,Deviceaction,
                Deviceactionlog,Deviceactionuser,Devicealarmaction,Telegram,scheduleDevice,alarmDevice,alarmDeviceEvent,
                scheduleprocesslog,alarmprocesslog,alarmprocesslogtemp,alarmprocesslogemail,
                alarmprocesslogline,alarmprocesslogsms,alarmprocesslogtelegram,mqtthost
    ]), 
    // This import is the solution. It registers the MQTT client provider.
    /*
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT', // This token must match the one used in the service's @Inject() decorator.
        transport: Transport.MQTT,
        options: {
           url: process.env.MQTT_HOST, // Replace with your MQTT broker URL
           clientId: `nestjs-client-${Math.random().toString(16).slice(3)}`, 
            serializer: {
              // พยายามดึงเฉพาะข้อมูลจากอ็อบเจกต์ value
              serialize: (value: any) => value.data, 
            },
        },
      },
    ]),
    */
    // ลงทะเบียน MQTT Client แบบ Dynamic จาก DB
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [TypeOrmModule.forFeature([mqtthost])],
        inject: [getRepositoryToken(mqtthost)],
        useFactory: async (mqtthostRepo: Repository<mqtthost>) => {
          const mqtthostConfig = await mqtthostRepo.findOne({ where: { status: 1 } });
          if (!mqtthostConfig) {
            throw new Error('MQTT host config not found in database');
          }
          return {
            transport: Transport.MQTT,
            options: {  
              //url: process.env.MQTT_HOST || mqtthostConfig.host,
              url: mqtthostConfig.host || process.env.MQTT_HOST,
              clientId: `nestjs-client-${Math.random().toString(16).slice(3)}`,
              serializer: {
                serialize: (value: any) => value.data,
              },
            },
          };
        },
      },
    ]),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'MQTT_CLIENT',
    //     imports: [TypeOrmModule.forFeature([mqtthost])],
    //     inject: [getRepositoryToken(mqtthost)],
    //     useFactory: async (mqtthostRepo: Repository<mqtthost>) => {
    //       const mqtthostConfig = await mqtthostRepo.findOne({
    //         where: { status: 1 },
    //       });
    //       if (!mqtthostConfig) {
    //         throw new Error('MQTT host config not found in database');
    //       }
    //       return {
    //         transport: Transport.MQTT,
    //         options: {
    //           url: process.env.MQTT_HOST || mqtthostConfig.host,
    //           clientId: `nestjs-client-${Math.random().toString(16).slice(3)}`,
    //           serializer: {
    //             serialize: (value: any) => value.data,
    //           },
    //         },
    //       };
    //     },
    //   },
    // ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MqttController],
  providers: [MqttService,SyslogService,RolesService,AuthService,UsersService, AuthService,SettingsService,IotService],
  exports: [RolesService, UsersService,IotService, 
              TypeOrmModule.forFeature([DeviceLog,
                User, UserLog, UserLogtype, Role,Rolesaccess, User,SdUserRole,UserFile, SdUserRolesAccess,
                UserRolePermission,Setting, Location, Type, Sensor, Group, Mqtt,
                User,Api,Device,DeviceType,Email,Host,Influxdb,Line,Nodered,Schedule,Sms,Token,Deviceaction,
                Deviceactionlog,Deviceactionuser,Devicealarmaction,Telegram,scheduleDevice,alarmDevice,alarmDeviceEvent,
                scheduleprocesslog,alarmprocesslog,alarmprocesslogtemp,alarmprocesslogemail,
                alarmprocesslogline,alarmprocesslogsms,alarmprocesslogtelegram,mqtthost
              ]) 
          ], // ถ้าต้องการใช้ใน module อื่น
})
export class MqttModule {}