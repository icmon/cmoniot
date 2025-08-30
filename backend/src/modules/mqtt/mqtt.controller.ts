import {
  Header,
  Controller,
  Res,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
  Req,
  Injectable,
  Headers,
  DefaultValuePipe,
  ParseIntPipe,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  PipeTransform,
  ArgumentMetadata,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
 Inject, Logger } from '@nestjs/common';
// import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
// import { Gpio } from 'onoff';
let isOn = false;
let intervalId;

import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request, Response, NextFunction } from 'express';
import { Public } from '@src/modules/auth/auth.decorator';
import * as moment from 'moment';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthUserRequired,
  auth,
  AuthTokenRequired,
} from '@src/modules/auth/auth.decorator';
import { SettingsService } from '@src/modules/settings/settings.service';
// import * as cache from '@src/utils/cache/redis.cache';
import * as rediscluster from '@src/utils/cache/rediscluster.cache';
import { CacheDataOne } from '@src/utils/cache/redis.cache';
var Cache = new CacheDataOne();
import 'dotenv/config';
require('dotenv').config();
const API_VERSION = '1';
import * as argon2 from 'argon2';
//console.log('SECRET_KEY: '+process.env.SECRET_KEY)
import { JwtService } from '@nestjs/jwt';
import * as format from '@src/helpers/format.helper';
import { AuthGuard } from '@src/modules/auth/auth.guard';
import { AuthGuardUser } from '@src/modules/auth/auth.guarduser';
import { passwordtDto } from '@src/modules/users/dto/Resetpassword.dto';
import { fileDto } from '@src/modules/users/dto/file.dto';
import { FogotPassword } from '@src/modules/users/dto/forgeot-password.dto';
const { passwordStrength } = require('check-password-strength');
import { Pagination } from 'nestjs-typeorm-paginate';
/******** entity *****************/
import { UsersService } from '@src/modules/users/users.service';
import { Role } from '@src/modules/roles/entities/role.entity';
import { Rolesaccess } from '@src/modules/roles/entities/rolesaccess.entity';
import { AuthService } from '@src/modules/auth/auth.service';
import { User } from '@src/modules/users/entities/user.entity';
import { RolesService } from '@src/modules/roles/roles.service';
import { UserLog } from '@src/modules/syslog/entities/userlog.entity';
import { UserLogtype } from '@src/modules/syslog/entities/userlogtype.entity';    
import { SyslogService } from '@src/modules/syslog/syslog.service';
import { CreateSyslogDto } from '@src/modules/syslog/dto/create-syslog.dto';
import { UpdateSyslogDto } from '@src/modules/syslog/dto/update-syslog.dto';
import { CreateSyslogTypeDto } from '@src/modules/syslog/dto/create-syslog-type.dto';
// import * as cache from '@src/utils/cache/redis.cache';
var Cache = new CacheDataOne();
var md5 = require('md5');
import 'dotenv/config';
var tzString = process.env.tzString;
// formatInTimeZone(date, tzString, 'yyyy-MM-dd HH:mm:ssXXX') 
require('dotenv').config();
import { IotService } from '@src/modules/iot/iot.service';
import { MqttService } from '@src/modules/mqtt/mqtt.service';
import { CreateMqttDto } from '@src/modules/mqtt/dto/create-mqtt.dto';
import { UpdateMqttDto } from '@src/modules/mqtt/dto/update-mqtt.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  MqttContext,
} from '@nestjs/microservices';
// DTO for request body validation
class PublishDto {
  topic: string='BAACTW02/CONTROL';
  message: string='1'; 
}
@Controller('mqtt')
export class MqttController {
    private readonly logger = new Logger(MqttController.name);
    constructor(
        private settingsService: SettingsService,
        private readonly mqttService: MqttService,
        private readonly syslogService: SyslogService,
        private readonly rolesService: RolesService,
        private usersService: UsersService,
        private authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly IotService: IotService,
  ) {}
  /********************************/
  // ตัวอย่างการใช้ Wildcard เพื่อดักฟังหลาย topic
  // เช่น 'devices/+/status' จะดักฟังทั้ง devices/A/status, devices/B/status, ...
  @MessagePattern('devices/+/status')
  handleDeviceStatus(@Payload() data: any, @Ctx() context: MqttContext) {
    this.logger.log(`สถานะอุปกรณ์จาก Topic: ${context.getTopic()}`);
    this.logger.log(`ข้อมูลสถานะ: ${JSON.stringify(data)}`);
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get()
  async getDeviceDataIndex(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
      ) {

      let filter: any = {};
      // filter.sort = query.sort || 'ASC';
	    // filter.bucket = query.bucket || '';
      // filter.mqtt_type_id = query.mqtt_type_id || '';
      var bucket:any=query.bucket;
      var status:any=query.status;
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket = bucket;
      var kaycache:any=md5('mqtt_status_m_'+status+'_bucket_'+bucket);
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_active(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var kaycache_cache:any=md5('mqtt_bucket_'+Resultate[key].bucket); 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 
            /***************/
            var deviceData = [];
                for (const [key2, va] of Object.entries(ResultDatadevice)) {
                  var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
                  var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control; 
                  var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                  const arraydata: any = { 
                          device_id: ResultDatadevice[key2].device_id,  
                          type_id: ResultDatadevice[key2].type_id,  
                          device_name: ResultDatadevice[key2].device_name,  
                          type_name: ResultDatadevice[key2].type_name, 
                          timestamp: mqttdata['payload']['timestamp'],
                          temperature_value: mqttdata['payload']['temperature'],
                          status_warning: ResultDatadevice[key2].status_warning,
                          recovery_warning: ResultDatadevice[key2].recovery_warning,
                          status_alert: ResultDatadevice[key2].status_alert,
                          recovery_alert: ResultDatadevice[key2].recovery_alert,
                          time_life: ResultDatadevice[key2].time_life, 
                          mqtt_data_value: mqtt_data_value,
                          mqtt_data_control: mqtt_data_control, 
                          mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
                          control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
                          mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
                          control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
                          //measurement: ResultDatadevice[key2].measurement,  
                          location_name: ResultDatadevice[key2].location_name, 
                          mqtt_name: ResultDatadevice[key2].mqtt_name, 
                          //mqtt_org: ResultDatadevice[key2].mqtt_org, 
                          mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
                          // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment, 
                          mqtt_dada: mqttdata['payload']['mqtt_dada'],
                          contRelay1: mqttdata['payload']['contRelay1'],
                          actRelay1: mqttdata['payload']['actRelay1'],
                          contRelay2: mqttdata['payload']['contRelay2'],
                          actRelay2: mqttdata['payload']['actRelay2'],  
                          /****************************/
                          fan1: mqttdata['payload']['fan1'],  
                          overFan1: mqttdata['payload']['overFan1'],  
                          fan2: mqttdata['payload']['fan2'],  
                          overFan2: mqttdata['payload']['overFan2'], 
                          // filter2:filter2,
                          // mqttdata: mqttdata['payload'],
                  };  
                deviceData.push(arraydata);
            } 
            /*************************/ 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name,
                  cache: cache_data,
                  cache2:cache_data_2,
                  device: deviceData, 
                  mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                  // sort: Resultate[key].sort,
                  status: Resultate[key].status, 
            };  
          if(ResultDatadevice){
            ArrayData.push(arraydata);
          }
          
      }   
      res.status(200).json({
            statusCode: 200,
            code: 200, 
            payload: ArrayData, 
            status: 0,
            message: `Mqtt..`,
            message_th: `Mqtt..`,
        });
      return;
  }   
  /********************************/
  //http://localhost:3003/v1/mqtt/fan
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('fan')
  async getDeviceDatafan(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
      ) {

      let filter: any = {};
      // filter.sort = query.sort || 'ASC';
	    // filter.bucket = query.bucket || '';
      // filter.mqtt_type_id = query.mqtt_type_id || '';
      var bucket:any=query.bucket;
      var status:any=query.status;
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket = bucket;
      var kaycache:any=md5('fan_mqtt_status_m_'+status+'_bucket_'+bucket);
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_active_fan(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var kaycache_cache:any=md5('mqtt_bucket_'+Resultate[key].bucket); 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 
            /***************/
            var deviceData = [];
                for (const [key2, va] of Object.entries(ResultDatadevice)) {
                  var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
                  var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control; 
                  var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                  const arraydata: any = { 
                          device_id: ResultDatadevice[key2].device_id,  
                          type_id: ResultDatadevice[key2].type_id,  
                          device_name: ResultDatadevice[key2].device_name,  
                          type_name: ResultDatadevice[key2].type_name, 
                          timestamp: mqttdata['payload']['timestamp'],
                          temperature_value: mqttdata['payload']['temperature'],
                          status_warning: ResultDatadevice[key2].status_warning,
                          recovery_warning: ResultDatadevice[key2].recovery_warning,
                          status_alert: ResultDatadevice[key2].status_alert,
                          recovery_alert: ResultDatadevice[key2].recovery_alert,
                          time_life: ResultDatadevice[key2].time_life, 
                          mqtt_data_value: mqtt_data_value,
                          mqtt_data_control: mqtt_data_control, 
                          mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
                          control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
                          mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
                          control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
                          //measurement: ResultDatadevice[key2].measurement,  
                          location_name: ResultDatadevice[key2].location_name, 
                          mqtt_name: ResultDatadevice[key2].mqtt_name, 
                          //mqtt_org: ResultDatadevice[key2].mqtt_org, 
                          mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
                          // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment, 
                          mqtt_dada: mqttdata['payload']['mqtt_dada'],
                          contRelay1: mqttdata['payload']['contRelay1'],
                          actRelay1: mqttdata['payload']['actRelay1'],
                          contRelay2: mqttdata['payload']['contRelay2'],
                          actRelay2: mqttdata['payload']['actRelay2'],  
                          /****************************/
                          fan1: mqttdata['payload']['fan1'],  
                          overFan1: mqttdata['payload']['overFan1'],  
                          fan2: mqttdata['payload']['fan2'],  
                          overFan2: mqttdata['payload']['overFan2'], 
                          // filter2:filter2,
                          // mqttdata: mqttdata['payload'],
                  };  
                deviceData.push(arraydata);
            } 
            /*************************/ 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name,
                  cache: cache_data,
                  cache2:cache_data_2,
                  device: deviceData, 
                  mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                  // sort: Resultate[key].sort,
                  status: Resultate[key].status, 
            };    
        ArrayData.push(arraydata);
      }   
      res.status(200).json({
            statusCode: 200,
            code: 200, 
            payload: ArrayData, 
            status: 0,
            message: `Mqtt..`,
            message_th: `Mqtt..`,
        });
      return;
  }  
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listtitle')
  async getMqttlist(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
      ) {

      let filter: any = {};
      // filter.sort = query.sort || 'ASC';
	    // filter.bucket = query.bucket || '';
      // filter.mqtt_type_id = query.mqtt_type_id || '';
      var bucket:any=query.bucket;
      var status:any=query.status;
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket = bucket;
      var kaycache:any=md5('mqtt_status_listtitle_'+status+'_bucket_'+bucket);
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_active(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var kaycache_cache:any='mqtt_listtitle_bucket_'+Resultate[key].bucket; 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 
            /***************/
            // let deviceData = [];
            //     for (const [key2, va] of Object.entries(ResultDatadevice)) {
            //       var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
            //       var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control; 
            //       var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
            //       const arraydata: any = { 
            //               device_id: ResultDatadevice[key2].device_id,  
            //               type_id: ResultDatadevice[key2].type_id,  
            //               device_name: ResultDatadevice[key2].device_name,  
            //               type_name: ResultDatadevice[key2].type_name, 
            //               timestamp: mqttdata['payload']['timestamp'],
            //               temperature_value: mqttdata['payload']['temperature'],
            //               status_warning: ResultDatadevice[key2].status_warning,
            //               recovery_warning: ResultDatadevice[key2].recovery_warning,
            //               status_alert: ResultDatadevice[key2].status_alert,
            //               recovery_alert: ResultDatadevice[key2].recovery_alert,
            //               time_life: ResultDatadevice[key2].time_life, 
            //               mqtt_data_value: mqtt_data_value,
            //               mqtt_data_control: mqtt_data_control, 
            //               mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
            //               control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
            //               mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
            //               control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
            //               //measurement: ResultDatadevice[key2].measurement,  
            //               location_name: ResultDatadevice[key2].location_name, 
            //               mqtt_name: ResultDatadevice[key2].mqtt_name, 
            //               //mqtt_org: ResultDatadevice[key2].mqtt_org, 
            //               mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
            //               // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment, 
            //               mqtt_dada: mqttdata['payload']['mqtt_dada'],
            //               contRelay1: mqttdata['payload']['contRelay1'],
            //               actRelay1: mqttdata['payload']['actRelay1'],
            //               contRelay2: mqttdata['payload']['contRelay2'],
            //               actRelay2: mqttdata['payload']['actRelay2'],  
            //               /****************************/
            //               fan1: mqttdata['payload']['fan1'],  
            //               overFan1: mqttdata['payload']['overFan1'],  
            //               fan2: mqttdata['payload']['fan2'],  
            //               overFan2: mqttdata['payload']['overFan2'], 
            //               // filter2:filter2,
            //               // mqttdata: mqttdata['payload'],
            //       };  
            //     deviceData.push(arraydata);
            // } 
            /*************************/ 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name,
                 // cache: cache_data,
                 // cache2:cache_data_2,
                  //device: deviceData, 
                  //mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                   sort: Resultate[key].sort,
                  // status: Resultate[key].status, 
            };  
        ArrayData.push(arraydata);
      }   
      res.status(200).json({
            statusCode: 200,
            code: 200, 
            payload: ArrayData, 
            status: 0,
            message: `Mqtt listtitle..`,
            message_th: `Mqtt listtitle..`,
        });
      return;
  } 
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listtitleall')
  async getMqttlistall(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
      ) {

      let filter: any = {};
      // filter.sort = query.sort || 'ASC';
	    // filter.bucket = query.bucket || '';
      // filter.mqtt_type_id = query.mqtt_type_id || '';
      var bucket:any=query.bucket;
      var status:any=query.status;
      if(!status){
        // var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket = bucket;
      var kaycache:any=md5('mqtt_status_listtitle_all_'+status+'_bucket_'+bucket);
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_all_data(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var kaycache_cache:any='mqtt_listtitle_all_bucket_'+Resultate[key].bucket; 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name,
                 // cache: cache_data,
                 // cache2:cache_data_2,
                  //device: deviceData, 
                  //mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                   sort: Resultate[key].sort,
                  // status: Resultate[key].status, 
            };  
        ArrayData.push(arraydata);
      }   
      res.status(200).json({
            statusCode: 200,
            code: 200, 
            payload: ArrayData, 
            status: 0,
            message: `Mqtt listtitle..`,
            message_th: `Mqtt listtitle..`,
        });
      return;
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('getdevice')
  async DeviceDataGet(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
          ) { 
      if(!query.topic){
            res.status(200).json({
                    statuscode: 200,
                    code: 400,
                    payload: null, 
                    message: 'topic is null.',
                    message_th: 'ไม่พบข้อมูล topic ', 
                  });
                return;
      } 
      var deletecache :any= query.deletecache; 
      let filter: any = {};
	    filter.mqtt_data_value = query.topic; 
      console.log(`filter =>` + filter); console.info(filter);
      var mqttdata = await this.mqttService.getdevicedata(query.topic);
     
            var kaycache_cache:any='mqtt_getdevice_topic_'+query.topic; 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultData:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultData){
                var ResultData: any = await this.settingsService.device_lists(filter);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 30,data: ResultData};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 

      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        const arraydata: any = { 
              device_id: ResultData[key].device_id,  
              type_id: ResultData[key].type_id,  
              device_name: ResultData[key].device_name,  
              timestamp: mqttdata['payload']['timestamp'],
              temperature_value: mqttdata['payload']['temperature'],
              status_warning: ResultData[key].status_warning,
              recovery_warning: ResultData[key].recovery_warning,
              status_alert: ResultData[key].status_alert,
              recovery_alert: ResultData[key].recovery_alert,
              time_life: ResultData[key].time_life, 
              mqtt_data_value: ResultData[key].mqtt_data_value,
              mqtt_data_control: ResultData[key].mqtt_data_control, 
              mqtt_control_on: ResultData[key].mqtt_control_on, 
              control_on:'mqtt/control?topic='+ResultData[key].mqtt_data_control+'&message='+ResultData[key].mqtt_control_on,  
              mqtt_control_off: ResultData[key].mqtt_control_off, 
              control_off:'mqtt/control?topic='+ResultData[key].mqtt_data_control+'&message='+ResultData[key].mqtt_control_off,  
              measurement: ResultData[key].measurement, 
              type_name: ResultData[key].type_name, 
              location_name: ResultData[key].location_name, 
              mqtt_name: ResultData[key].mqtt_name, 
              mqtt_org: ResultData[key].mqtt_org, 
              mqtt_bucket: ResultData[key].mqtt_bucket, 
              mqtt_envavorment: ResultData[key].mqtt_envavorment, 
              mqtt_dada: mqttdata['payload']['mqtt_dada'],
              contRelay1: mqttdata['payload']['contRelay1'],
              actRelay1: mqttdata['payload']['actRelay1'],
              contRelay2: mqttdata['payload']['contRelay2'],
              actRelay2: mqttdata['payload']['actRelay2'],  
              fan1: mqttdata['payload']['fan1'],  
              overFan1: mqttdata['payload']['overFan1'],  
              fan2: mqttdata['payload']['fan2'],  
              overFan2: mqttdata['payload']['overFan2'], 
        };  
        tempData2.push(arraydata);
      }   
      var Rsdata:any ={
                      "statusCode":mqttdata['statusCode'], 
                      "code":mqttdata['code'],  
                      "topic":mqttdata['topic'], 
                      "timestamp":mqttdata['payload']['timestamp'], 
                      "data":mqttdata['payload'],
                      "dataFrom":mqttdata['getdataFrom'],
                      "type_name":tempData2['0']['type_name'],
                      "type_id":tempData2['0']['type_id'],
                      "payload":tempData2,
                      "cache2":cache_data_2,
                      //"mqtt":mqttdata,
                    } 
          res.status(200).json(Rsdata);
      return;
  }
  /********************************/  
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('devicecontrol1')
  async device_control1(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) { 
      var topic_mqtt:any= query.topic;
      var message_mqtt:any= query.message;
      try {
          var Rt:any= await this.mqttService.publish(topic_mqtt,message_mqtt); 
          var InpuDatacache: any = {keycache: `${topic_mqtt}`,data: message_mqtt};
          await Cache.SetCacheKey(InpuDatacache); 
          var today:any= format.getDayname();
          var getDaynameall:any= format.getDaynameall(); 
          const now = new Date();  
            const pad = (num) => String(num).padStart(2, '0'); 
            // จัดรูปแบบวันที่ YYYY-MM-DD
            const datePart = [
                now.getFullYear(),
                pad(now.getMonth() + 1), // getMonth() คืนค่า 0-11 เลยต้อง +1
                pad(now.getDate())
            ].join('-'); 
            // จัดรูปแบบเวลา HH:MM:SS
            const timePart = [
                pad(now.getHours()),
                pad(now.getMinutes()),
                pad(now.getSeconds())
            ].join(':');
          // รวมวันที่และเวลาเข้าด้วยกัน
          var timestamp = datePart + ' ' + timePart; 
          const originalTopic = topic_mqtt;
          // แทนที่ 'CONTROL' ด้วย 'DATA'
          const newTopic = originalTopic.replace('CONTROL', 'DATA');
          var topicrs:any='topic_mqtt_'+newTopic; 
          var GetCacheData =  await Cache.GetCacheData(newTopic); 
          if(GetCacheData){ 
              Cache.DeleteCacheData(newTopic); 
          } 
          console.log(newTopic); // ผลลัพธ์: 'BAACTW02/DATA' 
          if(message_mqtt==0){
              var dataObject:any={ 
                                timestamp: timestamp,  
                                device_1: 0, 
                                device_status: 'off', 
                        }; 

          }else if(message_mqtt==1){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_1: 1, 
                                device_status: 'on', 
                        }; 
            
          }else if(message_mqtt==2){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_2: 0, 
                                device_status: 'off', 
                        }; 
            
            
          }else if(message_mqtt==3){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_2: 1, 
                                device_status: 'on', 
                        }; 
          }
          
                var dataRs = await this.mqttService.getDataFromTopic(newTopic); 
                var InpuDatacache: any = {keycache: `${newTopic}`,time: 10,data: dataRs};
                await Cache.SetCacheData(InpuDatacache); 
                var mqttdata =  await Cache.GetCacheData(newTopic); 
                const parts =mqttdata.split(','); 
                const getDataObject:any = { 
                      mqtt_control: topic_mqtt, 
                      mqtt_dada: newTopic, 
                      timestamp: timestamp, 
                      temperature: parseFloat(parts[0]),
                      contRelay1: parseInt(parts[1]),
                      actRelay1: parseInt(parts[2]),
                      fan1: parseInt(parts[3]),
                      overFan1: parseInt(parts[4]),
                      contRelay2: parseInt(parts[5]),
                      actRelay2: parseInt(parts[6]),
                      fan2: parseInt(parts[7]),
                      overFan2: parseInt(parts[8]),
                      data:dataObject,
                      Rt:Rt
                  };
          res.status(200).json({
                statusCode: 200,
                code: 200,
                query: query, 
                payload: getDataObject, 
                mqttdata:mqttdata,
                today:today,
                daynameall:getDaynameall,
                status: 1,
                message: `Topic: ${query.topic} value: ${query.message}`,
                message_th: `Topic: ${query.topic} value: ${query.message}`,
              });
          return;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.REQUEST_TIMEOUT);
    }  
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('devicecontrol')
  async device_control(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) { 
      var topic_mqtt:any= query.topic;
      var message_mqtt:any= query.message;
      try {
          var Rt:any= await this.mqttService.publish(topic_mqtt,message_mqtt); 
          var InpuDatacache: any = {keycache: `${topic_mqtt}`,data: message_mqtt};
          await Cache.SetCacheKey(InpuDatacache); 
          var today:any= format.getDayname();
          var getDaynameall:any= format.getDaynameall(); 
          const now = new Date();  
            const pad = (num) => String(num).padStart(2, '0'); 
            // จัดรูปแบบวันที่ YYYY-MM-DD
            const datePart = [
                now.getFullYear(),
                pad(now.getMonth() + 1), // getMonth() คืนค่า 0-11 เลยต้อง +1
                pad(now.getDate())
            ].join('-'); 
            // จัดรูปแบบเวลา HH:MM:SS
            const timePart = [
                pad(now.getHours()),
                pad(now.getMinutes()),
                pad(now.getSeconds())
            ].join(':');
          // รวมวันที่และเวลาเข้าด้วยกัน
          var timestamp = datePart + ' ' + timePart; 
          const originalTopic = topic_mqtt;
          // แทนที่ 'CONTROL' ด้วย 'DATA'
          const newTopic = originalTopic.replace('CONTROL', 'DATA');
          //var topicrs:any='topic_mqtt_'+newTopic; 
          Cache.DeleteCacheData(newTopic); 
          var GetCacheData =  await Cache.GetCacheData(newTopic); 
          if(GetCacheData){ 
              Cache.DeleteCacheData(newTopic); 
          } 
          var mqttdata =  await Cache.GetCacheData(newTopic); 
          console.log(newTopic); // ผลลัพธ์: 'BAACTW02/DATA' 
          if(message_mqtt==0){
              var dataObject:any={ 
                                timestamp: timestamp,  
                                device_1: 0, 
                                device_status: 'off', 
                        }; 

          }else if(message_mqtt==1){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_1: 1, 
                                device_status: 'on', 
                        }; 
            
          }else if(message_mqtt==2){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_2: 0, 
                                device_status: 'off', 
                        }; 
            
            
          }else if(message_mqtt==3){
            var dataObject:any={ 
                                timestamp: timestamp,  
                                device_2: 1, 
                                device_status: 'on', 
                        }; 
          } 
            var dataRs = await this.mqttService.getDataFromTopic(newTopic);
            const parts =dataRs.split(','); 
            const getDataObject = { 
                mqtt_dada: newTopic, 
                timestamp: timestamp, 
                temperature: parseFloat(parts[0]),
                contRelay1: parseInt(parts[1]),
                actRelay1: parseInt(parts[2]),
                fan1: parseInt(parts[3]),
                overFan1: parseInt(parts[4]),
                contRelay2: parseInt(parts[5]),
                actRelay2: parseInt(parts[6]),
                fan2: parseInt(parts[7]),
                overFan2: parseInt(parts[8])
            }; 
            var InpuDatacache: any = {keycache: `${newTopic}`,time: 10,data: getDataObject};
            await Cache.SetCacheData(InpuDatacache); 
          res.status(200).json({
                statusCode: 200,
                code: 200,
                query: query, 
                Rt: Rt, 
                dataRs: dataRs, 
                dataObject: dataObject, 
                mqttdata:mqttdata,
                today:today,
                payload:getDataObject,
                daynameall:getDaynameall,
                mqtt_data_control: topic_mqtt,  
                mqtt_dada_get: newTopic, 
                status: message_mqtt,
                status_msg: dataObject['device_status'],
                message: `Topic: ${query.topic} value: ${query.message}`,
                message_th: `Topic: ${query.topic} value: ${query.message}`,
              });
          return;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.REQUEST_TIMEOUT);
    }  
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('getdevice')
  async getDeviceData(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
      ) {
    const topic:any =  query.topic;
    const deletecache:any =  query.deletecache;
    if(!topic){
       res.status(200).json({
            statusCode: 200,
            code: 200,
            query: query,
            payload: [], 
            status: 0,
            message: `Please specify topic..`,
            message_th: `กรุณาระบุ topic..`,
          });
      return;
    }
    if (!topic) {
      throw new HttpException('Topic is required', HttpStatus.BAD_REQUEST);
    }
    try {
        const now = new Date();  
        const pad = (num) => String(num).padStart(2, '0'); 
        // จัดรูปแบบวันที่ YYYY-MM-DD
        const datePart = [
            now.getFullYear(),
            pad(now.getMonth() + 1), // getMonth() คืนค่า 0-11 เลยต้อง +1
            pad(now.getDate())
        ].join('-'); 
        // จัดรูปแบบเวลา HH:MM:SS
        const timePart = [
            pad(now.getHours()),
            pad(now.getMinutes()),
            pad(now.getSeconds())
        ].join(':');
      // รวมวันที่และเวลาเข้าด้วยกัน
      var timestamp = datePart + ' ' + timePart; 
      // var tzString = process.env.tzString;
     // formatInTimeZone(date, tzString, 'yyyy-MM-dd HH:mm:ssXXX') 
       console.log(`Requesting data from topic: ${topic}`);
       if(deletecache==1){
        await Cache.DeleteCacheData(topic); 
       }
      var data:any =  await Cache.GetCacheData(topic); 
         if (data) { 
             var dataObject:any = data;
             var getdataFrom = 'Cache';
        }else if (!data) { 
            var data = await this.mqttService.getDataFromTopic(topic);
            if (!data) {  
                  var dataObjects:any={
                            // เพิ่ม timestamp เป็น field แรก
                            timestamp: timestamp, 
                            temperature: [],
                            contRelay1: [],
                            actRelay1: [],
                            fan1: [],
                            overFan1: [],
                            contRelay2: [],
                            actRelay2: [],
                            fan2: [],
                            overFan2: []
                    }; 
                    res.status(200).json({
                        statusCode: 200,
                        code: 200,
                        query: query,
                        payload: dataObjects, 
                        mqttdata: {},    
                        status: 0,
                        message: `Please specify topic..`,
                        message_th: `กรุณาระบุ topic..`,
                      });
                  return;
            }
          //  var InpuDatacache: any = {keycache: `${topic}`,time: 10,data: data};
          //  await Cache.SetCacheData(InpuDatacache); 
           var getdataFrom = 'MQTT';
            var mqttdata = await this.mqttService.getDataFromTopic(topic);
            const parts =mqttdata.split(','); 
            const dataObject = {
                // เพิ่ม timestamp เป็น field แรก
                mqtt_dada: topic, 
                timestamp: timestamp, 
                temperature: parseFloat(parts[0]),
                contRelay1: parseInt(parts[1]),
                actRelay1: parseInt(parts[2]),
                fan1: parseInt(parts[3]),
                overFan1: parseInt(parts[4]),
                contRelay2: parseInt(parts[5]),
                actRelay2: parseInt(parts[6]),
                fan2: parseInt(parts[7]),
                overFan2: parseInt(parts[8])
            }; 
            var InpuDatacache: any = {keycache: `${topic}`,time: 5,data: dataObject};
            await Cache.SetCacheData(InpuDatacache); 
        } 
        res.status(200).json({
                  statusCode: 200,
                  code: 200,
                  query: query,
                  topic: topic,  
                  payload: dataObject,  
                  mqttdata: mqttdata,   
                  getdataFrom:getdataFrom,
                  status: 1,
                  message: `Message successfully Get to topic: ${query.topic}`,
                  message_th: `Message successfully Get to topic: ${query.topic}`,
                });
      return; 
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.REQUEST_TIMEOUT);
    }
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('device')
  async DeviceData(@Res() res: Response, 
                      @Body() dto: any,
                      @Query() query: any,
                      @Headers() headers: any,
                      @Req() req: any,
          ) { 
      if(!query.topic){
            res.status(200).json({
                    statuscode: 200,
                    code: 400,
                    payload: null, 
                    message: 'topic is null.',
                    message_th: 'ไม่พบข้อมูล topic ', 
                  });
                return;
      } 
      const deletecache:any =  query.deletecache;
      let filter: any = {};
	    filter.mqtt_data_value = query.topic; 
      console.log(`filter =>` + filter); console.info(filter);
      var mqttdata = await this.mqttService.getdevicedata(query.topic);
      // var ResultData: any = await this.settingsService.device_lists(filter);

      /***************************************/
      var kaycache1:any='get_device_'+md5(query.topic);
      if(deletecache==1){
            await Cache.DeleteCacheData(kaycache1); 
      }
      var ResultData:any =  await Cache.GetCacheData(kaycache1); 
      if(!ResultData){
              var ResultData: any = await this.settingsService.device_lists(filter); 
              var InpuDatacache: any = {keycache: `${kaycache1}`,time: 5,data: ResultData};
              await Cache.SetCacheData(InpuDatacache); 
              var cache_data:any='no cache'; 
      }else{
              var cache_data:any='cache'; 
      } 
      /***************************************/

      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        const arraydata: any = { 
              device_id: ResultData[key].device_id,  
              type_id: ResultData[key].type_id,  
              device_name: ResultData[key].device_name,  
              type_name: ResultData[key].type_name, 
              location_name: ResultData[key].location_name, 
              timestamp: mqttdata['payload']['timestamp'],
              temperature_value: mqttdata['payload']['temperature'],
              status_warning: ResultData[key].status_warning,
              recovery_warning: ResultData[key].recovery_warning,
              status_alert: ResultData[key].status_alert,
              recovery_alert: ResultData[key].recovery_alert,
              time_life: ResultData[key].time_life, 
              mqtt_data_value: ResultData[key].mqtt_data_value,
              mqtt_data_control: ResultData[key].mqtt_data_control, 
              mqtt_control_on: ResultData[key].mqtt_control_on, 
              control_on:'mqtt/control?topic='+ResultData[key].mqtt_data_control+'&message='+ResultData[key].mqtt_control_on,  
              mqtt_control_off: ResultData[key].mqtt_control_off, 
              control_off:'mqtt/control?topic='+ResultData[key].mqtt_data_control+'&message='+ResultData[key].mqtt_control_off,  
              measurement: ResultData[key].measurement, 
              mqtt_name: ResultData[key].mqtt_name, 
              mqtt_org: ResultData[key].mqtt_org, 
              mqtt_bucket: ResultData[key].mqtt_bucket, 
              mqtt_envavorment: ResultData[key].mqtt_envavorment, 
              mqtt_dada: mqttdata['payload']['mqtt_dada'],
              contRelay1: mqttdata['payload']['contRelay1'],
              actRelay1: mqttdata['payload']['actRelay1'],
              contRelay2: mqttdata['payload']['contRelay2'],
              actRelay2: mqttdata['payload']['actRelay2'],  
              fan1: mqttdata['payload']['fan1'],  
              overFan1: mqttdata['payload']['overFan1'],  
              fan2: mqttdata['payload']['fan2'],  
              overFan2: mqttdata['payload']['overFan2'], 
        };  
        tempData2.push(arraydata);
      } 
      //http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1

      var Rsdata:any ={
                      "statusCode":mqttdata['statusCode'], 
                      "code":mqttdata['code'],  
                      "topic":mqttdata['topic'], 
                      "timestamp":mqttdata['payload']['timestamp'], 
                      "data":mqttdata['payload'],
                      "dataFrom":mqttdata['getdataFrom'],
                      "payload":tempData2,
                      //"mqtt":mqttdata,
                    } 
          res.status(200).json(Rsdata);
      return;
  }
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=3
  // http://172.25.99.60:3003/v1/mqtt/control?topic=BAACTW02%2FCONTROL&message=2
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('control')
  async device_control_data(
          @Res() res: Response, 
          @Body() dto: any,
          @Query() query: any,
          @Headers() headers: any,
          @Param() params: any,
          @Req() req: any,
        ) { 
        var topic:any= query.topic;
        var message:any= query.message;
         if(topic==''){
            res.status(200).json({
                statuscode: 200,
                code: 200,
                message: 'topic  is null',
                message_th: 'topic  is null',
                satatus: 0,
                payload: {},
              });
          return;
        }  if(message==''){
            res.status(200).json({
                statuscode: 200,
                code: 200,
                message: 'message  is null',
                message_th: 'message  is null',
                satatus: 0,
                payload: {},
              });
          return;
        } 
        var topic_send:any =encodeURI(topic); 
        var message_send:any =encodeURI(message); 
        var data = await this.mqttService.devicecontrol(topic_send,message_send);
        res.status(200).json(data);
      return;
  }
  // http://localhost:3003/v1/mqtt/getdata?topic=BAACTW02/DATA
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('getdata')
  async device_get_data(
          @Res() res: Response, 
          @Body() dto: any,
          @Query() query: any,
          @Headers() headers: any,
          @Param() params: any,
          @Req() req: any,
        ) { 
        var topic:any= query.topic;
        var message:any= query.message;
        if(!topic){
            res.status(200).json({
                statuscode: 200,
                code: 200,
                message: 'topic  is null',
                message_th: 'topic  is null',
                satatus: 0,
                payload: {},
              });
          return;
        } 
        var data = await this.mqttService.getDataFromTopic(topic);
        var parts:any=data.split(',');  
        res.status(200).json({
                statuscode: 200,
                code: 200,
                message: 'mqtt topic '+topic,
                message_th: 'mqtt topic '+topic,
                payload: {data:data,parts:parts},
              });
      return;
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('sensercharts')
  async sensercharts(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    const start: any = query.start || '-8m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '8m'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    if(!bucket){
          res.status(200).json({
              statuscode: 200,
              code: 200,
              message: 'Bucket  is null',
              message_th: 'Bucket  is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '8m';
    const limit: any = query.limit || 1200;
    const offset: any = query.offset || 0;
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    // var data: any = await this.IotService.influxdbFilterData(Dtos);
    var deletecache:any=query.deletecache; 
    /***************************************/
    var kaycache1:any='get_start_to_end_v1_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache1); 
    }
    var data:any =  await Cache.GetCacheData(kaycache1); 
    if(!data){
            var data: any = await this.IotService.influxdbFilterData(Dtos);
            var InpuDatacache: any = {keycache: `${kaycache1}`,time: 30,data: data};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/


    //let data: any =await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
   // let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
   /***************************************/
    var kaycache2:any='get_start_to_end_v2_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 30,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    // if(!data1){
    //         var data1: any = await this.IotService.influxdbFilterchart1(Dtos2); 
    // }
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='get_start_to_end_v3_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 30,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/
    if (!data) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        //, query:query
        field: field,
        payload: {
          // "bucket": bucket,
          // "result": "now",
          // "table": 0,
          // "start": "2025-01-00:00:00:00",
          // "stop": "2025-01-00:00:00:00",
          time: '2025-01-00:00:00:00',
          value: 0,
          field: field,
          // "measurement": measurement
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        //, query:query
        bucket: data[0].bucket,
        field: data[0].field,
        payload: data[0],
        chart: { data: data1, date: data2 },
        name: data[0].field,
        cache:cache_data,
      });
      return;
    }
  }
 /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('senserchart')
  async senserchart(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    const start: any = query.start || '-1m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    if(!bucket){
          res.status(200).json({
              statuscode: 200,
              code: 200,
              message: 'Bucket  is null',
              message_th: 'Bucket  is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '1m';
    const limit: any = query.limit || 20;
    const offset: any = query.offset || 0;
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    // var data: any = await this.IotService.influxdbFilterData(Dtos);
    var deletecache:any=query.deletecache; 
    /***************************************/
    var kaycache1:any='get_startend_v1_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache1); 
    }
    var data:any =  await Cache.GetCacheData(kaycache1); 
    if(!data){
            var data: any = await this.IotService.influxdbFilterData(Dtos);
            var InpuDatacache: any = {keycache: `${kaycache1}`,time: 30,data: data};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/


    //let data: any =await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
   // let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
   /***************************************/
    var kaycache2:any='get_startend_v2_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 30,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    }  
    // if(!data1){
    //         var data1: any = await this.IotService.influxdbFilterchart1(Dtos2); 
    // }
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='get_startend_v3_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 30,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/
    if (!data) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        //, query:query
        field: field,
        payload: {
          // "bucket": bucket,
          // "result": "now",
          // "table": 0,
          // "start": "2025-01-00:00:00:00",
          // "stop": "2025-01-00:00:00:00",
          time: '2025-01-00:00:00:00',
          value: 0,
          field: field,
          // "measurement": measurement
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        //, query:query
        bucket: data[0].bucket,
        field: data[0].field,
        payload: data[0],
        chart: { data: data1, date: data2 },
        name: data[0].field,
        cache:cache_data,
      });
      return;
    }
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('mqttsenserchart22')
  async mqttsenserchart22(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    const start: any = query.start || '-2m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    if(Resultate==""){ 
          res.status(200).json({
              statuscode: 200,
              code: 404,
              message: 'Bucket data is null',
              message_th: 'Bucket data is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    /*******************/
      let filter: any = {};
      var status:any=query.status;
      bucket
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket=bucket;
      var Resultate:any= await this.mqttService.mqtt_list_paginate_active(filter);
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
            /***************/
            let deviceData = [];
                for (const [key2, va] of Object.entries(ResultDatadevice)) {
                  var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
                  var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control; 
                  var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                  const arraydata: any = { 
                          device_id: ResultDatadevice[key2].device_id,  
                          type_id: ResultDatadevice[key2].type_id,  
                          device_name: ResultDatadevice[key2].device_name,  
                          type_name: ResultDatadevice[key2].type_name, 
                          timestamp: mqttdata['payload']['timestamp'],
                          temperature_value: mqttdata['payload']['temperature'],
                          status_warning: ResultDatadevice[key2].status_warning,
                          recovery_warning: ResultDatadevice[key2].recovery_warning,
                          status_alert: ResultDatadevice[key2].status_alert,
                          recovery_alert: ResultDatadevice[key2].recovery_alert,
                          time_life: ResultDatadevice[key2].time_life, 
                          mqtt_data_value: mqtt_data_value,
                          mqtt_data_control: mqtt_data_control, 
                          mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
                          control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
                          mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
                          control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
                          //measurement: ResultDatadevice[key2].measurement,  
                          location_name: ResultDatadevice[key2].location_name, 
                          mqtt_name: ResultDatadevice[key2].mqtt_name, 
                          //mqtt_org: ResultDatadevice[key2].mqtt_org, 
                          mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
                          // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment, 
                          mqtt_dada: mqttdata['payload']['mqtt_dada'],
                          contRelay1: mqttdata['payload']['contRelay1'],
                          actRelay1: mqttdata['payload']['actRelay1'],
                          contRelay2: mqttdata['payload']['contRelay2'],
                          actRelay2: mqttdata['payload']['actRelay2'],  
                          /****************************/
                          fan1: mqttdata['payload']['fan1'],  
                          overFan1: mqttdata['payload']['overFan1'],  
                          fan2: mqttdata['payload']['fan2'],  
                          overFan2: mqttdata['payload']['overFan2'], 
                          // filter2:filter2,
                          // mqttdata: mqttdata['payload'],
                  };  
                deviceData.push(arraydata);
            } 
            /*************************/ 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name, 
                  device: deviceData, 
                  mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                  // sort: Resultate[key].sort,
                  status: Resultate[key].status, 
            };  
        ArrayData.push(arraydata);
      }   

    /******************/
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '2m';
    const limit: any = query.limit || 50;
    const offset: any = query.offset || 0;
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos); 
    var data: any = await this.IotService.influxdbFilterData(Dtos);
    /***************************************/


    //let data: any =await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
   // let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
   /***************************************/
    var kaycache2:any='get_mqtt_senser_chart_v2_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 30,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    }  
    // if(!data1){
    //         var data1: any = await this.IotService.influxdbFilterchart1(Dtos2); 
    // }
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='get_mqtt_senser_chart_v3_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 30,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/
    if (!data) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        //, query:query
        field: field,
        payload: {
          // "bucket": bucket,
          // "result": "now",
          // "table": 0,
          // "start": "2025-01-00:00:00:00",
          // "stop": "2025-01-00:00:00:00",
          time: '2025-01-00:00:00:00',
          value: 0,
          field: field,
          // "measurement": measurement
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        //, query:query
        bucket: data[0].bucket,
        field: data[0].field,
        payload: data[0],
        chart: { data: data1, date: data2 },
        name: data[0].field,
        cache:cache_data,
        datamqtt:ArrayData,
        //mqtt_name
        mqtt_name:ArrayData['0']['mqtt_name'],
        org:ArrayData['0']['org'], 
        mqtt:ArrayData['0']['mqtt'],
      });
      return;
    }
  }
  /********************************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('mqttsenserchart')
  async mqttsenserchartcache(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    const start: any = query.start || '-2m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    if(!bucket){
          res.status(200).json({
              statuscode: 200,
              code: 200,
              message: 'Bucket  is null',
              message_th: 'Bucket  is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    /*******************/
      let filter: any = {};
      var status:any=query.status;
      bucket
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket=bucket;
      var kaycache:any='mqtt_senser_chart_status_fan_'+status+'_bucket_'+bucket;
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_active_fan(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      if(Resultate==""){ 
          res.status(200).json({
              statuscode: 200,
              code: 404,
              message: 'Bucket data is null',
              message_th: 'Bucket data is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
      let ArrayData = [];
      for (const [key, va] of Object.entries(Resultate)) {
            /****************************/
            let filter2: any = {};
            filter2.bucket = Resultate[key].bucket; 
            console.log(`filter2 =>` + filter2); console.info(filter2);
            var kaycache_cache:any='mqtt_bucket_fan_'+Resultate[key].bucket; 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filter2);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            }
            /***************/
            let deviceData = [];
                for (const [key2, va] of Object.entries(ResultDatadevice)) {
                  var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
                  var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control; 
                  var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                  const arraydata: any = { 
                          device_id: ResultDatadevice[key2].device_id,  
                          type_id: ResultDatadevice[key2].type_id,  
                          device_name: ResultDatadevice[key2].device_name,  
                          type_name: ResultDatadevice[key2].type_name, 
                          timestamp: mqttdata['payload']['timestamp'],
                          temperature_value: mqttdata['payload']['temperature'],
                          status_warning: ResultDatadevice[key2].status_warning,
                          recovery_warning: ResultDatadevice[key2].recovery_warning,
                          status_alert: ResultDatadevice[key2].status_alert,
                          recovery_alert: ResultDatadevice[key2].recovery_alert,
                          time_life: ResultDatadevice[key2].time_life, 
                          mqtt_data_value: mqtt_data_value,
                          mqtt_data_control: mqtt_data_control, 
                          mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
                          control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
                          mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
                          control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
                          //measurement: ResultDatadevice[key2].measurement,  
                          location_name: ResultDatadevice[key2].location_name, 
                          mqtt_name: ResultDatadevice[key2].mqtt_name, 
                          //mqtt_org: ResultDatadevice[key2].mqtt_org, 
                          mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
                          // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment, 
                          mqtt_dada: mqttdata['payload']['mqtt_dada'],
                          contRelay1: mqttdata['payload']['contRelay1'],
                          actRelay1: mqttdata['payload']['actRelay1'],
                          contRelay2: mqttdata['payload']['contRelay2'],
                          actRelay2: mqttdata['payload']['actRelay2'],  
                          /****************************/
                          fan1: mqttdata['payload']['fan1'],  
                          overFan1: mqttdata['payload']['overFan1'],  
                          fan2: mqttdata['payload']['fan2'],  
                          overFan2: mqttdata['payload']['overFan2'], 
                          // filter2:filter2,
                          // mqttdata: mqttdata['payload'],
                  };  
                deviceData.push(arraydata);
            } 
            /*************************/ 
            const arraydata: any = { 
                  mqtt_id: Resultate[key].mqtt_id,  
                  mqtt_name: Resultate[key].mqtt_name,
                  cache: cache_data,
                  cache2:cache_data_2,
                  device: deviceData, 
                  mqtt: mqttdata['payload'], 
                  // mqtt_type_id: Resultate[key].mqtt_type_id,
                  // type_name: Resultate[key].type_name, 
                  org: Resultate[key].org,
                  bucket: Resultate[key].bucket, 
                  // envavorment: Resultate[key].envavorment, 
                  // sort: Resultate[key].sort,
                  status: Resultate[key].status, 
            };  
        ArrayData.push(arraydata);
      }   

    /******************/
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '2m';
    const limit: any = query.limit || 120;
    const offset: any = query.offset || 0;
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    // var data: any = await this.IotService.influxdbFilterData(Dtos);
    var deletecache:any=query.deletecache; 
    /***************************************/
    var kaycache1:any='get_mqtt_senser_chart_v1_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache1); 
    }
    var data:any =  await Cache.GetCacheData(kaycache1); 
    if(!data){
            var data: any = await this.IotService.influxdbFilterData(Dtos);
            var InpuDatacache: any = {keycache: `${kaycache1}`,time: 30,data: data};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/


    //let data: any =await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
   // let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
   /***************************************/
    var kaycache2:any='get_mqtt_senser_chart_v2_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 30,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    }  
    // if(!data1){
    //         var data1: any = await this.IotService.influxdbFilterchart1(Dtos2); 
    // }
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='get_mqtt_senser_chart_v3_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 30,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/
    if (!data) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        //, query:query
        field: field,
        payload: {
          // "bucket": bucket,
          // "result": "now",
          // "table": 0,
          // "start": "2025-01-00:00:00:00",
          // "stop": "2025-01-00:00:00:00",
          time: '2025-01-00:00:00:00',
          value: 0,
          field: field,
          // "measurement": measurement
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        //, query:query
        bucket: data[0].bucket,
        field: data[0].field,
        payload: data[0],
        chart: { data: data1, date: data2 },
        name: data[0].field,
        cache:cache_data,
        datamqtt:ArrayData,
        //mqtt_name
        mqtt_name:ArrayData['0']['mqtt_name'],
        org:ArrayData['0']['org'], 
        mqtt:ArrayData['0']['mqtt'],
      });
      return;
    }
  }
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
 //@AuthUserRequired()
  @Get('mqttsenserchartv2')
  async mqttsenserchartcachev2(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    const start: any = query.start || '-2m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    if(!bucket){
          res.status(200).json({
              statuscode: 200,
              code: 200,
              message: 'Bucket  is null',
              message_th: 'Bucket  is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    /*******************/
      let filter: any = {};
      var status:any=query.status;
      if(!status){
         var status:any=1;
      }
      var deletecache:any=query.deletecache;
      filter.status = status;
      filter.bucket=bucket;
      var kaycache:any='mqtt_sensers_chartv2_status_'+status+'_bucket_'+bucket;
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
       }
      var Resultate:any =  await Cache.GetCacheData(kaycache); 
      if(!Resultate){
          var Resultate:any= await this.mqttService.mqtt_list_paginate_active(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: Resultate};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      console.log('Resultate=>');
      console.info(Resultate);
      if(Resultate==""){ 
          res.status(200).json({
              statuscode: 200,
              code: 404,
              message: 'Bucket data is null',
              message_th: 'Bucket data is null',
              satatus: 0,
              payload: {},
            });
        return;
    } 
    var buckets:any=Resultate['0']['bucket'];
    /****************************/
            let filters: any = {};
            filters.bucket = buckets; 
            console.log(`filter2 =>` + filters); console.info(filters);
            var kaycache_cache:any='mqtt_sensers_v2_bucket_'+buckets; 
            if(deletecache==1){
                await Cache.DeleteCacheData(kaycache_cache); 
            }
            var ResultDatadevice:any =  await Cache.GetCacheData(kaycache_cache); 
            if(!ResultDatadevice){
                var ResultDatadevice: any = await this.settingsService.device_lists(filters);
                var InpuDatacache: any = {keycache: `${kaycache_cache}`,time: 120,data: ResultDatadevice};
                await Cache.SetCacheData(InpuDatacache); 
                var cache_data_2:any='no cache'; 
            }else{
                var cache_data_2:any='cache'; 
            } 
    /****************************/
    var mqtt_data_value:any=ResultDatadevice['0'].mqtt_data_value; 
    var mqtt_data_control:any=ResultDatadevice['0'].mqtt_data_control; 
    var location_id:any=ResultDatadevice['0'].location_id; 
    var location_name:any=ResultDatadevice['0'].location_name; 
    /****************************/
    var mqttrs :any=  await this.mqttService.getdevicedataAll(mqtt_data_value); 
    var mqtt_data :any= mqttrs['data'];
    var mqtt_timestamp:any= mqttrs['timestamp'];
    var mqtt_topic:any= mqttrs['topic'];
    /****************************/ 
    var configdata:any=ResultDatadevice['0'].configdata;  
    var obj:any = [];
    try {
        var obj:any = JSON.parse(configdata);
    } catch (e) {
      //console.error("Failed to parse JSON:", configdata);
      throw e;
    } 
    var mqtt_objt_data = Object.values(obj);
    /***********************/
    const result_mqtt = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]]));
    console.log(result_mqtt);
    /********************/
    
    /******************/
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '2m';
    const limit: any = query.limit || 120;
    const offset: any = query.offset || 0;
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    // var data: any = await this.IotService.influxdbFilterData(Dtos);
    var deletecache:any=query.deletecache; 
    /***************************************/
    var kaycache1:any='get_mqttData_chart_v1_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache1); 
    }
    var data:any =  await Cache.GetCacheData(kaycache1); 
    if(!data){
            var data: any = await this.IotService.influxdbFilterData(Dtos);
            var InpuDatacache: any = {keycache: `${kaycache1}`,time: 30,data: data};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/


    //let data: any =await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      bucket: bucket,
      measurement: measurement,
      field: field,
      time: time,
      limit: limit,
      offset: offset,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
   // let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
   /***************************************/
    var kaycache2:any='get_mqttData_chart_v2_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 30,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    }  
    // if(!data1){
    //         var data1: any = await this.IotService.influxdbFilterchart1(Dtos2); 
    // }
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='get_mqttData_chart_v3_'+start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean;
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 30,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    
    
        var deviceData = [];
        /////////////////////////////////////////////////
        for (const [key2, va] of Object.entries(ResultDatadevice)) {
                      var mqtt_data_value:any=ResultDatadevice[key2].mqtt_data_value; 
                      var mqtt_data_control:any=ResultDatadevice[key2].mqtt_data_control;  
                      const arraydata: any = { 
                              /*  
                                        sn 
                                        period
                                        work_status 
                                        model
                                        vendor
                                        comparevalue
                                        unit
                                        mqtt_id
                                        oid
                                        action_id
                                        status_alert_id 
                                        org
                                        bucket 
                              */
                              device_id: ResultDatadevice[key2].device_id,  
                              location_id: ResultDatadevice[key2].location_id,  
                              setting_id: ResultDatadevice[key2].setting_id,  
                              type_id: ResultDatadevice[key2].type_id,  
                              device_name: ResultDatadevice[key2].device_name,  
                              type_name: ResultDatadevice[key2].type_name, 
                              status_warning: ResultDatadevice[key2].status_warning,
                              recovery_warning: ResultDatadevice[key2].recovery_warning,
                              status_alert: ResultDatadevice[key2].status_alert,
                              recovery_alert: ResultDatadevice[key2].recovery_alert,
                              status: ResultDatadevice[key2].status,
                              max: ResultDatadevice[key2].max,
                              min: ResultDatadevice[key2].min,
                              hardware_id: ResultDatadevice[key2].hardware_id,
                              comparevalue: ResultDatadevice[key2].comparevalue,
                              unit: ResultDatadevice[key2].unit, 
                              measurement: ResultDatadevice[key2].measurement, 
                              time_life: ResultDatadevice[key2].time_life, 
                              mqtt_data_value: mqtt_data_value,
                              mqtt_data_control: mqtt_data_control, 
                              mqtt_control_on: ResultDatadevice[key2].mqtt_control_on, 
                              control_on:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_on,  
                              mqtt_control_off: ResultDatadevice[key2].mqtt_control_off, 
                              control_off:'mqtt/control?topic='+ResultDatadevice[key2].mqtt_data_control+'&message='+ResultDatadevice[key2].mqtt_control_off,  
                              location_name: ResultDatadevice[key2].location_name, 
                              mqtt_name: ResultDatadevice[key2].mqtt_name, 
                              //mqtt_org: ResultDatadevice[key2].mqtt_org, 
                              mqtt_bucket: ResultDatadevice[key2].mqtt_bucket, 
                              // mqtt_envavorment: ResultDatadevice[key2].mqtt_envavorment,  
                              timestamp: mqtt_timestamp,
                              mqtt_device_name: ResultDatadevice[key2].mqtt_device_name, 
                              mqtt_status_over_name: ResultDatadevice[key2].mqtt_status_over_name, 
                              mqtt_status_data_name: ResultDatadevice[key2].mqtt_status_data_name, 
                              mqtt_act_relay_name: ResultDatadevice[key2].mqtt_act_relay_name, 
                              mqtt_control_relay_name: ResultDatadevice[key2].mqtt_control_relay_name,  
                              value_data: ResultDatadevice[key2].mqtt_device_name,  
                              value_alarm: ResultDatadevice[key2].mqtt_status_over_name, 
                              value_relay: ResultDatadevice[key2].mqtt_act_relay_name, 
                              value_control_relay: ResultDatadevice[key2].mqtt_control_relay_name,  
                      };  
                    deviceData.push(arraydata);
        } 
        /////////////////////////////////////////////////
        const mergedData = format.mapMqttDataToDevices(deviceData,result_mqtt); 
        // รวมข้อมูลแต่ละ index เข้าด้วยกัน
        const combinedArray = mergedData.map((data, index) => ({
            ...deviceData[index],
            ...data
        }));
        res.status(200).json({ 
                        code: 200,    
                        location_id:location_id, 
                        location_name:location_name, 
                        // configdata:configdata,  
                        // mqtt_data:mqtt_data,
                        // mqtt_objt_data:mqtt_objt_data, 
                        // devices:ResultDatadevice, 
                        // mergedData:mergedData,
                        bucket:buckets, 
                        mqtt_topic:mqtt_topic, 
                        timestamp:mqtt_timestamp, 
                        mqtt:result_mqtt,   
                        device:combinedArray,
                        mqtt_name:Resultate[0]['mqtt_name'], 
                        org:Resultate[0]['org'], 
                        Resultate:Resultate, 
                        mqtt_data_value:mqtt_data_value, 
                        mqtt_data_control:mqtt_data_control, 
                        field: data[0].field,
                        payload: data[0],  
                        chart: { data: data1, date: data2 },
        });
        return;
  }
  /***********************/
  @HttpCode(200)
  //@AuthUserRequired()
  @Get('listdevicepageactive')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_actives(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      var device_id = query.device_id || '';
      var page = Number(query.page) || 1;
      var pageSize = Number(query.pageSize) || 1000;
      var sort = query.sort;
      var keyword = query.keyword || '';
      // สร้าง filter สำหรับนับจำนวนข้อมูล
      var filter = {
        sort,
        device_id,
        mqtt_id: query.mqtt_id || '',
        type_id: query.type_id || '',
        org: query.org || '',
        bucket: query.bucket || '',
        keyword,
        type_name: query.type_name || '',
        host: query.host || '',
        port: query.port || '',
        password: query.password || '',
        createddate: query.date || '',
        isCount: 1,
      };
      var deletecache = query.deletecache;
      var filtercache:any =encodeURI(sort+device_id+query.mqtt_id+query.type_id+query.org+query.bucket+keyword+query.type_name+query.host+query.port+query.password+query.date+'isCount1'); 
      var filterkeymd5:any=md5(filtercache);
      var kaycache:any='mqtt_listdevicepageactive_'+filterkeymd5;
      if(deletecache==1){
        await Cache.DeleteCacheData(kaycache); 
      }
      var rowResultData:any =  await Cache.GetCacheData(kaycache); 
      if(!rowResultData){
          var rowResultData: any = await this.settingsService.device_list_paginate_active(filter);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: rowResultData};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      if (rowResultData === "" || !rowResultData || rowResultData.status === '422') {
        res.status(200).json({
          statuscode: 200,
          code: 400,
          payload: null,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล',
        });
        return;
      }
      var rowData = Number(rowResultData);
      var totalPages = Math.max(Math.ceil(rowData / pageSize), 1);
      // filter สำหรับดึงข้อมูลหน้า
      var filter2 = {
        ...filter,
        isCount: 0,
        page,
        pageSize,
      };
      var filter2cache:any =encodeURI(page+pageSize+sort+device_id+query.mqtt_id+query.type_id+query.org+query.bucket+keyword+query.type_name+query.host+query.port+query.password+query.date+'isCount0'); 
      var filter2keymd5:any=md5(filter2cache);
      var ResultData:any =  await Cache.GetCacheData(filter2keymd5); 
      if(!ResultData){
          var ResultData: any = await this.settingsService.device_list_paginate_active(filter2);
          var InpuDatacache: any = {keycache: `${kaycache}`,time: 120,data: ResultData};
          await Cache.SetCacheData(InpuDatacache); 
          var cache_data:any='no cache'; 
      }else{
          var cache_data:any='cache'; 
      } 
      var tempData2 = []; 
      for (var va of ResultData) {
        var mqtt_data_value = va.mqtt_data_value;
        var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
        var mqtt_data = mqttrs['data'];
        var mqtt_timestamp = mqttrs['timestamp'];
        var timestamp = mqttrs['timestamp'];
        var configdata = va.configdata;
        var mqttrs_count:any=mqtt_data.length; 
        let obj: any = [];
        try {
          obj = JSON.parse(configdata);
        } catch (e) {
          throw e;
        }  
        var mqtt_objt_data = Object.values(obj);
        var mqtt_count:any=mqtt_objt_data.length;
        var mqtt_status_data_name = va.mqtt_status_data_name;
         let obj2: any = [];
        try {
          obj2 = JSON.parse(mqtt_status_data_name);
        } catch (e) {
          throw e;
        }  
        var mqtt_obj2_data = Object.values(obj2);
        var mqtt2_count:any=mqtt_obj2_data.length;
        var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
        console.log('mqtt_v1=>'+mqtt_v1); // Output: 10
        var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
        console.log('mqtt_v2=>'+mqtt_v2); // Output: 10
        // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
       if(mqttrs_count<mqtt_count){
          var mqtt:any=mqtt_v1; 
       }else{
          var mqtt:any=mqtt_v2; 
       }
        var merged = format.mapMqttDataToDeviceV2([va], mqtt)[0];
        tempData2.push({
          ...va,
          ...merged, 
          timestamp,
          mqttrs, 
          mqttrs_count, 
          mqtt_v1,
          mqtt_count,
          mqtt_v2, 
          mqtt, 
        });
      }
      var configdata:any=ResultData['0'].configdata; 
      var mqtt_data:any=ResultData['0'].mqtt_data_value;
      var mqttrss:any = await this.mqttService.getdevicedataAll(mqtt_data);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
          page,
          currentPage: page,
          pageSize,
          totalPages,
          total: rowData,
          //mqtt:mqttrss,
          mqttrs:tempData2['0']['data'],
          //configdata:configdata, 
          //filter: filter2, 
          data: tempData2,
        },
        message: 'v2 list device success.',
        message_th: 'v2 lists device success.',
      });
  }
}
