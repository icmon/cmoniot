import { forwardRef, Module } from '@nestjs/common';
import { SettingsService } from '@src/modules/settings/settings.service';
import { SettingsController } from '@src/modules/settings/settings.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmModule,getRepositoryToken  } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '@src/modules/users/users.service';
import { UsersController } from '@src/modules/users/users.controller';
/****entity****/
import { DeviceType } from '@src/modules/settings/entities/devicetype.entity';
import { Setting } from '@src/modules/settings/entities/setting.entity';
import { Location } from '@src/modules/settings/entities/location.entity';
import { Type } from '@src/modules/settings/entities/type.entity';
import { Sensor } from '@src/modules/settings/entities/sensor.entity';
import { Group } from '@src/modules/settings/entities/group.entity';
import { Mqtt } from '@src/modules/settings/entities/mqtt.entity';
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';   
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
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
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@src/modules/auth/auth.module';
import { AuthService } from '@src/modules/auth/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from '@src/modules/mqtt/mqtt.service';
// @public
/***************/
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

const fs = require('fs');
const filePath = join(__dirname, 'public', 'emailConfigs.json');
const MAIL_HOST :any= process.env.MAIL_HOST || 'smtp.gmail.com' || "172.29.16.52";
const MAIL_PORT :number= Number(process.env.MAIL_PORT) || 465 || 587;
const MAIL_USERNAME :any= process.env.MAIL_USERNAME || "icmon0955@gmail.com" || "strux.ware";
const MAIL_PASSWORD :any= process.env.MAIL_PASSWORD || "ccwaijtieoujbojk" || "baac@123";


// # mail
// MAIL_HOST=smtp.gmail.com
// MAIL_USERMAIL_USER=icmon0955@gmail.com
// MAIL_PASSWORD=ccwaijtieoujbojk

// host_email_smtp=172.29.16.52  
// email_smtp_port=25   
// usere_mail_smtp=strux.ware@inbaac.com
/***************/
@Module({
  imports: [
     TypeOrmModule.forFeature([Setting, Location, Type, Sensor, Group, Mqtt,scheduleDevice,
      User,SdUserRole, UserFile,SdUserRolesAccess,UserRolePermission,
      Api,Device,DeviceType,Email,Host,Influxdb,Line,Nodered,Schedule,Sms,Token,Deviceaction,Deviceactionlog,Deviceactionuser,
      Devicealarmaction,Telegram,alarmDevice,alarmDeviceEvent,scheduleprocesslog,alarmprocesslog,alarmprocesslogtemp,alarmprocesslogemail,
      alarmprocesslogline,alarmprocesslogsms,alarmprocesslogtelegram,mqtthost
    ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
      ClientsModule.registerAsync([
            {
              name: 'MQTT_CLIENT',
              imports: [TypeOrmModule.forFeature([mqtthost])],
              inject: [getRepositoryToken(mqtthost)],
              useFactory: async (mqtthostRepo: Repository<mqtthost>) => {
                const mqtthostConfig = await mqtthostRepo.findOne({
                  where: { status: 1 },
                });
                if (!mqtthostConfig) {
                  throw new Error('MQTT host config not found in database');
                }
                return {
                  transport: Transport.MQTT,
                  options: {
                    url: process.env.MQTT_HOST || mqtthostConfig.host,
                    clientId: `nestjs-client-${Math.random().toString(16).slice(3)}`,
                    serializer: {
                      serialize: (value: any) => value.data,
                    },
                  },
                };
              },
            },
    ]), 
    MailerModule.forRoot({ 
        // transport: {
        //             host: "172.29.16.52",
        //             port: 587,
        //             secure: false,
        //             auth: {
        //               user: "strux.ware",
        //               pass: 'baac@123',
        //             },
        //             tls: {
        //                 rejectUnauthorized: false
        //             }
        //           },
        //         defaults: {
        //           from: '"No Reply" <IoTcmon>',
        //         }, 
        // transport: {
        //         host: 'smtp.gmail.com',
        //         port: 465,
        //         secure: true, // true for port 465, false for port 587
        //         auth: {
        //           user: 'icmon0955@gmail.com',
        //           pass: 'ccwaijtieoujbojk',
        //         },
        //         tls: {
        //             rejectUnauthorized: false
        //         } 
        // }, 
        transport: { 
                host: `${MAIL_HOST}`,
                port: Number(`${MAIL_PORT}`),
                secure: true, // true for port 465, false for port 587
                auth: {
                  user: `${MAIL_USERNAME}`,
                  pass: `${MAIL_PASSWORD}`,
                }, 
                tls: {
                    rejectUnauthorized: false
                } 
        },
        defaults: {
                from: '"No Reply" <cmoniots@gmail.com>',
        },
          // template: {
          //   dir: join(__dirname, 'templates'),
          //   adapter: new HandlebarsAdapter(),
          //   options: { strict: true },
          // },
     }),
  ], 
  controllers: [SettingsController],
  providers: [SettingsService,UsersService,AuthService,MqttService],
  exports: [UsersService, 
            TypeOrmModule.forFeature([Setting, Location, Type, Sensor, Group, Mqtt,scheduleDevice,
              User,SdUserRole,UserFile,SdUserRolesAccess,UserRolePermission,
              Api,Device,DeviceType,Email,Host,Influxdb,Line,Nodered,Schedule,Sms,Token,Deviceaction,Deviceactionlog,Deviceactionuser,
              Devicealarmaction,Telegram,alarmDevice,alarmDeviceEvent,scheduleprocesslog,alarmprocesslog,alarmprocesslogtemp,alarmprocesslogemail,
              alarmprocesslogline,alarmprocesslogsms,alarmprocesslogtelegram,mqtthost
            ]) 
        ], // ถ้าต้องการใช้ใน module อื่น
})
export class SettingsModule {}
