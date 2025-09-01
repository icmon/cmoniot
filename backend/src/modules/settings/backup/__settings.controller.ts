import {
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
} from '@nestjs/common';
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
import { AuthService } from '@src/modules/auth/auth.service';
import { UsersService } from '@src/modules/users/users.service';
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
import { SettingsService } from '@src/modules/settings/settings.service';
import { CreateSettingDto } from '@src/modules/settings/dto/create-setting.dto';
import { UpdateSettingDto } from '@src/modules/settings/dto/update-setting.dto';
import { CreateLocationDto } from '@src/modules/settings/dto/create-location.dto';
import { CreateTypeDto } from '@src/modules/settings/dto/create_type.dto';
import { CreateSensorDto } from '@src/modules/settings/dto/create_sensor.dto';
import { CreateGroupDto } from '@src/modules/settings/dto/create_group.dto';
import { CreateMqttDto } from '@src/modules/settings/dto/create_mqtt.dto';
import { ApiDto } from '@src/modules/settings/dto/create_api.dto';
import { DeviceDto } from '@src/modules/settings/dto/create_device.dto';
import { EmailDto } from '@src/modules/settings/dto/create_email.dto';
import { HostDto } from '@src/modules/settings/dto/create_host.dto';
import { InfluxdbDto } from '@src/modules/settings/dto/create_influxdb.dto';
import { LineDto } from '@src/modules/settings/dto/create_line.dto';
import { NoderedDto } from '@src/modules/settings/dto/create_nodered.dto';
import { SchedulDto } from '@src/modules/settings/dto/create_schedule.dto';
import { SmsDto } from '@src/modules/settings/dto/create_sms.dto';
import { TokenDto } from '@src/modules/settings/dto/create_token.dto';
import { scheduleDevice } from '@src/modules/settings/dto/create_scheduledevice.dto';
/******************/
import { DeviceActionuserDto } from '@src/modules/settings/dto/create_device_action_user.dto';
import { DeviceActionDto } from '@src/modules/settings/dto/create_device_action.dto';
import { DevicealarmactionDto } from '@src/modules/settings/dto/create_device_alarmaction.dto';
import { CreateUserDto } from '@src/modules/users/dto/create-user.dto';
import { CreateUserDemoDto } from '@src/modules/users/dto/create-demo-user.dto';
import { TelegramDto } from '@src/modules/settings/dto/create-telegram.dto';
import { updatemqttstatusDto } from '@src/modules/settings/dto/updatemqttstatus.dto';
import { alarmDevice } from '@src/modules/settings/dto/create_alarmdevice.dto';
/******************/
/******** entity *****************/
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';  // เพิ่มบรรทัดนี้
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
/******** entity ****************/
// import * as cache from '@src/utils/cache/redis.cache';
var Cache = new CacheDataOne();
var md5 = require('md5');
import 'dotenv/config';
var tzString = process.env.tzString;
var SEND_EMAIL = process.env.SEND_EMAIL;
// formatInTimeZone(date, tzString, 'yyyy-MM-dd HH:mm:ssXXX') 
require('dotenv').config();
import { IotService } from '@src/modules/iot/iot.service';
import { MqttService } from '@src/modules/mqtt/mqtt.service';
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly mqttService: MqttService,
    private settingsService: SettingsService,
    private UsersService: UsersService,
    private authService: AuthService,
    private readonly jwtService: JwtService, 
  ) {}
  /*********************************/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list scheduledevice' })
  @Get('listscheduledevice')
  async findscheduledevice(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || 1;
      let schedule_id:any=query.schedule_id || '';
      let device_id:any=query.device_id || '';
      if ((!schedule_id) || (!device_id)) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data schedule_id or device_id is null.',
            message_th: 'ไม่พบข้อมูล schedule_id หรือ device_id ', 
          });
        return;
      }
      var sort:any=query.sort; 
      let filter:any={};
      filter.sort = sort || 'device_id-ASC';
      filter.schedule_id = schedule_id;
      filter.device_id = device_id;
      filter.monday = query.monday;
      filter.tuesday = query.tuesday;
      filter.wednesday = query.wednesday;
      filter.thursday = query.thursday;
      filter.friday = query.friday;
      filter.saturday = query.saturday;
      filter.sunday = query.sunday;
      filter.start = query.start;
      filter.event = query.event; 
      filter.status = status || '';  
      filter.sort = sort || '';   
      let rowResultData:any=await this.settingsService.findscheduledevice(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      }  
      let ResultData:any=rowResultData;
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const id: number = ResultData[key].id || null;
        const ProfileRs:any={  
          device_id: ResultData[key].device_id,
          schedule_id: ResultData[key].schedule_id,
          schedule_name: ResultData[key].schedule_name, 
          start: ResultData[key].schedule_start,  
          event: ResultData[key].schedule_event,
          sunday: ResultData[key].sunday,
          monday: ResultData[key].monday,
          tuesday: ResultData[key].tuesday,
          wednesday: ResultData[key].wednesday,
          thursday: ResultData[key].thursday,
          friday: ResultData[key].friday,
          saturday: ResultData[key].saturday,
          device_name: ResultData[key].device_name,
          mqtt_data_value: ResultData[key].mqtt_data_value,
          mqtt_data_control: ResultData[key].mqtt_data_control,
          oid: ResultData[key].device_oid,
          sn: ResultData[key].device_sn  
        };
        tempDataoid.push(id);
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            filter: filter,
            data: tempData2,
        },
        message: 'list setting success.',
        message_th: 'lists etting success.',
      });
  }
  /*********************************/  
 @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list scheduledevice' })
  @Get('sendemail')
  async sendemail(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      var to:any=query.to; 
      if(to=='' || to=='undefined'){
         var to:any=SEND_EMAIL;
      }
      var subject:any=query.subject; 
      if(subject=='' || subject=='undefined'){
         var subject:any='CmonIot Alarm';
      }
      var content:any=query.content; 
      if(content=='' || content=='undefined'){
         var content:any='Alarm Test';
      }
      console.log(`---sendemail--`);
      console.log(`to--`+to);
      console.log(`subject--`+subject); 
      console.log(`content--`+content);
      let ResultData:any=await this.settingsService.sendEmail(to, subject,content);
      let payloadData:any={
                  ResultData: ResultData,
                  to: to,
                  subject: subject,
                  content: content,
              }
      res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: payloadData,
            message: 'sendEmail success.',
            message_th: 'sendEmail success.',
      });
  }
  /***********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list scheduledevice' })
  @Get('findscheduledevicechk')
  async findscheduledevicechk(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || 1;
      let schedule_id:any=query.schedule_id || '';
      let device_id:any=query.device_id || '';
      if ((!schedule_id) || (!device_id)) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data schedule_id or device_id is null.',
            message_th: 'ไม่พบข้อมูล schedule_id หรือ device_id ', 
          });
        return;
      }
      var sort:any=query.sort; 
      let filter:any={}; 
      filter.schedule_id = schedule_id;
      filter.device_id = device_id; 
      let rowResultData:any=await this.settingsService.findscheduledevicechk(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            filter: filter,
            data: rowResultData,
        },
        message: 'list setting success.',
        message_th: 'lists etting success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list setting' })
  @Get('listsetting')
  async list_user_logs(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort || 'createddate-ASC';
      filter.keyword = keyword || ''; // setting_name
      filter.status = status || '';
      filter.setting_id = query.setting_id;
      filter.location_id = query.location_id || '';
      filter.setting_type_id = query.setting_type_id || '';
      filter.sn = query.sn || '';
      filter.createddate = query.date || '';
      filter.isCount = 1;
     
      
      let rowResultData:any=await this.settingsService.setting_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort || 'createddate-ASC';
      filter2.keyword = keyword || ''; // setting_name
      filter2.status = status || '';
      filter2.setting_id = query.setting_id;
      filter2.location_id = query.location_id || '';
      filter2.setting_type_id = query.setting_type_id || '';
      filter2.sn = query.sn || '';
      filter2.createddate = query.date || '';
      filter2.isCount = 1;
      filter2.page = page;
      filter2.pageSize = pageSize;
      filter2.isCount = 0;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.setting_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
        const id: number = ResultData[key].id || null;
        const ProfileRs:any={ 
          setting_id: ResultData[key].setting_id,
          location_id: ResultData[key].location_id,
          setting_type_id: ResultData[key].setting_type_id,
          setting_name: ResultData[key].setting_name,
          sn: ResultData[key].sn,
          type_name: ResultData[key].type_name, 
          location_name: ResultData[key].location_name,
          ipaddress: ResultData[key].ipaddress,
          location_detail: ResultData[key].location_detail, 
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        };
        tempDataoid.push(id);
        tempData.push(va);
        tempData2.push(ProfileRs);
      } 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list setting success.',
        message_th: 'lists etting success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
  @ApiOperation({ summary: 'list setting' })
  @Get('settingall')
  async setting_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.setting_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'list setting success.',
        message_th: 'lists etting success.',
      });
  } 
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list location' })
  @Get('listlocation')
  async list_location(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || ''; // setting_name 
      filter.status = status || ''; 
      filter.location_id = query.location_id || '';
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.location_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || ''; // setting_name
      filter2.idx = idx || '';
      filter2.status = status || '';
      filter2.setting_id = query.setting_id;
      filter2.location_id = query.location_id || '';
      filter2.ipaddress = query.ipaddress || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.location_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs:any={ 
          location_id: ResultData[key].location_id,
          location_name: ResultData[key].location_name,
          configdata: ResultData[key].configdata,
          ipaddress: ResultData[key].ipaddress,
          location_detail: ResultData[key].location_detail, 
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list location success.',
        message_th: 'lists location success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@AuthUserRequired()
  @ApiOperation({ summary: 'location_all' })
  @Get('locationall')
  async location_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.location_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list type' })
  @Get('listtype')
  async list_type(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.type_id = query.type_id || '';
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.type_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.idx = idx || '';
      filter2.status = status || '';
      filter2.type_id = query.type_id;
      filter2.group_id = query.group_id || '';
      filter2.ipaddress = query.ipaddress || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.type_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs:any={ 
          type_id: ResultData[key].type_id,
          group_id: ResultData[key].group_id, 
          type_name: ResultData[key].type_name,  
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list location success.',
        message_th: 'lists location success.',
      });
  }
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'typeall' })
  @Get('typeall')
  async list_type_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.type_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'typeall' })
  @Get('devicetypeall')
  async list_device_type_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.devicetype_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'typeall' })
  @Get('devicetypeallcontrol')
  async devicetypeallcontrol(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.devicetype_all_oi();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list device type' })
  @Get('listdevicetype')
  async listdevicetype(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.type_id = query.type_id || '';
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.devicetype_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.idx = idx || '';
      filter2.status = status || '';
      filter2.type_id = query.type_id; 
      filter2.ipaddress = query.ipaddress || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.devicetype_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs:any={ 
          type_id: ResultData[key].type_id,  
          type_name: ResultData[key].type_name,  
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list location success.',
        message_th: 'lists location success.',
      });
  }
  /***************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'typeall' })
  @Get('devicetypeall')
  async list_devicetype_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.devicetype_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list sensor' })
  @Get('listsensor')
  async list_sensor(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.sn=query.sn;
      filter.max=query.max;
      filter.min=query.min;
      filter.hardware_id=query.hardware_id;
      filter.status_high=query.status_high;
      filter.status_warning=query.status_warning;
      filter.status_alert=query.status_alert;
      filter.model=query.model;
      filter.vendor=query.vendor;
      filter.comparevalue=query.comparevalue;
      filter.mqtt_id=query.mqtt_id;
      filter.oid=query.oid;
      filter.action_id=query.action_id;
      filter.mqtt_data_value=query.mqtt_data_value;
      filter.mqtt_data_control=query.mqtt_data_control;
      filter.type_id = query.type_id || '';
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.sensor_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';   
      filter2.status = status || '';
      filter2.sn=query.sn;
      filter2.max=query.max;
      filter2.min=query.min;
      filter2.hardware_id=query.hardware_id;
      filter2.status_high=query.status_high;
      filter2.status_warning=query.status_warning;
      filter2.status_alert=query.status_alert;
      filter2.model=query.model;
      filter2.vendor=query.vendor;
      filter2.comparevalue=query.comparevalue;
      filter2.mqtt_id=query.mqtt_id;
      filter2.oid=query.oid;
      filter2.action_id=query.action_id;
      filter2.mqtt_data_value=query.mqtt_data_value;
      filter2.mqtt_data_control=query.mqtt_data_control;
      filter2.type_id = query.type_id;
      filter2.group_id = query.group_id || '';
      filter2.ipaddress = query.ipaddress || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.location_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = []; 
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ArrayRs:any={  
            sensor_id: ResultData[key].sensor_id,
            setting_id: ResultData[key].setting_id,
            setting_type_id: ResultData[key].setting_type_id,
            sensor_name: ResultData[key].sensor_name,
            sn: ResultData[key].sn,
            max: ResultData[key].max,
            min: ResultData[key].min,
            hardware_id: ResultData[key].hardware_id,
            status_high: ResultData[key].status_high,
            status_warning: ResultData[key].status_warning,
            status_alert: ResultData[key].status_alert,
            model: ResultData[key].model,
            vendor: ResultData[key].vendor,
            comparevalue: ResultData[key].comparevalue, 
            status: ResultData[key].status,
            unit: ResultData[key].unit,
            mqtt_id: ResultData[key].mqtt_id,
            oid: ResultData[key].oid,
            action_id: ResultData[key].action_id,
            status_alert_id: ResultData[key].status_alert_id,
            mqtt_data_value: ResultData[key].mqtt_data_value,
            mqtt_data_control: ResultData[key].mqtt_data_control,  
            type_name: ResultData[key].type_name,    
            setting_name: ResultData[key].setting_name,    
            location_name: ResultData[key].location_name,   
            createddate: format.timeConvertermas(
                format.convertTZ(ResultData[key].createddate, process.env.tzString),
            ),
            updateddate: format.timeConvertermas(
                format.convertTZ(ResultData[key].updateddate, process.env.tzString),
            ),  
        }; 
        tempData2.push(ArrayRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list location success.',
        message_th: 'lists location success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'sensor all' })
  @Get('sensorall')
  async list_sensor_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.sensor_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'location all success.',
        message_th: 'location all  success.',
      });
  } 
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('createscheduledevice')
  async create_schedule_device(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const schedule_id: number = Number(query.schedule_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`schedule_id =>` + schedule_id); console.info(schedule_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!schedule_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is schedule_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      var dtost:any = {
                      schedule_id:schedule_id,
                      device_id:device_id,
                };
      await this.settingsService.createscheduledevice(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Scheduled created successfully.',
        message_th: 'สร้าง Scheduled สำเร็จ.',
      });
  }
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('deletescheduledevice')
  async delete_schedule_devices(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const schedule_id: number = Number(query.schedule_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`schedule_id =>` + schedule_id); console.info(schedule_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!schedule_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is schedule_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
     var dtost:any = {
                      schedule_id:schedule_id,
                      device_id:device_id,
                };
      await this.settingsService.delete_schedule_device(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Scheduled delete successfully.',
        message_th: 'ลบ Scheduled สำเร็จแล้ว.',
      });
  }
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('lisgroup')
  async list_group(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || ''; 
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || '';  
      filter.group_id = query.group_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.group_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';   
      filter2.status = status || ''; 
      filter2.group_id = query.group_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.group_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs:any={ 
          /******************/  
          group_id: ResultData[key].group_id, 
          group_name: ResultData[key].group_name,  
          /******************/
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list group success.',
        message_th: 'lists group success.',
      });
  }
  /******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'lisgroup' })
  @Get('lisgroupall')
  async list_group_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.group_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'group_all success.',
        message_th: 'group_all  success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('listgrouppage')
  async list_group_page(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const idx:any=query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.group_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';   
      filter2.status = status || '';
      filter2.group_id = query.group_id; 
      filter2.ipaddress = query.ipaddress || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.group_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ  
        const ProfileRs:any={ 
          group_id: ResultData[key].group_id,  
          group_name: ResultData[key].group_name,  
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list group success.',
        message_th: 'lists group success.',
      });
  }
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list mqtt' })
  @Get('lismqtt')
  async list_mqtt(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      var select_status:any=query.select_status || '';
      var sort:any=query.sort || 'mqtt_id-ASC';
      var keyword:any=query.keyword || '';
      var mqtt_type_id:any=query.type_id || '';
      var location_id:any=query.location_id || '';
      var filter:any={};
      filter.sort = sort;
      filter.keyword = keyword || '';  
      filter.status = status || '';  
      filter.mqtt_id = query.mqtt_id || '';  
      filter.mqtt_type_id =mqtt_type_id; 
      filter.location_id = location_id;   
      filter.secret = query.secret || '';  
      filter.expire_in = query.expire_in || '';  
      filter.token_value = query.token_value || '';  
      filter.org = query.org || '';  
      filter.bucket = query.bucket || '';  
      filter.envavorment = query.envavorment || '';   
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.mqtt_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';    
      filter2.status = status || ''; 
      filter2.mqtt_id = query.mqtt_id || '';  
      filter2.mqtt_type_id =mqtt_type_id; 
      filter2.location_id = location_id;   
      filter2.secret = query.secret || '';  
      filter2.expire_in = query.expire_in || '';  
      filter2.token_value = query.token_value || '';  
      filter2.org = query.org || '';  
      filter2.bucket = query.bucket || '';  
      filter2.envavorment = query.envavorment || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        var bucket:any= ResultData[key].bucket;
        let filter2:any={};
        filter2.bucket = bucket; 
        let device:any=await this.settingsService.device_lists_id(filter2);
        let device_count:any=device.length;
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const date:any=format.timeConvertermas(
                format.convertTZ(ResultData[key].updateddate, process.env.tzString),
              );
        const RSdata:any={   
          mqtt_id: ResultData[key].mqtt_id,
          sort: ResultData[key].sort,
          mqtt_type_id: ResultData[key].mqtt_type_id,
          mqtt_name: ResultData[key].mqtt_name,  
          location_id: ResultData[key].location_id, 
          location_name: ResultData[key].location_name, 
          location_detail: ResultData[key].location_detail, 
          host: ResultData[key].host, 
          port: ResultData[key].port, 
          username: ResultData[key].username,  
          password: ResultData[key].password,
          secret: ResultData[key].secret,
          expire_in: ResultData[key]. expire_in,
          token_value: ResultData[key].token_value,
          org: ResultData[key].org,
          bucket: ResultData[key].bucket,
          envavorment: ResultData[key].envavorment,
          updateddate: date, 
          type_name: ResultData[key].type_name, 
          status: ResultData[key].status, 
          latitude: ResultData[key].latitude, 
          longitude: ResultData[key].longitude, 
          device_count:device_count,
          device:device, 
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list mqtt success..',
        message_th: 'lists mqtt success..',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@AuthUserRequired()
  @ApiOperation({ summary: 'lismqtt all' })
  @Get('lismqttall')
  async list_mqtt_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.mqtt_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'mqtt_all success.',
        message_th: 'mqtt_all  success.',
      });
  } 
  /************ */
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device all' })
  @Get('mqttdelete')
  async mqttdelete(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`query=`);
      console.info(query);
       if (!query.mqtt_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data device_id is null.',
            message_th: 'ไม่พบข้อมูล device_id', 
          });
        return;
      } 
      let ResultData:any=await this.settingsService.delete_mqtt(query.mqtt_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'delete mqtt success.',
        message_th: 'delete mqtt  success.',
      });
  } 
  /********Api**********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'api all' })
  @Get('apiall')
  async list_api_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.api_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'api_all success.',
        message_th: 'api_all  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'api list group' })
  @Get('listapipage')
  async api_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const api_id:any=query.api_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.api_id = query.api_id || '';
      filter.keyword = keyword || '';   
	    filter.type_name = query.type_name || '';  
      filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.api_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
	    filter2.type_name = query.type_name || '';  
      filter2.api_id = query.api_id || '';
      filter2.status = status || '';
      filter2.host = query.host; 
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.api_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs:any={ 
          api_id: ResultData[key].api_id,  
          api_name: ResultData[key].api_name,  
          host: ResultData[key].host,  
          port: ResultData[key].port,  
          token_value: ResultData[key].token_value,  
          password: ResultData[key].password, 
          type_name: ResultData[key].type_name, 
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list group success.',
        message_th: 'lists group success.',
      });
  }
  /********Device**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device all' })
  @Get('deviceall')
  async list_device_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.device_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'device_all success.',
        message_th: 'device_all  success.',
      });
  } 
  /********Device**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device all' })
  @Get('deviceeditget')
  async deviceeditget(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`query=`);
      console.info(query);
       if (!query.device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data device_id is null.',
            message_th: 'ไม่พบข้อมูล device_id', 
          });
        return;
      } 
      let ResultData:any=await this.settingsService.deviceeditget(query.device_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'deviceeditget success.',
        message_th: 'deviceeditget  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device all' })
  @Get('devicedetail')
  async devicedetail(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`query=`);
      console.info(query);
       if (!query.device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data device_id is null.',
            message_th: 'ไม่พบข้อมูล device_id', 
          });
        return;
      } 
      let filter:any={};
	    filter.device_id = query.device_id || '';
      filter.status = query.status || '';
      let ResultData:any=await this.settingsService.devicedetail(filter);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData['0'],
        message: 'deviceeditget success.',
        message_th: 'deviceeditget  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device all' })
  @Get('devicedelete')
  async deviceedelete(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`query=`);
      console.info(query);
       if (!query.device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data device_id is null.',
            message_th: 'ไม่พบข้อมูล device_id', 
          });
        return;
      } 
      let ResultData:any=await this.settingsService.delete_device(query.device_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'delete success.',
        message_th: 'delete  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicepagess')
  async device_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.device_id = query.device_id || '';
      filter.mqtt_id = query.mqtt_id || '';
      filter.type_id = query.type_id || '';
      filter.org = query.org || '';
      filter.bucket = query.bucket || '';
      filter.keyword = keyword || '';   
	    filter.type_name = query.type_name || '';  
      filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.device_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.status = status || '';
      filter2.host = query.host; 
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.device_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
        var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
        var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
        const DataRs:any={  
          device_id: ResultData[key].device_id,  
          setting_id: ResultData[key].setting_id,  
          mqtt_id: ResultData[key].mqtt_id,  
          type_id: ResultData[key].type_id,  
          location_id: ResultData[key].location_id,   
          location_name: ResultData[key].location_name,
          device_name: ResultData[key].device_name,  
          mqtt_name: ResultData[key].mqtt_name, 
          type_name: ResultData[key].type_name, 
          mqtt_org: ResultData[key].mqtt_org, 
          mqtt_bucket: ResultData[key].mqtt_bucket, 
          mqtt_envavorment: ResultData[key].mqtt_envavorment, 
          mqtt_host: ResultData[key].mqtt_host,   
          mqtt_port: ResultData[key].mqtt_port,   
          measurement: ResultData[key].measurement,   
          mqtt_data_value: mqtt_data_value,  
          mqtt_data_control: mqtt_data_control,   
          mqtt_control_on: ResultData[key].mqtt_control_on,   
          mqtt_control_off: ResultData[key].mqtt_control_off,   
          oid: ResultData[key].oid,  
          sn: ResultData[key].sn, 
          max: ResultData[key].max, 
          min: ResultData[key].min,  
          hardware_id: ResultData[key].hardware_id,   
          status_warning: ResultData[key].status_warning,  
          recovery_warning: ResultData[key].recovery_warning,  
          status_alert: ResultData[key].status_alert,  
          recovery_alert: ResultData[key].recovery_alert,  
          work_status: ResultData[key].work_status,  
          unit: ResultData[key].unit,    
          model: ResultData[key].model,  
          vendor: ResultData[key].vendor,  
          comparevalue: ResultData[key].comparevalue,  
          action_id: ResultData[key].action_id,  
          status_alert_id: ResultData[key].status_alert_id,    
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),
          timestamp: mqttdata['payload']['timestamp'],
          temperature_value: mqttdata['payload']['temperature'],  
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
        tempData.push(va);
        tempData2.push(DataRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  /***********************/
  @HttpCode(200)
 //@AuthUserRequired()
  @Get('listdevicepage')
  @ApiOperation({ summary: 'list device page active' })
  async device_listdevicepage(
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
          keyword: query.keyword,
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
        var kaycache:any='mqtt_device_list_paginate_v2_'+filterkeymd5;
        if(deletecache==1){
          await Cache.DeleteCacheData(kaycache); 
        }
        var rowResultData:any =  await Cache.GetCacheData(kaycache); 
        if(!rowResultData){
            var rowResultData:any=await this.settingsService.device_list_paginate(filter);
            var InpuDatacache:any={keycache: `${kaycache}`,time: 30,data: rowResultData};
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
        var filter2keymd5:any='mqtt_device_list_paginate_v2_2_'+md5(filter2cache);
        var ResultData:any =  await Cache.GetCacheData(filter2keymd5); 
        if(!ResultData){
            var ResultData:any=await this.settingsService.device_list_paginate(filter2);
            var InpuDatacache:any={keycache: `${filter2keymd5}`,time: 30,data: ResultData};
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
          let obj:any=[];
          try {
            obj = JSON.parse(configdata);
          } catch (e) {
            throw e;
          }  
          var mqtt_objt_data = Object.values(obj);
          var mqtt_count:any=mqtt_objt_data.length;
          var mqtt_status_data_name = va.mqtt_status_data_name;
           let obj2:any=[];
          try {
            obj2 = JSON.parse(mqtt_status_data_name);
          } catch (e) {
            throw e;
          }  
          var mqtt_obj2_data = Object.values(obj2);
          var mqtt2_count:any=mqtt_obj2_data.length;
          var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
          console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
          var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
          console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
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
  /***********************/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicepageactive1')
  async device_list_paginate_active1(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.device_id = query.device_id || '';
      filter.mqtt_id = query.mqtt_id || '';
      filter.type_id = query.type_id || '';
      filter.org = query.org || '';
      filter.bucket = query.bucket || '';
      filter.keyword = keyword || '';   
	    filter.type_name = query.type_name || '';  
     //filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.device_list_paginate_active(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
     //filter2.status = status || '';
      filter2.host = query.host; 
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.device_list_paginate_active(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
        var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
        var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
        const DataRs:any={  
          device_id: ResultData[key].device_id,  
          setting_id: ResultData[key].setting_id,  
          mqtt_id: ResultData[key].mqtt_id,  
          type_id: ResultData[key].type_id,  
          location_id: ResultData[key].location_id,   
          location_name: ResultData[key].location_name,
          device_name: ResultData[key].device_name,  
          mqtt_name: ResultData[key].mqtt_name, 
          type_name: ResultData[key].type_name, 
          mqtt_org: ResultData[key].mqtt_org, 
          mqtt_bucket: ResultData[key].mqtt_bucket, 
          mqtt_envavorment: ResultData[key].mqtt_envavorment, 
          mqtt_host: ResultData[key].mqtt_host,   
          mqtt_port: ResultData[key].mqtt_port,   
          measurement: ResultData[key].measurement,   
          mqtt_data_value: mqtt_data_value,  
          mqtt_data_control: mqtt_data_control,   
          mqtt_control_on: ResultData[key].mqtt_control_on,   
          mqtt_control_off: ResultData[key].mqtt_control_off,   
          oid: ResultData[key].oid,  
          sn: ResultData[key].sn, 
          max: ResultData[key].max, 
          min: ResultData[key].min,  
          hardware_id: ResultData[key].hardware_id,   
          status_warning: ResultData[key].status_warning,  
          recovery_warning: ResultData[key].recovery_warning,  
          status_alert: ResultData[key].status_alert,  
          recovery_alert: ResultData[key].recovery_alert,  
          work_status: ResultData[key].work_status,  
          unit: ResultData[key].unit,    
          model: ResultData[key].model,  
          vendor: ResultData[key].vendor,  
          comparevalue: ResultData[key].comparevalue,  
          action_id: ResultData[key].action_id,  
          status_alert_id: ResultData[key].status_alert_id,    
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),
          timestamp: mqttdata['payload']['timestamp'],
          temperature_value: mqttdata['payload']['temperature'],  
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
        tempData.push(va);
        tempData2.push(DataRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  /***********************/
  // http://192.168.1.59:3003/v1/settings/listdevicepageactive?page=1&pageSize=10&bucket=BAACTW03
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
        var buckets :any= query.bucket;
        var bucket :string= buckets;
       // สร้าง filter สำหรับนับจำนวนข้อมูล
        var filter = {
          sort:sort,
          device_id:device_id,
          mqtt_id: query.mqtt_id || '',
          type_id: query.type_id || '',
          org: query.org || '',
          bucket: bucket,
          keyword:keyword,
          type_name: query.type_name || '',
          host: query.host || '',
          port: query.port || '',
          password: query.password || '',
          createddate: query.date || '',
          isCount: 1,
        };
        var deletecache = query.deletecache;
        var filtercache:any =encodeURI(sort+device_id+query.mqtt_id+query.type_id+query.org+bucket+keyword+query.type_name+query.host+query.port+query.password+query.date+'isCount1'); 
        var filterkeymd5:any=md5(filtercache);
        var kaycache:any='mqtt_listdevicepageactive_'+filterkeymd5;
        if(deletecache==1){
          await Cache.DeleteCacheData(kaycache); 
        }
        var rowResultData:any =  await Cache.GetCacheData(kaycache); 
        if(!rowResultData){
            var rowResultData:any=await this.settingsService.device_list_paginate_active(filter);
            var InpuDatacache:any={keycache: `${kaycache}`,time: 120,data: rowResultData};
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
            var ResultData:any=await this.settingsService.device_list_paginate_active(filter2);
            var InpuDatacache:any={keycache: `${filter2keymd5}`,time: 120,data: ResultData};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
        }else{
            var cache_data:any='cache'; 
        }  
       /**********************/ 
        var tempData2 = []; 
        for (var va of ResultData) {
          var mqtt_data_value = va.mqtt_data_value;
          var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
          var mqtt_data = mqttrs['data'];
          var mqtt_timestamp = mqttrs['timestamp'];
          var timestamp = mqttrs['timestamp'];
          var configdata = va.configdata;
          var mqttrs_count:any=mqtt_data.length; 
          let obj:any=[];
          try {
            obj = JSON.parse(configdata);
          } catch (e) {
            throw e;
          }  
          var mqtt_objt_data = Object.values(obj);
          var mqtt_count:any=mqtt_objt_data.length;
          var mqtt_status_data_name = va.mqtt_status_data_name;
           let obj2:any=[];
          try {
            obj2 = JSON.parse(mqtt_status_data_name);
          } catch (e) {
            throw e;
          }  
          var mqtt_obj2_data = Object.values(obj2);
          var mqtt2_count:any=mqtt_obj2_data.length;
          var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
          console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
          var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
          console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
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
  /***********************/ 
 // seetngs/mqttdata?mqttdata=
  @HttpCode(200) 
  @Get('mqttdata')
  @ApiOperation({ summary: 'mqttdata' })
  async mqttdata(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var mqttdata = query.mqttdata;
    if(mqttdata==''){
      res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: null,
          message: 'mqttdata is null.',
          message_th: 'mqttdata is null.',
        });
    }   
    var mqttrs = await this.mqttService.getdevicedataAll(mqttdata);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: mqttrs,
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /***********************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listdevicepageall')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_all(
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.device_list_paginate_all(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };

    var ResultData:any=await this.settingsService.device_list_paginate_all(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj:any=[];
            try {
              obj = JSON.parse(configdata);
            } catch (e) {
              throw e;
            }

            var mqtt_objt_data = Object.values(obj);
            var result_mqtt = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]]));

           // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
            var merged = format.mapMqttDataToDeviceV2([va], result_mqtt)[0];
            tempData2.push({
              ...va,
              ...merged,
              result_mqtt,
              timestamp,
            });
          }
      */

    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listdevicepagesensor')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_sensor(
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
      type_id: 1,
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.device_list_paginate_all(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    }
    var ResultData:any=await this.settingsService.device_list_paginate_all(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listdevicepageallactive')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_all_active(
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.device_list_paginate_all_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };

    var ResultData:any=await this.settingsService.device_list_paginate_all_active(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj:any=[];
            try {
              obj = JSON.parse(configdata);
            } catch (e) {
              throw e;
            }

            var mqtt_objt_data = Object.values(obj);
            var result_mqtt = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]]));

           // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
            var merged = format.mapMqttDataToDeviceV2([va], result_mqtt)[0];
            tempData2.push({
              ...va,
              ...merged,
              result_mqtt,
              timestamp,
            });
          }
      */

    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listdevicepageallactiveschedule')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_all_active_schedule(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var schedule_id = query.schedule_id || '';
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
   // นับจำนวนข้อมูลทั้งหมด
    /*
        get_data_schedule_device
        create_schedule_device
        delete_schedule_device
    */
 if (schedule_id=="" || schedule_id=="undefined" || schedule_id==undefined) {
      res.status(200).json({
        statuscode: 200,
        code: 400,
        payload: null,
        message: 'schedule_id is null.',
        message_th: 'ไม่พบข้อมูล schedule_id',
      });
      return;
    }
    var scheduleResultData:any=await this.settingsService.findOnescheduledevice(schedule_id);
    var rowResultData:any=await this.settingsService.device_list_paginate_all_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            schedule_id:schedule_id,
            pageSize: 1,
            page:1
    };
    var scheduleResultData:any=await this.settingsService.schedule_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_list_paginate_all_active(filter2);
    console.log(`ResultData`);
    console.info(ResultData);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  var filter_schedule = { 
                              isCount: 1,
                              schedule_id,
                              device_id
                  }
                  var count_schedule_device:any=await this.settingsService.get_data_schedule_device(filter_schedule);
                  if(count_schedule_device>=1){
                    var  schedule_status=1;
                  }else{
                    var  schedule_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      schedule_id: schedule_id,
                      schedule_status: schedule_status,  
                      count_schedule_device: count_schedule_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,  
                      schedule_name:scheduleResultData['0'].schedule_name,
                      schedule_start:scheduleResultData['0'].start,
                      schedule_title:scheduleResultData['0'].schedule_name+' '+scheduleResultData['0'].start,
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        scheduleData:scheduleResultData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('scheduledevicepage')
  @ApiOperation({ summary: 'list device page active' })
  async scheduledevicepage(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id = query.device_id || '';
    var schedule_id = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 1000;
    var sort = query.sort;
    var keyword = query.keyword || '';

   // สร้าง filter สำหรับนับจำนวนข้อมูล
    var filter = {
      sort,
      device_id,
      schedule_id,
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.scheduledevicepage(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };

    var ResultData:any=await this.settingsService.scheduledevicepage(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('schedulelist')
  @ApiOperation({ summary: 'lists chedule list' })
  async schedulelist(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id = query.device_id || '';
    var schedule_id = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 1000;
    var sort = query.sort;
    var keyword = query.keyword || '';

   // สร้าง filter สำหรับนับจำนวนข้อมูล
    var filter = {
      sort,
      device_id,
      schedule_id,
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.scheduledevicepage(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };

    var ResultData:any=await this.settingsService.scheduledevicepage(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarm')
  async device_list_alarm(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      var keyword:any=query.keyword || '';
      var location_id:any=query.location_id || '';
      if(location_id==""){
        var location_id :any =1;
       }
      var filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.location_id = location_id;  
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.status = status || 1;
      console.log(`filter2=`);
      console.info(filter2);
     // const deletecache:any=query.deletecache || 0;
     // var cachekey='device_list_ststus_alarm_'+md5(filter2);
     // if(deletecache==1){
     //   await Cache.DeleteCacheData(cachekey); 
     // }
     // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
     // if(!tempDataRs){
     //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
     // }else{
     //   var InpuDatacache:any={keycache: `${cachekey}`,time: 10,data: tempData2};
     //     await Cache.SetCacheData(InpuDatacache); 
     // }
            var tempData2:any =[];
             /*******************/
              let ResultData:any=await this.settingsService.device_list_ststus_alarm_fan(filter2);
              let tempData = [];
              let tempDataoid = []; 
              for (const [key, va] of Object.entries(ResultData)) { 
                var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
                var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
                var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                var main_overFan1:any= mqttdata['payload']['overFan1'];  
                var main_overFan2:any= mqttdata['payload']['overFan2'];
                var main_temperature:any=mqttdata['payload']['temperature'];
                var main_status_warning:any=ResultData[key].status_warning;
                var main_status_alert:any=ResultData[key].status_alert;
                var main_max:any=ResultData[key].max;
                var main_min:any=ResultData[key].min;
                var main_type_id:any=ResultData[key].type_id;
                var main_fan1:any=mqttdata['payload']['fan1'];  
                var main_fan2:any=mqttdata['payload']['fan2']; 
                var main_overFan1:any= mqttdata['payload']['overFan1'];
                var main_overFan2:any=mqttdata['payload']['overFan2'];
                if((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1)){
                    var alart_temperature:any=0;
                }else{
                    var alart_temperature:any=1;
                }  
                if( main_type_id==1){ 
                    var sensor_name:any='temperature';
                    var sensor_data:any=main_temperature;
                    var sensor_data_name:any=sensor_data+' '+ResultData[key].unit;
                    var alart_status:any=alart_temperature
                }else  if( main_type_id==2){
                    var sensor_name:any='fan1';
                    var sensor_data=main_fan1;  
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan1
                }else{
                    var sensor_name:any='fan2';
                    var sensor_data:any=main_fan2;
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan2;
                }
                const DataRs:any={  
                  device_id: ResultData[key].device_id,  
                  setting_id: ResultData[key].setting_id,  
                  mqtt_id: ResultData[key].mqtt_id,  
                  type_id: ResultData[key].type_id,  
                  location_id: ResultData[key].location_id,   
                  location_name: ResultData[key].location_name,
                  device_name: ResultData[key].device_name,  
                  mqtt_name: ResultData[key].mqtt_name, 
                  type_name: ResultData[key].type_name, 
                  mqtt_org: ResultData[key].mqtt_org, 
                  mqtt_bucket: ResultData[key].mqtt_bucket, 
                  mqtt_data_value: mqtt_data_value,  
                  mqtt_data_control: mqtt_data_control,   
                  mqtt_control_on: ResultData[key].mqtt_control_on,   
                  mqtt_control_off: ResultData[key].mqtt_control_off,   
                  status_warning: ResultData[key].status_warning,  
                  recovery_warning: ResultData[key].recovery_warning,  
                  status_alert: ResultData[key].status_alert,  
                  recovery_alert: ResultData[key].recovery_alert,  
                  unit: ResultData[key].unit, 
                  sensor_name:  sensor_name,
                  sensor_data: sensor_data,
                  alart_status: alart_status,  
                  sensor_data_name:sensor_data_name,
                  timestamp: mqttdata['payload']['timestamp'],
                }; 
                tempData.push(va);
                if(((main_overFan1!='1' && main_type_id==2))|| (main_overFan2!='1' && main_type_id==3) || ((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1) )){
                    tempData2.push(DataRs);
                    
                }
        /*******************/
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: tempData2,
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarmair')
  async device_list_alarm_air(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      var keyword:any=query.keyword || '';
      var location_id:any=query.location_id || '';
      if(location_id==""){
        var location_id :any =5;
       }
      var filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.location_id = location_id;  
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.status = status || 1;
      console.log(`filter2=`);
      console.info(filter2);
      const deletecache:any=query.deletecache || 0;
      var cachekey='device_list_ststus_alarm_'+md5(filter2);
     // if(deletecache==1){
     //   await Cache.DeleteCacheData(cachekey); 
     // }
     // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
     // if(!tempDataRs){
     //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
     // }else{
     //   var InpuDatacache:any={keycache: `${cachekey}`,time: 10,data: tempData2};
     //     await Cache.SetCacheData(InpuDatacache); 
     // }
            var tempData2:any =[];
             /*******************/
              let ResultData:any=await this.settingsService.device_list_ststus_alarm_air(filter2);
              let tempData = [];
              let tempDataoid = []; 
              for (const [key, va] of Object.entries(ResultData)) { 
                var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
                var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
                var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                var main_overFan1:any= mqttdata['payload']['overFan1'];  
                var main_overFan2:any= mqttdata['payload']['overFan2'];
                var main_temperature:any=mqttdata['payload']['temperature'];
                var main_status_warning:any=ResultData[key].status_warning;
                var main_status_alert:any=ResultData[key].status_alert;
                var main_max:any=ResultData[key].max;
                var main_min:any=ResultData[key].min;
                var main_type_id:any=ResultData[key].type_id;
                var main_fan1:any=mqttdata['payload']['fan1'];  
                var main_fan2:any=mqttdata['payload']['fan2']; 
                var main_overFan1:any= mqttdata['payload']['overFan1'];
                var main_overFan2:any=mqttdata['payload']['overFan2'];
                if((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1)){
                    var alart_temperature:any=0;
                }else{
                    var alart_temperature:any=1;
                }  
                if( main_type_id==1){ 
                    var sensor_name:any='temperature';
                    var sensor_data:any=main_temperature;
                    var sensor_data_name:any=sensor_data+' '+ResultData[key].unit;
                    var alart_status:any=alart_temperature
                }else  if( main_type_id==2){
                    var sensor_name:any='fan1';
                    var sensor_data=main_fan1;  
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan1
                }else{
                    var sensor_name:any='fan2';
                    var sensor_data:any=main_fan2;
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan2;
                }
                const DataRs:any={  
                  device_id: ResultData[key].device_id,  
                  setting_id: ResultData[key].setting_id,  
                  mqtt_id: ResultData[key].mqtt_id,  
                  type_id: ResultData[key].type_id,  
                  location_id: ResultData[key].location_id,   
                  location_name: ResultData[key].location_name,
                  device_name: ResultData[key].device_name,  
                  mqtt_name: ResultData[key].mqtt_name, 
                  type_name: ResultData[key].type_name, 
                  mqtt_org: ResultData[key].mqtt_org, 
                  mqtt_bucket: ResultData[key].mqtt_bucket, 
                  mqtt_data_value: mqtt_data_value,  
                  mqtt_data_control: mqtt_data_control,   
                  mqtt_control_on: ResultData[key].mqtt_control_on,   
                  mqtt_control_off: ResultData[key].mqtt_control_off,   
                  status_warning: ResultData[key].status_warning,  
                  recovery_warning: ResultData[key].recovery_warning,  
                  status_alert: ResultData[key].status_alert,  
                  recovery_alert: ResultData[key].recovery_alert,  
                  unit: ResultData[key].unit, 
                  sensor_name:  sensor_name,
                  sensor_data: sensor_data,
                  alart_status: alart_status,  
                  sensor_data_name:sensor_data_name,
                  timestamp: mqttdata['payload']['timestamp'],
                }; 
                tempData.push(va);
                if(((main_overFan1!='1' && main_type_id==2))|| (main_overFan2!='1' && main_type_id==3) || ((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1) )){
                    tempData2.push(DataRs);
                    
                }
        /*******************/
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: tempData2,
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  /*******************/
  @HttpCode(200)
 //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarmv2')
  async device_list_alarmv2(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      let keyword:any=query.keyword || '';
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.location_id = query.location_id || 1;  
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.status = status || 1;
      console.log(`filter2=`);
      console.info(filter2);
      const deletecache:any=query.deletecache || 0;
      var cachekey='device_list_ststus_alarm_'+md5(filter2);
     // if(deletecache==1){
     //   await Cache.DeleteCacheData(cachekey); 
     // }
     // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
     // if(!tempDataRs){
     //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
     // }else{
     //   var InpuDatacache:any={keycache: `${cachekey}`,time: 10,data: tempData2};
     //     await Cache.SetCacheData(InpuDatacache); 
     // }
            var tempData2:any =[];
             /*******************/
              let ResultData:any=await this.settingsService.device_list_ststus_alarm(filter2);
              let tempData = [];
              let tempDataoid = []; 
              for (const [key, va] of Object.entries(ResultData)) { 
                var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
                var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
                var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                var main_overFan1:any= mqttdata['payload']['overFan1'];  
                var main_overFan2:any= mqttdata['payload']['overFan2'];
                var main_temperature:any=mqttdata['payload']['temperature'];
                var main_status_warning:any=ResultData[key].status_warning;
                var main_status_alert:any=ResultData[key].status_alert;
                var main_max:any=ResultData[key].max;
                var main_min:any=ResultData[key].min;
                var main_type_id:any=ResultData[key].type_id;
                var main_fan1:any=mqttdata['payload']['fan1'];  
                var main_fan2:any=mqttdata['payload']['fan2']; 
                var main_overFan1:any= mqttdata['payload']['overFan1'];
                var main_overFan2:any=mqttdata['payload']['overFan2'];
                if((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1)){
                    var alart_temperature:any=0;
                }else{
                    var alart_temperature:any=1;
                }  
                if( main_type_id==1){ 
                    var sensor_name:any='temperature';
                    var sensor_data:any=main_temperature;
                    var sensor_data_name:any=sensor_data+' '+ResultData[key].unit;
                    var alart_status:any=alart_temperature
                }else  if( main_type_id==2){
                    var sensor_name:any='fan1';
                    var sensor_data=main_fan1;  
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan1
                }else{
                    var sensor_name:any='fan2';
                    var sensor_data:any=main_fan2;
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan2;
                }
                const DataRs:any={  
                  device_id: ResultData[key].device_id,  
                  setting_id: ResultData[key].setting_id,  
                  mqtt_id: ResultData[key].mqtt_id,  
                  type_id: ResultData[key].type_id,  
                  location_id: ResultData[key].location_id,   
                  location_name: ResultData[key].location_name,
                  device_name: ResultData[key].device_name,  
                  mqtt_name: ResultData[key].mqtt_name, 
                  type_name: ResultData[key].type_name, 
                  mqtt_org: ResultData[key].mqtt_org, 
                  mqtt_bucket: ResultData[key].mqtt_bucket, 
                  mqtt_data_value: mqtt_data_value,  
                  mqtt_data_control: mqtt_data_control,   
                  mqtt_control_on: ResultData[key].mqtt_control_on,   
                  mqtt_control_off: ResultData[key].mqtt_control_off,   
                  status_warning: ResultData[key].status_warning,  
                  recovery_warning: ResultData[key].recovery_warning,  
                  status_alert: ResultData[key].status_alert,  
                  recovery_alert: ResultData[key].recovery_alert,  
                  unit: ResultData[key].unit, 
                  sensor_name:  sensor_name,
                  sensor_data: sensor_data,
                  alart_status: alart_status,  
                  sensor_data_name:sensor_data_name,
                  timestamp: mqttdata['payload']['timestamp'],
                }; 
                tempData.push(va);
                if(((main_overFan1!='1' && main_type_id==2))|| (main_overFan2!='1' && main_type_id==3) || ((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1) )){
                    tempData2.push(DataRs);
                    
                }
        /*******************/
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: tempData2,
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  /***********************/
  @HttpCode(200)
 //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarmlimit')
  async device_list_alarm_limit(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id:any=query.device_id || '';
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort;
      let keyword:any=query.keyword || ''; 
      var type_id:number=query.type_id; 
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.location_id = query.location_id || 1;
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = type_id;
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.page = query.page || 1;
      filter2.pageSize = query.pageSize || 3;
      filter2.status = status || 1;
      console.log(`filter2=`);
      console.info(filter2);
      const deletecache:any=query.deletecache || 0;
      var cachekey='device_list_ststus_alarm_limit_'+md5(filter2);
     // if(deletecache==1){
     //   await Cache.DeleteCacheData(cachekey); 
     // }
     // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
     // if(!tempDataRs){
     //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
     // }else{
     //   var InpuDatacache:any={keycache: `${cachekey}`,time: 10,data: tempData2};
     //     await Cache.SetCacheData(InpuDatacache); 
     // }
            var tempData2:any =[];
             /*******************/
              let ResultData:any=await this.settingsService.device_list_ststus_alarm_limit(filter2);
              let tempData = [];
              let tempDataoid = []; 
              for (const [key, va] of Object.entries(ResultData)) { 
                var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
                var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
                var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
                var main_overFan1:any= mqttdata['payload']['overFan1'];  
                var main_overFan2:any= mqttdata['payload']['overFan2'];
                var main_temperature:any=mqttdata['payload']['temperature'];
                var main_status_warning:any=ResultData[key].status_warning;
                var main_status_alert:any=ResultData[key].status_alert;
                var main_max:any=ResultData[key].max;
                var main_min:any=ResultData[key].min;
                var main_type_id:any=ResultData[key].type_id;
                var main_fan1:any=mqttdata['payload']['fan1'];  
                var main_fan2:any=mqttdata['payload']['fan2']; 
                var main_overFan1:any= mqttdata['payload']['overFan1'];
                var main_overFan2:any=mqttdata['payload']['overFan2'];
                if((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1)){
                    var alart_temperature:any=0;
                }else{
                    var alart_temperature:any=1;
                }  
                if( main_type_id==1){ 
                    var sensor_name:any='temperature';
                    var sensor_data:any=main_temperature;
                    var sensor_data_name:any=sensor_data+' '+ResultData[key].unit;
                    var alart_status:any=alart_temperature
                }else  if( main_type_id==2){
                    var sensor_name:any='fan1';
                    var sensor_data=main_fan1;  
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan1
                }else{
                    var sensor_name:any='fan2';
                    var sensor_data:any=main_fan2;
                    var sensor_data_name:any='Alarm';
                    var alart_status:any=main_overFan2;
                }
                const DataRs:any={  
                  device_id: ResultData[key].device_id,  
                  setting_id: ResultData[key].setting_id,  
                  mqtt_id: ResultData[key].mqtt_id,  
                  type_id: ResultData[key].type_id,  
                  location_id: ResultData[key].location_id,   
                  location_name: ResultData[key].location_name,
                  device_name: ResultData[key].device_name,  
                  mqtt_name: ResultData[key].mqtt_name, 
                  type_name: ResultData[key].type_name, 
                  mqtt_org: ResultData[key].mqtt_org, 
                  mqtt_bucket: ResultData[key].mqtt_bucket, 
                  mqtt_data_value: mqtt_data_value,  
                  mqtt_data_control: mqtt_data_control,   
                  mqtt_control_on: ResultData[key].mqtt_control_on,   
                  mqtt_control_off: ResultData[key].mqtt_control_off,   
                  status_warning: ResultData[key].status_warning,  
                  recovery_warning: ResultData[key].recovery_warning,  
                  status_alert: ResultData[key].status_alert,  
                  recovery_alert: ResultData[key].recovery_alert,  
                  unit: ResultData[key].unit, 
                  sensor_name:  sensor_name,
                  sensor_data: sensor_data,
                  alart_status: alart_status,  
                  sensor_data_name:sensor_data_name,
                  timestamp: mqttdata['payload']['timestamp'],
                }; 
                tempData.push(va);
                if(((main_overFan1!='1' && main_type_id==2))|| (main_overFan2!='1' && main_type_id==3) || ((main_temperature>=main_status_warning && main_type_id==1) || (main_temperature>=main_status_alert && main_type_id==1) )){
                    tempData2.push(DataRs);
                    
                }
        /*******************/
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: tempData2,
        message: 'list device success.',
        message_th: 'lists device success.',
      });
  }
  /***********************/ 
  /********Email**********/
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list email' })
  @Get('listemail')
  async email_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.email_id = query.email_id || '';  
      filter.host_id = query.host_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.email_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.email_id = query.email_id || '';  
      filter2.host_id = query.host_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.email_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const RSdata:any={   	  
          email_id: ResultData[key].email_id,
          email_name: ResultData[key].email_name,
		      host_name: ResultData[key].host_name, 
		      host: ResultData[key].host, 		  
          host_id: ResultData[key].host_id, 
          port: ResultData[key].port, 
          username: ResultData[key].username,  
          password: ResultData[key].password,
          updateddate: format.timeConvertermas(format.convertTZ(ResultData[key].updateddate, process.env.tzString)), 
          type_name: ResultData[key].type_name, 
          status: ResultData[key].status,   
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list email success..',
        message_th: 'lists email success..',
      });
  }
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'email all' })
  @Get('emailall')
  async list_email_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.email_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'email_all success.',
        message_th: 'email_all  success.',
      });
  } 
    /********Email**********/
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list mqtthost' })
  @Get('listmqtthost')
  async mqtthost_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.id = query.id || '';  
      filter.host_id = query.host_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.mqtthost_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.id = query.id || '';  
      filter2.host = query.host || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.mqtthost_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const RSdata:any={   	  
          id: ResultData[key].id,
          hostname: ResultData[key].hostname, 
		      host: ResultData[key].host, 		   
          port: ResultData[key].port, 
          username: ResultData[key].username,  
          password: ResultData[key].password,
          updateddate: format.timeConvertermas(format.convertTZ(ResultData[key].updateddate, process.env.tzString)),  
          status: ResultData[key].status,   
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list data success..',
        message_th: 'lists data success..',
      });
  }
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'email all' })
  @Get('mqtthostall')
  async list_mqtthost_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.mqtthost_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'mqtthost_all success.',
        message_th: 'mqtthost_all  success.',
      });
  } 
  /********Host**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'host all' })
  @Get('hostall')
  async list_host_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.host_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'host_all success.',
        message_th: 'host_all  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'host list ' })
  @Get('listhostpage')
  async host_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.host_id = query.host_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.host_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';    
      filter2.host_id = query.host_id || '';
      filter2.status = status || '';
      filter2.host = query.host; 
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.host_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs:any={ 
          host_id: ResultData[key].host_id,  
          host_name: ResultData[key].host_name,  
          host: ResultData[key].host,  
          port: ResultData[key].port,  
          token_value: ResultData[key].token_value,  
          password: ResultData[key].password, 
          type_name: ResultData[key].type_name, 
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list group success.',
        message_th: 'lists group success.',
      });
  }
  // http://192.168.1.59:3003/v1/settings/listinfluxdbpage
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'influxdb list' })
  @Get('listinfluxdbpage')
  async influxdb_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
	    filter.influxdb_id = query.influxdb_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.influxdb_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.keyword = keyword || '';    
      filter2.influxdb_id = query.influxdb_id || '';
      filter2.status = status || '';
      filter2.host = query.host; 
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.influxdb_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs:any={ 
          influxdb_id: ResultData[key].influxdb_id,  
          influxdb_name: ResultData[key].influxdb_name,  
          host: ResultData[key].host,  
          port: ResultData[key].port,  
          username: ResultData[key].username, 
          password: ResultData[key].password,  
          token_value: ResultData[key].token_value,  
          buckets: ResultData[key].buckets, 
          status: ResultData[key].status, 
          date: format.timeConvertermas(format.convertTZ(ResultData[key].updateddate, process.env.tzString)),    
        }
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list influxdb success.',
        message_th: 'lists influxdb success.',
      });
  }
  /********Influxdb**********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'influxdb all' })
  @Get('influxdball')
  async list_influxdb_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.influxdb_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'influxdb_all success.',
        message_th: 'influxdb_all  success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'mqtt list paginate' })
  @Get('listmqttpaginateactive')
  async mqtt_list_active_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 10000;
      var status:any=query.status || '';
      var select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      var deletecache:any=query.deletecache || '';
      var keyword:any=query.keyword || '';
      var filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.mqtt_id = query.mqtt_id || '';  
      filter.host = query.host || '';  
      filter.port = query.port || '';  
      filter.username = query.username || '';  
      filter.password = query.password || '';  
      filter.type_name = query.type_name || '';  
      filter.updateddate = query.updateddate || '';  
      filter.mqtt_type_id = query.mqtt_type_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.mqtt_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.mqtt_id = query.mqtt_id || '';  
      filter2.host = query.host || '';  
      filter2.port = query.port || '';  
      filter2.username = query.username || '';  
      filter2.password = query.password || '';  
      filter2.type_name = query.type_name || '';  
      filter2.updateddate = query.updateddate || '';   
      filter2.mqtt_type_id = query.mqtt_type_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`); console.info(filter2);
      var md5 = require('md5');
      var keycache_na:any= query.keyword+'_'+query.status+'_'+query.host+'_'+query.port+'_'+query.username+'_'+query.password+'_'+query.type_name+'_'+query.mqtt_type_id+'_'+page+'_'+pageSize;      
      var keycache2:any= md5(keycache_na);   
      var keycache:any= 'mqtt_list_paginate_'+keycache2;  
      if(deletecache==1){
            await Cache.DeleteCacheData(keycache);
      }  
      var ResultData:any=await Cache.GetCacheData(keycache);
      if(!ResultData){
          var ResultData:any=await this.settingsService.mqtt_list_paginate(filter2);
          let setCache:any={};
          setCache.time = 3000;
          setCache.keycache = keycache;   
          setCache.data = ResultData; 
          await Cache.SetCacheData(setCache); 
      } 
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
         // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
         //const device_cache:any=await Cache.GetCacheData(ResultData[key].bucket); 
          let mqtt_id:any = ResultData[key].mqtt_id;
          let filterRss:any={};
          filterRss.mqtt_id = mqtt_id;
          var keycache2:any= 'device_mqtt_id'+mqtt_id;  
          if(deletecache==1){
                await Cache.DeleteCacheData(keycache2);
          }  
          var rss_device:any=await Cache.GetCacheData(keycache2);
          if(!rss_device){
               var rss_device:any=await this.settingsService.device_lists(filterRss);
              let setCache2:any={};
              setCache2.time = 3000;
              setCache2.keycache = keycache;   
              setCache2.data = ResultData; 
              await Cache.SetCacheData(setCache2); 
          } 
          let rss_device_count:any= rss_device.length;
          if(rss_device_count>=1){ 
                const mqtt_data_value:any=rss_device['0']['mqtt_data_value'];
                const mqtt_data_control:any=rss_device['0']['mqtt_data_control'];
                const device_cache:any=await Cache.GetCacheData(mqtt_data_value); 
                const RSdata:any={  
                    mqtt_id: ResultData[key].mqtt_id,
                    mqtt_name: ResultData[key].mqtt_name,
                   // host_name: ResultData[key].host_name, 
                   // host: ResultData[key].host, 		
                    org: ResultData[key].org, 		
                    bucket: ResultData[key].bucket, 		
                    envavorment: ResultData[key].envavorment, 	 
                    mqtt_type_id: ResultData[key].mqtt_type_id, 
                   // port: ResultData[key].port, 
                   // username: ResultData[key].username,  
                   // password: ResultData[key].password,
                    updateddate: ResultData[key].updateddate, 
                    type_name: ResultData[key].type_name, 
                    mqtt_data_value: mqtt_data_value, 
                    mqtt_data_control: mqtt_data_control, 
                    status: ResultData[key].status, 
                    device: rss_device, 
                    count: rss_device_count, 
                    data_io:device_cache['data'],
                    temperature:device_cache['temperature'],
                    contRelay1:device_cache['contRelay1'],
                    actRelay1:device_cache['actRelay1'],
                    fan1:device_cache['fan1'],
                    overFan1:device_cache['overFan1'],
                    contRelay2:device_cache['contRelay2'],
                    actRelay2:device_cache['actRelay2'],
                    fan2:device_cache['fan2'],
                    overFan2:device_cache['overFan2'],
                    timestamp:device_cache['timestamp'],
                    remark:device_cache['remark'],
                   //device_cache:device_cache,
                }; 
                tempData.push(va);
                tempData2.push(RSdata);
          }
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
           //filter: filter2,
            data: tempData2,
        },
        message: 'list mqtt success..',
        message_th: 'lists mqtt success..',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'mqtt list paginate' })
  @Get('listmqttpaginate')
  async mqtt_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 10;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.mqtt_id = query.mqtt_id || '';  
      filter.host = query.host || '';  
      filter.port = query.port || '';  
      filter.username = query.username || '';  
      filter.password = query.password || '';  
      filter.type_name = query.type_name || '';  
      filter.updateddate = query.updateddate || '';  
      filter.mqtt_type_id = query.mqtt_type_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.mqtt_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.mqtt_id = query.mqtt_id || '';  
      filter2.host = query.host || '';  
      filter2.port = query.port || '';  
      filter2.username = query.username || '';  
      filter2.password = query.password || '';  
      filter2.type_name = query.type_name || '';  
      filter2.updateddate = query.updateddate || '';   
      filter2.mqtt_type_id = query.mqtt_type_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
   
        let mqtt_id:any = ResultData[key].mqtt_id;
        let filterRss:any={};
        filterRss.mqtt_id = mqtt_id; 
        var rss_device:any=await this.settingsService.device_lists(filterRss); 
        let rss_device_count:any= rss_device.length;
        const RSdata:any={  
            mqtt_id: ResultData[key].mqtt_id,
            mqtt_name: ResultData[key].mqtt_name,
           // host_name: ResultData[key].host_name, 
           // host: ResultData[key].host, 		
            org: ResultData[key].org, 		
            bucket: ResultData[key].bucket, 		
            envavorment: ResultData[key].envavorment, 	 
            mqtt_type_id: ResultData[key].mqtt_type_id, 
           // port: ResultData[key].port, 
           // username: ResultData[key].username,  
           // password: ResultData[key].password,
            updateddate: ResultData[key].updateddate, 
            type_name: ResultData[key].type_name, 
            status: ResultData[key].status, 
            device_count: rss_device_count, 
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
           //filter: filter2,
            data: tempData2,
        },
        message: 'list mqtt success..',
        message_th: 'lists mqtt success..',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'mqtt list paginate' })
  @Get('listmqttdevicepaginate')
  async mqtt_list_device_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'mqtt_id-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.mqtt_id = query.mqtt_id || '';  
      filter.host = query.host || '';  
      filter.port = query.port || '';  
      filter.username = query.username || '';  
      filter.password = query.password || '';  
      filter.type_name = query.type_name || '';  
      filter.updateddate = query.updateddate || '';  
      filter.mqtt_type_id = query.mqtt_type_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.mqtt_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.mqtt_id = query.mqtt_id || '';  
      filter2.host = query.host || '';  
      filter2.port = query.port || '';  
      filter2.username = query.username || '';  
      filter2.password = query.password || '';  
      filter2.type_name = query.type_name || '';  
      filter2.updateddate = query.updateddate || '';   
      filter2.mqtt_type_id = query.mqtt_type_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
      

      // const rss:any=await Cache.GetCacheData(device); 
        let mqtt_id:any = ResultData[key].mqtt_id;
        let filterRss:any={};
        filterRss.mqtt_id = mqtt_id;
        let rss_device:any=await this.settingsService.device_lists(filterRss);
        const RSdata:any={  
            mqtt_id: ResultData[key].mqtt_id,
            mqtt_name: ResultData[key].mqtt_name,
            host_name: ResultData[key].host_name, 
            host: ResultData[key].host, 		  
            mqtt_type_id: ResultData[key].mqtt_type_id, 
            port: ResultData[key].port, 
            username: ResultData[key].username,  
            password: ResultData[key].password,
            updateddate: ResultData[key].updateddate, 
            type_name: ResultData[key].type_name, 
            status: ResultData[key].status,   
            device: rss_device, 
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list mqtt success..',
        message_th: 'lists mqtt success..',
      });
  }   
  /********Line**********/    
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'line all' })
  @Get('lineall')
  async list_line_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.line_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'line_all success.',
        message_th: 'line_all  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'line list group' })
  @Get('listlinepage')
  async line_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.line_id = query.line_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || '';  
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.line_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';    
      filter2.line_id = query.line_id || '';
      filter2.status = status || '';  
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.line_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs:any={  
          line_id: ResultData[key].line_id,  
          line_name: ResultData[key].line_name,   
          client_id: ResultData[key].client_id,  
          client_secret: ResultData[key].client_secret,  
          secret_key: ResultData[key].secret_key, 
          redirect_uri: ResultData[key].redirect_uri, 
          grant_type: ResultData[key].grant_type,    
          code: ResultData[key].code,   
          accesstoken: ResultData[key].accesstoken,   
          status: ResultData[key].status,    
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list group success.',
        message_th: 'lists group success.',
      });
  }  
  /********Nodered**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'nodered all' })
  @Get('noderedall')
  async list_nodered_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.nodered_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'nodered_all success.',
        message_th: 'nodered_all  success.',
      });
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'nodered list paginate' })
  @Get('listnoderedpaginate')
  async nodered_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
     // filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.nodered_id = query.nodered_id || '';  
      filter.host = query.host || '';  
      filter.port = query.port || '';  
      filter.username = query.username || '';  
      filter.password = query.password || '';  
      filter.type_name = query.type_name || '';  
      filter.updateddate = query.updateddate || '';   
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.nodered_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      //filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.nodered_id = query.nodered_id || '';  
      filter2.host = query.host || '';  
      filter2.port = query.port || '';  
      filter2.username = query.username || '';  
      filter2.password = query.password || '';  
      filter2.type_name = query.type_name || '';  
      filter2.updateddate = query.updateddate || '';     
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.nodered_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const RSdata:any={  	  
          nodered_id: ResultData[key].nodered_id,
          nodered_name: ResultData[key].nodered_name,
          routing: ResultData[key].routing, 
          client_id: ResultData[key].client_id, 
          grant_type: ResultData[key].grant_type, 
          scope: ResultData[key].scope, 
          host: ResultData[key].host, 		  
          nodered_type_id: ResultData[key].nodered_type_id, 
          port: ResultData[key].port, 
          username: ResultData[key].username,  
          password: ResultData[key].password, 
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ), 
          type_name: ResultData[key].type_name,  
          status: ResultData[key].status,   
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list nodered success..',
        message_th: 'lists nodered success..',
      });
  }
  /********Schedule**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'schedule all' })
  @Get('scheduleall')
  async list_schedule_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const schedule_id: number = Number(query.schedule_id) || 1;
      const dto:any={
                        schedule_id:schedule_id,
                      }
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.schedule_all(dto);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'schedule_all success.',
        message_th: 'schedule_all  success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'scheduled list paginate' })
  @Get('listschedulepage')
  async schedule_list_page(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.schedule_id= query.schedule_id;
      filter.device_id= query.device_id;
      filter.start= query.start;
      filter.event= query.event; 
      filter.sunday= query.sunday;
      filter.monday= query.monday; 
      filter.tuesday= query.tuesday; 
      filter.wednesday= query.wednesday; 
      filter.thursday= query.thursday; 
      filter.friday= query.friday;
      filter.saturday= query.saturday;  
	    filter.status = query.status || '';  
      filter.updateddate= query.updateddate; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.schedule_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.schedule_id=query.schedule_id;
      filter2.device_id=query.device_id;
      filter2.start=query.start;
      filter2.event=query.event; 
      filter2.sunday=query.sunday;
      filter2.monday=query.monday; 
      filter2.tuesday=query.tuesday; 
      filter2.wednesday=query.wednesday; 
      filter2.thursday=query.thursday; 
      filter2.friday=query.friday;
      filter2.saturday=query.saturday;  
	    filter2.status = query.status || '';  
      filter2.updateddate=query.updateddate;
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.schedule_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
       // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 

      let filterDATA:any={};  
        filterDATA.schedule_id=ResultData[key].schedule_id;
        let countRs:any=await this.settingsService.scheduledeviceCOUNT(filterDATA);
        const RSdata:any={  
			       schedule_id: ResultData[key].schedule_id,
             schedule_name: ResultData[key].schedule_name,
             device_id: ResultData[key].device_id,
             start: ResultData[key].start,
             event: ResultData[key].event, 
             sunday: ResultData[key].sunday,
             monday: ResultData[key].monday, 
             tuesday: ResultData[key].tuesday, 
             wednesday: ResultData[key].wednesday, 
             thursday: ResultData[key].thursday, 
             friday: ResultData[key].friday,
             saturday: ResultData[key].saturday,  
             createddate: format.timeConvertermas(format.convertTZ( ResultData[key].createddate, process.env.tzString)),
             updateddate: format.timeConvertermas(format.convertTZ( ResultData[key].updateddate, process.env.tzString)),
             status: ResultData[key].status,     
             countRs:countRs
        }; 
        tempData.push(va);
        tempData2.push(RSdata);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list scheduled success..',
        message_th: 'lists scheduled success..',
      });
  }   
  /********Sms**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'sms all' })
  @Get('smsall')
  async list_sms_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.sms_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'sms_all success.',
        message_th: 'sms_all  success.',
      });
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'sms list group' })
  @Get('listsmspage')
  async sms_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.sms_id = query.sms_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || '';  
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.sms_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = sort;
      filter2.keyword = keyword || '';    
      filter2.sms_id = query.sms_id || '';
      filter2.status = status || '';  
	    filter2.port = query.port || ''; 
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.sms_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        var createddate:any=ResultData[key].createddate;
        var updateddate1:any=ResultData[key].updateddate;
        // var updateddate:any=format.timeConvertermas(
        //     format.convertTZ(ResultData[key].createddate, process.env.tzString),
        //   );
        const ProfileRs:any={ 
          sms_id: ResultData[key].sms_id,  
          sms_name: ResultData[key].sms_name,   
          host: ResultData[key].host,  
          port: ResultData[key].port,  
          username: ResultData[key].username,  
          password: ResultData[key].password, 
          apikey: ResultData[key].apikey, 
          originator: ResultData[key].originator, 
          status: ResultData[key].status,   
          createddate: createddate,
          updateddate: updateddate1,
        };  
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'list sms success.',
        message_th: 'lists sms success.',
      });
  }   
  /********Token**********/   
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'token all' })
  @Get('tokenall')
  async list_token_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto:any='';
      console.log(`dto=`);
      console.info(dto);
      let ResultData:any=await this.settingsService.token_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'token_all success.',
        message_th: 'token_all  success.',
      });
  }   
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'token ' })
  @Get('tokensmspage')
  async token_list_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status:any=query.status || '';
      let select_status:any=query.select_status || '';
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = sort;
	    filter.token_id = query.token_id || '';
      filter.keyword = query.keyword || '';    
      filter.host = query.host || '';  
	    filter.status = query.status || '';  
	    filter.port = query.port || ''; 
		  filter.username = query.username || '';   
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData:any=await this.settingsService.token_list_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = query.sort;
      filter2.keyword = query.keyword || '';    
      filter2.token_id = query.token_id || '';
      filter2.status = query.status || '';  
	    filter2.host = query.host || '';   
	    filter2.port = query.port || ''; 
		  filter2.username = query.username || '';  
      filter2.password = query.password || ''; 
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.token_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs:any={ 
          token_id: ResultData[key].token_id,  
          token_name: ResultData[key].token_name,  
		      host: ResultData[key].host, 		  
          port: ResultData[key].port,  
          token_value: ResultData[key].token_value,  
          username: ResultData[key].username,  
          password: ResultData[key].password, 
          status: ResultData[key].status,   
          createddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].createddate, process.env.tzString),
          ),
          updateddate: format.timeConvertermas(
            format.convertTZ(ResultData[key].updateddate, process.env.tzString),
          ),  
        }; 
        tempData.push(va);
        tempData2.push(ProfileRs);
      }
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempData2,
        },
        message: 'token_value  success.',
        message_th: 'token_values  success.',
      });
  }
  /************************create************************/
  /************create_setting***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createsetting')
  async create_setting(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateSettingDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
    const Rs:any=await this.settingsService.get_setting_sn(DataDto.sn);
    if (Rs) {
        console.log('dto.sn=>' + DataDto.sn); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  sn: DataDto.sn },
          message: 'The SN  duplicate this data cannot createddate.',
          message_th: 'ข้อมูล SN '+DataDto.sn+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }  
    await this.settingsService.create_setting(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
 /************create_location***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createlocation')
  async create_location(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateLocationDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }  
    const Rs:any=await this.settingsService.get_location_ip(DataDto.ipaddress);
    if (Rs) {
        console.log('ipaddress>' + DataDto.ipaddress); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  ipaddress: DataDto.ipaddress },
          message: 'The ipaddress  duplicate this data cannot create.',
          message_th: 'ข้อมูล ipaddress '+DataDto.ipaddress+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }  
    await this.settingsService.create_location(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /************create_type***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createtype')
  async create_type(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateTypeDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_type_name(DataDto.type_name);
    if (Rs) {
        console.log('type_name=>' + DataDto.type_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  type_name: DataDto.type_name },
          message: 'The type_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล type_name '+DataDto.type_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_type(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
   /************createdevicetype***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createdevicetype')
  async create_device_type(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateTypeDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_type_name(DataDto.type_name);
    if (Rs) {
        console.log('type_name=>' + DataDto.type_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  type_name: DataDto.type_name },
          message: 'The type_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล type_name '+DataDto.type_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_device_type(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /************create_sensor***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createsensor')
  async create_sensor(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateSensorDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_sensor_chk(DataDto.sensor_name);
    if (Rs) {
        console.log('sensor_name=>' + DataDto.sensor_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  sensor_name: DataDto.sensor_name },
          message: 'The sensor_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล sensor_name '+DataDto.sensor_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    } 
    await this.settingsService.create_sensor(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /************create_group***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('creategroup')
  async create_group(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateGroupDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_group(DataDto.group_name);
    if (Rs) {
        console.log('group_name=>' + DataDto.group_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  group_name: DataDto.group_name },
          message: 'The group_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล group_name '+DataDto.group_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_group(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /************create_mqtt***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createmqtt')
  async create_mqtt(
    @Res() res: Response,
   // @Body() DataDto: any,
    @Body(new ValidationPipe()) DataDto: CreateMqttDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_mqtt(DataDto.mqtt_name);
    if (Rs) {
        console.log('mqtt_name=>' + DataDto.mqtt_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  mqtt_name: DataDto.mqtt_name },
          message: 'The mqtt_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล mqtt_name '+DataDto.mqtt_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
   // get_maxId_mqtt
    var sort_lasst:any=await this.settingsService.mqtt_last_sort();
    var sort_last: any =sort_lasst+1;
    var mqtt_id:any=await this.settingsService.get_maxId_mqtt();
    console.log('mqtt_id='); console.info(mqtt_id);
    var DataDtos:any={
          mqtt_id: mqtt_id, 
          mqtt_type_id: DataDto.mqtt_type_id, 
          location_id: DataDto.location_id, 
          sort: sort_last,//DataDto.sort,
          mqtt_name: DataDto.mqtt_name,
          host: DataDto.host,
          port: DataDto.port,
          username: DataDto.username,
          password: DataDto.password,
          secret: DataDto.secret,
          expire_in: DataDto.expire_in,
          token_value: DataDto.token_value,
          org: DataDto.org,
          bucket: DataDto.bucket,
          envavorment: DataDto.envavorment,
          status: DataDto.status,
          latitude: DataDto.latitude,
          longitude: DataDto.longitude
    }
    console.log(`createmqttDataDtos=`);
    console.info(DataDtos);
    await this.settingsService.create_mqtt(DataDtos); 
    res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('mqtttsort')
  async update_mqttt_sort(
    @Res() res: Response,
   //@Body() dto: any,
    @Body() DataDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }  if (!DataDto.mqtt_id) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data mqtt_id is null.',
        message_th: 'ไม่พบข้อมูล mqtt_id.',
      });
      return;
    }  
    if (!DataDto.sort) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data sort is null.',
        message_th: 'ไม่พบข้อมูล sort.',
      });
      return;
    }   
    var DataDtos:any={
          mqtt_id: DataDto.mqtt_id, 
          sort: DataDto.sort,
    }
    await this.settingsService.update_mqttt_sort(DataDtos); 
    res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Api**********/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createapi')
  async create_api(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: ApiDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_api(DataDto.api_name);
    if (Rs) {
        console.log('api_name=>' + DataDto.api_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  api_name: DataDto.api_name },
          message: 'The api_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล api_name '+DataDto.api_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_api(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Device**********/ 
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createdevice')
  async create_device(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: DeviceDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_sn(DataDto.sn);
    if (Rs) {
        console.log('SN=>' + DataDto.sn); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  device_name: DataDto.sn },
          message: 'The SN  duplicate this data cannot create.',
          message_th: 'ข้อมูล SN '+DataDto.sn+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_device(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Email**********/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createemail')
  async create_email(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: EmailDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_email(DataDto.email_name);
    if (Rs) {
        console.log('email_name=>' + DataDto.email_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  email_name: DataDto.email_name },
          message: 'The email_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล email_name '+DataDto.email_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_email(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Email**********/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createmqtthost')
  async create_mqtthost(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: EmailDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_mqtthost(DataDto.email_name);
    if (Rs) {
        console.log('email_name=>' + DataDto.email_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  email_name: DataDto.email_name },
          message: 'The email_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล email_name '+DataDto.email_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_mqtthost(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Host**********/ 
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createhost')
  async create_host(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: HostDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_email(DataDto.host_name);
    if (Rs) {
        console.log('host_name=>' + DataDto.host_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  host_name: DataDto.host_name },
          message: 'The host_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล host_name '+DataDto.host_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_host(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Influxdb**********/ 
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createinfluxdb')
  async create_influxdb(
    @Res() res: Response,
    @Body() DataDto: any,
    //@Body(new ValidationPipe()) DataDto: InfluxdbDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    // const Rs:any=await this.settingsService.get_name_create_influxdb(DataDto.influxdb_name);
    // if (Rs) {
    //     console.log('influxdb_name=>' + DataDto.influxdb_name); 
    //     res.status(200).json({
    //       statusCode: 200,
    //       code: 422,
    //       payload: {  influxdb_name: DataDto.influxdb_name },
    //       message: 'The influxdb_name  duplicate this data cannot create.',
    //       message_th: 'ข้อมูล influxdb_name '+DataDto.influxdb_name+' ซ้ำไม่สามารถเพิ่มได้.',
    //     });
    //     return;
    //    //throw new UnprocessableEntityException();
    // }   
    await this.settingsService.create_influxdb(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Line**********/     
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createline')
  async create_line(
    @Res() res: Response,
    @Body() DataDto: any,
    //@Body(new ValidationPipe()) DataDto: LineDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_line(DataDto.line_name);
    if (Rs) {
        console.log('line_name=>' + DataDto.line_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  line_name: DataDto.line_name },
          message: 'The line_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล line_name '+DataDto.line_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_line(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Nodered**********/  
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createnodered')
  async create_nodered(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: NoderedDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_nodered(DataDto.nodered_name);
    if (Rs) {
        console.log('nodered_name=>' + DataDto.nodered_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  nodered_name: DataDto.nodered_name },
          message: 'The nodered_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล nodered_name '+DataDto.nodered_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_nodered(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Schedule**********/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createschedule')
  async create_schedule(
    @Body(new ValidationPipe()) dataDto: SchedulDto,
  ): Promise<any> {
   // ตรวจสอบข้อมูลที่ส่งมา
    if (!dataDto) {
      return {
        statusCode: 422,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      };
    }

   // ตรวจสอบชื่อ schedule ซ้ำ
    const isDuplicate = await this.settingsService.get_name_create_schedule(dataDto.schedule_name);
    if (isDuplicate) {
      return {
        statusCode: 409,
        code: 409,
        payload: { schedule_name: dataDto.schedule_name },
        message: 'The schedule_name is duplicate, cannot create.',
        message_th: `ข้อมูล schedule_name ${dataDto.schedule_name} ซ้ำไม่สามารถเพิ่มได้.`,
      };
    }

   // สร้างข้อมูลใหม่
    await this.settingsService.create_schedule(dataDto);
    return {
      statusCode: 201,
      code: 201,
      payload: dataDto,
      message: 'Create Data successfully.',
      message_th: 'เพิ่มข้อมูลสำเร็จ.',
    };
  }
   /********create_scheduleDevice**********/  
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createscheduledevice')
  async create_scheduleDevice(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: scheduleDevice,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.findOnescheduledevice(DataDto.schedule_id);
    if (Rs) {
        console.log('schedule_id=>' + DataDto.schedule_id); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  schedule_id: DataDto.schedule_id },
          message: 'The schedule_id  duplicate this data cannot create.',
          message_th: 'ข้อมูล schedule_id '+DataDto.schedule_id+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.createscheduledevice(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Sms**********/  
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createsms')
  async create_sms(
    @Res() res: Response,
    @Body() DataDto: any,
    //@Body(new ValidationPipe()) DataDto: SmsDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_sms(DataDto.sms_name);
    if (Rs) {
        console.log('sms_name=>' + DataDto.sms_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  sms_name: DataDto.sms_name },
          message: 'The sms_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล sms_name '+DataDto.sms_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_sms(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_Token**********/   
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createtoken') 
  async create_token(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: TokenDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_token(DataDto.token_name);
    if (Rs) {
        console.log('token_name=>' + DataDto.token_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  token_name: DataDto.token_name },
          message: 'The token_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล token_name '+DataDto.token_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_token(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /********create_telegram_**********/ 
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createtelegram')
  async create_telegram(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: TelegramDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_name_create_telegram(DataDto.telegram_name);
    if (Rs) {
        console.log('telegram_name=>' + DataDto.telegram_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  telegram_name: DataDto.telegram_name },
          message: 'The telegram_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล telegram_name '+DataDto.telegram_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_telegram(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
/********create_deviceactionuser**********/ 
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('deviceactionuser')
  async Deviceactionuser(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: DeviceActionuserDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs:any=await this.settingsService.get_deviceactionuserlog(DataDto.alarm_action_id);
    if (Rs) {
        console.log('alarm_action_id=>' + DataDto.alarm_action_id); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  alarm_action_id: DataDto.alarm_action_id },
          message: 'The alarm_action_id  duplicate this data cannot create.',
          message_th: 'ข้อมูล alarm_action_id '+DataDto.alarm_action_id+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_deviceactionuserlog(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /************************update************************/
  /****************update_setting*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_setting' })
  @Post('updatesetting')
  async update_setting(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    const Rs:any=await this.settingsService.get_setting(dto.setting_id);
    if (!Rs) {
        console.log('setting_id>' + dto.setting_id); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  setting_id: dto.setting_id },
          message: 'setting_id information not found..',
          message_th: 'ไม่พบข้อมูล setting_id '+dto.setting_id,
        });
        return;
       //throw new UnprocessableEntityException();
    } 
    const setting_id: string = dto.setting_id; 
    if (!setting_id) {
      const setting_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + setting_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + setting_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.setting_id = setting_id;
    if (dto.location_id) {
            DataUpdate.location_id = dto.location_id;
    }
    if (dto.setting_type_id) {
            DataUpdate.setting_type_id = dto.setting_type_id;
    }
    if (dto.setting_name) {
            DataUpdate.setting_name = dto.setting_name;
    }
    if (dto.sn) {
            DataUpdate.sn = dto.sn;
    }  
    if (dto.status) {
            DataUpdate.status = dto.status;
    }     
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_setting(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************update_location*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_location' })
  @Post('updatelocation')
  async update_location(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    const Rs:any=await this.settingsService.get_location(dto.location_id);
    if (!Rs) {
        console.log('ipaddress>' + dto.location_id); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  location_id: dto.location_id },
          message: 'Location_id information not found..',
          message_th: 'ไม่พบข้อมูล location_id '+dto.location_id,
        });
        return;
       //throw new UnprocessableEntityException();
    } 
    const location_id: string = dto.location_id; 
    if (!location_id) {
      const location_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + location_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + location_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.location_id = location_id;
    if (dto.location_name) {
        DataUpdate.location_name = dto.location_name;
    }
    if (dto.ipaddress) {
        DataUpdate.ipaddress = dto.ipaddress;
    }
    if (dto.location_detail) {
        DataUpdate.location_detail = dto.location_detail;
    }  
    if (dto.configdata) {
        DataUpdate.configdata = dto.configdata;
    }   
    if (dto.status) {
        DataUpdate.status = dto.status;
    }   
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_location(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************update_type*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_type' })
  @Post('updatetype')
  async update_type(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    const type_id: string = dto.type_id; 
    if (!type_id) {
      const type_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + type_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + type_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.type_id = type_id;
    if (dto.type_name) {
        DataUpdate.type_name = dto.type_name;
    }
    if (dto.group_id) {
        DataUpdate.group_id = dto.group_id;
    } 
    if (dto.status) {
        DataUpdate.status = dto.status;
    }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_type(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************update_type*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_device_type' })
  @Post('updatedevicetype')
  async update_device_type(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    const type_id: string = dto.type_id; 
    if (!type_id) {
      const type_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + type_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + type_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.type_id = type_id;
    if (dto.type_name) {
        DataUpdate.type_name = dto.type_name;
    }
    if (dto.status) {
        DataUpdate.status = dto.status;
    }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_device_type(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************update_sensor*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_sensor' })
  @Post('updatesensor')
  async update_sensor(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    const sensor_id: string = dto.sensor_id; 
    if (!sensor_id) {
      const sensor_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + sensor_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + sensor_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.sensor_id = sensor_id;
        if (dto.setting_type_id) {
            DataUpdate.setting_type_id = dto.setting_type_id;
        } 
        if (dto.sensor_name) {
            DataUpdate.sensor_name = dto.setting_type_id;
        } 
        if (dto.sn) {
            DataUpdate.sn = dto.sn;
        } 
        if (dto.max) {
            DataUpdate.max = dto.max;
        } 
        if (dto.min) {
            DataUpdate.min = dto.min;
        } 
        if (dto.hardware_id) {
            DataUpdate.hardware_id = dto.hardware_id;
        } 
        if (dto.status_high) {
            DataUpdate.status_high = dto.status_high;
        } 
        if (dto.status_warning) {
            DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.status_alert) {
            DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.model) {
            DataUpdate.model = dto.model;
        } 
        if (dto.vendor) {
            DataUpdate.vendor = dto.vendor;
        } 
        if (dto.comparevalue) {
            DataUpdate.comparevalue = dto.comparevalue;
        } 
        if (dto.updateddate){
            DataUpdate.updateddate = dto.updateddate;
         } 
        if (dto.status) {
            DataUpdate.status = dto.status;
        } 
        if (dto.unit) {
            DataUpdate.unit = dto.unit;
        } 
        if (dto.mqtt_id) {
            DataUpdate.mqtt_id = dto.mqtt_id;
        } 
        if (dto.action_id) {
            DataUpdate.action_id = dto.action_id;
        } 
        if (dto.status_alert_id) {
            DataUpdate.status_alert_id = dto.status_alert_id;
         } 
        if (dto.mqtt_data_value) {
            DataUpdate.mqtt_data_value = dto.mqtt_data_value;
        } 
        if (dto.mqtt_data_control) {
            DataUpdate.mqtt_data_control = dto.mqtt_data_control;
        }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_sensor(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************update_group*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_group' })
  @Post('updategroup')
  async update_group(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    const group_id: string = dto.group_id; 
    if (!group_id) {
      const group_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + group_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + group_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.group_id = group_id;
        if (dto.group_id) {
            DataUpdate.group_id = dto.group_id;
        } 
        
        if (dto.group_name) {
            DataUpdate.group_name = dto.group_name;
        }      
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt:any=await this.settingsService.update_group(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  } 
  /****************update_mqtt*************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_mqtt' })
  @Post('updatemqtt')
  async update_mqtt(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var mqtt_id: string = dto.mqtt_id; 
    var status: string = dto.status; 
    if (!mqtt_id) {
      const mqtt_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + mqtt_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + mqtt_id + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate:any={};
        DataUpdate.mqtt_id = mqtt_id;
        if (dto.mqtt_type_id) {
            DataUpdate.mqtt_type_id = dto.mqtt_type_id;
        }if (dto.location_id) {
            DataUpdate.location_id = dto.location_id;
        }if (dto.mqtt_name) {
            DataUpdate.mqtt_name = dto.mqtt_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }if (dto.secret) {
            DataUpdate.secret = dto.secret;
        }if (dto.expire_in) {
            DataUpdate.expire_in = dto.expire_in;
        }if (dto.token_value) {
            DataUpdate.token_value = dto.token_value;
        }if (dto.org) {
            DataUpdate.org = dto.org;
        }if (dto.bucket) {
            DataUpdate.bucket = dto.bucket;
        }if (dto.envavorment) {
            DataUpdate.envavorment = dto.envavorment;
        }if (dto.latitude) {
            DataUpdate.latitude = dto.latitude;
        }if (dto.longitude) {
            DataUpdate.longitude = dto.longitude;
        }   
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_mqtt(DataUpdate);
    var rsbucket:any=await this.settingsService.get_mqtt(mqtt_id);
   // var mqtt_name: any =rsbucket['mqtt_name'];
   // var org: any =rsbucket['org'];
    var rs_bucket: any =rsbucket.bucket;
    var org: any =rsbucket.org; 
    if (rt && rt == 200) {
        var result:any={
              statusCode: 200,
              code: 200, 
              mqtt_id:mqtt_id,
              bucket: rs_bucket,
              payload: DataUpdate,
              payload2: rt,
              DataUpdate: DataUpdate, 
              message: 'Update successful.',
              message_th: 'อัปเดต  สำเร็จ.',
        };
        res.status(200).json(result);
    } else {
        var result:any={
            statusCode: 200,
            code: 422,
            payload: DataUpdate,
            rt: rt,
            message: 'Update Unsuccessful',
            message_th: 'อัปเดต ไม่สำเร็จ',
        };
      res.status(200).json(result);
    }
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updatemqttstatus')
  async update_mqtt_status(
    @Res() res: Response,
    @Body() dto: updatemqttstatusDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: dto,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var mqtt_id: number = dto.mqtt_id;  
    if (mqtt_id==null) { 
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + mqtt_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + mqtt_id + '.',
      };
      res.status(200).json(result);
    } 
    var status: number = dto.status; 
    if (status==null) {
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate:any={};
        DataUpdate.mqtt_id = mqtt_id;
        DataUpdate.status = status;
   // console.log(`DataUpdate=>`);
   // console.info(DataUpdate);
    var rsbucket:any=await this.settingsService.get_mqtt(mqtt_id);
    let rsbucket_count:any=rsbucket.length;
    if(rsbucket_count!=0){
       var rt:any=await this.settingsService.update_mqtt_status(mqtt_id,status);
    }else{
       var rt:any=await this.settingsService.update_mqtt_status(mqtt_id,0);
    }
   if(rsbucket_count!=0){
         // let filter2:any={};
         // filter2.bucket = rsbucket.bucket ;
         // let device:any=await this.settingsService.device_lists_id(filter2);
         // let device_count:any=device.length;
         // var mqtt_name: any =rsbucket['mqtt_name'];
         // var org: any =rsbucket['org'];
            var rs_bucket: any =rsbucket.bucket;
            var org: any =rsbucket.org;
            if (rt) {
                var DataUpdate2:any={};
                DataUpdate2.mqtt_id = mqtt_id; 
                DataUpdate2.bucket = rs_bucket; 
                DataUpdate2.status = dto.status;
                var mqtt_bucket:any=await this.settingsService.update_device_mqtt_status(rs_bucket,status) ;      
            } 
    }
   // http://192.168.1.59:3003/v1/settings/updatemqtt
    if (rt) {
        var result:any={
              statusCode: 200,
              code: 200, 
              mqtt_id:mqtt_id,
              bucket: rs_bucket,
              payload: DataUpdate,
              DataUpdate: DataUpdate,
              DataUpdate2:DataUpdate2,
              mqtt_bucket:mqtt_bucket,
              rt: rt,
              message: 'Update successful.',
              message_th: 'อัปเดต  สำเร็จ.',
        };
        res.status(200).json(result);
    } else {
        var result:any={
            statusCode: 200,
            code: 422,
            payload: DataUpdate,
            rt: rt,
            message: 'Update Unsuccessful',
            message_th: 'อัปเดต ไม่สำเร็จ',
        };
      res.status(200).json(result);
    }
  }
  /********update_Api**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_api' })
  @Post('updateapi')
  async update_api(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var api_id: string = dto.api_id; 
    if (!api_id) {
      var api_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + api_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + api_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.api_id = api_id;
        if (dto.api_name) {
            DataUpdate.api_name = dto.api_name;
        }if (dto.mqtt_name) {
            DataUpdate.mqtt_name = dto.mqtt_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.token_value) {
            DataUpdate.token_value = dto.token_value;
        }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_api(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /********update_Device**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_device' })
  @Post('updatedevice')
  async update_device(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
    var device_id: string = dto.device_id; 
    if (!device_id) {
      var device_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + device_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + device_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
        DataUpdate.device_id = device_id; 
        if (dto.setting_id) {
            DataUpdate.setting_id = dto.setting_id;
        }
        if (dto.type_id) {
            DataUpdate.type_id = dto.type_id;
        }  
        if (dto.location_id) {
            DataUpdate.location_id = dto.location_id;
        }   
        if (dto.device_name) {
            DataUpdate.device_name = dto.device_name;
        }
        if (dto.sn) {
            DataUpdate.sn = dto.sn;
        } 
        if (dto.max) {
            DataUpdate.max = dto.max;
        } 
        if (dto.min) {
            DataUpdate.min = dto.min;
        } 
        if (dto.hardware_id) {
            DataUpdate.hardware_id = dto.hardware_id;
        } 
        if (dto.status_warning) {
          DataUpdate.status_warning = dto.status_warning;
        }
        if (dto.recovery_warning) {
          DataUpdate.recovery_warning = dto.hardware_id;
        }
        if (dto.status_alert) {
          DataUpdate.status_alert = dto.status_alert;
        }
        if (dto.recovery_alert) {
          DataUpdate.recovery_alert = dto.recovery_alert;
        }
        if (dto.time_life) {
           DataUpdate.time_life = dto.time_life;
        }
        if (dto.period) {
          DataUpdate.period = dto.period;
        } 
        if (dto.model) {
            DataUpdate.model = dto.model;
        } 
        if (dto.vendor) {
            DataUpdate.vendor = dto.vendor;
        } 
        if (dto.comparevalue) {
            DataUpdate.comparevalue = dto.comparevalue;
        } 
        if (dto.updateddate){
            DataUpdate.updateddate = dto.updateddate;
        }  
        if (dto.unit) {
            DataUpdate.unit = dto.unit;
        } 
        if (dto.mqtt_id) {
            DataUpdate.mqtt_id = dto.mqtt_id;
        } 
        if (dto.action_id) {
            DataUpdate.action_id = dto.action_id;
        } 
        if (dto.status_alert_id) {
            DataUpdate.status_alert_id = dto.status_alert_id;
        } 
        if (dto.oid) {
            DataUpdate.oid = dto.oid;
        }  
        if (dto.mqtt_data_value) {
            DataUpdate.mqtt_data_value = dto.mqtt_data_value;
        }
        if (dto.mqtt_data_control) {
            DataUpdate.mqtt_data_control = dto.mqtt_data_control;
        }
        if (dto.measurement) {
            DataUpdate.measurement = dto.measurement;
        } 
        if (dto.mqtt_control_on) {
                    DataUpdate.mqtt_control_on = dto.mqtt_control_on;
        } 
        if (dto.mqtt_control_off) {
                    DataUpdate.mqtt_control_off = dto.mqtt_control_off;
        }
        if (dto.org) {
            DataUpdate.org = dto.org;
        }
        if (dto.bucket) {
            DataUpdate.bucket = dto.bucket;
        }  
        if (dto.status) {
            DataUpdate.status = dto.status;
        }
        if (dto.mqtt_device_name) {
            DataUpdate.mqtt_device_name = dto.mqtt_device_name;
        } 
        if (dto.mqtt_status_over_name) {
            DataUpdate.mqtt_status_over_name = dto.mqtt_status_over_name;
        } 
        if (dto.mqtt_status_data_name) {
            DataUpdate.mqtt_status_data_name = dto.mqtt_status_data_name;
        } 
        if (dto.mqtt_act_relay_name) {
            DataUpdate.mqtt_act_relay_name = dto.mqtt_act_relay_name;
        } 
        if (dto.mqtt_control_relay_name) {
            DataUpdate.mqtt_control_relay_name = dto.mqtt_control_relay_name;
        }  
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_device(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /********update_Email**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_email' })
  @Post('updateemail')
  async update_email(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var email_id: string = dto.email_id; 
    if (!email_id) {
      var email_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + email_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + email_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.email_id = email_id; 
		if (dto.email_type_id) {
            DataUpdate.email_type_id = dto.email_type_id;
        }if (dto.email_name) {
            DataUpdate.email_name = dto.email_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }  
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_email(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updateemailstatus')
  async updateemailstatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var email_id: any = dto.email_id;  
      if (email_id==null) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + email_id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + email_id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.email_id = email_id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsbucket:any=await this.settingsService.get_email(email_id);
      let rsbucket_count:any=rsbucket.length;
      if(rsbucket_count!=0){
         var rt:any=await this.settingsService.update_email_status(email_id,1);
      }else{
         var rt:any=await this.settingsService.update_email_status(email_id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                email_id:email_id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
   /********update_Email**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtthost' })
  @Post('updatemqtthost')
  async update_mqtthost(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var id: string = dto.id; 
    if (!id) {
      var id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
        DataUpdate.id = id; 
        if (dto.hostname) {
            DataUpdate.hostname = dto.hostname;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }  
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_mqtthost(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update _mqtthost status' })
  @Post('updatemqtthoststatus')
  async update_mqtthoststatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var id: any = dto.id;  
      if (id==null) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.id = id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsbucket:any=await this.settingsService.get_mqtthost(id);
      let rsbucket_count:any=rsbucket.length;
      if(rsbucket_count!=0){
         var rt:any=await this.settingsService.update_mqtthost_status(id,1);
      }else{
         var rt:any=await this.settingsService.update_mqtthost_status(id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                id:id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
  /********update_Host**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_host' })
  @Post('updatehost')
  async update_host(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var host_id: string = dto.host_id; 
    if (!host_id) {
      var host_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + host_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + host_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.host_id = host_id;  
        if (dto.host_type_id) {
            DataUpdate.host_type_id = dto.host_type_id;
        }if (dto.host_name) {
            DataUpdate.host_name = dto.host_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_host(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /********update_Influxdb**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_influxdb' })
  @Post('updateinfluxdb')
  async update_influxdb(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var influxdb_id: string = dto.influxdb_id; 
    if (!influxdb_id) {
      var influxdb_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + influxdb_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + influxdb_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.influxdb_id = influxdb_id;
        if (dto.influxdb_name) {
            DataUpdate.influxdb_name = dto.influxdb_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }if (dto.token_value) {
            DataUpdate.token_value = dto.token_value;
        }if (dto.buckets) {
            DataUpdate.buckets = dto.buckets;
        }
    
        /*
            sd_iot_influxdb
              influxdb_id: string; 
              influxdb_name: string;
              host: number;
              port: string;
              username: string;
              password: string;
              token_value: string;
              buckets: string;
              createddate: Date;
              updateddate: Date;
              status: number;
        */
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_influxdb(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
   @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updateinfluxdbstatus')
  async updateinfluxdbstatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var influxdb_id: any = dto.influxdb_id;  
      if (influxdb_id==null) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + influxdb_id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + influxdb_id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.influxdb_id = influxdb_id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsbucket:any=await this.settingsService.get_influxdb(influxdb_id);
      let rsbucket_count:any=rsbucket.length;
      if(rsbucket_count!=0){
         var rt:any=await this.settingsService.update_influxdb_status(influxdb_id,1);
      }else{
         var rt:any=await this.settingsService.update_influxdb_status(influxdb_id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                influxdb_id:influxdb_id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
  /********update_Line**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_line' })
  @Post('updateline')
  async update_line(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var line_id: string = dto.line_id; 
    if (!line_id) {
      var line_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + line_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + line_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.line_id = line_id;
        if (dto.line_name) {
            DataUpdate.line_name = dto.line_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_line(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }    
  /********update_Nodered**********/   
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_nodered' })
  @Post('updatenodered')
  async update_nodered(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var nodered_id: string = dto.nodered_id; 
    if (!nodered_id) {
      var nodered_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + nodered_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + nodered_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.nodered_id = nodered_id;
        if (dto.nodered_name) {
            DataUpdate.nodered_name = dto.nodered_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.routing) {
            DataUpdate.routing = dto.routing;
        }if (dto.client_id) {
            DataUpdate.client_id = dto.client_id;
        }if (dto.grant_type) {
            DataUpdate.grant_type = dto.grant_type;
        }if (dto.scope) {
            DataUpdate.scope = dto.scope;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        } 
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_nodered(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /***********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updatenoderedstatus')
  async updatenoderedstatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var nodered_id: any = dto.nodered_id;  
      if (nodered_id==null) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + nodered_id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + nodered_id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.nodered_id = nodered_id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsdata:any=await this.settingsService.get_nodered(nodered_id);
      let rsdata_count:any=rsdata.length;
      if(rsdata_count!=0){
         var rt:any=await this.settingsService.update_nodered_status(nodered_id,1);
      }else{
         var rt:any=await this.settingsService.update_nodered_status(nodered_id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                nodered_id:nodered_id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
  /***********/ 
  /********update_Schedule**********/ 
  @Post('updateschedule')
  @ApiOperation({ summary: 'update_schedule' })
  @HttpCode(200)
  async update_schedule(
    @Body() dto: any,
    @Req() req: any,
  ): Promise<any> {
   // ตรวจสอบ JWT
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        code: 401,
        payload: null,
        message: 'Unauthorized',
        message_th: 'ไม่ได้รับอนุญาต',
      };
    }
    const token = authHeader.replace('Bearer ', '').trim();
    let user: any;
    try {
      user = this.jwtService.decode(token);
    } catch (e) {
      return {
        statusCode: 401,
        code: 401,
        payload: null,
        message: 'Invalid token',
        message_th: 'Token ไม่ถูกต้อง',
      };
    }

   // ตรวจสอบข้อมูลที่ส่งมา
    if (!dto || !dto.schedule_id) {
      return {
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'schedule_id is required.',
        message_th: 'ต้องระบุ schedule_id.',
      };
    }

   // เตรียมข้อมูลสำหรับอัปเดต (รองรับ field ใหม่ได้ง่าย)
    const updatableFields = [
      'schedule_name', 'device_id', 'start', 'event',
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
      'status', 'calendar_time'
    ];
    const DataUpdate:any={ schedule_id: dto.schedule_id };
    for (const key of updatableFields) {
      if (dto[key] !== undefined) {
        DataUpdate[key] = dto[key];
      }
    }

   // เรียก service อัปเดต
    const rt = await this.settingsService.update_schedule(DataUpdate);

   // ส่ง response
    if (rt && rt.code === 200) {
      return {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        message: 'Update successful.',
        message_th: 'อัปเดตสำเร็จ.',
      };
    } else {
      return {
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดตไม่สำเร็จ',
      };
    }
  }
  /********update_Sms**********/   
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_sms' })
  @Post('updatesms')
  async update_sms(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var sms_id: string = dto.sms_id; 
    if (!sms_id) {
      var sms_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + sms_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + sms_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
        DataUpdate.sms_id = sms_id; 
        if (dto.sms_name) {
            DataUpdate.sms_name = dto.sms_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }if (dto.apikey) {
            DataUpdate.apikey = dto.apikey;
        }if (dto.originator) {
            DataUpdate.originator = dto.originator;
        }if (dto.status) {
            DataUpdate.status = dto.status;
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_sms(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /****************/
  
   @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updatelinestatus')
  async updatelinestatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var line_id: any = dto.line_id;  
      if (!line_id) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' line_id ' + line_id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + line_id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.line_id = line_id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsbucket:any=await this.settingsService.get_line(line_id);
      let rsbucket_count:any=rsbucket.length;
      if(rsbucket_count!=0){
         var rt:any=await this.settingsService.update_line_status(line_id,1);
      }else{
         var rt:any=await this.settingsService.update_line_status(line_id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                line_id:line_id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
  /****************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update mqtt status' })
  @Post('updatesmsstatus')
  async updatesmsstatus(
      @Res() res: Response,
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
     ) {
      if (!dto) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'Data is null.',
          message_th: 'ไม่พบข้อมูล.',
        });
        return;
      }
      var sms_id: any = dto.sms_id;  
      if (!sms_id) { 
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' sms_id ' + sms_id + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + sms_id + '.',
        };
        res.status(200).json(result);
      } 
      var status: number = dto.status; 
      if (status==null) {
        var result:any={
          statusCode: 200,
          code: 404,
          payload: dto,
          message: ' id ' + status + ' is null.',
          message_th: 'ไม่พบข้อมูล  id ' + status + '.',
        };
        res.status(200).json(result);
      } 
      var DataUpdate:any={};
          DataUpdate.sms_id = sms_id;
          DataUpdate.status = status;
     // console.log(`DataUpdate=>`);
     // console.info(DataUpdate);
      var rsbucket:any=await this.settingsService.get_sms(sms_id);
      let rsbucket_count:any=rsbucket.length;
      if(rsbucket_count!=0){
         var rt:any=await this.settingsService.update_sms_status(sms_id,1);
      }else{
         var rt:any=await this.settingsService.update_sms_status(sms_id,0);
      } 
      if (rt) {
          var result:any={
                statusCode: 200,
                code: 200, 
                sms_id:sms_id, 
                rt: rt,
                message: 'Update successful.',
                message_th: 'อัปเดต  สำเร็จ.',
          };
          res.status(200).json(result);
      } else {
          var result:any={
              statusCode: 200,
              code: 422,
              payload: DataUpdate,
              rt: rt,
              message: 'Update Unsuccessful',
              message_th: 'อัปเดต ไม่สำเร็จ',
          };
        res.status(200).json(result);
      }
  }
  /********update_Token**********/   
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_token' })
  @Post('updatetoken')
  async update_token(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }

    var token_id: string = dto.token_id; 
    if (!token_id) {
      var token_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + token_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + token_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.token_id = token_id;
        if (dto.token_name) {
            DataUpdate.token_name = dto.token_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_token(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  } 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update status device id' })
  @Post('updatestatusdeviceid')
  async update_status_deviceid(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
   //console.log('Post req');  console.info(req);
   // console.log(`dto=>`); console.info(dto);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: dto,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var device_id:any=dto.device_id;  
    if (device_id==null) { 
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' device_id ' + device_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  device_id ' + device_id + '.',
      };
      res.status(200).json(result);
    } 
    var status: number = dto.status; 
    if (status==null) {
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var mqtt_bucket:any=await this.settingsService.update_device_mqtt_status_device_id(device_id,status) ;      
    if (mqtt_bucket) {
        var result:any={
              statusCode: 200,
              code: 200, 
              payload: mqtt_bucket, 
              message: 'Update status device successful.',
              message_th: 'อัปเดต  สำเร็จ.',
        };
        res.status(200).json(result);
    } else {
        var result:any={
            statusCode: 200,
            code: 422,
            payload: null, 
            message: 'Update status device Unsuccessful',
            message_th: 'อัปเดต ไม่สำเร็จ',
        };
      res.status(200).json(result);
    }
  }
  /********updateschedulestatus**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update schedule status' })
  @Post('updateschedulestatus')
  async update_schedule_status(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
   ) {
   //  UPDATE public.sd_iot_mqtt SET status = 0 WHERE mqtt_id=1
   //  console.log('Post req');  console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: dto,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var schedule_id: number = dto.schedule_id;  
    if (schedule_id==null) { 
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + schedule_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + schedule_id + '.',
      };
      res.status(200).json(result);
    } 
    var status: number = dto.status; 
    if (status==null) {
      var result:any={
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate:any={};
        DataUpdate.schedule_id = schedule_id;
        DataUpdate.status = status;
   // console.log(`DataUpdate=>`);
   // console.info(DataUpdate);
    var rsbucket:any=await this.settingsService.get_schedule(schedule_id);
    let rsbucket_count:any=rsbucket.length;
    if(rsbucket_count!=0){
       var rt:any=await this.settingsService.update_schedule_status(schedule_id,status);
    }else{
       var rt:any=await this.settingsService.update_schedule_status(schedule_id,0);
    }
   if(rsbucket_count!=0){  
            if (rt) { 
                var mqtt_bucket:any=await this.settingsService.update_schedule_status(schedule_id,status) ;      
            } 
    }
   // http://192.168.1.59:3003/v1/settings/updatemqtt
    if (rt) {
        var result:any={
              statusCode: 200,
              code: 200, 
              schedule_id:schedule_id, 
              payload: DataUpdate, 
              rt: rt,
              message: 'Update successful.',
              message_th: 'อัปเดต  สำเร็จ.',
        };
        res.status(200).json(result);
    } else {
        var result:any={
            statusCode: 200,
            code: 422,
            payload: DataUpdate,
            rt: rt,
            message: 'Update Unsuccessful',
            message_th: 'อัปเดต ไม่สำเร็จ',
        };
      res.status(200).json(result);
    }
  }
  /********updateschedulestatus**********/ 
  @HttpCode(200)
  @ApiOperation({ summary: 'update schedule status' })
  @Post('updatescheduledaystatus')
  async update_schedule_day_status(
    @Res() res: Response,
    @Body() dto: any,
    @Req() req: any,
  ) {
    try {
     // ตรวจสอบ token
      const token = req.headers.authorization?.replace('Bearer ', '').trim();
      if (!token) {
        return res.status(401).json({
          statusCode: 401,
          code: 401,
          message: 'Unauthorized',
          message_th: 'ไม่ได้รับอนุญาต',
        });
      } 
      const schedule_id: number = dto.schedule_id;
      if (!schedule_id) {
        return res.status(200).json({
          statusCode: 200,
          code: 404,
          payload: dto,
          message: 'schedule_id is null.',
          message_th: 'ไม่พบข้อมูล schedule_id.',
        });
      }  
     // ตรวจสอบว่า schedule มีอยู่จริงหรือไม่
      const rsbucket:any=await this.settingsService.get_schedule(schedule_id);
      if (!rsbucket || rsbucket.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          code: 404,
          payload: dto,
          message: `ไม่พบ schedule_id ${schedule_id}`,
          message_th: `ไม่พบ schedule_id ${schedule_id}`,
        });
      }

     // เตรียมข้อมูลที่จะอัปเดต
      const days = ['event','sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'status'];
      const DataUpdate:any={};
      for (const day of days) {
        if (dto[day] !== undefined && dto[day] !== '') {
          DataUpdate[day] = dto[day];
        }
      } 
      if (Object.keys(DataUpdate).length === 0) {
        return res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'No valid fields to update.',
          message_th: 'ไม่มีข้อมูลที่ต้องอัปเดต',
        });
      }

     // อัปเดต schedule
      const rt:any=await this.settingsService.update_schedule_status_day(schedule_id, DataUpdate);

      if (rt) {
        return res.status(200).json({
          statusCode: 200,
          code: 200,
          schedule_id,
          payload: DataUpdate,
          rt,
          message: 'Update successful.',
          message_th: 'อัปเดตสำเร็จ.',
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: DataUpdate,
          rt,
          message: 'Update Unsuccessful',
          message_th: 'อัปเดตไม่สำเร็จ',
        });
      }
    } catch (err) {
      return res.status(500).json({
        statusCode: 500,
        code: 500,
        message: 'Internal Server Error',
        message_th: 'เกิดข้อผิดพลาดภายในระบบ',
        error: err.message,
      });
    }
  }
  /********update_Api**********/ 
  /************************delete*************************/
  /***************delete_setting******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_setting' })
  @Get('deletesetting')
  async delete_setting(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      var setting_id:any=query.setting_id;
      res.status(200).json({
                  statusCode: 200,
                  code: 422,
                  payload: setting_id,
                  message: 'setting_id is null.',
                  message_th: 'ไม่พบข้อมูล.',
                });
      return;

      if (!setting_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: setting_id,
          message: 'setting_id is null.',
          message_th: 'setting_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_setting(setting_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'setting_id is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_setting(setting_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              setting_id: setting_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              setting_id: setting_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Delete('deletesetting')
  async delete_setting_del(
    @Res() res: Response,
    @Query('setting_id') setting_id: string,// หรือ @Param('setting_id') ถ้าใช้ param
  ) {
   // แปลงค่าและตรวจสอบก่อน
    const id = Number(setting_id);
    if (!setting_id || isNaN(id) || id <= 0) {
      res.status(400).json({
        statusCode: 400,
        code: 400,
        payload: null,
        message: 'Invalid or missing setting_id',
        message_th: 'setting_id ไม่ถูกต้องหรือไม่ได้ส่งค่า',
      });
      return;
    }

    try {
      const result = await this.settingsService.delete_setting(id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: result,
        message: 'Delete setting success',
        message_th: 'ลบข้อมูลสำเร็จ',
      });
    } catch (e) {
      res.status(422).json({
        statusCode: 422,
        code: 422,
        payload: null,
        message: 'Delete setting failed',
        message_th: 'ลบข้อมูลไม่สำเร็จ',
      });
    }
  }
  /********update_telegram**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update_telegram' })
  @Post('updatetelegram')
  async update_telegram(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
   // console.log('Post req');
   // console.info(req);
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }
    var telegram_id: string = dto.telegram_id; 
    if (!telegram_id) {
      var telegram_id: string = '0';
      var result:any={
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + telegram_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + telegram_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate:any={};
    DataUpdate.telegram_id = telegram_id; 
		    if (dto.telegram_name) {
            DataUpdate.telegram_name = dto.telegram_name;
        }if (dto.host) {
            DataUpdate.host = dto.host;
        }if (dto.port) {
            DataUpdate.port = dto.port;
        }if (dto.username) {
            DataUpdate.username = dto.username;
        }if (dto.password) {
            DataUpdate.password = dto.password;
        }if (dto.status) {
            DataUpdate.status = dto.status;
        }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt:any=await this.settingsService.update_telegram(DataUpdate);
    if (rt && rt == 200) {
      var result:any={
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result:any={
        statusCode: 200,
        code: 422,
        payload: DataUpdate,
        rt: rt,
        message: 'Update Unsuccessful',
        message_th: 'อัปเดต ไม่สำเร็จ',
      };
      res.status(200).json(result);
    }
  }
  /***************delete_location******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_location' })
  @Get('deletelocation')
  async delete_location(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
      var location_id:any=query.location_id;
      if (!location_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: location_id,
          message: 'location_id is null.',
          message_th: 'location_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_location(location_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_location(location_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              location_id: location_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              location_id: location_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete_type******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_type' })
  @Get('deletetype')
  async delete_type(
    @Res() res: Response, 
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //console.info("jsonString=>"+jsonString)
     //var idxs:number=   parseInt( dto.idx);
      var type_id:any=query.type_id;
      if (!type_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: type_id,
          message: 'type_id is null.',
          message_th: 'type_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_type(type_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_type(type_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              type_id: type_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              type_id: type_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete_device_type******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_device_type' })
  @Get('deletedevicetype')
  async delete_device_type(
    @Res() res: Response, 
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //console.info("jsonString=>"+jsonString)
     //var idxs:number=   parseInt( dto.idx);
      var type_id:any=query.type_id;
      if (!type_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: type_id,
          message: 'type_id is null.',
          message_th: 'type_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_type(type_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_device_type(type_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              type_id: type_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              type_id: type_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete_sensor******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_sensor' })
  @Get('deletesensor')
  async delete_sensor(
    @Res() res: Response, 
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //console.info("jsonString=>"+jsonString)
     //var idxs:number=   parseInt( dto.idx);
      var sensor_id:any=query.sensor_id;
      if (!sensor_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: sensor_id,
          message: 'sensor_id is null.',
          message_th: 'sensor_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_sensor(sensor_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_sensor(sensor_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              sensor_id: sensor_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              sensor_id: sensor_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete_group******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_group' })
  @Get('deletegroup')
  async delete_group(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var group_id:any=query.group_id;
      if (!group_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: group_id,
          message: 'group_id is null.',
          message_th: 'group_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_group(group_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_group(group_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              group_id: group_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              group_id: group_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete_mqtt******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_mqtt' })
  @Get('deletemqtt')
  async delete_mqtt(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var mqtt_id:any=query.mqtt_id;
      if (!mqtt_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: mqtt_id,
          message: 'mqtt_id is null.',
          message_th: 'mqtt_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_mqtt(mqtt_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_mqtt(mqtt_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              mqtt_id: mqtt_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              mqtt_id: mqtt_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
    /********delete_Api**********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_api' })
  @Get('deleteapi')
  async delete_api(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var api_id:any=query.api_id;
      if (!api_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: api_id,
          message: 'api_id is null.',
          message_th: 'api_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_api(api_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_api(api_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              api_id: api_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              api_id: api_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }  
  /********delete_Device**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_device' })
  @Get('deletedevice')
  async delete_device(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //console.info("jsonString=>"+jsonString)
     //var idxs:number=   parseInt( dto.idx);
      var device_id:any=query.device_id;
      if (!device_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: device_id,
          message: 'device_id is null.',
          message_th: 'device_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_device(device_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_device(device_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              device_id: device_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              device_id: device_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Email**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_email' })
  @Get('deleteemail')
  async delete_email(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var email_id:any=query.email_id;
      if (!email_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: email_id,
          message: 'email_id is null.',
          message_th: 'email_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_email(email_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_email(email_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              email_id: email_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              email_id: email_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
 /********delete_Email**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_email' })
  @Get('deletemqtthost')
  async delete_emqtthost(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var id:any=query.id;
      if (!id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: id,
          message: 'id is null.',
          message_th: 'id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_mqtthost(id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_mqtthost(id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              id: id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              id: id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Host**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_host' })
  @Get('deletehost')
  async delete_host(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var host_id:any=query.host_id;
      if (!host_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: host_id,
          message: 'host_id is null.',
          message_th: 'host_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_host(host_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_host(host_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              host_id: host_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              host_id: host_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Influxdb**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_influxdb' })
  @Get('deleteinfluxdb')
  async delete_influxdb(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //var idxs:number=   parseInt( dto.idx);
      var influxdb_id:any=query.influxdb_id;
      if (!influxdb_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: influxdb_id,
          message: 'influxdb_id is null.',
          message_th: 'influxdb_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        var Rs:any=await this.settingsService.get_influxdb(influxdb_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_influxdb(influxdb_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              influxdb_id: influxdb_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              influxdb_id: influxdb_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Line**********/    
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_line' })
  @Get('deleteline')
  async delete_line(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //const idxs:number=   parseInt( dto.idx);
      var line_id:any=query.line_id;
      if (!line_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: line_id,
          message: 'line_id is null.',
          message_th: 'line_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_line(line_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_line(line_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              line_id: line_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              line_id: line_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }   
  /********delete_Nodered**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_nodered' })
  @Get('deletenodered')
  async delete_nodered(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      console.log('query');
      console.info(query);
     //const idxs:number=   parseInt( dto.idx);
      var nodered_id:any=query.nodered_id;
      if (!nodered_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: nodered_id,
          message: 'nodered_id is null.',
          message_th: 'nodered_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_nodered(nodered_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_nodered(nodered_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              nodered_id: nodered_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              nodered_id: nodered_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Schedule**********/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_schedule' })
  @Get('deleteschedule')
  async delete_schedule(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      var schedule_id:any=query.schedule_id;
      if (!schedule_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: schedule_id,
          message: 'schedule_id is null.',
          message_th: 'schedule_id ไม่พบข้อมูล.',
        });
        return;
      }
      const schedule = await this.settingsService.get_schedule(schedule_id);
      if (!schedule) {
          return res.status(404).json({
            statusCode: 404,
            message: 'Schedule not found.',
            message_th: 'ไม่พบข้อมูล Schedule',
          });
      }
    if(schedule){
            await this.settingsService.delete_schedule(schedule_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              schedule_id: schedule_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
      }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              schedule_id: schedule_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
      } 
  } 
  /********delete_Sms**********/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_sms' })
  @Get('deletesms')
  async delete_sms(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      var sms_id:any=query.sms_id;
      if (!sms_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: sms_id,
          message: 'sms_id is null.',
          message_th: 'sms_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_sms(sms_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_sms(sms_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              sms_id: sms_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              sms_id: sms_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /********delete_Token**********/    
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_token' })
  @Get('deletetoken')
  async delete_token(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) { 
      var token_id:any=query.token_id;
      if (!token_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: token_id,
          message: 'token_id is null.',
          message_th: 'token_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_token(token_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.delete_token(token_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              token_id: token_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              token_id: token_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  } 
  /***************delete device schedule******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_device_schedule_id' })
  @Get('deletedeviceschedule')
  async delete_device_schedule_id(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
      var schedule_id:any=query.schedule_id;
      if (!schedule_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: schedule_id,
          message: 'schedule_id is null.',
          message_th: 'schedule_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_ScscheduleId(schedule_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
        }
        if(Rs){
            await this.settingsService.removeScscheduleId(schedule_id);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              schedule_id: schedule_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              location_id: schedule_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete device schedule******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_deviceandschedule' })
  @Get('deletedeviceandschedule')
  async delete_device_and_schedule(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
     // console.log('query');
     // console.info(query);
      var device_id:any=query.device_id;
      if (!device_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: device_id,
          message: 'device_id is null.',
          message_th: 'device_id ไม่พบข้อมูล.',
        });
        return;
      }
      var schedule_id:any=query.schedule_id;
      if (!schedule_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: schedule_id,
          message: 'schedule_id is null.',
          message_th: 'schedule_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_ScscheduleId(schedule_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
      }
      if(Rs){
           let filter:any={};
            filter.schedule_id = query.schedule_id;
            filter.device_id = query.device_id;
            await this.settingsService.removeScdeviceId(filter);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              schedule_id: schedule_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              location_id: schedule_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************delete telegram******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_telegram'})
  @Get('deletetelegram')
  async delete_telegram(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
     // console.log('query');
     // console.info(query);
      var telegram_id:any=query.telegram_id;
      if (!telegram_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: telegram_id,
          message: 'telegram_id is null.',
          message_th: 'telegram_id ไม่พบข้อมูล.',
        });
        return;
      }
      var schedule_id:any=query.schedule_id;
      if (!schedule_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: schedule_id,
          message: 'schedule_id is null.',
          message_th: 'schedule_id ไม่พบข้อมูล.',
        });
        return;
      }else {  
        const Rs:any=await this.settingsService.get_telegram(schedule_id);
        if (!Rs) {
          res.status(200).json({
            statusCode: 200,
            code: 422,
            payload: null,
            message: 'uid is null.',
            message_th: 'ไม่พบข้อมูล.',
          });
          return;
      }
      if(Rs){
           let filter:any={};
            filter.telegram_id = query.telegram_id;
            await this.settingsService.delete_telegram(filter);
            res.status(200).json({
              statusCode: 200,
              code: 200,
              schedule_id: schedule_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
            });
  
        }else{
          res.status(200).json({
              statusCode: 200,
              code: 400,
              location_id: schedule_id,
              payload: null, 
              message: 'Not in database.',
              message_th: 'ไม่มีข้อมูลอยู่ในฐานข้อมูล',
            });
        } 
      }
  }
  /***************#################*****************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listdevicescheduledata')
  @ApiOperation({ summary: 'list device page active' })
  async listdevicescheduledata(
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.device_list_paginate_all_filter(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };

    var ResultData:any=await this.settingsService.device_list_paginate_all_filter(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj:any=[];
            try {
              obj = JSON.parse(configdata);
            } catch (e) {
              throw e;
            }

            var mqtt_objt_data = Object.values(obj);
            var result_mqtt = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]]));

           // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
            var merged = format.mapMqttDataToDeviceV2([va], result_mqtt)[0];
            tempData2.push({
              ...va,
              ...merged,
              result_mqtt,
              timestamp,
            });
          }
      */

    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*********###############alarmdevicepaginate#################**********/
   /***************delete telegram******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_armdevice'})
  @Get('deletearmdevice')
  async delete_armdevice(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
     // console.log('query');
     // console.info(query);
      var alarm_action_id:any=query.alarm_action_id;
      if (!alarm_action_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: alarm_action_id,
          message: 'alarm_action_id is null.',
          message_th: 'alarm_action_id ไม่พบข้อมูล.',
        });
        return;
      } 
      let filter:any={};
      filter.alarm_action_id = query.alarm_action_id; 
      await this.settingsService.alarm_device_id_alarm_delete(filter);
      res.status(200).json({
              statusCode: 200,
              code: 200,
              alarm_action_id: alarm_action_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
      });
  }
  /******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'delete_armdevice'})
  @Get('deletearmdevicev2')
  async delete_armdevice_v2(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) {
     // console.log('query');
     // console.info(query);
      var alarm_action_id:any=query.alarm_action_id;
      if (!alarm_action_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: alarm_action_id,
          message: 'alarm_action_id is null.',
          message_th: 'alarm_action_id ไม่พบข้อมูล.',
        });
        return;
      }
      var device_id:any=query.device_id;
      if (!device_id) {
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: device_id,
          message: 'device_id is null.',
          message_th: 'device_id ไม่พบข้อมูล.',
        });
        return;
      } 
      let filter:any={};
      filter.alarm_action_id = query.alarm_action_id; 
      await this.settingsService.alarm_device_id_alarm_delete(filter);
      res.status(200).json({
              statusCode: 200,
              code: 200,
              alarm_action_id: alarm_action_id,
               device_id: device_id,
              payload: null, 
              message: 'Deleted complete.',
              message_th: 'ลบออกเรียบร้อยแล้ว',
      });
  }
  /******************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createalarmDevice')
  async create_alarmDevice(
    @Res() res: Response,
    @Body() DataDto: DevicealarmactionDto, 
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
    await this.settingsService.create_alarmdevice(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create devicealarmaction successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  /******************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'update alarm device' })
  @Post('updatealarmdevice')
  async update_alarm_device(
    @Res() res: Response,
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ): Promise<string> { 
    if (!dto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
     let DataUpdate:any={};
        DataUpdate.alarm_action_id = dto.alarm_action_id;
         const valdata = ['action_name','status_warning','recovery_warning', 'status_alert', 'recovery_alert', 'email_alarm', 'line_alarm', 'telegram_alarm', 'sms_alarm', 'nonc_alarm','time_life', 'event', 'status'];
       for (const da of valdata) {
        if (dto[da] !== undefined && dto[da] !== '') {
          DataUpdate[da] = dto[da];
        }
      }  
      if (Object.keys(DataUpdate).length === 0) {
        res.status(200).json({
              statusCode: 200,
              code: 422,
              payload: dto,
              message: 'No valid fields to update.',
              message_th: 'ไม่มีข้อมูลที่ต้องอัปเดต',
            });
      } 
     const rt:any=await this.settingsService.update_alarm_device_status_val(dto.alarm_action_id, DataUpdate);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        message: 'Update devicealarmaction successfully..',
        message_th: 'แก้ไข ข้อมูลสำเร็จ..',
      });
      return;
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listalarmdevicepage')
  @ApiOperation({ summary: 'list alarm device page all' })
  async list_alarm_device_page(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var alarm_action_id = query.alarm_action_id || '';
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
   // นับจำนวนข้อมูลทั้งหมด
    /*
        get_data_schedule_device
        create_schedule_device
        delete_schedule_device
    */
 if (alarm_action_id=="" || alarm_action_id=="undefined" || alarm_action_id==undefined) {
      res.status(200).json({
        statuscode: 200,
        code: 400,
        payload: null,
        message: 'alarm_action_id is null.',
        message_th: 'ไม่พบข้อมูล schedule_id',
      });
      return;
    }
    var eventResultData:any=await this.settingsService.get_alarm_device_map(alarm_action_id);
    var rowResultData:any=await this.settingsService.device_list_paginate_all_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            alarm_action_id:alarm_action_id,
            pageSize: 1,
            page:1
    };
    var alarmData:any=await this.settingsService.device_alarm_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_list_paginate_all_active(filter2);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  var filter_as = {  
                              alarm_action_id,
                              device_id
                  }
                  var count_alarm_device:any=await this.settingsService.alarm_device_id_alarm_count(filter_as);
                  if(count_alarm_device>=1){
                    var  alarm_status=1;
                  }else{
                    var  alarm_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      alarm_action_id: alarm_action_id,
                      alarm_status: alarm_status,  
                      count_alarm_device: count_alarm_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,   
                      action_name:alarmData['0'].action_name,
                      event:alarmData['0'].event, 
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        alarmData:alarmData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }
  /*******************/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listalarmeventdevicepage')
  @ApiOperation({ summary: 'list alarm event device page all' })
  async list_alarm_event_device_page(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var alarm_action_id = query.alarm_action_id || '';
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
   // นับจำนวนข้อมูลทั้งหมด
    /*
        get_data_schedule_device
        create_schedule_device
        delete_schedule_device
    */
    if (alarm_action_id=="" || alarm_action_id=="undefined" || alarm_action_id==undefined) {
      res.status(200).json({
        statuscode: 200,
        code: 400,
        payload: null,
        message: 'alarm_action_id is null.',
        message_th: 'ไม่พบข้อมูล schedule_id',
      });
      return;
    } 
    var eventResultData:any=await this.settingsService.get_alarm_device_event_map(alarm_action_id);
    var rowResultData:any=await this.settingsService.device_list_paginate_all_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            alarm_action_id:alarm_action_id,
            pageSize: 1,
            page:1
    };
    var alarmData:any=await this.settingsService.device_alarm_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_list_paginate_all_active(filter2);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  
                  var filter_as = { 
                              isCount: 1,
                              alarm_action_id,
                              device_id
                  }
                  var count_alarm_event_device:any=await this.settingsService.alarm_device_id_event_count(filter_as);
                  if(count_alarm_event_device>=1){
                    var  alarm_event_status=1;
                  }else{
                    var  alarm_event_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      alarm_action_id: alarm_action_id,
                      alarm_event_status: alarm_event_status,  
                      count_alarm_event_device: count_alarm_event_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,   
                      action_name:alarmData['0'].action_name,
                      event:alarmData['0'].event, 
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        alarmData:alarmData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  } 
  /*******************/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('listalarmeventdevicecontrolpage')
  @ApiOperation({ summary: 'list alarm event device page all' })
  async listalarmeventdevicecontrolpage(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var alarm_action_id = query.alarm_action_id || '';
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
   // นับจำนวนข้อมูลทั้งหมด
    /*
        get_data_schedule_device
        create_schedule_device
        delete_schedule_device
    */
    if (alarm_action_id=="" || alarm_action_id=="undefined" || alarm_action_id==undefined) {
      res.status(200).json({
        statuscode: 200,
        code: 400,
        payload: null,
        message: 'alarm_action_id is null.',
        message_th: 'ไม่พบข้อมูล schedule_id',
      });
      return;
    } 
    var eventResultData:any=await this.settingsService.get_alarm_device_event_map(alarm_action_id);
    var rowResultData:any=await this.settingsService.device_list_paginate_all_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            alarm_action_id:alarm_action_id,
            pageSize: 1,
            page:1
    };
    var alarmData:any=await this.settingsService.device_alarm_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_list_paginate_all_active_io(filter2);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  
                  var filter_as = { 
                              isCount: 1,
                              alarm_action_id,
                              device_id
                  }
                  var count_alarm_event_device:any=await this.settingsService.alarm_device_id_event_count(filter_as);
                  if(count_alarm_event_device>=1){
                    var  alarm_event_status=1;
                  }else{
                    var  alarm_event_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      alarm_action_id: alarm_action_id,
                      alarm_event_status: alarm_event_status,  
                      count_alarm_event_device: count_alarm_event_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,   
                      action_name:alarmData['0'].action_name,
                      event:alarmData['0'].event, 
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        alarmData:alarmData,
      },
      message: 'list alarmevent device control page.',
      message_th: 'list alarmevent device control page.',
    });
  } 
  /*********device_list_paginate_alarm_active**********/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('activealarmdevicepage')
  @ApiOperation({ summary: 'list alarm event device page all' })
  async device_list_paginate_alarm_active(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var alarm_action_id = query.alarm_action_id || '';
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
    var rowResultData:any=await this.settingsService.device_list_paginate_alarm_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            alarm_action_id:alarm_action_id,
            pageSize: 1,
            page:1
    };
    var alarmData:any=await this.settingsService.device_alarm_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_list_paginate_alarm_active(filter2);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  
                  var filter_as = { 
                              isCount: 1,
                              alarm_action_id,
                              device_id
                  }
                  var count_alarm_event_device:any=await this.settingsService.alarm_device_id_event_count(filter_as);
                  if(count_alarm_event_device>=1){
                    var  alarm_event_status=1;
                  }else{
                    var  alarm_event_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      alarm_action_id: alarm_action_id,
                      alarm_event_status: alarm_event_status,  
                      count_alarm_event_device: count_alarm_event_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,   
                      action_name:alarmData['0'].action_name,
                      event:alarmData['0'].event, 
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        alarmData:alarmData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  } 
  /*********device_list_paginate_alarm_active**********/ 
   @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('activealarmeventdeviceeventpage')
  @ApiOperation({ summary: 'list alarm event device page all' })
  async device_event_list_paginate_alarm_active(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var alarm_action_id = query.alarm_action_id || '';
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
    var rowResultData:any=await this.settingsService.device_event_list_paginate_alarm_active(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var schedule_filter:any = {
            alarm_action_id:alarm_action_id,
            pageSize: 1,
            page:1
    };
    var alarmData:any=await this.settingsService.device_alarm_list_paginate(schedule_filter);
    var ResultData:any=await this.settingsService.device_event_list_paginate_alarm_active(filter2);
    var tempData2 = [];
    for (var va of ResultData) { 
                  /***************/  
                  var device_id = va.device_id;
                  var mqtt_id = va.mqtt_id;
                  var setting_id = va.setting_id;
                  var type_id = va.type_id;
                  var device_name = va.device_name;
                  var sn = va.sn;
                  var hardware_id = va.hardware_id;
                  var status_warning = va.status_warning;
                  var recovery_warning = va.recovery_warning;
                  var status_alert = va.status_alert;
                  var recovery_alert = va.recovery_alert;
                  var time_life = va.time_life;
                  var work_status = va.work_status;
                  var max = va.max;
                  var min = va.min;
                  var oid = va.oid;
                  var mqtt_data_value = va.mqtt_data_value;
                  var mqtt_data_control = va.mqtt_data_control;
                  var model = va.model;
                  var vendor = va.vendor;
                  var comparevalue = va.comparevalue;
                  var status = va.status;
                  var mqtt_control_on = va.mqtt_control_on;
                  var mqtt_control_off = va.mqtt_control_off;
                  var device_org = va.device_org;
                  var device_bucket = va.device_bucket;
                  var type_name = va.type_name;
                  var location_name = va.location_name;
                  var configdata = va.configdata;
                  var mqtt_name = va.mqtt_name;
                  var mqtt_org = va.mqtt_org;
                  var mqtt_bucket = va.mqtt_bucket;
                  var mqtt_envavorment = va.mqtt_envavorment;
                  var mqtt_host = va.mqtt_host;
                  var mqtt_port = va.mqtt_port;
                  var timestamp = va.timestamp;
                  var mqtt_device_name = va.mqtt_device_name;
                  var mqtt_status_over_name = va.mqtt_status_over_name;
                  var mqtt_status_data_name = va.mqtt_status_data_name;
                  var mqtt_act_relay_name = va.mqtt_act_relay_name;
                  var mqtt_control_relay_name = va.mqtt_control_relay_name;
                  
                  var filter_as = { 
                              isCount: 1,
                              alarm_action_id,
                              device_id
                  }
                  var count_alarm_event_device:any=await this.settingsService.alarm_device_id_event_count(filter_as);
                  if(count_alarm_event_device>=1){
                    var  alarm_event_status=1;
                  }else{
                    var  alarm_event_status=0;
                  }
                  const arraydata:any={ 
                      device_id: device_id,  
                      alarm_action_id: alarm_action_id,
                      alarm_event_status: alarm_event_status,  
                      count_alarm_event_device: count_alarm_event_device,  
                      mqtt_id: mqtt_id,  
                      setting_id: setting_id,  
                      type_id: type_id,  
                      device_name: device_name,   
                      action_name:alarmData['0'].action_name,
                      event:alarmData['0'].event, 
                      sn: sn,  
                      hardware_id: hardware_id,  
                      status_warning: status_warning,  
                      recovery_warning: recovery_warning,  
                      status_alert: status_alert,  
                      recovery_alert: recovery_alert,  
                      time_life: time_life,  
                      work_status: work_status,  
                      max: max,  
                      min: min,  
                      oid: oid,  
                      mqtt_data_value: mqtt_data_value,  
                      mqtt_data_control: mqtt_data_control,  
                      model: model,  
                      vendor: vendor,  
                      comparevalue: comparevalue,  
                      status: status,  
                      mqtt_control_on: mqtt_control_on,  
                      mqtt_control_off: mqtt_control_off,  
                      device_org:  device_org,  
                      device_bucket:  device_bucket,  
                      type_name:  type_name,  
                      location_name:  location_name,  
                      configdata:  configdata,  
                      mqtt_name:  mqtt_name,  
                      mqtt_org:  mqtt_org,  
                      mqtt_bucket:  mqtt_bucket,  
                      mqtt_envavorment:  mqtt_envavorment,  
                      mqtt_host:  mqtt_host,  
                      mqtt_port:  mqtt_port,  
                      timestamp:  timestamp,  
                      mqtt_device_name:  mqtt_device_name,  
                      mqtt_status_over_name:  mqtt_status_over_name,  
                      mqtt_status_data_name:  mqtt_status_data_name,  
                      mqtt_act_relay_name:  mqtt_act_relay_name,  
                      mqtt_control_relay_name:  mqtt_control_relay_name
                  }
      tempData2.push(arraydata);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: tempData2,
        alarmData:alarmData,
      },
      message: 'list device success.',
      message_th: 'lists device success.',
    });
  }  
  /*******************/ 
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('createalarmdevice')
  async create_alarm_device(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const alarm_action_id: number = Number(query.alarm_action_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`alarm_action_id =>` + alarm_action_id); console.info(alarm_action_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!alarm_action_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is alarm_action_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      var dtost:any = {
                      alarm_action_id:alarm_action_id,
                      device_id:device_id,
                };
      await this.settingsService.create_alarm_device_map(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Alarm device created successfully.',
        message_th: 'สร้าง Alarm device สำเร็จ.',
      });
  }
  /*********************************/
   @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('deletealarmdevice')
  async delete_alarm__devices(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const alarm_action_id: number = Number(query.alarm_action_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`alarm_action_id =>` + alarm_action_id); console.info(alarm_action_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!alarm_action_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is alarm_action_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
     var dtost:any = {
                      alarm_action_id:alarm_action_id,
                      device_id:device_id,
                };
      await this.settingsService.delete_alarm_device_map(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Alarm device delete successfully.',
        message_th: 'ลบ Scheduled สำเร็จแล้ว.',
      });
  }
  /*********************************/
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('createalarmeventdevice')
  async create_alarm_event_device(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const alarm_action_id: number = Number(query.alarm_action_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`alarm_action_id =>` + alarm_action_id); console.info(alarm_action_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!alarm_action_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is alarm_action_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      var dtost:any = {
                      alarm_action_id:alarm_action_id,
                      device_id:device_id,
                };
      await this.settingsService.create_alarm_device_event_map(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Alarm device created successfully.',
        message_th: 'สร้าง Scheduled สำเร็จ.',
      });
  }
  /*********************************/
   @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list group' })
  @Get('deletealarmeventdevice')
  async delete_alarm_event_devices(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const alarm_action_id: number = Number(query.alarm_action_id) || 1;
      const device_id: number = Number(query.device_id) || 1;
      console.log(`alarm_action_id =>` + alarm_action_id); console.info(alarm_action_id);
      console.log(`device_id =>` + device_id); console.info(device_id);
     if (!alarm_action_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is alarm_action_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } if (!device_id) {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is device_id null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
     var dtost:any = {
                      alarm_action_id:alarm_action_id,
                      device_id:device_id,
                };
      await this.settingsService.delete_alarm_device_event_map(dtost);
     //////////////
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: null,
        message: 'Alarm device event delete successfully.',
        message_th: 'ลบ Alarm device event สำเร็จแล้ว.',
      });
  }
  /***********alarmdevice*************/  
  @HttpCode(200)
  @ApiOperation({ summary: 'alarm device status' })
  @Get('alarmdevicestatus')
  async alarm_device_status(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 100000000;
      var alarm_action_id:any=query.alarm_action_id || '';  
      var status:any=query.status || ''; 
      var sort:any=query.sort || 'createddate-ASC';
      var keyword:any=query.keyword || '';
      var deletecache:any=query.deletecache;
      var filter:any={};
      filter.sort = query.sort;
      filter.keyword = keyword || '';    
      filter.alarm_action_id = alarm_action_id || '';  
      filter.event = query.event || '';  
      filter.isCount = 1; 
      var rowResultData:any= await this.settingsService.alarm_device_paginate_status(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      }  
      var device_status:any = 0; 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = query.sort;
      filter2.keyword = keyword || '';    
      filter2.alarm_action_id = alarm_action_id || '';  
      filter2.event = query.event || '';  
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
     //var alarm_status:any =0;
      var device_event_control_ar:any=[];
      var get_alarm_to_email:any=[]; 
      var get_alarm_to_line:any=[];
      var get_alarm_to_sms:any=[];
      var get_alarm_to_telegram:any=[];
      var ResultData:any=await this.settingsService.alarm_device_paginate_status(filter2);
      var tempDataoid:any = []; 
      for (const [key, va] of Object.entries(ResultData)) { 
          var alarm_action_id:any=ResultData[key].alarm_action_id; 
          var action_name:any=ResultData[key].action_name;  
          var alarm_action_id:any=alarm_action_id;
          var action_name:any=action_name;
          var status_warning:any=ResultData[key].status_warning;
          var recovery_warning:any=ResultData[key].recovery_warning;
          var status_alert:any=ResultData[key].status_alert;
          var recovery_alert:any=ResultData[key].recovery_alert;
          var email_alarm:any=ResultData[key].email_alarm;
          var line_alarm:any=ResultData[key].line_alarm;
          var telegram_alarm:any=ResultData[key].telegram_alarm;
          var sms_alarm:any=ResultData[key].sms_alarm;
          var nonc_alarm:any=ResultData[key].nonc_alarm;
          var time_life:any=ResultData[key].time_life;
          var event:any=ResultData[key].event;
          var status:any=ResultData[key].status;  
          var filter_alarm:any={};
          filter_alarm.alarm_action_id = alarm_action_id;  
          var count_device:any=await this.settingsService.alarm_device_id_alarm_count(filter_alarm);
         //alarm_device_active_map
          var filter_map:any={};
          filter_map.alarm_action_id = alarm_action_id;  
          var alarmdevicearr:any = []; 
          var alarmdevicearr2:any = []; 
          var alarmdevice:any=await this.settingsService.sd_iot_alarm_device_list_map(filter_map);
          if(alarmdevice){
            for (const [keys, value] of Object.entries(alarmdevice)) {      
                      var alarm_action_id_mas:any = alarmdevice[keys].alarm_action_id;
                      var device_id_mas:any = alarmdevice[keys].device_id;
                      var device_mqtt_id_mas:any = alarmdevice[keys].mqtt_id;
                      var device_type_id_mas:any = alarmdevice[keys].type_id;
                      var device_name_mas:any = alarmdevice[keys].device_name;
                      var action_name_mas:any = alarmdevice[keys].action_name;
                      var action_time_life_mas:any = alarmdevice[keys].time_life;
                      /*****************************device_comtrol_start**************************************************/   
                      var device_event_control_ar:any= await this.get_alarm_control(alarm_action_id,device_id_mas);     
                      var get_alarm_to_event_control:any=device_event_control_ar;
                      if(ResultData[key].email_alarm=='1'){
                        //var get_alarm_to_email:any= await this.get_alarm_to_email(alarm_action_id,device_id_mas);
                      }else{
                        var get_alarm_to_email:any=[];
                      }
                      if(ResultData[key].line_alarm=='1'){
                        var get_alarm_to_line:any= await this.get_alarm_to_line(alarm_action_id,device_id_mas);
                      }else{
                        var get_alarm_to_line:any=[];
                      }
                      if(ResultData[key].sms_alarm=='1'){
                        var get_alarm_to_sms:any= await this.get_alarm_to_sms(alarm_action_id,device_id_mas);
                      }else{
                        var get_alarm_to_sms:any=[];
                      } 
                      if(ResultData[key].telegram_alarm=='1'){
                        var get_alarm_to_telegram:any= await this.get_alarm_to_telegram(alarm_action_id,device_id_mas);
                      }else{
                        var get_alarm_to_telegram:any=[];
                      } 
                      /*****************************device_email_end **************************************************/   
                      var alarmdevicearr2s:any={ 
                            get_alarm_to_event_control:get_alarm_to_event_control,
                            get_alarm_to_email:get_alarm_to_email,
                            get_alarm_to_line:get_alarm_to_line,
                            get_alarm_to_sms:get_alarm_to_sms,
                            get_alarm_to_telegram:get_alarm_to_telegram, 
                      }
                alarmdevicearr2.push(alarmdevicearr2s);
             }
          }
          /***************************/
          const DataRs:any={ 
                      alarm_action_id: alarm_action_id,  
                      filter_alarm:filter_alarm, 
                      action_name: action_name,  
                      status_warning: status_warning, 
                      recovery_warning: recovery_warning,
                      status_alert: status_alert,
                      recovery_alert: recovery_alert,
                      email_alarm: email_alarm,
                      line_alarm: line_alarm,
                      telegram_alarm: telegram_alarm,
                      sms_alarm: sms_alarm,
                      nonc_alarm: nonc_alarm,
                      time_life: time_life,
                      event: event,
                      status: status,  
                      alarm_arr:alarmdevicearr2, 
                    // mqtt:mqttrs,
        }
        tempDataoid.push(DataRs);
      } 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempDataoid,
        },
        message: 'get data success.',
        message_th: 'get data success.',
      });
  }
  /***********schedule process**********************/
  @HttpCode(200)
  @Get('scheduleproces')
  @ApiOperation({ summary: 'schedule process' })
  async scheduleproces(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    try {
          var device_id = query.device_id || '';
          var schedule_id = query.schedule_id || '';
          var page = Number(query.page) || 1;
          var pageSize = Number(query.pageSize) || 100000000000;
          var sort = query.sort;
          var keyword = query.keyword || '';
          var devicecontrol:any = '';
          var cases:any=0; 
          var filter = {
            sort,
            device_id,
            schedule_id,
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
          var rowResultData:any=await this.settingsService.scheduleprocess(filter);
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
          var filter2 = {
            ...filter,
            isCount: 0,
            page,
            pageSize,
          };
          var today_name:any='';
          var now_time:any= format.getCurrentTime();
          var now_time_cal:any=3;
          var start_time:any='';
          var end_time:any='';
          var do_ststus:any='';
          var ResultData:any=await this.settingsService.scheduleprocess(filter2);
          let tempData = [];
          let tempDataoid = [];
          let tempData2 = [];
          for (const [key, va] of Object.entries(ResultData)) { 
              const device_id:any=ResultData[key].device_id;
              var schedule_id:any=ResultData[key].schedule_id;
              var schedule_name:any=ResultData[key].schedule_name;
              var schedule_start:any=ResultData[key].schedule_event_start;
              var device_name:any=ResultData[key].device_name;
              var device_bucket:any=ResultData[key].device_bucket;
              var mqtt_bucket:any=ResultData[key].mqtt_bucket;
              var mqtt_name:any=ResultData[key].mqtt_name;
              var type_name:any=ResultData[key].type_name;
              var location_name:any=ResultData[key].location_name;
              var schedule_event_start:any=ResultData[key].schedule_event_start;
              var schedule_event:any=ResultData[key].schedule_event;
              var event:any=ResultData[key].schedule_event;
              var time_life:any=ResultData[key].time_life;
              var period:any=ResultData[key].period;
              var sunday:any=ResultData[key].sunday;
              var monday:any=ResultData[key].monday;
              var tuesday:any=ResultData[key].tuesday;
              var wednesday:any=ResultData[key].wednesday;
              var thursday:any=ResultData[key].thursday;
              var friday:any=ResultData[key].friday;
              var saturday:any=ResultData[key].saturday;
              var mqtt_id:any=ResultData[key].mqtt_id;
              var setting_id:any=ResultData[key].setting_id;
              var type_id:any=ResultData[key].type_id;
              var mqtt_data_value:any=ResultData[key].mqtt_data_value;
              var mqtt_data_control:any=ResultData[key].mqtt_data_control;
              var mqtt_control_on:any=ResultData[key].mqtt_control_on;
              var mqtt_control_off:any=ResultData[key].mqtt_control_off;
              var status_warning:any=ResultData[key].status_warning;
              var recovery_warning:any=ResultData[key].recovery_warning;
              var status_alert:any=ResultData[key].status_alert;
              var recovery_alert:any=ResultData[key].recovery_alert; 
              var work_status:any=ResultData[key].work_status;
              var max:any=ResultData[key].max;
              var min:any=ResultData[key].min;
              var measurement:any=ResultData[key].measurement;
              var device_org:any=ResultData[key].device_org; 
              var mqtt_org:any=ResultData[key].mqtt_org; 
              var mqtt_device_name:any=ResultData[key].mqtt_device_name;
              var mqtt_status_over_name:any=ResultData[key].mqtt_status_over_name;
              var mqtt_act_relay_name:any=ResultData[key].mqtt_act_relay_name;
              var mqtt_control_relay_name:any=ResultData[key].mqtt_control_relay_name; 
              var mqtt_message:any=ResultData[key].mqtt_control_relay_name;
              const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var today_name:any= format.getCurrentDayname();
              var now_time:any= format.getCurrentTime();
                        if(today_name=='sunday'){
                            if(sunday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='monday'){ 
                            if(monday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='tuesday'){ 
                            if(tuesday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='wednesday'){ 
                            if(wednesday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='thursday'){ 
                            if(thursday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='friday'){ 
                            if(friday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        }else if(today_name=='saturday'){ 
                            if(saturday==1){
                              var today_satatus:any=1;
                            }else{
                              var today_satatus:any=0;
                            }
                        } 
                        if(event==1){
                            var message_mqtt_control :any=mqtt_control_on;
                        }else{
                            var message_mqtt_control :any=mqtt_control_off; 
                        } 
                     var cases:any=message_mqtt_control; 
                      var now_time_1:any= format.getCurrentTimeStatus(now_time,schedule_event_start);
                      var now_time_2:any= format.getCurrentTimeStatus(schedule_event_start,schedule_event_start);
                      var now_time_1_s:any= format.getCurrentTimeStatusMsg(now_time,schedule_event_start);
                      var now_time_2_s:any= format.getCurrentTimeStatusMsg(schedule_event_start,schedule_event_start);
                      var date_now =format.getCurrentDatenow();
                      var time_now =format.getCurrentTimenow();
                      if((today_satatus==1) && (now_time_1==now_time_2)){
                          if(now_time_1=='1' && now_time_2=='1'){
                              var dataset:any={ 
                                            schedule_id:schedule_id,
                                            device_id: device_id, 
                                            schedule_event_start: schedule_event_start,  
                                            date:date_now,  
                              };
                              var log_count :any= await this.settingsService.scheduleprocesslog_count(dataset); 
                              console.log(`1-dataset=>` + dataset); 
                              if(log_count>=1){ 
                                  console.log(`------------------log_count==1------------------`);
                                  console.log(`1-log_count=>` + log_count);
                                  var cases:any=1; 
                                  var log_count2 :any= await this.settingsService.scheduleprocesslog_count_status(dataset);
                                  if(log_count2>=1){ }else{
                                        var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                        if(deviceData){  
                                            var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                           // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                            var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                            var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                            var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                            var datasetupdate:any={  
                                                          schedule_id: schedule_id,
                                                          device_id: device_id, 
                                                          schedule_event_start: schedule_event_start, 
                                                          schedule_event: message_mqtt_control, 
                                                          date: date_now, 
                                                          time: time_now,
                                                          device_status:message_mqtt_control,
                                                          status: 1,
                                                          updateddate:Date(),
                                            }; 
                                            await this.settingsService.update_scheduleprocesslog_v2(datasetupdate);
                                        }   
                                        console.log(`devicecontrol=>`); console.info(devicecontrol);
                                        console.log(`1-log_count2=>` + log_count2);
                                        console.log(`createset=>update=>`); console.info(datasetupdate);
                                      }
                              }else if(log_count==0){  
                                console.log(`------------------log_count==0------------------`); 
                                console.log(`2-log_count=>` + log_count);
                                console.log(`2-mqtt_data_control=>` + mqtt_data_control);
                                console.log(`2-message_mqtt_control=>` + message_mqtt_control);
                                var cases:any=2; 
                                var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                               // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                var dataset:any={ 
                                              schedule_id:schedule_id,
                                              device_id: device_id, 
                                              schedule_event_start: schedule_event_start,  
                                              date:date_now, 
                                };
                                  var log_count :any= await this.settingsService.scheduleprocesslog_count_status(dataset);
                                  var createset:any={ 
                                                        schedule_id:schedule_id,
                                                        device_id: device_id,
                                                        schedule_event_start: schedule_event_start,
                                                        day: today_name,
                                                        doday: today_name,
                                                        dotime: now_time_s,
                                                        schedule_event: message_mqtt_control, 
                                                        device_status: message_mqtt_control,
                                                        status:device_1,
                                                        date:date_now,
                                                        time:time_now,
                                                        createddate:Date(),
                                                        updateddate:Date(),
                                                    };
                                await this.settingsService.create_scheduleprocesslog(createset);  
                                  console.log(`2-dataset1=>`);
                                  console.info(dataset); 
                                  console.log(`2-now_time_s=>`+now_time_s);
                                  console.log(`2-device_1=>`+device_1);
                                  console.log(`2-device_status=>`+device_status); 
                                  console.log(`2-logcount=>`+log_count);
                                  console.log(`2-schedule_id=>`+schedule_id);
                                  console.log(`2-device_id=>`+device_id);
                                  console.log(`2-schedule_event_start=>`+schedule_event_start);
                                  console.log(`2-date_now=>`+date_now);
                                  console.log(`2-schedule_event=>`+schedule_event);
                                  console.log(`2-device_1=>`+device_1); 
                                  console.log(`2createset=>`); console.info(createset);
                              }   
                          } 
                      }else{ 
                        const ts:any={  
                                  device_id: device_id,
                                  schedule_id: schedule_id, 
                          };
                      }      
              const ProfileRs:any={  
                      device_id: device_id,
                      schedule_id: schedule_id,
                      schedule_name: schedule_name, 
                      start: schedule_start,  
                      event: event,
                      schedule_event: schedule_event,
                      sunday: sunday,
                      monday: monday,
                      tuesday: tuesday,
                      wednesday: wednesday,
                      thursday: thursday,
                      friday: friday,
                      saturday: saturday,
                      device_name: device_name,   
                      today_name: today_name,   
                      now_time: now_time,   
                      schedule_event_start: schedule_event_start,  
                      today_satatus:today_satatus,
                      now_time_1:now_time_1,
                      now_time_2:now_time_2,
                     //now_time_1_s:now_time_1_s,
                     //now_time_2_s:now_time_2_s,
                      date_now:date_now,
                      time_now:time_now,
                      log_count:log_count,
                      devicecontrol:devicecontrol,
                      case:cases,
              };
              tempDataoid.push(device_id);
              tempData.push(va);
              tempData2.push(ProfileRs);
          }  
          res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: {
              page,
              currentPage: page,
              pageSize,
              totalPages,
              total: rowData,
             //filter: filter2,
              data: tempData2,
             //ResultData:ResultData,
            },
            message: 'ok',
            message_th: 'success', 
          });
    } catch (error) {
     //console.error('scheduleprocess error:', error);
      return res.status(500).json({
        statusCode: 500,
        code: 500,
        payload: {
              page,
              currentPage: 1,
              pageSize,
              totalPages,
              total: 0,
             //filter: filter2,
              data: null,
             //ResultData:ResultData,
            }, 
        message: 'Internal server error 500',
        message_th: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ 500',
        error: error.message || error,
      });
    }
  }
  /*******************/  
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Get('scheduleprocesslog')
  @ApiOperation({ summary: 'schedule process' })
  async schedule_process_log_page(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 100000000000;
    var sort:any = query.sort;
    var keyword:any = query.keyword || ''; 
    var schedule_event_start:any = query.schedule_event_start || '';
    var day:any = query.day || ''; 
    var doday:any = query.doday || '';
    var dotime:any = query.dotime || '';
    var schedule_event:any =query.schedule_event || '';
    var device_status:any = query.device_status || ''; 
    var filter = {
      sort,
      device_id,
      schedule_id,
      schedule_event_start,
      day,
      doday,
      dotime,
      schedule_event,
      device_status,
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
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.scheduleprocesslog_paginate(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.scheduleprocesslog_paginate(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  /************create_setting***************/
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createdevicealarmaction')
  async create_devicealarmaction(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: DevicealarmactionDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
    const Rs:any=await this.settingsService.get_devicealarmaction_chk(DataDto.action_name);
    if (Rs) {
        console.log('dto.sn=>' + DataDto.action_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  sn: DataDto.action_name },
          message: 'The SN  duplicate this data cannot createddate.',
          message_th: 'ข้อมูล SN '+DataDto.action_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }  
    await this.settingsService.create_devicealarmaction(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create device alarm action successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  @HttpCode(201)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @Post('createalarmdevicepaginate')
  async create_alarmdevicepaginate(
    @Res() res: Response,
   //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: CreateSettingDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    } 
    const Rs:any=await this.settingsService.get_setting_sn(DataDto.sn);
    if (Rs) {
        console.log('dto.sn=>' + DataDto.sn); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  sn: DataDto.sn },
          message: 'The SN  duplicate this data cannot createddate.',
          message_th: 'ข้อมูล SN '+DataDto.sn+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
       //throw new UnprocessableEntityException();
    }  
    await this.settingsService.create_setting(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }
  @HttpCode(200)
 //@AuthUserRequired()
 //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'alarm device paginate' })
  @Get('alarmdevice')
  async alarm_device_paginate(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var alarm_action_id:any=query.alarm_action_id || '';  
      var status:any=query.status || ''; 
      var sort:any=query.sort || 'createddate-ASC';
      let keyword:any=query.keyword || '';
      let filter:any={};
      filter.sort = query.sort;
      filter.keyword = keyword || '';   
      filter.status = query.status || '';  
      filter.alarm_action_id = alarm_action_id || '';  
      filter.event = query.event || '';  
      filter.isCount = 1;
      let rowResultData:any=await this.settingsService.alarm_device_paginate(filter);
      if (!rowResultData || rowResultData.status=='422') {
          res.status(200).json({
            statuscode: 200,
            code: 400,
            payload: null, 
            message: 'Data is null.',
            message_th: 'ไม่พบข้อมูล', 
          });
        return;
      } 
      const rowData:any=Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2:any={};
      filter2.sort = query.sort;
      filter2.keyword = keyword || '';   
      filter2.status = query.status || '';  
      filter2.alarm_action_id = alarm_action_id || '';  
      filter2.event = query.event || '';  
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData:any=await this.settingsService.alarm_device_paginate(filter2);
      let tempDataoid = []; 
      for (const [key, va] of Object.entries(ResultData)) { 
        var alarm_action_id:any=ResultData[key].alarm_action_id; 
        var action_name:any=ResultData[key].action_name; 
        var filter1:any={};
            filter1.alarm_action_id = alarm_action_id;  
        var count_device:any=await this.settingsService.alarm_device_id_alarm_count(filter1);
        var filter3:any={};
            filter3.alarm_action_id = alarm_action_id;  
        var count_device_event:any=await this.settingsService.alarm_device_id_event_count(filter3);
        const DataRs:any={ 
                  alarm_action_id: alarm_action_id,  
                  action_name: action_name,  
                  status_warning: ResultData[key].status_warning, 
                  recovery_warning: ResultData[key].recovery_warning,
                  status_alert: ResultData[key].status_alert,
                  recovery_alert: ResultData[key].recovery_alert,
                  email_alarm: ResultData[key].email_alarm,
                  line_alarm: ResultData[key].line_alarm,
                  telegram_alarm: ResultData[key].telegram_alarm,
                  sms_alarm: ResultData[key].sms_alarm,
                  nonc_alarm: ResultData[key].nonc_alarm,
                  time_life: ResultData[key].time_life,
                  event: ResultData[key].event,
                  status: ResultData[key].status,
                  count_device:count_device,
                  count_device_event:count_device_event,
        }
        tempDataoid.push(DataRs);
      } 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: {
            page: page,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            total: rowData,
            filter: filter2,
            data: tempDataoid,
        },
        message: 'get data success.',
        message_th: 'get data success.',
      });
  }
 // updatealarmstatus
  @HttpCode(200)
  @ApiOperation({ summary: 'update alarm status' })
  @Post('updatealarmstatus')
  async updatealarmstatus(
    @Res() res: Response,
    @Body() dto: any,
    @Req() req: any,
  ) {
    try {
     // ตรวจสอบ token
      const token = req.headers.authorization?.replace('Bearer ', '').trim();
      if (!token) {
        return res.status(401).json({
          statusCode: 401,
          code: 401,
          message: 'Unauthorized',
          message_th: 'ไม่ได้รับอนุญาต',
        });
      } 
      const alarm_action_id: number = dto.alarm_action_id;
      if (!alarm_action_id) {
        return res.status(200).json({
          statusCode: 200,
          code: 404,
          payload: dto,
          message: 'alarm_action_id is null.',
          message_th: 'ไม่พบข้อมูล alarm_action_id.',
        });
      }  
     // ตรวจสอบว่า schedule มีอยู่จริงหรือไม่
      const rsbucket:any=await this.settingsService.get_alarm_device(alarm_action_id);
      if (!rsbucket || rsbucket.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          code: 404,
          payload: dto,
          message: `ไม่พบ alarm_action_id ${alarm_action_id}`,
          message_th: `ไม่พบ alarm_action_id ${alarm_action_id}`,
        });
      }

     // เตรียมข้อมูลที่จะอัปเดต 
      const valdata = ['status_warning','recovery_warning', 'status_alert', 'recovery_alert', 'email_alarm', 'line_alarm', 'telegram_alarm', 'sms_alarm', 'nonc_alarm', 'event', 'status'];
      const DataUpdate:any={};
       for (const da of valdata) {
        if (dto[da] !== undefined && dto[da] !== '') {
          DataUpdate[da] = dto[da];
        }
      }  
      if (Object.keys(DataUpdate).length === 0) {
        return res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: dto,
          message: 'No valid fields to update.',
          message_th: 'ไม่มีข้อมูลที่ต้องอัปเดต',
        });
      }

     // อัปเดต schedule
      const rt:any=await this.settingsService.update_alarm_device_status_val(alarm_action_id, DataUpdate);

      if (rt) {
        return res.status(200).json({
          statusCode: 200,
          code: 200,
          alarm_action_id,
          payload: DataUpdate,
          rt,
          message: 'Update successful.',
          message_th: 'อัปเดตสำเร็จ.',
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: DataUpdate,
          rt,
          message: 'Update Unsuccessful',
          message_th: 'อัปเดตไม่สำเร็จ',
        });
      }
    } catch (err) {
      return res.status(500).json({
        statusCode: 500,
        code: 500,
        message: 'Internal Server Error',
        message_th: 'เกิดข้อผิดพลาดภายในระบบ',
        error: err.message,
      });
    }
  }
  @HttpCode(200) 
  @Get('scheduleprocesslogpaginate')
  @ApiOperation({ summary: 'schedule process log paginate' })
  async scheduleprocesslogpaginate(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';      
    var filter = {
      sort,
      type_id,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    };
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.scheduleprocesslogpaginate(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.scheduleprocesslogpaginate(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  @HttpCode(200) 
  @Get('alarmlogpaginate')
  @ApiOperation({ summary: 'alarm log paginate' })
  async alarmlogpaginate(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    };
    /*
        if(type_id_log==1){
            var email_alarm:any=1;
          }else if(type_id_log==2){
            var line_alarm:any=1;
          }if(type_id_log==3){
            var telegram_alarm:any=1;
          }if(type_id_log==4){
            var sms_alarm:any=1;
          }if(type_id_log==5){
            var nonc_alarm:any=1;
          } 
    */
    var rowResultData:any=await this.settingsService.alarmlogpaginate(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpaginate(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  }   
  /*****alarmlogpaginateemail****/
  @HttpCode(200) 
  @Get('alarmlogpaginateemail')
  @ApiOperation({ summary: 'alarm log email paginate' })
  async alarmlogpaginateemail(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    }; 
    var rowResultData:any=await this.settingsService.alarmlogpaginateemail(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpaginateemail(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  /*****alarmlogpaginatecontrol****/
  @HttpCode(200) 
  @Get('alarmlogpaginatecontrols')
  @ApiOperation({ summary: 'alarm log controls paginate' })
  async alarmlogpaginatecontrols(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    }; 
    var rowResultData:any=await this.settingsService.alarmlogpaginateecontrol(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpaginateecontrol(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  /*****alarmlogpaginateline****/
  @HttpCode(200) 
  @Get('alarmlogpaginateline')
  @ApiOperation({ summary: 'alarm log line paginate' })
  async alarmlogpaginateline(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    }; 
    var rowResultData:any=await this.settingsService.alarmlogpagline(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpagline(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  /*****alarmlogpaginatesms****/
  @HttpCode(200) 
  @Get('alarmlogpaginatesms')
  @ApiOperation({ summary: 'alarm log sms paginate' })
  async alarmlogpaginatesms(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    }; 
    var rowResultData:any=await this.settingsService.alarmlogpagesms(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpagesms(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
  /*****alarmlogpaginatetelegram****/
  @HttpCode(200) 
  @Get('alarmlogpaginatetelegram')
  @ApiOperation({ summary: 'alarm log telegram paginate' })
  async alarmlogpaginatetelegram(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    var device_id:any = query.device_id || '';
    var schedule_id:any = query.schedule_id || '';
    var page = Number(query.page) || 1;
    var pageSize = Number(query.pageSize) || 10;
    var sort:any = query.sort;
    var status:any = query.status;
    var keyword:any = query.keyword || '';   
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';   
    var type_id_log:any = query.type_id_log || '';   
    var filter = {
      sort,
      type_id,
      type_id_log,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      schedule_id, 
      status,
      isCount: 1,
    }; 
    var rowResultData:any=await this.settingsService.alarmlogpaginatetelegram(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarmlogpaginatetelegram(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  }  
  @HttpCode(200) 
  @Get('alarmlogpaginatecontrol')
  @ApiOperation({ summary: 'alarm log paginate' })
  async alarmlogpaginatecontrol(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<any> {
    const page: number = Number(query.page) || 1;
    const pageSize: number = Number(query.pageSize) || 1000;
    var alarm_action_id:any=query.alarm_action_id || '';  
    var status:any=query.status || ''; 
    var sort:any=query.sort || 'createddate-ASC';
    let keyword:any=query.keyword || '';
    var device_id:any = query.device_id || '';
    var sort:any = query.sort;
    var status:any = query.status;
    var type_id:any = query.type_id || '';   
    var location_id:any = query.location_id || '';   
    var event:any = query.event || '';   
    var bucket:any = query.bucket || '';   
    var start:any = query.start || '';   
    var end:any = query.end || '';      
    var filter = {
      sort,
      type_id,
      location_id,
      bucket,
      event,
      start,
      end,
      keyword,
      device_id,
      alarm_action_id, 
      status,
      isCount: 1,
    };
   // นับจำนวนข้อมูลทั้งหมด
    var rowResultData:any=await this.settingsService.alarm_processlog_page_temp_control(filter);
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
    var filter2 = {
      ...filter,
      isCount: 0,
      page,
      pageSize,
    };
    var ResultData:any=await this.settingsService.alarm_processlog_page_temp_control(filter2);
    res.status(200).json({
      statusCode: 200,
      code: 200,
      payload: {
        page,
        currentPage: page,
        pageSize,
        totalPages,
        total: rowData,
        filter: filter2,
        data: ResultData,
      },
      message: 'ok',
      message_th: 'success',
    });
  } 
 //function 
 // get_alarm_control v2
  async get_alarm_control(alarm_action_id_mas: any,device_id_mas:any) { 
                          var validate_count:any=3;
                          var filter_alarm2:any={};
                          filter_alarm2.alarm_action_id = alarm_action_id_mas;  
                          filter_alarm2.device_id = device_id_mas;  
                          var device_event_control_ar:any = [];  
                          var device_data_control:any=await this.settingsService.device_list_paginate_alarm_device_event_control(filter_alarm2);  
                          var subject:any = 'Normal status';  
                          var content:any ='Normal status';   
                          var alarm_status_set:number=0;
                          var alarm_status:number =0;
                          for (const [key, val] of Object.entries(device_data_control)) {     
                                    var device_id:any = device_data_control[key].device_id;
                                    var mqtt_id:any = device_data_control[key].mqtt_id;
                                    var setting_id:any = device_data_control[key].setting_id;
                                    var alarm_action_id:any = device_data_control[key].alarm_action_id;
                                    var type_id:any = device_data_control[key].type_id;
                                    var device_name:any = device_data_control[key].device_name;
                                    var hardware_id:any = device_data_control[key].hardware_id; 
                                    var time_life:any = device_data_control[key].time_life;
                                    var period:any = device_data_control[key].period;
                                    var work_status:any = device_data_control[key].work_status;
                                    var max:any = device_data_control[key].max;
                                    var min:any = device_data_control[key].min;
                                    var measurement:any = device_data_control[key].measurement;
                                    var sn:any = device_data_control[key].sn;
                                    var oid:any = device_data_control[key].oid;
                                    var model:any = device_data_control[key].model;
                                    var vendor:any = device_data_control[key].vendor;
                                    var comparevalue:any = device_data_control[key].comparevalue;
                                    var status:any = device_data_control[key].status;
                                    var unit:any = device_data_control[key].unit;
                                    var action_id:any = device_data_control[key].action_id;
                                    var status_alert_id:any = device_data_control[key].status_alert_id;
                                    var device_org:any = device_data_control[key].device_org;
                                    var device_bucket:any = device_data_control[key].device_bucket;
                                    var type_name:any = device_data_control[key].type_name;
                                    var location_name:any = device_data_control[key].location_name;
                                    var mqtt_name:any = device_data_control[key].mqtt_name;
                                    var mqtt_org:any = device_data_control[key].mqtt_org;
                                    var mqtt_bucket:any = device_data_control[key].mqtt_bucket;
                                    var mqtt_envavorment:any = device_data_control[key].mqtt_envavorment;
                                    var mqtt_host:any = device_data_control[key].mqtt_host;
                                    var mqtt_port:any = device_data_control[key].mqtt_port;
                                     var mqtt_device_name:any = device_data_control[key].mqtt_device_name;
                                     var mqtt_status_over_name:any = device_data_control[key].mqtt_status_over_name;
                                     var mqtt_status_data_name:any = device_data_control[key].mqtt_status_data_name;
                                     var mqtt_act_relay_name:any = device_data_control[key].mqtt_act_relay_name;
                                     var mqtt_control_relay_name:any = device_data_control[key].mqtt_control_relay_name;
                                     var action_name:any = device_data_control[key].action_name; 
                                     var mqtt_data_value:any = device_data_control[key].mqtt_data_value;
                                     var mqtt_data_control:any = device_data_control[key].mqtt_data_control;
                                     var mqtt_control_on:any = device_data_control[key].mqtt_control_on;
                                     var mqtt_control_off:any = device_data_control[key].mqtt_control_off;
                                     var mqttrs:any = await this.mqttService.getdevicedataAll(mqtt_data_value); 
                                     var configdata:any = device_data_control[key].configdata;
                                     var mqtt_data:any = mqttrs['data'];
                                     var mqtt_timestamp:any = mqttrs['timestamp'];
                                     var timestamp:any = mqttrs['timestamp']; 
                                     var mqttrs_count:any=mqtt_data.length; 
                                     let obj:any=[]; 
                                     try {
                                       obj = JSON.parse(configdata);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_objt_data = Object.values(obj);
                                     var mqtt_count:any=mqtt_objt_data.length;
                                     var mqtt_status_data_name = device_data_control[key].mqtt_status_data_name;
                                     let obj2:any=[];
                                     try {
                                       obj2 = JSON.parse(mqtt_status_data_name);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_obj2_data = Object.values(obj2);
                                     var mqtt2_count:any=mqtt_obj2_data.length;
                                     var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
                                     var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
                                    // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
                                   if(mqttrs_count<mqtt_count){
                                       var mqtt:any=mqtt_v1; 
                                   }else{
                                       var mqtt:any=mqtt_v2; 
                                   }
                               var merged = format.mapMqttDataToDeviceV2([val], mqtt)[0];
                               var status_warning:any = device_data_control[key].status_warning;
                               var recovery_warning:any = device_data_control[key].recovery_warning;
                               var status_alert:any = device_data_control[key].status_alert;
                               var recovery_alert:any = device_data_control[key].recovery_alert; 
                               var sensor_value_data:any = merged.value_data;
                               var sensor_value_alarm:any =merged.value_alarm;
                               var sensor_value_relay:any =merged.value_relay;
                               var sensor_value_control_relay:any =merged.value_control_relay;
                               var email_alarm:any = device_data_control[key].email_alarm;
                               var line_alarm:any = device_data_control[key].line_alarm;
                               var telegram_alarm:any = device_data_control[key].telegram_alarm;
                               var sms_alarm:any = device_data_control[key].sms_alarm;
                               var nonc_alarm:any = device_data_control[key].nonc_alarm;
                               var event:any = device_data_control[key].event;
                               var alarm_action_name:any = device_data_control[key].action_name;
                               var alarm_event:any = device_data_control[key].event;
                               var action_name:any = device_data_control[key].action_name; 
                               var mqtt_data_value:any = device_data_control[key].mqtt_data_value;
                               var mqtt_data_control:any = device_data_control[key].mqtt_data_control;
                               var mqtt_control_on:any = device_data_control[key].mqtt_control_on;
                               var mqtt_control_off:any = device_data_control[key].mqtt_control_off;
                               var alarm_status_warning:any = device_data_control[key].status_warning;
                               var alarm_recovery_warning:any = device_data_control[key].recovery_warning;
                               var alarm_status_alert:any = device_data_control[key].status_alert;
                               var alarm_recovery_alert:any = device_data_control[key].recovery_alert; 
                               var alarm_time_life:any = device_data_control[key].time_life;
                               var alarm_type_id:any = device_data_control[key].type_id;  
                               var mqtt_name:any = device_data_control[key].mqtt_name;
                               var mqtt_device_name:any = device_data_control[key].mqtt_device_name;
                               var device_name:any = device_data_control[key].device_name; 
                              if(event==1){
                                  var message_mqtt_control :any=mqtt_control_on;
                              }else if(event==0){
                                  var message_mqtt_control :any=mqtt_control_off;
                              }

                              /////////////////////////////////
                                var datenow =format.getCurrentDatenow();
                                var setdata_chk:any={};
                                    setdata_chk.alarm_action_id = alarm_action_id;  
                                    setdata_chk.device_id = device_id;  
                                    setdata_chk.type_id = type_id;   
                                    setdata_chk.date = datenow; 
                                    setdata_chk.data_alarm = data_alarm;   
                                    console.log('setdata_chk =>', setdata_chk); 
                                    // select count(*) as counts from sd_alarm_process_log  where 1=1 and  id ='7b8e8b59-9576-42cb-9780-911cc15da090' and date='2025-08-20'
                                    // select * from sd_alarm_process_log  where 1=1 and  id ='7b8e8b59-9576-42cb-9780-911cc15da090' and date='2025-08-20'
                                    var setdata_chk_count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                    var setdata_chk_log_alarm_logs_data:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                    console.log(`log_alarm_count: ${count_alarm}`);
                                    console.log('log_alarm_logs:', count_alarm);
                                    if (setdata_chk_count_alarm > 0) {}
                                    if (setdata_chk_log_alarm_logs_data > 0) {}

 
                          var setdata_chk_log_alarm_logs:any=[];    
                          for (const [keys, value] of Object.entries(setdata_chk_log_alarm_logs_data)) {   
                                    var id_val2:any = setdata_chk_log_alarm_logs_data[keys].id;  
                                    var alarm_action_id_val2:any = setdata_chk_log_alarm_logs_data[keys].alarm_action_id;  
                                    var device_id_val2:any = setdata_chk_log_alarm_logs_data[keys].device_id;  
                                    var type_id_val2:any = setdata_chk_log_alarm_logs_data[keys].type_id;  
                                    var event_val2:any = setdata_chk_log_alarm_logs_data[keys].event;  
                                    var alarm_type_val2:any = setdata_chk_log_alarm_logs_data[keys].alarm_type;  
                                    var status_warning_val2:any = setdata_chk_log_alarm_logs_data[keys].status_warning;  
                                    var recovery_warning_val2:any = setdata_chk_log_alarm_logs_data[keys].recovery_warning;  
                                    var status_alert_val2:any = setdata_chk_log_alarm_logs_data[keys].status_alert;  
                                    var recovery_alert_val2:any = setdata_chk_log_alarm_logs_data[keys].recovery_alert;  
                                    var email_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].email_alarm;  
                                    var line_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].line_alarm;  
                                    var telegram_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].telegram_alarm;  
                                    var sms_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].sms_alarm;  

                                    var nonc_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].nonc_alarm;  
                                    var status_val2:any = setdata_chk_log_alarm_logs_data[keys].status;  
                                    var date_val2:any = setdata_chk_log_alarm_logs_data[keys].date;  
                                    var time_val2:any = setdata_chk_log_alarm_logs_data[keys].time;  
                                    var data_val2:any = setdata_chk_log_alarm_logs_data[keys].data;  
                                    var data_alarm_val2:any = setdata_chk_log_alarm_logs_data[keys].data_alarm;  
                                    var alarmstatus_val2:any = setdata_chk_log_alarm_logs_data[keys].alarm_status;  
                                    var subject_val2:any = setdata_chk_log_alarm_logs_data[keys].subject;  
                                    var content_val2:any = setdata_chk_log_alarm_logs_data[keys].content;  
                                    var createddate_val2:any = setdata_chk_log_alarm_logs_data[keys].createddate;  
                                    var updateddate_val2:any = setdata_chk_log_alarm_logs_data[keys].updateddate;  
                               setdata_chk_log_alarm_logs.push({ 
                                                                id:id_val2, 
                                                                alarm_action_id:alarm_action_id_val2,  
                                                                device_id:device_id_val2, 
                                                                type_id:type_id_val2, 
                                                                event:event_val2, 
                                                                // alarm_type:alarm_type_val2, 
                                                                // status_warning:status_warning_val2, 
                                                                // recovery_warning:recovery_warning_val2, 
                                                                // status_alert:status_alert_val2, 
                                                                // recovery_alert:recovery_alert_val2, 
                                                                // email_alarm:email_alarm_val2, 
                                                                // line_alarm:line_alarm,_val2 
                                                                // telegram_alarm:telegram_alarm_val2, 
                                                                // sms_alarm:sms_alarm_val2,
                                                                // nonc_alarm:nonc_alarm_val2,
                                                                // status:status_val2,
                                                                date:date_val2,
                                                                time:time_val2,
                                                                data_cerrent_sensor:sensor_value_data,
                                                                data_log:data_val2,
                                                                data_alarm:data_alarm_val2,
                                                                alarmstatus:alarmstatus_val2,
                                                                subject:subject_val2,
                                                                content:content_val2,
                                                                createddate:format.timeConvertermas(format.convertTZ(createddate_val2, process.env.tzString)),
                                                                updateddate:format.timeConvertermas(format.convertTZ(updateddate_val2, process.env.tzString))
                                                              });
                          }
                                /////////////////////////////////
                                /*
                                 alarm_status_set 
                                 1=Warning
                                 2=Alarm
                                 3=Recovery Warning
                                 4=Recovery Alarm
                                 */
                              /////////////////////////////////////////////////////////////////////////
                              if(alarm_type_id==1){
                                   if(sensor_value_data<status_alert && sensor_value_data>=status_warning){
                                       var alarm_status_set:number=1;
                                       var subject:any = mqtt_name+' Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Warning  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       
                                       var data_alarm:any =status_warning;
                                      if(event==1){
                                            var message_mqtt_control :any=mqtt_control_on;
                                            var event_control :number=1;
                                      }else if(event==0){
                                            var message_mqtt_control :any=mqtt_control_off;
                                            var event_control :number=0;
                                      }  
                                   }else if(sensor_value_data>=status_alert){
                                       var alarm_status_set:number=2;
                                       var subject:any = mqtt_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       
                                       var data_alarm:any =status_alert;
                                        if(event==1){
                                          var message_mqtt_control :any=mqtt_control_on;
                                          var event_control :number=1;
                                        }else if(event==0){
                                          var message_mqtt_control :any=mqtt_control_off;
                                          var event_control :number=0;
                                        }
                                   }else if(sensor_value_data<=recovery_warning){
                                       var alarm_status_set:number=3;
                                       var subject:any = mqtt_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       
                                       var data_alarm:any =recovery_warning;
                                       if(event==1){
                                          var message_mqtt_control :any=mqtt_control_off;
                                          var event_control :number=0;
                                        }else if(event==0){
                                          var message_mqtt_control :any=mqtt_control_on;
                                          var event_control :number=1;
                                        }
                                   }else if(sensor_value_data<=recovery_alert){
                                       var alarm_status_set:number=4;
                                       var subject:any = mqtt_name+' Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =4;
                                       var data_alarm:any =recovery_alert;
                                        if(event==1){
                                          var message_mqtt_control :any=mqtt_control_off;
                                          var event_control :number=0;
                                        }else if(event==0){
                                          var message_mqtt_control :any=mqtt_control_on;
                                          var event_control :number=1;
                                        }
                                   }
                                  /////////////////////////////////////////////////
                                   var now_time_fulls:any= format.getCurrentFullDatenow();
                                   var now_time_full =  format.timeConvertermas(format.convertTZ(now_time_fulls, process.env.tzString)); 
                                   var now_time:any= format.getCurrentTime();
                                   var date_now =format.getCurrentDatenow();
                                   var time_now =format.getCurrentTimenow();
                                   var cases:any=message_mqtt_control; 
                                   var log_time:any ='';
                                   if(log_time==""){
                                     var log_time:any= time_now;
                                   }
                                   var now_time_cal :number= 1;
                                   var datenow =format.getCurrentDatenow();
                                   var setdata_chk:any={};
                                       setdata_chk.alarm_action_id = alarm_action_id;  
                                       setdata_chk.device_id = device_id;  
                                       setdata_chk.type_id = type_id;   
                                       setdata_chk.date = datenow; 
                                       setdata_chk.data_alarm = data_alarm;   
                                     console.log('setdata_chk =>', setdata_chk); 
                                    // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log 
                                     var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                     var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                     console.log(`log_alarm_count: ${count_alarm}`);
                                     console.log('log_alarm_logs:', count_alarm);
                                     if (count_alarm > 0) {
                                           var first_log = log_alarm_logs[0];
                                           console.log('First log record:', first_log);
                                     }else{
                                           var irst_log:any="";
                                     }
                                     var log_alarm_count_set :number= count_alarm; 
                                     if(log_alarm_count_set>=1){   
                                           var log_alarm_log =  first_log;
                                           var log_time  :any=  format.timeConvertermas(format.convertTZ(log_alarm_logs[0].createddate, process.env.tzString));  
                                           var now_time_cal: number= format.diffMinutes(now_time_full,log_time);  
                                     }else{
                                           var now_time_cal: number= format.diffMinutes(now_time_full,now_time_full);   
                                     } 
                                       /*
                                          alarm_status_set , alarm_status
                                            1=Warning
                                            2=Alarm
                                            3=Recovery Warning
                                            4=Recovery Alarm 
                                      */
                                    if(alarm_status_set==3 ||alarm_status_set==4){
                                            var datenow =format.getCurrentDatenow();
                                            var setdata_chk:any={}; 
                                                setdata_chk.device_id = device_id;  
                                                setdata_chk.type_id = type_id;   
                                                setdata_chk.date = datenow;  
                                                setdata_chk.alarm_status = alarm_status_set;  
                                              console.log('setdata_chk =>', setdata_chk);  
                                              var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                              var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                              console.log(`log_alarm_count: ${count_alarm}`);
                                            if(count_alarm>=1 && count_alarm<=2){ 
                                              var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                              // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                              var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                              var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                              var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                          }
                                    }
                                      ////////////////////////////////////////////
                                      if(log_alarm_count_set<=validate_count){
                                          if(now_time_cal>alarm_time_life){
                                              var contition:number=1;
                                              var log_alarm_log :any='';
                                              var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                              if(deviceData){ 
                                                  var devicecontrol_status:any=2;
                                                  if(alarm_status_set==1 ||alarm_status_set==1){
                                                    var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                                    // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                                    var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                                    var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                                    var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                                  }
                                                if (setdata_chk_count_alarm >=1) {
                                                    if(sensor_value_data<=recovery_warning){
                                                        var setdata_chk_delete:any={};
                                                        setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                        setdata_chk_delete.device_id = device_id;  
                                                        setdata_chk_delete.type_id = type_id;   
                                                        var datenow =format.getCurrentDatenow();
                                                        setdata_chk_delete.date_now = datenow; 
                                                        setdata_chk_delete.data_alarm = data_alarm;    
                                                      console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                      await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                    }else if(sensor_value_data<=recovery_alert){ 
                                                        var setdata_chk_delete:any={};
                                                        setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                        setdata_chk_delete.device_id = device_id;  
                                                        setdata_chk_delete.type_id = type_id;   
                                                        var datenow =format.getCurrentDatenow();
                                                        setdata_chk_delete.date_now = datenow; 
                                                        setdata_chk_delete.data_alarm = data_alarm;    
                                                      console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                      await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                    }
                                                }
                                                ////////////////////////
                                                var input_create:any={};
                                                    input_create.alarm_action_id= alarm_action_id;
                                                    input_create.device_id= device_id
                                                    input_create.type_id= alarm_type_id
                                                    input_create.event= event_control;
                                                    input_create.alarm_type= alarm_type_id;
                                                    input_create.status_warning= alarm_status_warning;
                                                    input_create.recovery_warning= alarm_recovery_warning;
                                                    input_create.status_alert= alarm_status_alert;
                                                    input_create.recovery_alert= alarm_recovery_alert;
                                                    input_create.email_alarm= '0';
                                                    input_create.line_alarm= '0';
                                                    input_create.telegram_alarm= '0';
                                                    input_create.sms_alarm= '0';
                                                    input_create.nonc_alarm= '1';
                                                    input_create.status=device_1;
                                                    input_create.date= date_now;
                                                    input_create.time= time_now;
                                                    input_create.createddate= Date(); 
                                                    input_create.updateddate= Date(); 
                                                    input_create.data= sensor_value_data;
                                                    input_create.data_alarm= data_alarm; 
                                                    input_create.alarm_status= alarm_status_set;//control 
                                                    /*
                                                        alarm_status_set 
                                                        1=Warning
                                                        2=Alarm
                                                        3=Recovery Warning
                                                        4=Recovery Alarm 
                                                    */
                                                    input_create.subject= subject+' ---case 3---';
                                                    input_create.content= content; 
                                                    console.log(`2-input_create=`);
                                                    console.info(input_create);
                                                    var datenow =format.getCurrentDatenow();
                                                    var date_now =format.getCurrentDatenow();
                                                    var time_now =format.getCurrentTimenow();
                                                    var setdata_chk:any={}; 
                                                          setdata_chk.device_id = device_id;  
                                                          setdata_chk.type_id = type_id;   
                                                          setdata_chk.date = datenow;  
                                                          setdata_chk.data = data_alarm;   
                                                          setdata_chk.alarm_status = alarm_status_set;   
                                                        console.log('setdata_chk =>', setdata_chk);  
                                                        var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                        var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                                        console.log(`log_alarm_count: ${count_alarm}`);
                                                        if(count_alarm<=validate_count){ 
                                                            var setdata_chk:any={}; 
                                                                setdata_chk.device_id = device_id;  
                                                                setdata_chk.type_id = type_id;   
                                                                setdata_chk.data = sensor_value_data;   
                                                                setdata_chk.date =format.getCurrentDatenow();
                                                                setdata_chk.alarm_status = alarm_status_set;  
                                                                setdata_chk.time = format.getCurrentTimenow();   
                                                                var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                            if(count_alarm<=1){
                                                              await this.settingsService.create_alarmprocesslog(input_create);
                                                              await this.settingsService.create_alarmprocesslogtemp(input_create); 
                                                            } 
                                                        }
                                              } 
                                          }
                                      }
                                     if(log_alarm_count_set>=1){   
                                               var contition:number=2;
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event_control;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '0';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '1';
                                                   input_create.status=device_1;
                                                  //  input_create.date= date_now;
                                                  //  input_create.time= time_now; 
                                                   input_create.updateddate= Date(); 
                                                  //  input_create.data= sensor_value_data;
                                                  //  input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= alarm_status_set;
                                                   /*
                                                      alarm_status_set 
                                                      1=Warning
                                                      2=Alarm
                                                      3=Recovery Warning
                                                      4=Recovery Alarm 
                                                  */
                                                  //  input_create.subject= subject;
                                                  //  input_create.content= content; 
                                                   console.log(`1-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.update_alarmprocesslog(input_create);
                                                  //await this.settingsService.update_alarmprocesslogtemp(input_create);
                                     }else if(log_alarm_count_set==0){  
                                                 var contition:number=3;  
                                                 var devicecontrol_status:any=1;
                                                 var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                                 if(deviceData){ 
                                                        if(alarm_status>=1){
                                                          /*
                                                              alarm_status_set , alarm_status
                                                              1=Warning
                                                              2=Alarm
                                                              3=Recovery Warning
                                                              4=Recovery Alarm 
                                                          */ 
                                                              if(alarm_status_set==1 ||alarm_status_set==2){
                                                                  var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                                                  // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                                                  var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                                                  var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                                                  var device_status:any = devicecontrol['dataObject']['device_status']; // on  off

                                                            } 

                                                        }
                                                 } 
                                               if(device_status==""){
                                                 var status:any=0;
                                               }else{
                                                   var status:any=1; 
                                               }
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event_control;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '0';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '1';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= alarm_status_set; 
                                                   input_create.subject= subject;
                                                   input_create.content= content+' ---case 1---';
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                    
                                                        /*
                                                            alarm_status_set , alarm_status
                                                            1=Warning
                                                            2=Alarm
                                                            3=Recovery Warning
                                                            4=Recovery Alarm 
                                                        */
                                                       if(alarm_status_set==1 || alarm_status_set==2){  
                                                               
                                                              var setdata_chk:any={}; 
                                                              setdata_chk.device_id = device_id;  
                                                              setdata_chk.type_id = type_id;   
                                                              setdata_chk.date =format.getCurrentDatenow();
                                                              setdata_chk.data = sensor_value_data;  
                                                              setdata_chk.alarm_status = alarm_status_set;  
                                                              setdata_chk.time = format.getCurrentTimenow(); 
                                                              setdata_chk.data_log =sensor_value_data; 
                                                              var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                          if(count_alarm<=1){ 
                                                                await this.settingsService.create_alarmprocesslog(input_create);
                                                                await this.settingsService.create_alarmprocesslogtemp(input_create);  
                                                          }
                                                       }
                                     } 
                                     if(alarm_status_set==3 ||alarm_status_set==4){ 
                                          var datenow =format.getCurrentDatenow();
                                          var date_now =format.getCurrentDatenow();
                                          var time_now =format.getCurrentTimenow();
                                          var setdata_chk:any={}; 
                                              setdata_chk.device_id = device_id;  
                                              setdata_chk.type_id = type_id;   
                                              setdata_chk.date = datenow;  
                                              setdata_chk.alarm_status = alarm_status_set;  
                                            console.log('setdata_chk =>', setdata_chk);  
                                            var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                            var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                            console.log(`log_alarm_count: ${count_alarm}`);
                                          if(count_alarm>=1){
                                                          if(device_status==""){
                                                            var status:any=0;
                                                          }else{
                                                              var status:any=1; 
                                                          }
                                                          var input_create:any={};
                                                              var datenow =format.getCurrentDatenow();
                                                              input_create.alarm_action_id= alarm_action_id;
                                                              input_create.device_id= device_id
                                                              input_create.type_id= alarm_type_id
                                                              input_create.event= event_control;
                                                              input_create.alarm_type= alarm_type_id;
                                                              input_create.status_warning= alarm_status_warning;
                                                              input_create.recovery_warning= alarm_recovery_warning;
                                                              input_create.status_alert= alarm_status_alert;
                                                              input_create.recovery_alert= alarm_recovery_alert;
                                                              input_create.email_alarm= '0';
                                                              input_create.line_alarm= '0';
                                                              input_create.telegram_alarm= '0';
                                                              input_create.sms_alarm= '0';
                                                              input_create.nonc_alarm= '1';
                                                              input_create.status=device_1;
                                                              input_create.date= date_now;
                                                              input_create.time= time_now;
                                                              input_create.createddate= Date(); 
                                                              input_create.updateddate= Date(); 
                                                              input_create.data= sensor_value_data;
                                                              input_create.data_alarm= data_alarm; 
                                                              input_create.alarm_status= alarm_status_set; 
                                                              input_create.subject= subject+' ---case 2---';
                                                              input_create.content= content; 
                                                              console.log(`rc-input_create=`);
                                                              console.info(input_create); 
                                                              /*
                                                                  alarm_status_set , alarm_status
                                                                  1=Warning
                                                                  2=Alarm
                                                                  3=Recovery Warning
                                                                  4=Recovery Alarm 
                                                              */ 
                                                              var setdata_chk_delete:any={};
                                                                setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                                setdata_chk_delete.device_id = device_id;  
                                                                setdata_chk_delete.type_id = alarm_type_id;   
                                                                setdata_chk_delete.date_now = datenow;  
                                                              // setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                              console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                              await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                                var setdata_chk_delete:any={};
                                                                setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                                setdata_chk_delete.device_id = device_id;  
                                                                setdata_chk_delete.type_id = alarm_type_id;   
                                                                setdata_chk_delete.date_now = datenow;  
                                                              // setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                              console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                              var setdata_chk:any={}; 
                                                              setdata_chk.device_id = device_id;  
                                                              setdata_chk.type_id = type_id;   
                                                              setdata_chk.date = datenow;  
                                                              setdata_chk.alarm_status = alarm_status_set;  
                                                              console.log('setdata_chk =>', setdata_chk);   
                                                              await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                              var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                              var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                                              console.log(`log_alarm_count: ${count_alarm}`);
                                                              if(count_alarm>=2){
                                                                var setdata_chk_delete:any={};
                                                                    setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                                    setdata_chk_delete.device_id = device_id;  
                                                                    setdata_chk_delete.type_id = type_id;   
                                                                    var datenow =format.getCurrentDatenow();
                                                                    setdata_chk_delete.date_now = datenow; 
                                                                    setdata_chk_delete.data= data_alarm;    
                                                                  console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                                  await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                              }
                                                              /* 
                                                              "alarm_action_id": 1,
                                                                  "device_id": 8,
                                                                  "type_id": 1,
                                                              "event": "1",
                                                                "date": "2025-08-25",
                                                                "time": "18:37", 
                                                                "data_log": "29.01",  
                                                               */
                                                              var setdata_chk:any={}; 
                                                              setdata_chk.device_id = device_id;  
                                                              setdata_chk.type_id = type_id;   
                                                              setdata_chk.date =format.getCurrentDatenow();
                                                              setdata_chk.alarm_status = alarm_status_set;  
                                                              setdata_chk.data = sensor_value_data;  
                                                              setdata_chk.time = format.getCurrentTimenow(); 
                                                              setdata_chk.data_log =sensor_value_data; 
                                                              var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                              if(count_alarm<=1){
                                                                await this.settingsService.create_alarmprocesslog(input_create);
                                                                await this.settingsService.create_alarmprocesslogtemp(input_create);
                                                              } 
                                                         } 
                                     }
                                     if(log_alarm_count_set>=validate_count){
                                          var setdata_chk_delete:any={};
                                          setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                          setdata_chk_delete.device_id = device_id;  
                                          setdata_chk_delete.type_id = type_id;   
                                          setdata_chk_delete.date_now = datenow; 
                                          setdata_chk_delete.data_alarm = data_alarm;   
                                         //setdata_chk_delete.alarm_status ='1';// alarm_status;   
                                        console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                        await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                     }
                                    ///////////////////////////////////////////////// 
                              }else if(alarm_type_id==2){
                                      var mqtt_name:any = device_data_control[key].mqtt_name;
                                      var mqtt_device_name:any = device_data_control[key].mqtt_device_name;
                                      var device_name:any = device_data_control[key].device_name;
                                        /*
                                          alarm_status_set , alarm_status
                                          1=Warning
                                          2=Alarm
                                          3=Recovery Warning
                                          4=Recovery Alarm 
                                       */
                                       if(sensor_value_data==0){ 
                                          var alarm_status_set:number=2;  
                                          var subject:any = mqtt_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                          var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                          var alarm_status:number =5;
                                          var data_alarm:any =status_alert;
                                          if(event==1){
                                            var message_mqtt_control :any=mqtt_control_on;
                                          }else if(event==0){
                                            var message_mqtt_control :any=mqtt_control_off;
                                          }
                                       }else{
                                          var alarm_status_set:number=4;
                                          var subject:any = mqtt_name+' Recovery Alarm ;  Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                          var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                          var alarm_status:number =6;
                                          var data_alarm:any =recovery_alert;
                                          if(event==1){
                                            var message_mqtt_control :any=mqtt_control_off;
                                          }else if(event==0){
                                            var message_mqtt_control :any=mqtt_control_on;
                                          }
                                       }
                                                var contition2:number=0;
                                                var devicecontrol_status:any=2-1;
                                                if(log_alarm_count_set<=validate_count){
                                                  if(alarm_status>=1){
                                                           
                                                            // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                                            if(alarm_status_set==3 ||alarm_status_set==4){
                                                              var datenow =format.getCurrentDatenow();
                                                              var setdata_chk:any=  {}; 
                                                                  setdata_chk.device_id = device_id;  
                                                                  setdata_chk.type_id = type_id;   
                                                                  setdata_chk.date = datenow;  
                                                                  setdata_chk.alarm_status = alarm_status_set;  
                                                                console.log('setdata_chk =>', setdata_chk);  
                                                                var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                                var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                                                console.log(`log_alarm_count: ${count_alarm}`);
                                                            if(count_alarm>=1){ 
                                                                  var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                                                  var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                                                  var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                                                  var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                                              }
                                                            }else{
                                                                var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                                                  var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                                                  var device_1:any = devicecontrol['dataObject']['device_1']; // 1 0
                                                                  var device_status:any = devicecontrol['dataObject']['device_status']; // on  off
                                                            }
                                                            var contition2:number=1; 
                                                            var input_create:any={};
                                                             input_create.alarm_action_id= alarm_action_id;
                                                             input_create.device_id= device_id
                                                             input_create.type_id= alarm_type_id
                                                             input_create.event= event;
                                                             input_create.alarm_type= alarm_type_id;
                                                             input_create.status_warning= alarm_status_warning;
                                                             input_create.recovery_warning= alarm_recovery_warning;
                                                             input_create.status_alert= alarm_status_alert;
                                                             input_create.recovery_alert= alarm_recovery_alert;
                                                             input_create.email_alarm= '0';
                                                             input_create.line_alarm= '0';
                                                             input_create.telegram_alarm= '0';
                                                             input_create.sms_alarm= '0';
                                                             input_create.nonc_alarm= '1';
                                                             input_create.status=device_1;
                                                             input_create.date= date_now;
                                                             input_create.time= time_now;
                                                             input_create.createddate= Date(); 
                                                             input_create.updateddate= Date(); 
                                                             input_create.data= sensor_value_data;
                                                             input_create.data_alarm= '0'; 
                                                             input_create.alarm_status= alarm_status_set//control 
                                                             input_create.subject= subject;
                                                             input_create.content= content; 
                                                            console.log(`2-input_create=`);
                                                            console.info(input_create); 

                                                        /*
                                                            alarm_status_set , alarm_status
                                                            1=Warning
                                                            2=Alarm
                                                            3=Recovery Warning
                                                            4=Recovery Alarm 
                                                        */
                                                       if(alarm_status_set==1 || alarm_status_set==2){  
                                                              await this.settingsService.create_alarmprocesslog(input_create);
                                                              await this.settingsService.create_alarmprocesslogtemp(input_create);
                                                          //if(sensor_value_data==0){}
                                                       }else if(alarm_status_set==3 ||alarm_status_set==4){
                                                        var datenow =format.getCurrentDatenow();
                                                            var setdata_chk:any={}; 
                                                                setdata_chk.device_id = device_id;  
                                                                setdata_chk.type_id = type_id;   
                                                                setdata_chk.date = datenow;  
                                                                setdata_chk.alarm_status = alarm_status_set;  
                                                              console.log('setdata_chk =>', setdata_chk);  
                                                              var count_alarm:any=await this.settingsService.count_alarmprocesslog(setdata_chk);
                                                              var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslog(setdata_chk);
                                                              console.log(`log_alarm_count: ${count_alarm}`);
                                                            if(count_alarm>=1){
                                                              var setdata_chk_delete:any={};
                                                                setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                                setdata_chk_delete.device_id = device_id;  
                                                                setdata_chk_delete.type_id = type_id;   
                                                                setdata_chk_delete.date_now = datenow; 
                                                                setdata_chk_delete.data_alarm = '0';   
                                                              // setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                              console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                              await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                                var setdata_chk_delete:any={};
                                                                setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                                setdata_chk_delete.device_id = device_id;  
                                                                setdata_chk_delete.type_id = type_id;   
                                                                setdata_chk_delete.date_now = datenow; 
                                                                setdata_chk_delete.data_alarm = '1';   
                                                              // setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                              console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                              await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                              //log
                                                              await this.settingsService.create_alarmprocesslog(input_create);
                                                              await this.settingsService.create_alarmprocesslogtemp(input_create);
                                                         } 
                                                       }   
                                                      var datenow_type2 =format.getCurrentDatenow();
                                                      var setdata_chk_type2:any={};
                                                          setdata_chk_type2.alarm_action_id = alarm_action_id;  
                                                          setdata_chk_type2.device_id = device_id;  
                                                          setdata_chk_type2.type_id = type_id;   
                                                          setdata_chk_type2.date = datenow; 
                                                          setdata_chk_type2.data_alarm = '1';   
                                                        console.log('setdata_chk_type2 =>', setdata_chk_type2); 
                                                       // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log 
                                                        var count_alarm_type2:any=await this.settingsService.count_alarmprocesslog(setdata_chk_type2); 
                                                        console.log(`log_alarm_count_type2: ${count_alarm_type2}`); 
                                                        var log_alarm_count_set :number= count_alarm_type2; 
                                                        if(sensor_value_data==1 && log_alarm_count_set>1){
                                                          await this.settingsService.create_alarmprocesslog(input_create);
                                                          await this.settingsService.create_alarmprocesslogtemp(input_create);
                                                        }
                                                  }
                                                }
                                                if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '0';   
                                                            // setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                }if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '1';   
                                                             //setdata_chk_delete.alarm_status ='1';// alarm_status;   //1.control // 2.email
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog(setdata_chk_delete);
                                                }
                                             /////////////////////////////////////////////////     
                              }
                              /////////////////////////////////////////////////////////////////////////
                               device_event_control_ar.push({ 
                                           ...device_data_control[key],
                                           ...merged, 
                                           timestamp:timestamp, 
                                           status_warning:status_warning,
                                           recovery_warning:recovery_warning,
                                           status_alert:status_alert,
                                           recovery_alert:recovery_alert,
                                           alarm_typeID:type_id,
                                           alarm_status:alarm_status, 
                                           setdata_chk_count_alarm:setdata_chk_count_alarm,
                                           setdata_chk_log_alarm_logs:setdata_chk_log_alarm_logs, 
                                           sensor_value_data:sensor_value_data,
                                           sensor_value_alarm:sensor_value_alarm,
                                           sensor_value_relay:sensor_value_relay,
                                           sensor_value_control_relay:sensor_value_control_relay,
                                           time_now:time_now,
                                           alarm_time_life,
                                           alarm_status_warning,
                                           alarm_recovery_warning,
                                           alarm_status_alert,
                                           alarm_recovery_alert, 
                                           alarm_type_id, 
                                           setdata_chk, 
                                           date_now, 
                                           devicecontrol_status:devicecontrol_status,
                                           log_alarm_count_set:log_alarm_count_set,
                                           count_alarm:count_alarm,
                                          //log_alarm_logs:log_alarm_logs,  
                                           now_time_full:now_time_full,  
                                           now_time_cal:now_time_cal, 
                                           time_log:log_time, 
                                           now_time:now_time,
                                           contition:contition,
                                           contition2:contition2,
                                           mqtt:mqttrs, 
                                           alarm_subject:subject,
                                           alarm_content:content, 
                                           alarm_status_set:alarm_status_set,
                                           value_data:sensor_value_data
                               });  
                           } 
    return device_event_control_ar;
  }
  /////
  async get_alarm_to_email(alarm_action_id_mas: any,device_id_mas:any) { 
                          var device_status:any = 0;
                          var validate_count :number= 3; 
                          var useractive_arr:any = []; 
                          var filter_useractive:any = {status:1} 
                          var useractive: any = await this.UsersService.useractiveemail(filter_useractive);    
                          var user_arr:any = [];   
                           var filter_alarm2:any={};
                           filter_alarm2.alarm_action_id = alarm_action_id_mas;  
                           filter_alarm2.device_id = device_id_mas;  
                           var device_event_alarm_ar:any = [];  
                           var device_data_alarm:any=await this.settingsService.device_list_paginate_alarm_device_event_control(filter_alarm2);  
                           for (const [key, val] of Object.entries(device_data_alarm)) {     
                                     var device_id:any = device_data_alarm[key].device_id;
                                     var mqtt_id:any = device_data_alarm[key].mqtt_id;
                                   //var setting_id:any = device_data_alarm[key].setting_id;
                                     var alarm_action_id:any = device_data_alarm[key].alarm_action_id;
                                     var type_id:any = device_data_alarm[key].type_id;
                                     var device_name:any = device_data_alarm[key].device_name;
                                   // var hardware_id:any = device_data_alarm[key].hardware_id; 
                                     var time_life:any = device_data_alarm[key].time_life;
                                     var period:any = device_data_alarm[key].period;
                                    // var work_status:any = device_data_alarm[key].work_status;
                                    // var max:any = device_data_alarm[key].max;
                                    // var min:any = device_data_alarm[key].min;
                                    // var measurement:any = device_data_alarm[key].measurement;
                                    // var sn:any = device_data_alarm[key].sn;
                                    // var oid:any = device_data_alarm[key].oid;
                                    // var model:any = device_data_alarm[key].model;
                                    // var vendor:any = device_data_alarm[key].vendor;
                                    // var comparevalue:any = device_data_alarm[key].comparevalue;
                                    // var status:any = device_data_alarm[key].status;
                                    // var unit:any = device_data_alarm[key].unit;
                                    // var action_id:any = device_data_alarm[key].action_id;
                                    // var status_alert_id:any = device_data_alarm[key].status_alert_id;
                                     var device_org:any = device_data_alarm[key].device_org;
                                     var device_bucket:any = device_data_alarm[key].device_bucket;
                                     var type_name:any = device_data_alarm[key].type_name;
                                     var location_name:any = device_data_alarm[key].location_name;
                                     var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                     var mqtt_org:any = device_data_alarm[key].mqtt_org;
                                     var mqtt_bucket:any = device_data_alarm[key].mqtt_bucket;
                                    //var mqtt_envavorment:any = device_data_alarm[key].mqtt_envavorment;
                                    // var mqtt_host:any = device_data_alarm[key].mqtt_host;
                                    // var mqtt_port:any = device_data_alarm[key].mqtt_port;
                                     var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                     var mqtt_status_over_name:any = device_data_alarm[key].mqtt_status_over_name;
                                     var mqtt_status_data_name:any = device_data_alarm[key].mqtt_status_data_name;
                                     var mqtt_act_relay_name:any = device_data_alarm[key].mqtt_act_relay_name;
                                     var mqtt_control_relay_name:any = device_data_alarm[key].mqtt_control_relay_name;
                                     var action_name:any = device_data_alarm[key].action_name; 
                                     var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                                     var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                                     var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                                     var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                                     var mqttrs:any = await this.mqttService.getdevicedataAll(mqtt_data_value); 
                                     var configdata:any = device_data_alarm[key].configdata;
                                     var mqtt_data:any = mqttrs['data'];
                                     var mqtt_timestamp:any = mqttrs['timestamp'];
                                     var timestamp:any = mqttrs['timestamp']; 
                                     var mqttrs_count:any=mqtt_data.length; 
                                     let obj:any=[]; 
                                     try {
                                       obj = JSON.parse(configdata);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_objt_data = Object.values(obj);
                                     var mqtt_count:any=mqtt_objt_data.length;
                                     var mqtt_status_data_name = device_data_alarm[key].mqtt_status_data_name;
                                     let obj2:any=[];
                                     try {
                                       obj2 = JSON.parse(mqtt_status_data_name);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_obj2_data = Object.values(obj2);
                                     var mqtt2_count:any=mqtt_obj2_data.length;
                                     var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
                                     var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
                                    // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
                                   if(mqttrs_count<mqtt_count){
                                       var mqtt:any=mqtt_v1; 
                                   }else{
                                       var mqtt:any=mqtt_v2; 
                                   }
                               
                               var merged = format.mapMqttDataToDeviceV2([val], mqtt)[0];
                               var status_warning:any = device_data_alarm[key].status_warning;
                               var recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var status_alert:any = device_data_alarm[key].status_alert;
                               var recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var sensor_value_data:any = merged.value_data;
                               var sensor_value_alarm:any =merged.value_alarm;
                               var sensor_value_relay:any =merged.value_relay;
                               var sensor_value_control_relay:any =merged.value_control_relay;
                               var email_alarm:any = device_data_alarm[key].email_alarm;
                               var line_alarm:any = device_data_alarm[key].line_alarm;
                               var telegram_alarm:any = device_data_alarm[key].telegram_alarm;
                               var sms_alarm:any = device_data_alarm[key].sms_alarm;
                               var nonc_alarm:any = device_data_alarm[key].nonc_alarm;
                               var event:any = device_data_alarm[key].event; 
                               var alarm_event:any = device_data_alarm[key].event;
                               var action_name:any = device_data_alarm[key].action_name; 
                               var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                               var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                               var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                               var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                               var alarm_status_warning:any = device_data_alarm[key].status_warning;
                               var alarm_recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var alarm_status_alert:any = device_data_alarm[key].status_alert;
                               var alarm_recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var alarm_time_life:any = device_data_alarm[key].time_life;
                               var alarm_type_id:any = device_data_alarm[key].type_id; 
                               var alarm_action_name:any = device_data_alarm[key].action_name;
                               var mqtt_name:any = device_data_alarm[key].mqtt_name;
                               var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                               var device_name:any = device_data_alarm[key].device_name;
                               if(alarm_type_id==1){  
                                   if(sensor_value_data>=status_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Warning  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_warning;
                                   }else if(sensor_value_data>=status_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_alert;
                                   }else if(sensor_value_data<=recovery_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_warning;
                                   }else if(sensor_value_data<=recovery_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm ;  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_alert;
                                   }   
                                  ///////////////////////////////////////////////// 
                                   var now_time_fulls:any= format.getCurrentFullDatenow();
                                   var now_time_full =  format.timeConvertermas(format.convertTZ(now_time_fulls, process.env.tzString)); 
                                   var now_time:any= format.getCurrentTime();
                                   var date_now =format.getCurrentDatenow();
                                   var time_now =format.getCurrentTimenow();
                                   if(event==1){
                                       var message_mqtt_control :any=mqtt_control_on;
                                   }else{
                                       var message_mqtt_control :any=mqtt_control_off; 
                                   } 
                                   var cases:any=message_mqtt_control; 
                                   var log_time:any ='';
                                   if(log_time==""){
                                     var log_time:any= time_now;
                                   } 
                                   var now_time_cal :number= 1;
                                   var datenow =format.getCurrentDatenow();
                                   var setdata_chk_log:any={};
                                       setdata_chk_log.alarm_action_id = alarm_action_id;  
                                       setdata_chk_log.device_id = device_id;  
                                       setdata_chk_log.type_id = type_id;   
                                       setdata_chk_log.date = datenow; 
                                       setdata_chk_log.data_alarm = data_alarm;   
                                     console.log('setdata_chk_log =>', setdata_chk_log); 
                                    // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                     var count_alarm:any=await this.settingsService.count_alarmprocesslogemail(setdata_chk_log);
                                     var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslogemail(setdata_chk_log);  
                                     console.log(`log_alarm_count: ${count_alarm}`);
                                     console.log('log_alarm_logs:', count_alarm);
                                     if (count_alarm > 0) {
                                           var first_log = log_alarm_logs[0];
                                           console.log('First log record:', first_log);
                                     }else{
                                           var irst_log:any="";
                                     }
                                     var log_alarm_count_set :number= count_alarm; 
                                     if(log_alarm_count_set>=1){   
                                           var log_alarm_log =  first_log;
                                           var log_time  :any=  format.timeConvertermas(format.convertTZ(log_alarm_logs[0].createddate, process.env.tzString));  
                                           var now_time_cal: number= format.diffMinutes(now_time_full,log_time);  
                                     }else{
                                           var now_time_cal: number= format.diffMinutes(now_time_full,now_time_full);   
                                     } 
                                     if(log_alarm_count_set<=validate_count){
                                         if(now_time_cal>alarm_time_life){
                                             var contition:number=1;
                                             var log_alarm_log :any='';
                                             var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                             if(deviceData){ 
                                                /////////-email-/////////////
                                                var log_alarm_log :any='';
                                                for (const [k, v] of Object.entries(useractive)) {     
                                                      var email:any = useractive[k].email;
                                                      var mobile_number:any = useractive[k].mobile_number;
                                                      var lineid:any = useractive[k].lineid;   
                                                      var user_arr:any= {
                                                                    email:email,
                                                                    mobile:mobile_number,
                                                                    lineid:lineid,  
                                                                };
                                                      useractive_arr.push(user_arr);
                                                      /*******sendEmail***********/  
                                                      if(type_id==1){
                                                          if(sensor_value_data>=status_warning){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          }else if(sensor_value_data>=status_alert){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          }else if(sensor_value_data<=recovery_warning){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          }else if(sensor_value_data<=recovery_alert){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          } 
                                                      }else if(type_id!=1){ 
                                                          if(sensor_value_alarm==0){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          }else if(sensor_value_data>=status_alert){
                                                              let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                          } 
                                                      }  
                                                      /*******sendEmail***********/ 
                                                } 
                                              /////////-email-/////////////  
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.create_alarmprocesslogemail(input_create);
                                                   await this.settingsService.create_alarmprocesslogtemp(input_create);
                                             } 
                                         }
                                     }
                                    //////////////////    
                                     if(log_alarm_count_set>=1){   
                                               var contition:number=2;
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   console.log(`1-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.update_alarmprocesslog(input_create);
                                                  //await this.update_alarmprocesslogtemp(input_create);
                                     }else if(log_alarm_count_set==0){  
                                              var contition:number=3;  
                                              var devicecontrol_status:any=1;
                                              var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                              var device_status:any=1;
                                               if(device_status==""){
                                                 var status:any=0;
                                               }else{
                                                   var status:any=1; 
                                               }
                                               /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                                if(sensor_value_data>=status_warning){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data>=status_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data<=recovery_warning){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data<=recovery_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                } 
                                                            }else if(type_id!=1){ 
                                                                if(sensor_value_alarm==0){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data>=status_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////   
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                  await this.settingsService.create_alarmprocesslogemail(input_create);
                                                  await this.settingsService.create_alarmprocesslogtemp(input_create);
                                     } 
                                     if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = data_alarm;    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_email(setdata_chk_delete);
                                    }
                                   ///////////////////////////////////////////////// 
                               }else if(alarm_type_id==2){  
                                
                                    var alarm_action_name:any = device_data_alarm[key].action_name;
                                    var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                    var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                    var device_name:any = device_data_alarm[key].device_name;
                                       if(sensor_value_data==0){
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =0;
                                           var data_alarm:any =status_alert;
                                       }else {
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm ;  Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =1;
                                           var data_alarm:any =recovery_alert;
                                       } 
                                          var contition2:number=0;
                                          if(sensor_value_data==0){}
                                          var datenow =format.getCurrentDatenow();  
                                           var setdata_chk_log_1:any={};
                                              setdata_chk_log_1.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_1.device_id = device_id;  
                                              setdata_chk_log_1.type_id = alarm_type_id;   
                                              setdata_chk_log_1.date = datenow; 
                                              setdata_chk_log_1.data_alarm = '0';   
                                            console.log('setdata_chk_log_ =>', setdata_chk_log_1); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm_1:any=await this.settingsService.count_alarmprocesslogemail(setdata_chk_log_1);
                                            var setdata_chk_log_2:any={};
                                              setdata_chk_log_2.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_2.device_id = device_id;  
                                              setdata_chk_log_2.type_id = alarm_type_id;   
                                              setdata_chk_log_2.date = datenow; 
                                              setdata_chk_log_2.data_alarm = '1';   
                                            console.log('setdata_chk_log_2 =>', setdata_chk_log_2); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm:any=await this.settingsService.count_alarmprocesslogemail(setdata_chk_log_2);
                                            if(count_alarm<=validate_count && count_alarm_1>=1){
                                                   /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                                if(sensor_value_data>=status_warning){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data>=status_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data<=recovery_warning){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data<=recovery_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                } 
                                                            }else if(type_id!=1){ 
                                                                if(sensor_value_alarm==0){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                }else if(sensor_value_data>=status_alert){
                                                                    let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                                } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////  
                                                       var devicecontrol_status:any=2-1;
                                                       var device_1:any = 1; // 1 0
                                                       var contition2:number=1; 
                                                       var input_create:any={};
                                                             input_create.alarm_action_id= alarm_action_id;
                                                             input_create.device_id= device_id
                                                             input_create.type_id= alarm_type_id
                                                             input_create.event= event;
                                                             input_create.alarm_type= alarm_type_id;
                                                             input_create.status_warning= alarm_status_warning;
                                                             input_create.recovery_warning= alarm_recovery_warning;
                                                             input_create.status_alert= alarm_status_alert;
                                                             input_create.recovery_alert= alarm_recovery_alert;
                                                             input_create.email_alarm= '1';
                                                             input_create.line_alarm= '0';
                                                             input_create.telegram_alarm= '0';
                                                             input_create.sms_alarm= '0';
                                                             input_create.nonc_alarm= '0';
                                                             input_create.status=device_1;
                                                             input_create.date= date_now;
                                                             input_create.time= time_now;
                                                             input_create.createddate= Date(); 
                                                             input_create.updateddate= Date(); 
                                                             input_create.data= sensor_value_data;
                                                             input_create.data_alarm= data_alarm; 
                                                             input_create.alarm_status= '1';//control 
                                                             input_create.subject= subject;
                                                             input_create.content= content; 
                                                 console.log(`2-input_create=`);
                                                 console.info(input_create);   
                                                 await this.settingsService.create_alarmprocesslogemail(input_create);
                                                 await this.settingsService.create_alarmprocesslogtemp(input_create);
                                            }
                                            if(count_alarm>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '0';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_email(setdata_chk_delete);
                                            }if(count_alarm_1>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '1';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_email(setdata_chk_delete);
                                            }
                                           /////////////////////////////////////////////////    
                                         
                               }  
                               device_event_alarm_ar.push({
                                           ...device_data_alarm[key],
                                           ...merged, 
                                           timestamp,
                                          // merged,
                                           status_warning,
                                           recovery_warning,
                                           status_alert,
                                           recovery_alert,
                                           sensor_value_data,
                                           sensor_value_alarm,
                                           sensor_value_relay,
                                           sensor_value_control_relay,
                                           subject,
                                           content,
                                           time_now,
                                           alarm_time_life,
                                           alarm_status_warning,
                                           alarm_recovery_warning,
                                           alarm_status_alert,
                                           alarm_recovery_alert, 
                                           alarm_type_id,
                                           setdata_chk_log:setdata_chk_log,
                                           setdata_chk_log_1:setdata_chk_log_1, 
                                           setdata_chk_log_2:setdata_chk_log_2,
                                           date_now, 
                                           devicecontrol_status:devicecontrol_status,
                                           log_alarm_count_set:log_alarm_count_set,
                                           count_alarm:count_alarm,
                                          //log_alarm_logs:log_alarm_logs,  
                                           now_time_full:now_time_full,  
                                           now_time_cal:now_time_cal, 
                                           time_log:log_time, 
                                           now_time:now_time,
                                           contition:contition,
                                           contition2:contition2,
                                           mqtt:mqttrs,
                                           useractive:useractive,
                               });  
                           } 
    return device_event_alarm_ar;
  }
  async get_alarm_to_line(alarm_action_id_mas: any,device_id_mas:any) { 
                          var device_status:any = 0;
                          var validate_count :number= 3; 
                          var useractive_arr:any = []; 
                          var filter_useractive:any = {status:1} 
                          var useractive: any = await this.UsersService.useractiveline(filter_useractive);    
                          var user_arr:any = [];   
                           var filter_alarm2:any={};
                           filter_alarm2.alarm_action_id = alarm_action_id_mas;  
                           filter_alarm2.device_id = device_id_mas;  
                           var device_event_alarm_ar:any = [];  
                           var device_data_alarm:any=await this.settingsService.device_list_paginate_alarm_device_event_control(filter_alarm2);  
                           for (const [key, val] of Object.entries(device_data_alarm)) {     
                                     var device_id:any = device_data_alarm[key].device_id;
                                     var mqtt_id:any = device_data_alarm[key].mqtt_id;
                                   //var setting_id:any = device_data_alarm[key].setting_id;
                                     var alarm_action_id:any = device_data_alarm[key].alarm_action_id;
                                     var type_id:any = device_data_alarm[key].type_id;
                                     var device_name:any = device_data_alarm[key].device_name;
                                   // var hardware_id:any = device_data_alarm[key].hardware_id; 
                                     var time_life:any = device_data_alarm[key].time_life;
                                     var period:any = device_data_alarm[key].period;
                                    // var work_status:any = device_data_alarm[key].work_status;
                                    // var max:any = device_data_alarm[key].max;
                                    // var min:any = device_data_alarm[key].min;
                                    // var measurement:any = device_data_alarm[key].measurement;
                                    // var sn:any = device_data_alarm[key].sn;
                                    // var oid:any = device_data_alarm[key].oid;
                                    // var model:any = device_data_alarm[key].model;
                                    // var vendor:any = device_data_alarm[key].vendor;
                                    // var comparevalue:any = device_data_alarm[key].comparevalue;
                                    // var status:any = device_data_alarm[key].status;
                                    // var unit:any = device_data_alarm[key].unit;
                                    // var action_id:any = device_data_alarm[key].action_id;
                                    // var status_alert_id:any = device_data_alarm[key].status_alert_id;
                                     var device_org:any = device_data_alarm[key].device_org;
                                     var device_bucket:any = device_data_alarm[key].device_bucket;
                                     var type_name:any = device_data_alarm[key].type_name;
                                     var location_name:any = device_data_alarm[key].location_name;
                                     var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                     var mqtt_org:any = device_data_alarm[key].mqtt_org;
                                     var mqtt_bucket:any = device_data_alarm[key].mqtt_bucket;
                                    //var mqtt_envavorment:any = device_data_alarm[key].mqtt_envavorment;
                                    // var mqtt_host:any = device_data_alarm[key].mqtt_host;
                                    // var mqtt_port:any = device_data_alarm[key].mqtt_port;
                                     var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                     var mqtt_status_over_name:any = device_data_alarm[key].mqtt_status_over_name;
                                     var mqtt_status_data_name:any = device_data_alarm[key].mqtt_status_data_name;
                                     var mqtt_act_relay_name:any = device_data_alarm[key].mqtt_act_relay_name;
                                     var mqtt_control_relay_name:any = device_data_alarm[key].mqtt_control_relay_name;
                                     var action_name:any = device_data_alarm[key].action_name; 
                                     var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                                     var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                                     var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                                     var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                                     var mqttrs:any = await this.mqttService.getdevicedataAll(mqtt_data_value); 
                                     var configdata:any = device_data_alarm[key].configdata;
                                     var mqtt_data:any = mqttrs['data'];
                                     var mqtt_timestamp:any = mqttrs['timestamp'];
                                     var timestamp:any = mqttrs['timestamp']; 
                                     var mqttrs_count:any=mqtt_data.length; 
                                     let obj:any=[]; 
                                     try {
                                       obj = JSON.parse(configdata);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_objt_data = Object.values(obj);
                                     var mqtt_count:any=mqtt_objt_data.length;
                                     var mqtt_status_data_name = device_data_alarm[key].mqtt_status_data_name;
                                     let obj2:any=[];
                                     try {
                                       obj2 = JSON.parse(mqtt_status_data_name);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_obj2_data = Object.values(obj2);
                                     var mqtt2_count:any=mqtt_obj2_data.length;
                                     var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
                                     var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
                                    // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
                                   if(mqttrs_count<mqtt_count){
                                       var mqtt:any=mqtt_v1; 
                                   }else{
                                       var mqtt:any=mqtt_v2; 
                                   }
                               
                               var merged = format.mapMqttDataToDeviceV2([val], mqtt)[0];
                               var status_warning:any = device_data_alarm[key].status_warning;
                               var recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var status_alert:any = device_data_alarm[key].status_alert;
                               var recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var sensor_value_data:any = merged.value_data;
                               var sensor_value_alarm:any =merged.value_alarm;
                               var sensor_value_relay:any =merged.value_relay;
                               var sensor_value_control_relay:any =merged.value_control_relay;
                               var email_alarm:any = device_data_alarm[key].email_alarm;
                               var line_alarm:any = device_data_alarm[key].line_alarm;
                               var telegram_alarm:any = device_data_alarm[key].telegram_alarm;
                               var sms_alarm:any = device_data_alarm[key].sms_alarm;
                               var nonc_alarm:any = device_data_alarm[key].nonc_alarm;
                               var event:any = device_data_alarm[key].event; 
                               var alarm_event:any = device_data_alarm[key].event;
                               var action_name:any = device_data_alarm[key].action_name; 
                               var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                               var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                               var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                               var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                               var alarm_status_warning:any = device_data_alarm[key].status_warning;
                               var alarm_recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var alarm_status_alert:any = device_data_alarm[key].status_alert;
                               var alarm_recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var alarm_time_life:any = device_data_alarm[key].time_life;
                               var alarm_type_id:any = device_data_alarm[key].type_id; 
                               var alarm_action_name:any = device_data_alarm[key].action_name;
                               var mqtt_name:any = device_data_alarm[key].mqtt_name;
                               var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                               var device_name:any = device_data_alarm[key].device_name;
                               if(alarm_type_id==1){  
                                   if(sensor_value_data>=status_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Warning  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_warning;
                                   }else if(sensor_value_data>=status_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_alert;
                                   }else if(sensor_value_data<=recovery_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_warning;
                                   }else if(sensor_value_data<=recovery_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm ;  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_alert;
                                   }   
                                  ///////////////////////////////////////////////// 
                                   var now_time_fulls:any= format.getCurrentFullDatenow();
                                   var now_time_full =  format.timeConvertermas(format.convertTZ(now_time_fulls, process.env.tzString)); 
                                   var now_time:any= format.getCurrentTime();
                                   var date_now =format.getCurrentDatenow();
                                   var time_now =format.getCurrentTimenow();
                                   if(event==1){
                                       var message_mqtt_control :any=mqtt_control_on;
                                   }else{
                                       var message_mqtt_control :any=mqtt_control_off; 
                                   } 
                                   var cases:any=message_mqtt_control; 
                                   var log_time:any ='';
                                   if(log_time==""){
                                     var log_time:any= time_now;
                                   } 
                                   var now_time_cal :number= 1;
                                   var datenow =format.getCurrentDatenow();
                                   var setdata_chk_log:any={};
                                       setdata_chk_log.alarm_action_id = alarm_action_id;  
                                       setdata_chk_log.device_id = device_id;  
                                       setdata_chk_log.type_id = type_id;   
                                       setdata_chk_log.date = datenow; 
                                       setdata_chk_log.data_alarm = data_alarm;   
                                     console.log('setdata_chk_log =>', setdata_chk_log); 
                                    // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                     var count_alarm:any=await this.settingsService.count_alarmprocesslogline(setdata_chk_log);
                                     var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslogline(setdata_chk_log);  
                                     console.log(`log_alarm_count: ${count_alarm}`);
                                     console.log('log_alarm_logs:', count_alarm);
                                     if (count_alarm > 0) {
                                           var first_log = log_alarm_logs[0];
                                           console.log('First log record:', first_log);
                                     }else{
                                           var irst_log:any="";
                                     }
                                     var log_alarm_count_set :number= count_alarm; 
                                     if(log_alarm_count_set>=1){   
                                           var log_alarm_log =  first_log;
                                           var log_time  :any=  format.timeConvertermas(format.convertTZ(log_alarm_logs[0].createddate, process.env.tzString));  
                                           var now_time_cal: number= format.diffMinutes(now_time_full,log_time);  
                                     }else{
                                           var now_time_cal: number= format.diffMinutes(now_time_full,now_time_full);   
                                     } 
                                     if(log_alarm_count_set<=validate_count){
                                         if(now_time_cal>alarm_time_life){
                                             var contition:number=1;
                                             var log_alarm_log :any='';
                                             var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                             if(deviceData){ 
                                             /////////-email-/////////////
                                            var log_alarm_log :any='';
                                            for (const [k, v] of Object.entries(useractive)) {     
                                                  var email:any = useractive[k].email;
                                                  var mobile_number:any = useractive[k].mobile_number;
                                                  var lineid:any = useractive[k].lineid;   
                                                  var user_arr:any= {
                                                                email:email,
                                                                mobile:mobile_number,
                                                                lineid:lineid,  
                                                            };
                                                  useractive_arr.push(user_arr);
                                                  /*******sendEmail***********/  
                                                  if(type_id==1){
                                                     // if(sensor_value_data>=status_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }else if(type_id!=1){ 
                                                     // if(sensor_value_alarm==0){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }  
                                                  /*******sendEmail***********/ 
                                            } 
                                           /////////-email-/////////////  
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.create_alarmprocesslogline(input_create);
                                                   await this.settingsService.create_alarmprocesslogtemp(input_create);
                                             } 
                                         }
                                     }
                                    //////////////////    
                                     if(log_alarm_count_set>=1){   
                                               var contition:number=2;
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   console.log(`1-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.update_larmprocesslogline(input_create);
                                                  //await this.update_larmprocesslogline(input_create);
                                     }else if(log_alarm_count_set==0){  
                                              var contition:number=3;  
                                              var devicecontrol_status:any=1;
                                              var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                              var device_status:any=1;
                                               if(device_status==""){
                                                 var status:any=0;
                                               }else{
                                                   var status:any=1; 
                                               }
                                               /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////   
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                  await this.settingsService.create_alarmprocesslogline(input_create);
                                                  await this.settingsService.create_alarmprocesslogtemp(input_create);
                                     } 
                                     if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = data_alarm;    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_line(setdata_chk_delete);
                                    }
                                   ///////////////////////////////////////////////// 
                               }else if(alarm_type_id==2){  
                                
                                    var alarm_action_name:any = device_data_alarm[key].action_name;
                                    var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                    var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                    var device_name:any = device_data_alarm[key].device_name;
                                       if(sensor_value_data==0){
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =0;
                                           var data_alarm:any =status_alert;
                                       }else {
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm ;  Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =1;
                                           var data_alarm:any =recovery_alert;
                                       } 
                                          var contition2:number=0;
                                          if(sensor_value_data==0){}
                                          var datenow =format.getCurrentDatenow();  
                                           var setdata_chk_log_1:any={};
                                              setdata_chk_log_1.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_1.device_id = device_id;  
                                              setdata_chk_log_1.type_id = alarm_type_id;   
                                              setdata_chk_log_1.date = datenow; 
                                              setdata_chk_log_1.data_alarm = '0';   
                                            console.log('setdata_chk_log_ =>', setdata_chk_log_1); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm_1:any=await this.settingsService.count_alarmprocesslogline(setdata_chk_log_1);
                                            var setdata_chk_log_2:any={};
                                              setdata_chk_log_2.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_2.device_id = device_id;  
                                              setdata_chk_log_2.type_id = alarm_type_id;   
                                              setdata_chk_log_2.date = datenow; 
                                              setdata_chk_log_2.data_alarm = '1';   
                                            console.log('setdata_chk_log_2 =>', setdata_chk_log_2); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm:any=await this.settingsService.count_alarmprocesslogline(setdata_chk_log_2);
                                            if(count_alarm<=validate_count && count_alarm_1>=1){
                                                   /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////  
                                                       var devicecontrol_status:any=2-1;
                                                       var device_1:any = 1; // 1 0
                                                       var contition2:number=1; 
                                                       var input_create:any={};
                                                             input_create.alarm_action_id= alarm_action_id;
                                                             input_create.device_id= device_id
                                                             input_create.type_id= alarm_type_id
                                                             input_create.event= event;
                                                             input_create.alarm_type= alarm_type_id;
                                                             input_create.status_warning= alarm_status_warning;
                                                             input_create.recovery_warning= alarm_recovery_warning;
                                                             input_create.status_alert= alarm_status_alert;
                                                             input_create.recovery_alert= alarm_recovery_alert;
                                                             input_create.email_alarm= '1';
                                                             input_create.line_alarm= '0';
                                                             input_create.telegram_alarm= '0';
                                                             input_create.sms_alarm= '0';
                                                             input_create.nonc_alarm= '0';
                                                             input_create.status=device_1;
                                                             input_create.date= date_now;
                                                             input_create.time= time_now;
                                                             input_create.createddate= Date(); 
                                                             input_create.updateddate= Date(); 
                                                             input_create.data= sensor_value_data;
                                                             input_create.data_alarm= data_alarm; 
                                                             input_create.alarm_status= '1';//control 
                                                             input_create.subject= subject;
                                                             input_create.content= content; 
                                                 console.log(`2-input_create=`);
                                                 console.info(input_create);   
                                                 await this.settingsService.create_alarmprocesslogline(input_create);
                                                 await this.settingsService.create_alarmprocesslogtemp(input_create);
                                            }
                                            if(count_alarm>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '0';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_line(setdata_chk_delete);
                                            }if(count_alarm_1>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '1';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_line(setdata_chk_delete);
                                            }
                                           /////////////////////////////////////////////////    
                                         
                               }  
                               
                               device_event_alarm_ar.push({
                                           ...device_data_alarm[key].action_name,
                                           ...merged, 
                                           timestamp,
                                          // merged,
                                           status_warning,
                                           recovery_warning,
                                           status_alert,
                                           recovery_alert,
                                           sensor_value_data,
                                           sensor_value_alarm,
                                           sensor_value_relay,
                                           sensor_value_control_relay,
                                           subject,
                                           content,
                                           time_now,
                                           alarm_time_life,
                                           alarm_status_warning,
                                           alarm_recovery_warning,
                                           alarm_status_alert,
                                           alarm_recovery_alert, 
                                           alarm_type_id,
                                           setdata_chk_log:setdata_chk_log,
                                           setdata_chk_log_1:setdata_chk_log_1, 
                                           setdata_chk_log_2:setdata_chk_log_2,
                                           date_now, 
                                           devicecontrol_status:devicecontrol_status,
                                           log_alarm_count_set:log_alarm_count_set,
                                           count_alarm:count_alarm,
                                          //log_alarm_logs:log_alarm_logs,  
                                           now_time_full:now_time_full,  
                                           now_time_cal:now_time_cal, 
                                           time_log:log_time, 
                                           now_time:now_time,
                                           contition:contition,
                                           contition2:contition2,
                                           mqtt:mqttrs,
                                           useractive:useractive,
                               });  
                           } 
    return device_event_alarm_ar;
  }
  async get_alarm_to_sms(alarm_action_id_mas: any,device_id_mas:any) { 
                          var device_status:any = 0;
                          var validate_count :number= 3; 
                          var useractive_arr:any = []; 
                          var filter_useractive:any = {status:1} 
                          var useractive: any = await this.UsersService.useractivesms(filter_useractive);    
                          var user_arr:any = [];   
                           var filter_alarm2:any={};
                           filter_alarm2.alarm_action_id = alarm_action_id_mas;  
                           filter_alarm2.device_id = device_id_mas;  
                           var device_event_alarm_ar:any = [];  
                           var device_data_alarm:any=await this.settingsService.device_list_paginate_alarm_device_event_control(filter_alarm2);  
                           for (const [key, val] of Object.entries(device_data_alarm)) {     
                                     var device_id:any = device_data_alarm[key].device_id;
                                     var mqtt_id:any = device_data_alarm[key].mqtt_id;
                                   //var setting_id:any = device_data_alarm[key].setting_id;
                                     var alarm_action_id:any = device_data_alarm[key].alarm_action_id;
                                     var type_id:any = device_data_alarm[key].type_id;
                                     var device_name:any = device_data_alarm[key].device_name;
                                   // var hardware_id:any = device_data_alarm[key].hardware_id; 
                                     var time_life:any = device_data_alarm[key].time_life;
                                     var period:any = device_data_alarm[key].period;
                                    // var work_status:any = device_data_alarm[key].work_status;
                                    // var max:any = device_data_alarm[key].max;
                                    // var min:any = device_data_alarm[key].min;
                                    // var measurement:any = device_data_alarm[key].measurement;
                                    // var sn:any = device_data_alarm[key].sn;
                                    // var oid:any = device_data_alarm[key].oid;
                                    // var model:any = device_data_alarm[key].model;
                                    // var vendor:any = device_data_alarm[key].vendor;
                                    // var comparevalue:any = device_data_alarm[key].comparevalue;
                                    // var status:any = device_data_alarm[key].status;
                                    // var unit:any = device_data_alarm[key].unit;
                                    // var action_id:any = device_data_alarm[key].action_id;
                                    // var status_alert_id:any = device_data_alarm[key].status_alert_id;
                                     var device_org:any = device_data_alarm[key].device_org;
                                     var device_bucket:any = device_data_alarm[key].device_bucket;
                                     var type_name:any = device_data_alarm[key].type_name;
                                     var location_name:any = device_data_alarm[key].location_name;
                                     var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                     var mqtt_org:any = device_data_alarm[key].mqtt_org;
                                     var mqtt_bucket:any = device_data_alarm[key].mqtt_bucket;
                                    //var mqtt_envavorment:any = device_data_alarm[key].mqtt_envavorment;
                                    // var mqtt_host:any = device_data_alarm[key].mqtt_host;
                                    // var mqtt_port:any = device_data_alarm[key].mqtt_port;
                                     var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                     var mqtt_status_over_name:any = device_data_alarm[key].mqtt_status_over_name;
                                     var mqtt_status_data_name:any = device_data_alarm[key].mqtt_status_data_name;
                                     var mqtt_act_relay_name:any = device_data_alarm[key].mqtt_act_relay_name;
                                     var mqtt_control_relay_name:any = device_data_alarm[key].mqtt_control_relay_name;
                                     var action_name:any = device_data_alarm[key].action_name; 
                                     var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                                     var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                                     var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                                     var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                                     var mqttrs:any = await this.mqttService.getdevicedataAll(mqtt_data_value); 
                                     var configdata:any = device_data_alarm[key].configdata;
                                     var mqtt_data:any = mqttrs['data'];
                                     var mqtt_timestamp:any = mqttrs['timestamp'];
                                     var timestamp:any = mqttrs['timestamp']; 
                                     var mqttrs_count:any=mqtt_data.length; 
                                     let obj:any=[]; 
                                     try {
                                       obj = JSON.parse(configdata);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_objt_data = Object.values(obj);
                                     var mqtt_count:any=mqtt_objt_data.length;
                                     var mqtt_status_data_name = device_data_alarm[key].mqtt_status_data_name;
                                     let obj2:any=[];
                                     try {
                                       obj2 = JSON.parse(mqtt_status_data_name);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_obj2_data = Object.values(obj2);
                                     var mqtt2_count:any=mqtt_obj2_data.length;
                                     var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
                                     var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
                                    // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
                                   if(mqttrs_count<mqtt_count){
                                       var mqtt:any=mqtt_v1; 
                                   }else{
                                       var mqtt:any=mqtt_v2; 
                                   }
                               
                               var merged = format.mapMqttDataToDeviceV2([val], mqtt)[0];
                               var status_warning:any = device_data_alarm[key].status_warning;
                               var recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var status_alert:any = device_data_alarm[key].status_alert;
                               var recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var sensor_value_data:any = merged.value_data;
                               var sensor_value_alarm:any =merged.value_alarm;
                               var sensor_value_relay:any =merged.value_relay;
                               var sensor_value_control_relay:any =merged.value_control_relay;
                               var email_alarm:any = device_data_alarm[key].email_alarm;
                               var line_alarm:any = device_data_alarm[key].line_alarm;
                               var telegram_alarm:any = device_data_alarm[key].telegram_alarm;
                               var sms_alarm:any = device_data_alarm[key].sms_alarm;
                               var nonc_alarm:any = device_data_alarm[key].nonc_alarm;
                               var event:any = device_data_alarm[key].event; 
                               var alarm_event:any = device_data_alarm[key].event;
                               var action_name:any = device_data_alarm[key].action_name; 
                               var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                               var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                               var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                               var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                               var alarm_status_warning:any = device_data_alarm[key].status_warning;
                               var alarm_recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var alarm_status_alert:any = device_data_alarm[key].status_alert;
                               var alarm_recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var alarm_time_life:any = device_data_alarm[key].time_life;
                               var alarm_type_id:any = device_data_alarm[key].type_id; 
                               var alarm_action_name:any = device_data_alarm[key].action_name;
                               var mqtt_name:any = device_data_alarm[key].mqtt_name;
                               var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                               var device_name:any = device_data_alarm[key].device_name;
                               if(alarm_type_id==1){  
                                   if(sensor_value_data>=status_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Warning  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_warning;
                                   }else if(sensor_value_data>=status_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_alert;
                                   }else if(sensor_value_data<=recovery_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_warning;
                                   }else if(sensor_value_data<=recovery_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm ;  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_alert;
                                   }   
                                  ///////////////////////////////////////////////// 
                                   var now_time_fulls:any= format.getCurrentFullDatenow();
                                   var now_time_full =  format.timeConvertermas(format.convertTZ(now_time_fulls, process.env.tzString)); 
                                   var now_time:any= format.getCurrentTime();
                                   var date_now =format.getCurrentDatenow();
                                   var time_now =format.getCurrentTimenow();
                                   if(event==1){
                                       var message_mqtt_control :any=mqtt_control_on;
                                   }else{
                                       var message_mqtt_control :any=mqtt_control_off; 
                                   } 
                                   var cases:any=message_mqtt_control; 
                                   var log_time:any ='';
                                   if(log_time==""){
                                     var log_time:any= time_now;
                                   } 
                                   var now_time_cal :number= 1;
                                   var datenow =format.getCurrentDatenow();
                                   var setdata_chk_log:any={};
                                       setdata_chk_log.alarm_action_id = alarm_action_id;  
                                       setdata_chk_log.device_id = device_id;  
                                       setdata_chk_log.type_id = type_id;   
                                       setdata_chk_log.date = datenow; 
                                       setdata_chk_log.data_alarm = data_alarm;   
                                     console.log('setdata_chk_log =>', setdata_chk_log); 
                                    // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                     var count_alarm:any=await this.settingsService.count_alarmprocesslogsms(setdata_chk_log);
                                     var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslogsms(setdata_chk_log);  
                                     console.log(`log_alarm_count: ${count_alarm}`);
                                     console.log('log_alarm_logs:', count_alarm);
                                     if (count_alarm > 0) {
                                           var first_log = log_alarm_logs[0];
                                           console.log('First log record:', first_log);
                                     }else{
                                           var irst_log:any="";
                                     }
                                     var log_alarm_count_set :number= count_alarm; 
                                     if(log_alarm_count_set>=1){   
                                           var log_alarm_log =  first_log;
                                           var log_time  :any=  format.timeConvertermas(format.convertTZ(log_alarm_logs[0].createddate, process.env.tzString));  
                                           var now_time_cal: number= format.diffMinutes(now_time_full,log_time);  
                                     }else{
                                           var now_time_cal: number= format.diffMinutes(now_time_full,now_time_full);   
                                     } 
                                     if(log_alarm_count_set<=validate_count){
                                         if(now_time_cal>alarm_time_life){
                                             var contition:number=1;
                                             var log_alarm_log :any='';
                                             var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                             if(deviceData){ 
                                             /////////-email-/////////////
                                            var log_alarm_log :any='';
                                            for (const [k, v] of Object.entries(useractive)) {     
                                                  var email:any = useractive[k].email;
                                                  var mobile_number:any = useractive[k].mobile_number;
                                                  var lineid:any = useractive[k].lineid;   
                                                  var user_arr:any= {
                                                                email:email,
                                                                mobile:mobile_number,
                                                                lineid:lineid,  
                                                            };
                                                  useractive_arr.push(user_arr);
                                                  /*******sendEmail***********/  
                                                  if(type_id==1){
                                                     // if(sensor_value_data>=status_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }else if(type_id!=1){ 
                                                     // if(sensor_value_alarm==0){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }  
                                                  /*******sendEmail***********/ 
                                            } 
                                           /////////-email-/////////////  
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.create_alarmprocesslogsms(input_create);
                                                   await this.settingsService.create_alarmprocesslogtemp(input_create);
                                             } 
                                         }
                                     }
                                    //////////////////    
                                     if(log_alarm_count_set>=1){   
                                               var contition:number=2;
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   console.log(`1-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.update_larmprocesslogsms(input_create);
                                                  //await this.update_larmprocesslogsms(input_create);
                                     }else if(log_alarm_count_set==0){  
                                              var contition:number=3;  
                                              var devicecontrol_status:any=1;
                                              var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                              var device_status:any=1;
                                               if(device_status==""){
                                                 var status:any=0;
                                               }else{
                                                   var status:any=1; 
                                               }
                                               /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////   
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                  await this.settingsService.create_alarmprocesslogsms(input_create);
                                                  await this.settingsService.create_alarmprocesslogtemp(input_create);
                                     } 
                                     if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = data_alarm;    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_sms(setdata_chk_delete);
                                    }
                                   ///////////////////////////////////////////////// 
                               }else if(alarm_type_id==2){  
                                
                                    var alarm_action_name:any = device_data_alarm[key].action_name;
                                    var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                    var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                    var device_name:any = device_data_alarm[key].device_name;
                                       if(sensor_value_data==0){
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =0;
                                           var data_alarm:any =status_alert;
                                       }else {
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm ;  Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =1;
                                           var data_alarm:any =recovery_alert;
                                       } 
                                          var contition2:number=0;
                                          if(sensor_value_data==0){}
                                          var datenow =format.getCurrentDatenow();  
                                           var setdata_chk_log_1:any={};
                                              setdata_chk_log_1.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_1.device_id = device_id;  
                                              setdata_chk_log_1.type_id = alarm_type_id;   
                                              setdata_chk_log_1.date = datenow; 
                                              setdata_chk_log_1.data_alarm = '0';   
                                            console.log('setdata_chk_log_ =>', setdata_chk_log_1); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm_1:any=await this.settingsService.count_alarmprocesslogsms(setdata_chk_log_1);
                                            var setdata_chk_log_2:any={};
                                              setdata_chk_log_2.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_2.device_id = device_id;  
                                              setdata_chk_log_2.type_id = alarm_type_id;   
                                              setdata_chk_log_2.date = datenow; 
                                              setdata_chk_log_2.data_alarm = '1';   
                                            console.log('setdata_chk_log_2 =>', setdata_chk_log_2); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm:any=await this.settingsService.count_alarmprocesslogsms(setdata_chk_log_2);
                                            if(count_alarm<=validate_count && count_alarm_1>=1){
                                                   /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////  
                                                       var devicecontrol_status:any=2-1;
                                                       var device_1:any = 1; // 1 0
                                                       var contition2:number=1; 
                                                       var input_create:any={};
                                                             input_create.alarm_action_id= alarm_action_id;
                                                             input_create.device_id= device_id
                                                             input_create.type_id= alarm_type_id
                                                             input_create.event= event;
                                                             input_create.alarm_type= alarm_type_id;
                                                             input_create.status_warning= alarm_status_warning;
                                                             input_create.recovery_warning= alarm_recovery_warning;
                                                             input_create.status_alert= alarm_status_alert;
                                                             input_create.recovery_alert= alarm_recovery_alert;
                                                             input_create.email_alarm= '1';
                                                             input_create.line_alarm= '0';
                                                             input_create.telegram_alarm= '0';
                                                             input_create.sms_alarm= '0';
                                                             input_create.nonc_alarm= '0';
                                                             input_create.status=device_1;
                                                             input_create.date= date_now;
                                                             input_create.time= time_now;
                                                             input_create.createddate= Date(); 
                                                             input_create.updateddate= Date(); 
                                                             input_create.data= sensor_value_data;
                                                             input_create.data_alarm= data_alarm; 
                                                             input_create.alarm_status= '1';//control 
                                                             input_create.subject= subject;
                                                             input_create.content= content; 
                                                 console.log(`2-input_create=`);
                                                 console.info(input_create);   
                                                 await this.settingsService.create_alarmprocesslogsms(input_create);
                                                 await this.settingsService.create_alarmprocesslogtemp(input_create);
                                            }
                                            if(count_alarm>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '0';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_sms(setdata_chk_delete);
                                            }if(count_alarm_1>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '1';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_sms(setdata_chk_delete);
                                            }
                                           /////////////////////////////////////////////////    
                                         
                               }  
                               device_event_alarm_ar.push({
                                           ...device_data_alarm[key],
                                           ...merged, 
                                           timestamp,
                                          // merged,
                                           status_warning,
                                           recovery_warning,
                                           status_alert,
                                           recovery_alert,
                                           sensor_value_data,
                                           sensor_value_alarm,
                                           sensor_value_relay,
                                           sensor_value_control_relay,
                                           subject,
                                           content,
                                           time_now,
                                           alarm_time_life,
                                           alarm_status_warning,
                                           alarm_recovery_warning,
                                           alarm_status_alert,
                                           alarm_recovery_alert, 
                                           alarm_type_id,
                                           setdata_chk_log:setdata_chk_log,
                                           setdata_chk_log_1:setdata_chk_log_1, 
                                           setdata_chk_log_2:setdata_chk_log_2,
                                           date_now, 
                                           devicecontrol_status:devicecontrol_status,
                                           log_alarm_count_set:log_alarm_count_set,
                                           count_alarm:count_alarm,
                                          //log_alarm_logs:log_alarm_logs,  
                                           now_time_full:now_time_full,  
                                           now_time_cal:now_time_cal, 
                                           time_log:log_time, 
                                           now_time:now_time,
                                           contition:contition,
                                           contition2:contition2,
                                           mqtt:mqttrs,
                                           useractive:useractive,
                               });  
                           } 
    return device_event_alarm_ar;
  }
  async get_alarm_to_telegram(alarm_action_id_mas: any,device_id_mas:any) { 
                          var device_status:any = 0;
                          var validate_count :number= 3; 
                          var useractive_arr:any = []; 
                          var filter_useractive:any = {status:1} 
                          var useractive: any = await this.UsersService.useractivetelegram(filter_useractive);    
                          var user_arr:any = [];   
                           var filter_alarm2:any={};
                           filter_alarm2.alarm_action_id = alarm_action_id_mas;  
                           filter_alarm2.device_id = device_id_mas;  
                           var device_event_alarm_ar:any = [];  
                           var device_data_alarm:any=await this.settingsService.device_list_paginate_alarm_device_event_control(filter_alarm2);  
                           for (const [key, val] of Object.entries(device_data_alarm)) {     
                                     var device_id:any = device_data_alarm[key].device_id;
                                     var mqtt_id:any = device_data_alarm[key].mqtt_id;
                                   //var setting_id:any = device_data_alarm[key].setting_id;
                                     var alarm_action_id:any = device_data_alarm[key].alarm_action_id;
                                     var type_id:any = device_data_alarm[key].type_id;
                                     var device_name:any = device_data_alarm[key].device_name;
                                   // var hardware_id:any = device_data_alarm[key].hardware_id; 
                                     var time_life:any = device_data_alarm[key].time_life;
                                     var period:any = device_data_alarm[key].period;
                                    // var work_status:any = device_data_alarm[key].work_status;
                                    // var max:any = device_data_alarm[key].max;
                                    // var min:any = device_data_alarm[key].min;
                                    // var measurement:any = device_data_alarm[key].measurement;
                                    // var sn:any = device_data_alarm[key].sn;
                                    // var oid:any = device_data_alarm[key].oid;
                                    // var model:any = device_data_alarm[key].model;
                                    // var vendor:any = device_data_alarm[key].vendor;
                                    // var comparevalue:any = device_data_alarm[key].comparevalue;
                                    // var status:any = device_data_alarm[key].status;
                                    // var unit:any = device_data_alarm[key].unit;
                                    // var action_id:any = device_data_alarm[key].action_id;
                                    // var status_alert_id:any = device_data_alarm[key].status_alert_id;
                                     var device_org:any = device_data_alarm[key].device_org;
                                     var device_bucket:any = device_data_alarm[key].device_bucket;
                                     var type_name:any = device_data_alarm[key].type_name;
                                     var location_name:any = device_data_alarm[key].location_name;
                                     var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                     var mqtt_org:any = device_data_alarm[key].mqtt_org;
                                     var mqtt_bucket:any = device_data_alarm[key].mqtt_bucket;
                                    //var mqtt_envavorment:any = device_data_alarm[key].mqtt_envavorment;
                                    // var mqtt_host:any = device_data_alarm[key].mqtt_host;
                                    // var mqtt_port:any = device_data_alarm[key].mqtt_port;
                                     var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                     var mqtt_status_over_name:any = device_data_alarm[key].mqtt_status_over_name;
                                     var mqtt_status_data_name:any = device_data_alarm[key].mqtt_status_data_name;
                                     var mqtt_act_relay_name:any = device_data_alarm[key].mqtt_act_relay_name;
                                     var mqtt_control_relay_name:any = device_data_alarm[key].mqtt_control_relay_name;
                                     var action_name:any = device_data_alarm[key].action_name; 
                                     var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                                     var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                                     var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                                     var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                                     var mqttrs:any = await this.mqttService.getdevicedataAll(mqtt_data_value); 
                                     var configdata:any = device_data_alarm[key].configdata;
                                     var mqtt_data:any = mqttrs['data'];
                                     var mqtt_timestamp:any = mqttrs['timestamp'];
                                     var timestamp:any = mqttrs['timestamp']; 
                                     var mqttrs_count:any=mqtt_data.length; 
                                     let obj:any=[]; 
                                     try {
                                       obj = JSON.parse(configdata);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_objt_data = Object.values(obj);
                                     var mqtt_count:any=mqtt_objt_data.length;
                                     var mqtt_status_data_name = device_data_alarm[key].mqtt_status_data_name;
                                     let obj2:any=[];
                                     try {
                                       obj2 = JSON.parse(mqtt_status_data_name);
                                     } catch (e) {
                                       throw e;
                                     }  
                                     var mqtt_obj2_data = Object.values(obj2);
                                     var mqtt2_count:any=mqtt_obj2_data.length;
                                     var mqtt_v1 = Object.fromEntries(mqtt_obj2_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v1=>'+mqtt_v1);// Output: 10
                                     var mqtt_v2 = Object.fromEntries(mqtt_objt_data.map((k, i) => [k, mqtt_data[i]])); 
                                     console.log('mqtt_v2=>'+mqtt_v2);// Output: 10
                                    // ใช้ mapMqttDataToDeviceV2 เพื่อ map ค่า value_data, value_alarm, value_relay, value_control_relay
                                   if(mqttrs_count<mqtt_count){
                                       var mqtt:any=mqtt_v1; 
                                   }else{
                                       var mqtt:any=mqtt_v2; 
                                   }
                               
                               var merged = format.mapMqttDataToDeviceV2([val], mqtt)[0];
                               var status_warning:any = device_data_alarm[key].status_warning;
                               var recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var status_alert:any = device_data_alarm[key].status_alert;
                               var recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var sensor_value_data:any = merged.value_data;
                               var sensor_value_alarm:any =merged.value_alarm;
                               var sensor_value_relay:any =merged.value_relay;
                               var sensor_value_control_relay:any =merged.value_control_relay;
                               var email_alarm:any = device_data_alarm[key].email_alarm;
                               var line_alarm:any = device_data_alarm[key].line_alarm;
                               var telegram_alarm:any = device_data_alarm[key].telegram_alarm;
                               var sms_alarm:any = device_data_alarm[key].sms_alarm;
                               var nonc_alarm:any = device_data_alarm[key].nonc_alarm;
                               var event:any = device_data_alarm[key].event; 
                               var alarm_event:any = device_data_alarm[key].event;
                               var action_name:any = device_data_alarm[key].action_name; 
                               var mqtt_data_value:any = device_data_alarm[key].mqtt_data_value;
                               var mqtt_data_control:any = device_data_alarm[key].mqtt_data_control;
                               var mqtt_control_on:any = device_data_alarm[key].mqtt_control_on;
                               var mqtt_control_off:any = device_data_alarm[key].mqtt_control_off;
                               var alarm_status_warning:any = device_data_alarm[key].status_warning;
                               var alarm_recovery_warning:any = device_data_alarm[key].recovery_warning;
                               var alarm_status_alert:any = device_data_alarm[key].status_alert;
                               var alarm_recovery_alert:any = device_data_alarm[key].recovery_alert; 
                               var alarm_time_life:any = device_data_alarm[key].time_life;
                               var alarm_type_id:any = device_data_alarm[key].type_id; 
                               var alarm_action_name:any = device_data_alarm[key].action_name;
                               var mqtt_name:any = device_data_alarm[key].mqtt_name;
                               var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                               var device_name:any = device_data_alarm[key].device_name;
                               if(alarm_type_id==1){  
                                   if(sensor_value_data>=status_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Warning  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_warning;
                                   }else if(sensor_value_data>=status_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =0;
                                       var data_alarm:any =status_alert;
                                   }else if(sensor_value_data<=recovery_warning){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Warning Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_warning;
                                   }else if(sensor_value_data<=recovery_alert){
                                       var subject:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm ;  Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var content:any = mqtt_name+' '+alarm_action_name+'  Recovery Alarm Device Sensor: '+device_name+' value: '+sensor_value_data;  
                                       var alarm_status:number =1;
                                       var data_alarm:any =recovery_alert;
                                   }   
                                  ///////////////////////////////////////////////// 
                                   var now_time_fulls:any= format.getCurrentFullDatenow();
                                   var now_time_full =  format.timeConvertermas(format.convertTZ(now_time_fulls, process.env.tzString)); 
                                   var now_time:any= format.getCurrentTime();
                                   var date_now =format.getCurrentDatenow();
                                   var time_now =format.getCurrentTimenow();
                                   if(event==1){
                                       var message_mqtt_control :any=mqtt_control_on;
                                   }else{
                                       var message_mqtt_control :any=mqtt_control_off; 
                                   } 
                                   var cases:any=message_mqtt_control; 
                                   var log_time:any ='';
                                   if(log_time==""){
                                     var log_time:any= time_now;
                                   } 
                                   var now_time_cal :number= 1;
                                   var datenow =format.getCurrentDatenow();
                                   var setdata_chk_log:any={};
                                       setdata_chk_log.alarm_action_id = alarm_action_id;  
                                       setdata_chk_log.device_id = device_id;  
                                       setdata_chk_log.type_id = type_id;   
                                       setdata_chk_log.date = datenow; 
                                       setdata_chk_log.data_alarm = data_alarm;   
                                     console.log('setdata_chk_log =>', setdata_chk_log); 
                                    // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                     var count_alarm:any=await this.settingsService.count_alarmprocesslogtelegram(setdata_chk_log);
                                     var log_alarm_logs:any=await this.settingsService.chk_alarmprocesslogtelegram(setdata_chk_log);  
                                     console.log(`log_alarm_count: ${count_alarm}`);
                                     console.log('log_alarm_logs:', count_alarm);
                                     if (count_alarm > 0) {
                                           var first_log = log_alarm_logs[0];
                                           console.log('First log record:', first_log);
                                     }else{
                                           var irst_log:any="";
                                     }
                                     var log_alarm_count_set :number= count_alarm; 
                                     if(log_alarm_count_set>=1){   
                                           var log_alarm_log =  first_log;
                                           var log_time  :any=  format.timeConvertermas(format.convertTZ(log_alarm_logs[0].createddate, process.env.tzString));  
                                           var now_time_cal: number= format.diffMinutes(now_time_full,log_time);  
                                     }else{
                                           var now_time_cal: number= format.diffMinutes(now_time_full,now_time_full);   
                                     } 
                                     if(log_alarm_count_set<=validate_count){
                                         if(now_time_cal>alarm_time_life){
                                             var contition:number=1;
                                             var log_alarm_log :any='';
                                             var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                             if(deviceData){ 
                                             /////////-email-/////////////
                                            var log_alarm_log :any='';
                                            for (const [k, v] of Object.entries(useractive)) {     
                                                  var email:any = useractive[k].email;
                                                  var mobile_number:any = useractive[k].mobile_number;
                                                  var lineid:any = useractive[k].lineid;   
                                                  var user_arr:any= {
                                                                email:email,
                                                                mobile:mobile_number,
                                                                lineid:lineid,  
                                                            };
                                                  useractive_arr.push(user_arr);
                                                  /*******sendEmail***********/  
                                                  if(type_id==1){
                                                     // if(sensor_value_data>=status_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_warning){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data<=recovery_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }else if(type_id!=1){ 
                                                     // if(sensor_value_alarm==0){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // }else if(sensor_value_data>=status_alert){
                                                     //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                     // } 
                                                  }  
                                                  /*******sendEmail***********/ 
                                            } 
                                           /////////-email-/////////////  
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.create_alarmprocesslogtelegram(input_create);
                                                   await this.settingsService.create_alarmprocesslogtemp(input_create);
                                             } 
                                         }
                                     }
                                    //////////////////    
                                     if(log_alarm_count_set>=1){   
                                               var contition:number=2;
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   console.log(`1-input_create=`);
                                                   console.info(input_create);
                                                   await this.settingsService.update_larmprocesslogtelegram(input_create);
                                                  //await this.update_larmprocesslogtelegram(input_create);
                                     }else if(log_alarm_count_set==0){  
                                              var contition:number=3;  
                                              var devicecontrol_status:any=1;
                                              var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                              var device_status:any=1;
                                               if(device_status==""){
                                                 var status:any=0;
                                               }else{
                                                   var status:any=1; 
                                               }
                                               /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////   
                                               var input_create:any={};
                                                   input_create.alarm_action_id= alarm_action_id;
                                                   input_create.device_id= device_id
                                                   input_create.type_id= alarm_type_id
                                                   input_create.event= event;
                                                   input_create.alarm_type= alarm_type_id;
                                                   input_create.status_warning= alarm_status_warning;
                                                   input_create.recovery_warning= alarm_recovery_warning;
                                                   input_create.status_alert= alarm_status_alert;
                                                   input_create.recovery_alert= alarm_recovery_alert;
                                                   input_create.email_alarm= '1';
                                                   input_create.line_alarm= '0';
                                                   input_create.telegram_alarm= '0';
                                                   input_create.sms_alarm= '0';
                                                   input_create.nonc_alarm= '0';
                                                   input_create.status=device_1;
                                                   input_create.date= date_now;
                                                   input_create.time= time_now;
                                                   input_create.createddate= Date(); 
                                                   input_create.updateddate= Date(); 
                                                   input_create.data= sensor_value_data;
                                                   input_create.data_alarm= data_alarm; 
                                                   input_create.alarm_status= '1';//control 
                                                   input_create.subject= subject;
                                                   input_create.content= content; 
                                                   console.log(`2-input_create=`);
                                                   console.info(input_create);
                                                  await this.settingsService.create_alarmprocesslogtelegram(input_create);
                                                  await this.settingsService.create_alarmprocesslogtemp(input_create);
                                     } 
                                     if(log_alarm_count_set>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = data_alarm;    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_telegram(setdata_chk_delete);
                                    }
                                   ///////////////////////////////////////////////// 
                               }else if(alarm_type_id==2){  
                                
                                    var alarm_action_name:any = device_data_alarm[key].action_name;
                                    var mqtt_name:any = device_data_alarm[key].mqtt_name;
                                    var mqtt_device_name:any = device_data_alarm[key].mqtt_device_name;
                                    var device_name:any = device_data_alarm[key].device_name;
                                       if(sensor_value_data==0){
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =0;
                                           var data_alarm:any =status_alert;
                                       }else {
                                           var subject:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm ;  Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var content:any = mqtt_name+' '+alarm_action_name+' Recovery Alarm Alarm Device IO: '+device_name+' value: '+sensor_value_data;  
                                           var alarm_status:number =1;
                                           var data_alarm:any =recovery_alert;
                                       } 
                                          var contition2:number=0;
                                          if(sensor_value_data==0){}
                                          var datenow =format.getCurrentDatenow();  
                                           var setdata_chk_log_1:any={};
                                              setdata_chk_log_1.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_1.device_id = device_id;  
                                              setdata_chk_log_1.type_id = alarm_type_id;   
                                              setdata_chk_log_1.date = datenow; 
                                              setdata_chk_log_1.data_alarm = '0';   
                                            console.log('setdata_chk_log_ =>', setdata_chk_log_1); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm_1:any=await this.settingsService.count_alarmprocesslogtelegram(setdata_chk_log_1);
                                            var setdata_chk_log_2:any={};
                                              setdata_chk_log_2.alarm_action_id = alarm_action_id;  
                                              setdata_chk_log_2.device_id = device_id;  
                                              setdata_chk_log_2.type_id = alarm_type_id;   
                                              setdata_chk_log_2.date = datenow; 
                                              setdata_chk_log_2.data_alarm = '1';   
                                            console.log('setdata_chk_log_2 =>', setdata_chk_log_2); 
                                           // เรียกใช้งาน service เช็คจำนวน log และดึงข้อมูล log
                                            var count_alarm:any=await this.settingsService.count_alarmprocesslogtelegram(setdata_chk_log_2);
                                            if(count_alarm<=validate_count && count_alarm_1>=1){
                                                   /////////-email-/////////////
                                                      var log_alarm_log :any='';
                                                      for (const [k, v] of Object.entries(useractive)) {     
                                                            var email:any = useractive[k].email;
                                                            var mobile_number:any = useractive[k].mobile_number;
                                                            var lineid:any = useractive[k].lineid;   
                                                            var user_arr:any= {
                                                                          email:email,
                                                                          mobile:mobile_number,
                                                                          lineid:lineid,  
                                                                      };
                                                            useractive_arr.push(user_arr);
                                                            /*******sendEmail***********/  
                                                            if(type_id==1 && sensor_value_alarm!=""){
                                                               // if(sensor_value_data>=status_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_warning){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data<=recovery_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }else if(type_id!=1){ 
                                                               // if(sensor_value_alarm==0){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // }else if(sensor_value_data>=status_alert){
                                                               //     let ResultData: any = await this.settingsService.sendEmail(email, subject,content);
                                                               // } 
                                                            }  
                                                            /*******sendEmail***********/ 
                                                      } 
                                                     /////////-email-/////////////  
                                                       var devicecontrol_status:any=2-1;
                                                       var device_1:any = 1; // 1 0
                                                       var contition2:number=1; 
                                                       var input_create:any={};
                                                             input_create.alarm_action_id= alarm_action_id;
                                                             input_create.device_id= device_id
                                                             input_create.type_id= alarm_type_id
                                                             input_create.event= event;
                                                             input_create.alarm_type= alarm_type_id;
                                                             input_create.status_warning= alarm_status_warning;
                                                             input_create.recovery_warning= alarm_recovery_warning;
                                                             input_create.status_alert= alarm_status_alert;
                                                             input_create.recovery_alert= alarm_recovery_alert;
                                                             input_create.email_alarm= '1';
                                                             input_create.line_alarm= '0';
                                                             input_create.telegram_alarm= '0';
                                                             input_create.sms_alarm= '0';
                                                             input_create.nonc_alarm= '0';
                                                             input_create.status=device_1;
                                                             input_create.date= date_now;
                                                             input_create.time= time_now;
                                                             input_create.createddate= Date(); 
                                                             input_create.updateddate= Date(); 
                                                             input_create.data= sensor_value_data;
                                                             input_create.data_alarm= data_alarm; 
                                                             input_create.alarm_status= '1';//control 
                                                             input_create.subject= subject;
                                                             input_create.content= content; 
                                                 console.log(`2-input_create=`);
                                                 console.info(input_create);   
                                                 await this.settingsService.create_alarmprocesslogtelegram(input_create);
                                                 await this.settingsService.create_alarmprocesslogtemp(input_create);
                                            }
                                            if(count_alarm>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '0';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_telegram(setdata_chk_delete);
                                            }if(count_alarm_1>=validate_count){
                                                              var setdata_chk_delete:any={};
                                                              setdata_chk_delete.alarm_action_id = alarm_action_id;  
                                                              setdata_chk_delete.device_id = device_id;  
                                                              setdata_chk_delete.type_id = type_id;   
                                                              setdata_chk_delete.date_now = datenow; 
                                                              setdata_chk_delete.data_alarm = '1';    
                                                            console.log('setdata_chk_delete =>', setdata_chk_delete);   
                                                            await this.settingsService.delete_alarmprocesslog_telegram(setdata_chk_delete);
                                            }
                                           /////////////////////////////////////////////////    
                                         
                               }  
                               device_event_alarm_ar.push({
                                           ...device_data_alarm[key],
                                           ...merged, 
                                           timestamp,
                                          // merged,
                                           status_warning,
                                           recovery_warning,
                                           status_alert,
                                           recovery_alert,
                                           sensor_value_data,
                                           sensor_value_alarm,
                                           sensor_value_relay,
                                           sensor_value_control_relay,
                                           subject,
                                           content,
                                           time_now,
                                           alarm_time_life,
                                           alarm_status_warning,
                                           alarm_recovery_warning,
                                           alarm_status_alert,
                                           alarm_recovery_alert, 
                                           alarm_type_id,
                                           setdata_chk_log:setdata_chk_log,
                                           setdata_chk_log_1:setdata_chk_log_1, 
                                           setdata_chk_log_2:setdata_chk_log_2,
                                           date_now, 
                                           devicecontrol_status:devicecontrol_status,
                                           log_alarm_count_set:log_alarm_count_set,
                                           count_alarm:count_alarm,
                                          //log_alarm_logs:log_alarm_logs,  
                                           now_time_full:now_time_full,  
                                           now_time_cal:now_time_cal, 
                                           time_log:log_time, 
                                           now_time:now_time,
                                           contition:contition,
                                           contition2:contition2,
                                           mqtt:mqttrs,
                                           useractive:useractive,
                               });  
                           } 
    return device_event_alarm_ar;
  }
 //function
} 