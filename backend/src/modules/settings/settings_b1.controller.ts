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
import { User } from '@src/modules/users/entities/user.entity';
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
/******************/
// import * as cache from '@src/utils/cache/redis.cache';
var Cache = new CacheDataOne();
var md5 = require('md5');
import 'dotenv/config';
var tzString = process.env.tzString;
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
      var status: any = query.status || 1;
      let schedule_id: any = query.schedule_id || '';
      let device_id: any = query.device_id || '';
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
      var sort: any = query.sort; 
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.findscheduledevice(filter);
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
      let ResultData: any = rowResultData;
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const id: number = ResultData[key].id || null;
        const ProfileRs: any = {  
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
      var status: any = query.status || 1;
      let schedule_id: any = query.schedule_id || '';
      let device_id: any = query.device_id || '';
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
      var sort: any = query.sort; 
      let filter: any = {}; 
      filter.schedule_id = schedule_id;
      filter.device_id = device_id; 
      let rowResultData: any = await this.settingsService.findscheduledevicechk(filter);
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort;
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort || 'createddate-ASC';
      filter.keyword = keyword || '';  // setting_name
      filter.status = status || '';
      filter.setting_id = query.setting_id;
      filter.location_id = query.location_id || '';
      filter.setting_type_id = query.setting_type_id || '';
      filter.sn = query.sn || '';
      filter.createddate = query.date || '';
      filter.isCount = 1;
     
      
      let rowResultData: any = await this.settingsService.setting_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
      filter2.sort = sort || 'createddate-ASC';
      filter2.keyword = keyword || '';  // setting_name
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
      let ResultData: any = await this.settingsService.setting_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
        const id: number = ResultData[key].id || null;
        const ProfileRs: any = { 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.setting_all();
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = keyword || '';  // setting_name 
      filter.status = status || ''; 
      filter.location_id = query.location_id || '';
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.location_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  // setting_name
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
      let ResultData: any = await this.settingsService.location_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs: any = { 
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
  // //@AuthUserRequired()
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.location_all();
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.type_id = query.type_id || '';
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.type_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.type_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs: any = { 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.type_all();
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
  // //@AuthUserRequired()
  //@AuthUserRequired()
  @ApiOperation({ summary: 'typeall' })
  @Get('devicetypeall')
  async list_device_type_all(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.devicetype_all();
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.type_id = query.type_id || '';
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.devicetype_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.devicetype_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs: any = { 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.devicetype_all();
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.sensor_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.location_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = []; 
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ArrayRs: any = {  
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.sensor_all();
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
      var status: any = query.status || ''; 
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || '';  
      filter.group_id = query.group_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.group_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.group_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ProfileRs: any = { 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.group_all();
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
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = keyword || '';   
      filter.status = status || ''; 
      filter.group_id = query.group_id || ''; 
      filter.ipaddress = query.ipaddress || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.group_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.group_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ  
        const ProfileRs: any = { 
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
      var status: any = query.status || '';
      var select_status: any = query.select_status || '';
      var sort: any = query.sort || 'mqtt_id-ASC';
      var keyword: any = query.keyword || '';
      var mqtt_type_id: any = query.type_id || '';
      var location_id: any = query.location_id || '';
      var filter: any = {};
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
      let rowResultData: any = await this.settingsService.mqtt_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        var bucket:any= ResultData[key].bucket;
        let filter2: any = {};
        filter2.bucket = bucket; 
        let device: any = await this.settingsService.device_lists_id(filter2);
        let device_count: any = device.length;
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const date: any = format.timeConvertermas(
                format.convertTZ(ResultData[key].updateddate, process.env.tzString),
              );
        const RSdata: any = {   
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
  // //@AuthUserRequired()
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.mqtt_all();
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
      const dto: any = '';
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
      let ResultData: any = await this.settingsService.delete_mqtt(query.mqtt_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'delete mqtt success.',
        message_th: 'delete mqtt  success.',
      });
  } 
  // delete_device(device_id: any)
  
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.api_all();
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
      const api_id: any = query.api_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.api_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.api_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.device_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'device_all success.',
        message_th: 'device_all  success.',
      });
  } 
  /********Device**********/ 
  // http://localhost:3003/v1/settings/deviceeditget?device_id=1
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
      const dto: any = '';
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
      let ResultData: any = await this.settingsService.deviceeditget(query.device_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'deviceeditget success.',
        message_th: 'deviceeditget  success.',
      });
  } 
  // delete_device(device_id: any)
  
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
      const dto: any = '';
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
      let ResultData: any = await this.settingsService.delete_device(query.device_id);
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'delete success.',
        message_th: 'delete  success.',
      });
  } 
  // http://localhost:3003/v1/settings/listdevicepage?page=1&pageSize=2&keyword=
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
      const device_id: any = query.device_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort;
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.device_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.device_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
        var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
        var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
        const DataRs: any = {  
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
            var rowResultData: any = await this.settingsService.device_list_paginate(filter);
            var InpuDatacache: any = {keycache: `${kaycache}`,time: 30,data: rowResultData};
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
            var ResultData: any = await this.settingsService.device_list_paginate(filter2);
            var InpuDatacache: any = {keycache: `${filter2keymd5}`,time: 30,data: ResultData};
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
      const device_id: any = query.device_id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 1000;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort;
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.device_list_paginate_active(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.device_list_paginate_active(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        var mqtt_data_value:any=ResultData[key].mqtt_data_value; 
        var mqtt_data_control:any=ResultData[key].mqtt_data_control; 
        var mqttdata = await this.mqttService.getdevicedata(mqtt_data_value);
        const DataRs: any = {  
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
            var InpuDatacache: any = {keycache: `${filter2keymd5}`,time: 120,data: ResultData};
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
    var rowResultData: any = await this.settingsService.device_list_paginate_all(filter);
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

    var ResultData: any = await this.settingsService.device_list_paginate_all(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj: any = [];
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
  /**********listdevicepageactive*********/
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @Get('listdevicepageactive')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_active(
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
    var rowResultData: any = await this.settingsService.device_list_paginate_schedule_status(filter);
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

    var ResultData: any = await this.settingsService.device_list_paginate_schedule_status(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj: any = [];
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
  @Get('listdevicepageschedule')
  @ApiOperation({ summary: 'list device page active' })
  async device_list_paginate_schedule(
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
      schedule_id: query.schedule_id || '',
      isCount: 1,
    };
    // นับจำนวนข้อมูลทั้งหมด
    var rowResultData: any = await this.settingsService.device_list_paginate_schedule(filter);
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
        schedule_id: query.schedule_id || '',
        isCount: 0,
        page,
        pageSize,
    };

    var ResultData: any = await this.settingsService.device_list_paginate_schedule(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj: any = [];
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
  // http://localhost:3003/v1/settings/scheduledevicepage
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
    var rowResultData: any = await this.settingsService.scheduledevicepage(filter);
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

    var ResultData: any = await this.settingsService.scheduledevicepage(filter2);
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
  // http://localhost:3003/v1/settings/listdevicealarm?location_id=1
  @HttpCode(200)
  // //@AuthUserRequired()
  // //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarm')
  async device_list_alarm(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id: any = query.device_id || '';
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort;
      let keyword: any = query.keyword || '';
      let filter2: any = {};
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
      const deletecache: any = query.deletecache || 0;
      var cachekey='device_list_ststus_alarm_'+md5(filter2);
      // if(deletecache==1){
      //   await Cache.DeleteCacheData(cachekey); 
      // }
      // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
      // if(!tempDataRs){
      //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
      // }else{
      //   var InpuDatacache: any = {keycache: `${cachekey}`,time: 10,data: tempData2};
      //     await Cache.SetCacheData(InpuDatacache); 
      // }
            var tempData2:any =[];
             /*******************/
              let ResultData: any = await this.settingsService.device_list_ststus_alarm(filter2);
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
                const DataRs: any = {  
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
  /***********************/
  // http://localhost:3003/v1/settings/listdevicealarmlimit?location_id=1&pageSize=10000
  @HttpCode(200)
  // //@AuthUserRequired()
  // //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'device list group' })
  @Get('listdevicealarmlimit')
  async device_list_alarm_limit(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
      ): Promise<any> {
      const device_id: any = query.device_id || '';
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort;
      let keyword: any = query.keyword || '';
      let filter2: any = {};
      filter2.sort = sort;
      filter2.keyword = keyword || '';  
      filter2.location_id = query.location_id || 1;
	    filter2.type_name = query.type_name || '';  
      filter2.device_id = query.device_id || '';
      filter2.mqtt_id = query.mqtt_id || '';
      filter2.type_id = query.type_id || '';
      filter2.org = query.org || '';
      filter2.bucket = query.bucket || '';
      filter2.page = query.page || 1;
      filter2.pageSize = query.pageSize || 3;
      filter2.status = status || 1;
      console.log(`filter2=`);
      console.info(filter2);
      const deletecache: any = query.deletecache || 0;
      var cachekey='device_list_ststus_alarm_limit_'+md5(filter2);
      // if(deletecache==1){
      //   await Cache.DeleteCacheData(cachekey); 
      // }
      // var tempDataRs:any =  await Cache.GetCacheData(cachekey); 
      // if(!tempDataRs){
      //     var tempData2:any =  await Cache.GetCacheData(cachekey); 
      // }else{
      //   var InpuDatacache: any = {keycache: `${cachekey}`,time: 10,data: tempData2};
      //     await Cache.SetCacheData(InpuDatacache); 
      // }
            var tempData2:any =[];
             /*******************/
              let ResultData: any = await this.settingsService.device_list_ststus_alarm_limit(filter2);
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
                const DataRs: any = {  
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.email_id = query.email_id || '';  
      filter.host_id = query.host_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.email_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.email_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const RSdata: any = {   	  
          email_id: ResultData[key].email_id,
          email_name: ResultData[key].email_name,
		      host_name: ResultData[key].host_name, 
		      host: ResultData[key].host, 		  
          host_id: ResultData[key].host_id, 
          port: ResultData[key].port, 
          username: ResultData[key].username,  
          password: ResultData[key].password,
          updateddate: ResultData[key].updateddate, 
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.email_all();
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: ResultData ,
        message: 'email_all success.',
        message_th: 'email_all  success.',
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.host_all();
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.host_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.host_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
	    filter.influxdb_id = query.influxdb_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || ''; 
      filter.host = query.host || ''; 
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.influxdb_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
      filter2.sort = sort;
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
      let ResultData: any = await this.settingsService.influxdb_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
          influxdb_id: ResultData[key].influxdb_id,  
          influxdb_name: ResultData[key].influxdb_name,  
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.influxdb_all();
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
      var status: any = query.status || '';
      var select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      var deletecache: any = query.deletecache || '';
      var keyword: any = query.keyword || '';
      var filter: any = {};
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
      let rowResultData: any = await this.settingsService.mqtt_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      var ResultData: any = await Cache.GetCacheData(keycache);
      if(!ResultData){
          var ResultData: any = await this.settingsService.mqtt_list_paginate(filter2);
          let setCache: any = {};
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
          //const device_cache: any = await Cache.GetCacheData(ResultData[key].bucket); 
          let mqtt_id:any = ResultData[key].mqtt_id;
          let filterRss: any = {};
          filterRss.mqtt_id = mqtt_id;
          var keycache2:any= 'device_mqtt_id'+mqtt_id;  
          if(deletecache==1){
                await Cache.DeleteCacheData(keycache2);
          }  
          var rss_device: any = await Cache.GetCacheData(keycache2);
          if(!rss_device){
               var rss_device: any = await this.settingsService.device_lists(filterRss);
              let setCache2: any = {};
              setCache2.time = 3000;
              setCache2.keycache = keycache;   
              setCache2.data = ResultData; 
              await Cache.SetCacheData(setCache2); 
          } 
          let rss_device_count: any =  rss_device.length;
          if(rss_device_count>=1){ 
                const mqtt_data_value: any = rss_device['0']['mqtt_data_value'];
                const mqtt_data_control: any = rss_device['0']['mqtt_data_control'];
                const device_cache: any = await Cache.GetCacheData(mqtt_data_value); 
                const RSdata: any = {  
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.mqtt_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
   
        let mqtt_id:any = ResultData[key].mqtt_id;
        let filterRss: any = {};
        filterRss.mqtt_id = mqtt_id; 
        var rss_device: any = await this.settingsService.device_lists(filterRss); 
        let rss_device_count: any =  rss_device.length;
        const RSdata: any = {  
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'mqtt_id-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.mqtt_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.mqtt_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
      

       // const rss: any = await Cache.GetCacheData(device); 
        let mqtt_id:any = ResultData[key].mqtt_id;
        let filterRss: any = {};
        filterRss.mqtt_id = mqtt_id;
        let rss_device: any = await this.settingsService.device_lists(filterRss);
        const RSdata: any = {  
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.line_all();
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
	    filter.line_id = query.line_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || '';  
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.line_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.line_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
          line_id: ResultData[key].line_id,  
          line_name: ResultData[key].line_name,   
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.nodered_all();
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
      filter.keyword = query.keyword || '';   
      filter.status = query.status || '';  
      filter.nodered_id = query.nodered_id || '';  
      filter.host = query.host || '';  
      filter.port = query.port || '';  
      filter.username = query.username || '';  
      filter.password = query.password || '';  
      filter.type_name = query.type_name || '';  
      filter.updateddate = query.updateddate || '';  
      filter.nodered_type_id = query.nodered_type_id || '';  
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.nodered_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
      filter2.sort = sort;
      filter2.keyword = query.keyword || '';   
      filter2.status = query.status || ''; 
      filter2.nodered_id = query.nodered_id || '';  
      filter2.host = query.host || '';  
      filter2.port = query.port || '';  
      filter2.username = query.username || '';  
      filter2.password = query.password || '';  
      filter2.type_name = query.type_name || '';  
      filter2.updateddate = query.updateddate || '';   
      filter2.nodered_type_id = query.nodered_type_id || '';  
      filter2.createddate = query.date || '';
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData: any = await this.settingsService.nodered_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const RSdata: any = {  	  
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
          updateddate: ResultData[key].updateddate, 
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
      const dto: any = {
                        schedule_id:schedule_id,
                      }
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.schedule_all(dto);
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.device_list_paginate_schedule(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.device_list_paginate_schedule(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 

      let filterDATA: any = {};  
        filterDATA.schedule_id=ResultData[key].schedule_id;
        let countRs: any = await this.settingsService.scheduledeviceCOUNT(filterDATA);
        const RSdata: any = {  
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.sms_all();
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort;
	    filter.sms_id = query.sms_id || '';
      filter.keyword = keyword || '';    
      filter.status = status || '';  
	    filter.port = query.port || ''; 
      filter.password = query.password || ''; 
      filter.createddate = query.date || '';
      filter.isCount = 1;
      console.log(`filter =>` + filter); console.info(filter);
      let rowResultData: any = await this.settingsService.sms_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.sms_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
          sms_id: ResultData[key].sms_id,  
          sms_name: ResultData[key].sms_name,   
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
      const dto: any = '';
      console.log(`dto=`);
      console.info(dto);
      let ResultData: any = await this.settingsService.token_all();
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
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
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
      let rowResultData: any = await this.settingsService.token_list_paginate(filter);
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
      const rowData: any = Number(rowResultData);
      const totalPages: number = Math.round(rowData / pageSize) || 1;
      let filter2: any = {};
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
      let ResultData: any = await this.settingsService.token_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(ResultData)) { 
        const ProfileRs: any = { 
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
    const Rs: any = await this.settingsService.get_setting_sn(DataDto.sn);
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
    const Rs: any = await this.settingsService.get_location_ip(DataDto.ipaddress);
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
    const Rs: any = await this.settingsService.get_type_name(DataDto.type_name);
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
    const Rs: any = await this.settingsService.get_type_name(DataDto.type_name);
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
    const Rs: any = await this.settingsService.get_sensor_chk(DataDto.sensor_name);
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
    const Rs: any = await this.settingsService.get_name_group(DataDto.group_name);
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
    //@Body() dto: any,
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
    const Rs: any = await this.settingsService.get_name_create_mqtt(DataDto.mqtt_name);
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
    var sort_lasst: any = await this.settingsService.mqtt_last_sort();
    var sort_last: any =sort_lasst+1;
    var DataDtos: any = {
          mqtt_type_id: DataDto.mqtt_type_id, 
          location_id: DataDto.location_id, 
          sort: sort_last, //DataDto.sort,
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
          status: DataDto.status
    }
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
    var DataDtos: any = {
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
    const Rs: any = await this.settingsService.get_name_create_api(DataDto.api_name);
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
    const Rs: any = await this.settingsService.get_name_create_sn(DataDto.sn);
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
    const Rs: any = await this.settingsService.get_name_create_email(DataDto.email_name);
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
    const Rs: any = await this.settingsService.get_name_create_email(DataDto.host_name);
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
    //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: InfluxdbDto,
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
    const Rs: any = await this.settingsService.get_name_create_influxdb(DataDto.influxdb_name);
    if (Rs) {
        console.log('influxdb_name=>' + DataDto.influxdb_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  influxdb_name: DataDto.influxdb_name },
          message: 'The influxdb_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล influxdb_name '+DataDto.influxdb_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
        //throw new UnprocessableEntityException();
    }   
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
    //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: LineDto,
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
    const Rs: any = await this.settingsService.get_name_create_line(DataDto.line_name);
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
    const Rs: any = await this.settingsService.get_name_create_nodered(DataDto.nodered_name);
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
   // <<base_url>>/v1/settings/createscheduledevice 
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
    const Rs: any = await this.settingsService.findOnescheduledevice(DataDto.schedule_id);
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
    //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: SmsDto,
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
    const Rs: any = await this.settingsService.get_name_create_schedule(DataDto.sms_name);
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
    await this.settingsService.create_schedule(DataDto); 
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
    const Rs: any = await this.settingsService.get_name_create_token(DataDto.token_name);
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
    const Rs: any = await this.settingsService.get_name_create_telegram(DataDto.telegram_name);
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
    const Rs: any = await this.settingsService.get_deviceactionuserlog(DataDto.alarm_action_id);
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
    const Rs: any = await this.settingsService.get_setting(dto.setting_id);
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + setting_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + setting_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    const rt: any = await this.settingsService.update_setting(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
    const Rs: any = await this.settingsService.get_location(dto.location_id);
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + location_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + location_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    const rt: any = await this.settingsService.update_location(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + type_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + type_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    const rt: any = await this.settingsService.update_type(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + type_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + type_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
    DataUpdate.type_id = type_id;
    if (dto.type_name) {
        DataUpdate.type_name = dto.type_name;
    }
    if (dto.status) {
        DataUpdate.status = dto.status;
    }    
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt: any = await this.settingsService.update_device_type(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + sensor_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + sensor_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    const rt: any = await this.settingsService.update_sensor(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + group_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + group_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
    DataUpdate.group_id = group_id;
        if (dto.group_id) {
            DataUpdate.group_id = dto.group_id;
        } 
        
        if (dto.group_name) {
            DataUpdate.group_name = dto.group_name;
        }      
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    const rt: any = await this.settingsService.update_group(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
  // http://192.168.1.59:3003/v1/settings/updatemqtt
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + mqtt_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + mqtt_id + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate: any = {};
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
        } 
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt: any = await this.settingsService.update_mqtt(DataUpdate);
    var rsbucket: any = await this.settingsService.get_mqtt(mqtt_id);
    // var mqtt_name: any =rsbucket['mqtt_name'];
    // var org: any =rsbucket['org'];
    var rs_bucket: any =rsbucket.bucket;
    var org: any =rsbucket.org;
    // http://192.168.1.59:3003/v1/settings/updatemqtt
    if (rt && rt == 200) {
        var result: any = {
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
        var result: any = {
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
    // http://192.168.1.59:3003/v1/settings/updatemqttstatus
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
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate: any = {};
        DataUpdate.mqtt_id = mqtt_id;
        DataUpdate.status = status;
    // console.log(`DataUpdate=>`);
    // console.info(DataUpdate);
    var rsbucket: any = await this.settingsService.get_mqtt(mqtt_id);
    let rsbucket_count: any = rsbucket.length;
    if(rsbucket_count!=0){
       var rt: any = await this.settingsService.update_mqtt_status(mqtt_id,status);
    }else{
       var rt: any = await this.settingsService.update_mqtt_status(mqtt_id,0);
    }
   if(rsbucket_count!=0){
          // let filter2: any = {};
          // filter2.bucket = rsbucket.bucket ;
          // let device: any = await this.settingsService.device_lists_id(filter2);
          // let device_count: any = device.length;
          // var mqtt_name: any =rsbucket['mqtt_name'];
          // var org: any =rsbucket['org'];
            var rs_bucket: any =rsbucket.bucket;
            var org: any =rsbucket.org;
            if (rt) {
                var DataUpdate2: any = {};
                DataUpdate2.mqtt_id = mqtt_id; 
                DataUpdate2.bucket = rs_bucket; 
                DataUpdate2.status = dto.status;
                var mqtt_bucket: any = await this.settingsService.update_device_mqtt_status(rs_bucket,status) ;      
            } 
    }
    // http://192.168.1.59:3003/v1/settings/updatemqtt
    if (rt) {
        var result: any = {
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
        var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + api_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + api_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_api(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + device_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + device_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_device(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + email_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + email_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_email(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + host_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + host_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_host(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + influxdb_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + influxdb_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt: any = await this.settingsService.update_influxdb(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + line_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + line_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_line(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + nodered_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + nodered_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
    DataUpdate.nodered_id = nodered_id;
        if (dto.nodered_name) {
            DataUpdate.nodered_name = dto.nodered_name;
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
    var rt: any = await this.settingsService.update_nodered(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
    const DataUpdate: any = { schedule_id: dto.schedule_id };
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + sms_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + sms_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
        }
    console.log(`DataUpdate=>`);
    console.info(DataUpdate);
    var rt: any = await this.settingsService.update_sms(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + token_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + token_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_token(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
    var device_id: any = dto.device_id;  
    if (device_id==null) { 
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var mqtt_bucket: any = await this.settingsService.update_device_mqtt_status_device_id(device_id,status) ;      
    if (mqtt_bucket) {
        var result: any = {
              statusCode: 200,
              code: 200, 
              payload: mqtt_bucket, 
              message: 'Update status device successful.',
              message_th: 'อัปเดต  สำเร็จ.',
        };
        res.status(200).json(result);
    } else {
        var result: any = {
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
      var result: any = {
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: dto,
        message: ' id ' + status + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + status + '.',
      };
      res.status(200).json(result);
    } 
    var DataUpdate: any = {};
        DataUpdate.schedule_id = schedule_id;
        DataUpdate.status = status;
    // console.log(`DataUpdate=>`);
    // console.info(DataUpdate);
    var rsbucket: any = await this.settingsService.get_schedule(schedule_id);
    let rsbucket_count: any = rsbucket.length;
    if(rsbucket_count!=0){
       var rt: any = await this.settingsService.update_schedule_status(schedule_id,status);
    }else{
       var rt: any = await this.settingsService.update_schedule_status(schedule_id,0);
    }
   if(rsbucket_count!=0){  
            if (rt) { 
                var mqtt_bucket: any = await this.settingsService.update_schedule_status(schedule_id,status) ;      
            } 
    }
    // http://192.168.1.59:3003/v1/settings/updatemqtt
    if (rt) {
        var result: any = {
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
        var result: any = {
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
      const rsbucket: any = await this.settingsService.get_schedule(schedule_id);
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
      const DataUpdate: any = {};
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
      const rt: any = await this.settingsService.update_schedule_status_day(schedule_id, DataUpdate);

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
      var setting_id: any = query.setting_id;
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
        var Rs: any = await this.settingsService.get_setting(setting_id);
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
    @Query('setting_id') setting_id: string, // หรือ @Param('setting_id') ถ้าใช้ param
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
      var result: any = {
        statusCode: 200,
        code: 404,
        payload: null,
        message: ' id ' + telegram_id + ' is null.',
        message_th: 'ไม่พบข้อมูล  id ' + telegram_id + '.',
      };
      res.status(200).json(result);
    } 
    let DataUpdate: any = {};
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
    var rt: any = await this.settingsService.update_telegram(DataUpdate);
    if (rt && rt == 200) {
      var result: any = {
        statusCode: 200,
        code: 200,
        payload: DataUpdate,
        rt: rt,
        message: 'Update successful.',
        message_th: 'อัปเดต  สำเร็จ.',
      };
      res.status(200).json(result);
    } else {
      var result: any = {
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
      var location_id: any = query.location_id;
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
        var Rs: any = await this.settingsService.get_location(location_id);
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
      var type_id: any = query.type_id;
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
        var Rs: any = await this.settingsService.get_type(type_id);
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
      var type_id: any = query.type_id;
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
        var Rs: any = await this.settingsService.get_type(type_id);
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
      var sensor_id: any = query.sensor_id;
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
        var Rs: any = await this.settingsService.get_sensor(sensor_id);
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
      var group_id: any = query.group_id;
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
        var Rs: any = await this.settingsService.get_group(group_id);
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
      var mqtt_id: any = query.mqtt_id;
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
        var Rs: any = await this.settingsService.get_mqtt(mqtt_id);
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
      var api_id: any = query.api_id;
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
        var Rs: any = await this.settingsService.get_api(api_id);
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
      var device_id: any = query.device_id;
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
        var Rs: any = await this.settingsService.get_device(device_id);
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
      var email_id: any = query.email_id;
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
        var Rs: any = await this.settingsService.get_email(email_id);
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
      var host_id: any = query.host_id;
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
        var Rs: any = await this.settingsService.get_host(host_id);
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
      var influxdb_id: any = query.influxdb_id;
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
        var Rs: any = await this.settingsService.get_influxdb(influxdb_id);
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
      var line_id: any = query.line_id;
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
        const Rs: any = await this.settingsService.get_line(line_id);
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
      var nodered_id: any = query.nodered_id;
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
        const Rs: any = await this.settingsService.get_nodered(nodered_id);
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
      var schedule_id: any = query.schedule_id;
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
            message_th: 'ไม่พบข้อมูลตารางงาน',
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
      var sms_id: any = query.sms_id;
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
        const Rs: any = await this.settingsService.get_sms(sms_id);
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
      var token_id: any = query.token_id;
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
        const Rs: any = await this.settingsService.get_token(token_id);
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
      var schedule_id: any = query.schedule_id;
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
        const Rs: any = await this.settingsService.get_ScscheduleId(schedule_id);
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
      var device_id: any = query.device_id;
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
      var schedule_id: any = query.schedule_id;
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
        const Rs: any = await this.settingsService.get_ScscheduleId(schedule_id);
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
           let filter: any = {};
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
      var telegram_id: any = query.telegram_id;
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
      var schedule_id: any = query.schedule_id;
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
        const Rs: any = await this.settingsService.get_telegram(schedule_id);
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
           let filter: any = {};
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
  @Get()
  async GetIndex(
      @Res() res: Response, 
      @Body() dto: any,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ) { 
      res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: [],
            message: 'Settings Index.',
            message_th: 'Settings Index.',
          });
      return;
  } 
  @Post()
  create(@Res() res: Response,  
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    @Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }
  /***************#################*****************/
  @Get(':id')
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  findOne(@Param('id') id: string,
    @Res() res: Response, 
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any, 
    @Req() req: any,) {
    return this.settingsService.findOne(+id);
  }
  /***************#################*****************/
  @Patch(':id')
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  update(@Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto, 
    @Res() res: Response, 
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,) {
    return this.settingsService.update(+id, updateSettingDto);
  }
  /***************#################*****************/
  @Delete(':id')
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  remove(@Param('id') id: string, 
    @Res() res: Response, 
    @Body() dto: any,
    @Query() query: any,
    @Headers() headers: any, 
    @Req() req: any,) {
    return this.settingsService.remove(+id);
  }
  /***************#################*****************/
   /***********************/
  // http://192.168.1.59:3003/v1/settings/listdevicescheduledata?schedule_id=1
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
    var rowResultData: any = await this.settingsService.device_list_paginate_all_filter(filter);
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

    var ResultData: any = await this.settingsService.device_list_paginate_all_filter(filter2);
    /*
      var tempData2 = [];
          for (var va of ResultData) {
            var mqtt_data_value = va.mqtt_data_value;
            var mqttrs = await this.mqttService.getdevicedataAll(mqtt_data_value);
            var mqtt_data = mqttrs['data'];
            var mqtt_timestamp = mqttrs['timestamp'];
            var timestamp = mqttrs['timestamp'];
            var configdata = va.configdata;
            let obj: any = [];
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
}

  // let jwt = req.headers.authorization.replace('Bearer ', '');
  // const token = req.headers.authorization.replace('Bearer ', '').trim();
  // console.log('token=>' + token);
  // let jsonString: any = this.jwtService.decode(token) as { id: string };
  // console.info("jsonString=>"+jsonString) 