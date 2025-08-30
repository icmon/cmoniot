import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
  ConflictException
} from '@nestjs/common';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { compact, isEmpty, uniqBy } from 'lodash';
/******** entity *****************/
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
import { DeviceType } from '@src/modules/settings/entities/devicetype.entity';
import { Setting } from '@src/modules/settings/entities/setting.entity';
import { Location } from '@src/modules/settings/entities/location.entity';
import { Type } from '@src/modules/settings/entities/type.entity';
import { Sensor } from '@src/modules/settings/entities/sensor.entity';
import { Group } from '@src/modules/settings/entities/group.entity';
import { Mqtt } from '@src/modules/settings/entities/mqtt.entity';
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
import { Deviceaction } from '@src/modules/settings/entities/deviceaction.entity';
import { Deviceactionlog } from '@src/modules/settings/entities/deviceactionlog.entity';
import { Deviceactionuser } from '@src/modules/settings/entities/deviceactionuser.entity';
import { Devicealarmaction } from '@src/modules/settings/entities/devivicealarmaction.entity';
import { Telegram } from '@src/modules/settings/entities/telegram.entity';
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
import { MailerService } from '@nestjs-modules/mailer';
import * as format from '@src/helpers/format.helper';
/****entity****/
import { firstValueFrom } from 'rxjs';
import { CacheDataOne } from '@src/utils/cache/redis.cache';
const tz = require('moment-timezone');
var Cache = new CacheDataOne();
var md5V1 = require('md5');
import md5 from 'md5';
import { connect, MqttClient } from 'mqtt'; // <-- ใช้ 'mqtt' โดยตรง
import { Subject } from 'rxjs';
import { filter, first, timeout,map } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
/******** service ****************/
import { AuthService } from '@src/modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import {
  getCurrentDateTimeForSQL,
  convertSortInput,
} from '@helpers/format.helper';
import * as moment from 'moment';
var md5 = require('md5');
import 'dotenv/config';
var tzString = process.env.tzString;
var SEND_EMAIL = process.env.SEND_EMAIL;
// formatInTimeZone(date, tzString, 'yyyy-MM-dd HH:mm:ssXXX')
const fs = require('fs');
import { join } from 'path';
const filePath = join(__dirname, 'public', 'emailConfigs2.json');
require('dotenv').config();
@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);
  private latestData = new Map<string, any>();
  private mqttClient: MqttClient;
  private messageStream = new Subject<{ topic: string; payload: Buffer }>();
  constructor(
    private readonly mailerService: MailerService,
    @Inject('MQTT_CLIENT') private readonly client: ClientProxy,
    @InjectRepository(Setting) private SettingRepository: Repository<Setting>,
    @InjectRepository(Location)private LocationRepository: Repository<Location>,
    @InjectRepository(Type)private TypeRepository: Repository<Type>,
    @InjectRepository(Sensor) private SensorRepository: Repository<Sensor>,
    @InjectRepository(Group)private GroupRepository: Repository<Group>,
    @InjectRepository(Mqtt)private MqttRepository: Repository<Mqtt>,
    @InjectRepository(Api)private ApiRepository: Repository<Api>,
    @InjectRepository(DeviceType)private DeviceTypeRepository: Repository<DeviceType>,
    @InjectRepository(Device)private DeviceRepository: Repository<Device>,
    @InjectRepository(Email)private EmailRepository: Repository<Email>,
    @InjectRepository(Host)private HostRepository: Repository<Host>,
    @InjectRepository(Influxdb)private InfluxdbRepository: Repository<Influxdb>,
    @InjectRepository(Line)private LineRepository: Repository<Line>,
    @InjectRepository(Nodered)private NoderedRepository: Repository<Nodered>,
    @InjectRepository(Schedule)private ScheduleRepository: Repository<Schedule>,
    @InjectRepository(Sms)private SmsRepository: Repository<Sms>,
    @InjectRepository(Token)private TokenRepository: Repository<Token>,
    @InjectRepository(scheduleDevice)private scheduleDeviceRepository: Repository<scheduleDevice>,
    @InjectRepository(Deviceaction)private DeviceactionRepository: Repository<Deviceaction>,
    @InjectRepository(Deviceactionlog)private DeviceactionlogRepository: Repository<Deviceactionlog>,
    @InjectRepository(Deviceactionuser)private DeviceactionuserRepository: Repository<Deviceactionuser>,
    @InjectRepository(Devicealarmaction)private DevicealarmactionRepository: Repository<Devicealarmaction>,
    @InjectRepository(Telegram)private TelegramRepository: Repository<Telegram>,
    @InjectRepository(alarmDevice) private alarmDeviceRepository: Repository<alarmDevice>,
    @InjectRepository(alarmDeviceEvent) private alarmDeviceEventRepository: Repository<alarmDeviceEvent>,
    @InjectRepository(scheduleprocesslog) private scheduleprocesslogRepository: Repository<scheduleprocesslog>,
    @InjectRepository(alarmprocesslog) private alarmprocesslogRepository: Repository<alarmprocesslog>,
    @InjectRepository(alarmprocesslogtemp) private alarmprocesslogtempRepository: Repository<alarmprocesslogtemp>,
    @InjectRepository(alarmprocesslogemail) private alarmprocesslogemailRepository: Repository<alarmprocesslogemail>,
    @InjectRepository(alarmprocesslogline) private alarmprocessloglineRepository: Repository<alarmprocesslogline>,
    @InjectRepository(alarmprocesslogsms) private alarmprocesslogsmsRepository: Repository<alarmprocesslogsms>,
    @InjectRepository(alarmprocesslogtelegram) private alarmprocesslogtelegramRepository: Repository<alarmprocesslogtelegram>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(SdUserRole) private SdUserRoleRepository: Repository<SdUserRole>,
    @InjectRepository(SdUserRolesAccess) private SdUserRolesAccessRepository: Repository<SdUserRolesAccess>,
    @InjectRepository(UserRolePermission) private UserRolePermissionRepository: Repository<UserRolePermission>,
    @InjectRepository(mqtthost) private mqtthostRepository: Repository<mqtthost>,
  ) {}
  /********sendEmail**********/
  async sendEmail(to: any, subject: any, content: any) {
    console.log(`----SettingsService--------`);
    console.log(`----sendEmail---------`);
    console.log(`to--`+to);
    console.log(`subject--`+subject);
    console.log(`content--`+content);
    if(to==undefined || to==''){
      var to:any='cmoniots@gmail.com';
    }if(subject==undefined || subject==''){
      var subject:any='CmonIoT test send email';
    }if(content==undefined || content==''){
      var content:any='test send email';
    }
    await this.mailerService.sendMail({
      to,
      subject,
      html: content, // or use 'html' for HTML messages
    });
    var rs:any={
              to:to,
              subject:subject,
              content:content,
            }
    console.log(`sendEmail=>`);
    console.info(rs);
    return rs;
  }
  /********Devicealarmaction**********/
  async create_devicealarmaction(dto: any): Promise<Devicealarmaction>{
        // var schedule_id = dto.schedule_id;
        // var device_id = dto.device_id;
        console.log('create_nodered=>');console.info(dto);
            const result: any = await this.DevicealarmactionRepository.save(
            this.DevicealarmactionRepository.create(dto),
        );
        return result;
  }
  async get_devicealarmaction_chk(action_name: any): Promise<Devicealarmaction> {
        try {
        const rs:any = await this.DevicealarmactionRepository.findOne({
            where: {
            action_name,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  /********schedule_device**********/
  async create_schedule_device(dto: any): Promise<scheduleDevice>{
        // var schedule_id = dto.schedule_id;
        // var device_id = dto.device_id;
        console.log('create_nodered=>');console.info(dto);
            const result: any = await this.scheduleDeviceRepository.save(
            this.scheduleDeviceRepository.create(dto),
        );
        return result;
  }
  async delete_schedule_device(dto: any): Promise<scheduleDevice>{
      try {
            var device_id: any = dto.device_id || '';
            var schedule_id: any = dto.schedule_id || '';
            const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT s.schedule_id)', 'cnt');
            query.where('1=1');
            query.andWhere('s.device_id=:device_id', { device_id: device_id });
            query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = { device_id: device_id,schedule_id: schedule_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.scheduleDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  async delete_schedule_device_by_schedule_id(dto: any): Promise<scheduleDevice>{ 
      try {
            var device_id: any = dto.device_id || '';
            var schedule_id: any = dto.schedule_id || '';  
            const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT s.schedule_id)', 'cnt');
            query.where('1=1'); 
            query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = {schedule_id: schedule_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.scheduleDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  async get_data_schedule_device(dto: any): Promise<Group> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
        var schedule_id = dto.schedule_id;
        var device_id = dto.device_id; 
        var isCount = dto.isCount; 
        const query: any = await this.scheduleDeviceRepository.createQueryBuilder('sc');
        if (isCount == 1) {
          //var countRs: number = await query.getCount();
          var countRs: number = await query.select('COUNT(DISTINCT sc.device_id)', 'cnt');
        } else { 
            query.select([
                'sc.device_id AS device_id', 
                'sc.schedule_id AS schedule_id' 
            ]); 
        } 
        query.where('1=1'); 
        if (schedule_id) {
          query.andWhere('sc.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }
        if (device_id) {
          query.andWhere('sc.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        if (isCount == 1) {
            // let tempCounts:any = {};
            // tempCountt.count = countRs;
            // return tempCountt.count;
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);
            console.log(`tempCountt.count =>` + tempCounts.count);
            return count;
        } else {
          // Default sorting
            query.orderBy(`sc.device_id`, 'ASC');
        }
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async findscheduledevicechk(dto: any): Promise<scheduleDevice> {
      console.log(`schedule Device =`);
      console.info(dto);
      try {
        var device_id: string = dto.device_id || '';
        var schedule_id: string = dto.schedule_id || ''; 
        var sort: string = dto.sort;  
        const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
          query.select([
              's.device_id AS device_id', 
              's.schedule_id AS schedule_id', 
              'sc.schedule_name AS schedule_name',  
          ]); 
        query.leftJoin(
                          "sd_iot_schedule",
                          "sc",
                          "s.schedule_id= sc.schedule_id"
                      ); 
        query.leftJoin(
                          "sd_iot_device",
                          "dv",
                          "s.device_id= dv.device_id"
                      ); 
        query.where('1=1');
        if (device_id) {
          query.andWhere('s.device_id=:device_id', { device_id: device_id });
        } if (schedule_id) {
          query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          // Sorting logic
          if (sort) {
            const sortResult = convertSortInput(sort);
            if (sortResult == false) {
              throw new BadRequestException(`Invalid sort option.`);
            }
            const { sortField, sortOrder } = sortResult; 
            console.log(`sort=`);
            console.info(sort);
            console.log(`sortField=`+sortField);
            console.log(`sortOrder=`+sortOrder);
            console.log(`sortResult=`);
            console.info(sortResult); 
            if(sortOrder=='ASC' || sortOrder=='asc'){
              var sortOrders:any ='ASC';
            }else if(sortOrder=='DESC' || sortOrder=='desc'){
              var sortOrders:any ='DESC';
            }else{
              var sortOrders:any ='ASC';
            }
            query.orderBy(
              `s.${sortField}`,
              sortOrders.toUpperCase(),
            );
          } else {
            // Default sorting
            query.orderBy(`s.device_id`, 'ASC');
          }
          // query.limit(pageSize);
          // query.offset(pageSize * (page - 1));
          return await query.getRawMany();
        
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async findscheduledevice(dto: any): Promise<scheduleDevice> {
    console.log(`schedule Device =`);
    console.info(dto);
    try {
      var device_id: string = dto.device_id || '';
      var schedule_id: string = dto.schedule_id || ''; 
      var sort: string = dto.sort;  
      const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
        query.select([
            's.device_id AS device_id', 
            's.schedule_id AS schedule_id', 
            'sc.schedule_name AS schedule_name',  
            'sc.start AS schedule_start',  
            'sc.event AS schedule_event',
            'sc.sunday AS sunday',
            'sc.monday AS monday',
            'sc.tuesday AS tuesday',
            'sc.wednesday AS wednesday',
            'sc.thursday AS thursday',
            'sc.friday AS friday',
            'sc.saturday AS saturday',
            'dv.device_name AS device_name',
            'dv.mqtt_data_value AS mqtt_data_value',
            'dv.mqtt_data_control AS mqtt_data_control',
            'dv.oid AS device_oid',
            'dv.sn AS device_sn',
        ]); 
      query.leftJoin(
                        "sd_iot_schedule",
                        "sc",
                        "s.schedule_id= sc.schedule_id and sc.status=1"
                    ); 
      query.leftJoin(
                        "sd_iot_device",
                        "dv",
                        "s.device_id= dv.device_id and dv.status=1"
                    ); 
      query.where('1=1');
      if (device_id) {
        query.andWhere('s.device_id=:device_id', { device_id: device_id });
      } if (schedule_id) {
        query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
      }if (dto.monday) {
        query.andWhere('sc.monday=:monday', { monday: dto.monday });
      }if (dto.tuesday) {
        query.andWhere('sc.tuesday=:tuesday', { tuesday: dto.tuesday });
      }if (dto.wednesday) {
        query.andWhere('sc.wednesday=:wednesday', { wednesday: dto.wednesday });
      }if (dto.thursday) {
        query.andWhere('sc.thursday=:thursday', { thursday: dto.thursday });
      }if (dto.friday) {
        query.andWhere('sc.friday=:friday', { friday: dto.friday });
      }if (dto.saturday) {
        query.andWhere('sc.saturday=:saturday', { saturday: dto.saturday });
      }if (dto.sunday) {
        query.andWhere('sc.sunday=:sunday', { sunday: dto.sunday });
      }if (dto.start) {
        query.andWhere('sc.start=:start', { start: dto.start });
      }if (dto.event) {
        query.andWhere('sc.event=:event', { event: dto.event });
      }

      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult; 
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `s.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`s.device_id`, 'ASC');
        }
        // query.limit(pageSize);
        // query.offset(pageSize * (page - 1));
        return await query.getRawMany();
       
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async findOnescheduledevice(schedule_id: any): Promise<Setting> {
        try {
        const rs:any = await this.scheduleDeviceRepository.findOne({
            where: {
            schedule_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async createscheduledevice(dto: any): Promise<Setting> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.scheduleDeviceRepository.save(
          this.scheduleDeviceRepository.create(dto),
        );
        return result;
  }
  async get_ScscheduleId(schedule_id: any): Promise<Setting> {
        try {
        const rs:any = await this.scheduleDeviceRepository.findOne({
            where: {
            schedule_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async removeScscheduleId(schedule_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting sd_iot_schedule_device with setting_id: ${schedule_id}`);
            const constsetting = await this.get_ScscheduleId(schedule_id);
            if (!constsetting) {
                throw new NotFoundException(`sd_iot_schedule_device with setting_id ${schedule_id} not found`);
            }

            await this.scheduleDeviceRepository.delete(schedule_id);
            } catch (error) {
            this.logger.error(`Error while deleting sd_iot_schedule_device = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
        }
  }
  async get_ScdeviceId(device_id: any): Promise<Setting> {
        try {
        const rs:any = await this.scheduleDeviceRepository.findOne({
            where: {
            device_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async removeScdeviceId(dto: any): Promise<scheduleDevice> {
    console.log(`schedule Device =`);console.info(dto);
    try {
      var device_id: string = dto.device_id || '';
      var schedule_id: string = dto.schedule_id || '';  
      const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
      //var countRs: number = await query.getCount();
      var countRs: number = await query.select('COUNT(DISTINCT s.schedule_id)', 'cnt');
      query.where('1=1');
      query.andWhere('s.device_id=:device_id', { device_id: device_id });
      query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      var count: any = await query.getCount();
      let tempCounts: any = {};
      tempCounts.count = countRs;
      console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
      if(count>=1){
            const criteria:any = { device_id: device_id,schedule_id: schedule_id}; 
            console.log(`Attempting to delete record with criteria:`, criteria);
            const deleteResult:any =await this.scheduleDeviceRepository.delete(criteria);
              // The result object contains information about the operation.
              // The 'affected' property shows how many rows were deleted.
             if (deleteResult.affected && deleteResult.affected > 0) {
                console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
              } else {
                console.log('No records found matching the criteria. Nothing was deleted.');
              }
          return deleteResult;
       }else{
          return null;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********schedule_device**********/
  async update_schedule_status(schedule_id: number, status: number): Promise<number> {
    console.log(`Updating devices with schedule_id '${schedule_id}' to status ${status}`);
    try {
      const DataUpdate: any = {};
            DataUpdate.status = status;
      const updateResult =  await this.scheduleDeviceRepository
            .createQueryBuilder()
            .update('sd_iot_schedule')
            .set(DataUpdate)
            .where('schedule_id=:schedule_id', { schedule_id: schedule_id })
            .execute();

      // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for schedule_id '${schedule_id}'. Update failed.`);
        throw new NotFoundException(`No devices found with schedule_id '${schedule_id}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for schedule_id '${schedule_id}'.`);
      
      // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;

    } catch (err) {
      // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
      if (err instanceof NotFoundException) {
        throw err;
      }

      // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
      this.logger.error(`Failed to update device status for mqtt_id '${schedule_id}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  /*****day********/
  async update_schedule_status_day(schedule_id: number, dto: any): Promise<number> {
    try {
      console.log(`Updating devices with schedule_id '${schedule_id}'`);
      console.log(`dto:`, dto);

      const DataUpdate: any = {};

      // อัปเดตเฉพาะวันที่มีการส่งค่ามา (ไม่ใช่ undefined และไม่ใช่ค่าว่าง)
      const days = ['event','sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'status'];
      for (const day of days) {
        if (dto[day] !== undefined && dto[day] !== '') {
          DataUpdate[day] = dto[day];
        }
      }

      if (Object.keys(DataUpdate).length == 0) {
        this.logger.warn(`No valid fields to update for schedule_id '${schedule_id}'.`);
        throw new UnprocessableEntityException('No valid fields to update.');
      }

      const updateResult = await this.scheduleDeviceRepository
        .createQueryBuilder()
        .update('sd_iot_schedule')
        .set(DataUpdate)
        .where('schedule_id=:schedule_id', { schedule_id })
        .execute();

      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for schedule_id '${schedule_id}'. Update failed.`);
        throw new NotFoundException(`No devices found with schedule_id '${schedule_id}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for schedule_id '${schedule_id}'.`);
      return updateResult.affected;

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      this.logger.error(`Failed to update device status for schedule_id '${schedule_id}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  /********Setting**********/ 
  async maxid_setting(): Promise<Setting> { 
        try {
          const RS:any = await this.SettingRepository.query('SELECT MAX(setting_id) AS setting_id FROM sd_iot_setting');
          console.log('get_maxId');console.info(RS);
          var setting_id:any=RS['0'].setting_id;
          console.log('maxId=');console.info(setting_id);
          var setting_ids:any=setting_id+1;
          console.log('setting_ids=');console.info(setting_ids);
          return setting_ids;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async findAll(dto: any): Promise<Setting> {
    console.log(`setting_list_paginate dto=`);
    console.info(dto);
    try {
      var idx: string = dto.idx || '';
      var uid: string = dto.uid || '';
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      var setting_id: any = dto.setting_id;
      var location_id: any = dto.location_id;
      var setting_type_id: any = dto.setting_type_id;
      var sn: any = dto.sn;
      var createddate: any = dto.createddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.SettingRepository.createQueryBuilder('s');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT s.setting_id)', 'cnt');
      } else {
        query.select([
            's.setting_id AS setting_id', 
            's.location_id AS location_id', 
            's.setting_type_id AS setting_type_id', 
            's.setting_name AS setting_name', 
            's.sn AS sn', 
            's.createddate AS createddate', 
            's.updateddate AS updateddate', 
            's.status AS status',
            'l.location_name AS location_name',
            't.type_name AS type_name',
        ]);
      }
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= s.location_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = s.setting_type_id"
                    ); 
      query.where('1=1');
      if (keyword) {
        query.andWhere('s.setting_name like :setting_name', {
          setting_name: keyword ? `%${keyword}%` : '%',
        });
      }
      
      if (setting_id) {
        query.andWhere('s.setting_id=:setting_id', { setting_id: setting_id });
      }
      if (location_id) {
        query.andWhere('s.location_id=:location_id', { location_id: location_id });
      }
      if (status) {
        query.andWhere('l.status=:status', { status: status });
      }
      if (setting_type_id) {
        query.andWhere('s.setting_type_id=:setting_type_id', { setting_type_id: setting_type_id });
      }
      if (sn) {
        query.andWhere('s.sn=:sn', { sn: sn });
      }
      if (status) {
        query.andWhere('s.status=:status', { status: status });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCounts.count = countRs;
        // return tempCounts.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCounts.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `l.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`l.setting_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async findOne(setting_id: any): Promise<Setting> {
        try {
        const rs:any = await this.SettingRepository.findOne({
            where: {
            setting_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async create(dto: any): Promise<Setting> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.SettingRepository.save(
          this.SettingRepository.create(dto),
        );
        return result;
  }
  async update(id: number,dto:any) {
        // const setting_idx:any = JSON.parse(dto.setting_id);
        let setting_id = dto.setting_id || id;
        const DataUpdate: any = {};
        const query: any = await this.SettingRepository.createQueryBuilder('s');
        query.select(['s.setting_id AS setting_id']);
        query.where('1=1');
        query.andWhere('s.setting_id=:setting_id', { setting_id: setting_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with setting_id ${setting_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found sd_iot_settingsetting_id ${setting_id}.`,
                message_th: `ไม่พบข้อมูล sd_iot_settingsetting_id ${setting_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('setting_idx =>'+setting_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        // if (dto.updateddate) {
        //     DataUpdate.updateddate = dto.updateddate;
        // }  
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.SettingRepository
            .createQueryBuilder()
            .update('sd_iot_setting')
            .set(DataUpdate)
            .where('setting_id=:setting_id', { setting_id: setting_id })
            .execute();
        return 200;
  }
  async remove(setting_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting sd_iot_setting with setting_id: ${setting_id}`);
            const constsetting = await this.get_setting(setting_id);
            if (!constsetting) {
                throw new NotFoundException(`sd_iot_setting with setting_id ${setting_id} not found`);
            }

            await this.SettingRepository.delete(setting_id);
            } catch (error) {
            this.logger.error(`Error while deleting sd_iot_setting = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
        }
  }
  /********Setting**********/
  async create_setting(dto: any): Promise<Setting> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.SettingRepository.save(
          this.SettingRepository.create(dto),
        );
        return result;
  }
  async delete_setting(setting_id: number): Promise<any> {
    if (!setting_id || isNaN(setting_id) || setting_id <= 0) {
      throw new UnprocessableEntityException('Invalid setting_id');
    }
    // ... ดำเนินการลบข้อมูล
        try {
            this.logger.log(`Deleting sd_iot_setting with setting_id: ${setting_id}`);
            const constsetting = await this.get_setting(setting_id);
            if (!constsetting) {
                throw new NotFoundException(`sd_iot_setting with setting_id ${setting_id} not found`);
            }

            await this.SettingRepository.delete(setting_id);
            } catch (error) {
            this.logger.error(`Error while deleting sd_iot_setting = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
        }
  }
  async get_setting(setting_id: any): Promise<Setting> {
        try {
        const rs:any = await this.SettingRepository.findOne({
            where: {
            setting_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_setting_sn(sn: any): Promise<Setting> {
        try {
            const rs:any = await this.SettingRepository.findOne({
                where: {
                sn,
                },
            });
            console.log('====get_setting_sn====');
            console.log('rs=>');console.info(rs);
            return rs;
        } catch{
           return null;
        }
  }
  async update_setting(dto) {
        // const setting_idx:any = JSON.parse(dto.setting_id);
        let setting_id = dto.setting_id;
        const DataUpdate: any = {};
        const query: any = await this.SettingRepository.createQueryBuilder('s');
        query.select(['s.setting_id AS setting_id']);
        query.where('1=1');
        query.andWhere('s.setting_id=:setting_id', { setting_id: setting_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with setting_id ${setting_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found setting ${setting_id}.`,
                message_th: `ไม่พบข้อมูล setting ${setting_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('setting_idx =>'+setting_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        // if (dto.updateddate) {
        //     DataUpdate.updateddate = dto.updateddate;
        // } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.SettingRepository
            .createQueryBuilder()
            .update('sd_iot_setting')
            .set(DataUpdate)
            .where('setting_id=:setting_id', { setting_id: setting_id })
            .execute();
        return 200;
  }
  /********Setting_list**********/
  async setting_all(): Promise<Setting> {
    console.log(`setting_alldto=`); 
    try { 
      const query: any = await this.SettingRepository.createQueryBuilder('s'); 
      query.select(['s.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async setting_list_paginate(dto: any): Promise<Setting> {
    console.log(`setting_list_paginate dto=`);
    console.info(dto); 
    try { 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      var setting_id: any = dto.setting_id;
      var location_id: any = dto.location_id;
      var setting_type_id: any = dto.setting_type_id;
      var sn: any = dto.sn;
      var createddate: any = dto.createddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.SettingRepository.createQueryBuilder('s');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT s.setting_id)', 'cnt');
      } else {
        query.select([
            's.setting_id AS setting_id', 
            's.location_id AS location_id', 
            's.setting_type_id AS setting_type_id', 
            's.setting_name AS setting_name', 
            's.sn AS sn', 
            's.createddate AS createddate', 
            's.updateddate AS updateddate', 
            's.status AS status',
            'l.location_name AS location_name',
            't.type_name AS type_name'
        ]);
      }
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= s.location_id"
                    ); 
      query.leftJoin(
                        "sd_iot_type",
                        "t",
                        "t.type_id = s.setting_type_id"
                    ); 
      query.where('1=1');
      if (keyword) {
        query.andWhere('s.setting_name like :setting_name', {
          setting_name: keyword ? `%${keyword}%` : '%',
        });
      }
      if (setting_id) {
        query.andWhere('s.setting_id=:setting_id', { setting_id: setting_id });
      }
      if (location_id) {
        query.andWhere('s.location_id=:location_id', { location_id: location_id });
      }
      if (status) {
        query.andWhere('l.status=:status', { status: status });
      }
      if (setting_type_id) {
        query.andWhere('s.setting_type_id=:setting_type_id', { setting_type_id: setting_type_id });
      }
      if (sn) {
        query.andWhere('s.sn=:sn', { sn: sn });
      }
      if (createddate) {
        query.andWhere('s.createddate=:createddate', { createddate: createddate });
      } 
      if (status) {
        query.andWhere('s.status=:status', { status: status });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCounts.count = countRs;
        // return tempCounts.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCounts.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `s.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`s.createddate`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Location**********/
  async maxid_Location(): Promise<Location> { 
        try {
          const RS:any = await this.SettingRepository.query('SELECT MAX(location_id) AS location_id FROM sd_iot_location');
          console.log('location_id');console.info(RS);
          var location_id:any=RS['0'].location_id;
          console.log('maxlocation_id=');console.info(location_id);
          var location_ids:any=location_id+1;
          console.log('maxlocation_id=');console.info(location_ids);
          return location_ids;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_location(dto: any): Promise<Location> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.LocationRepository.save(
          this.LocationRepository.create(dto),
        );
        return result;
  }
  async delete_location(location_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting sd_iot_location with location_id: ${location_id}`);
            const const_location = await this.get_location(location_id);
            if (!const_location) {
                throw new NotFoundException(`sd_iot_location with location_id ${location_id} not found`);
            }

            await this.LocationRepository.delete(location_id);
            } catch (error) {
            this.logger.error(`Error while deleting sd_iot_location = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_location(location_id: any): Promise<Location> {
        try {
        const rs:any = await this.LocationRepository.findOne({
            where: {
            location_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_location_ip(ipaddress: any): Promise<Location> {
        try {
            const rs:any = await this.LocationRepository.findOne({
                where: {
                ipaddress,
                },
            });
            console.log('====ipaddress====');
            console.log('rs=>');console.info(rs);
            return rs;
        } catch{
           return null;
        }
  }
  async update_location(dto) {
        // const location_idx:any = JSON.parse(dto.location_id);
        let location_id = dto.location_id;
        const DataUpdate: any = {};
        const query: any = await this.LocationRepository.createQueryBuilder('l');
        query.select(['l.location_id AS location_id']);
        query.where('1=1');
        query.andWhere('l.location_id=:location_id', { location_id: location_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        //var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with location_id ${location_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found sd_iot_locationlocation_id ${location_id}.`,
                message_th: `ไม่พบข้อมูล sd_iot_locationlocation_id ${location_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('location_idx =>'+location_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        } 
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.LocationRepository
            .createQueryBuilder()
            .update('sd_iot_location')
            .set(DataUpdate)
            .where('location_id=:location_id', { location_id: location_id })
            .execute();
        return 200;
  }
  /********location_list**********/
  async location_all(): Promise<Location> {
    console.log(`location_all=`); 
    try { 
      const query: any = await this.LocationRepository.createQueryBuilder('l'); 
      query.select(['l.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async location_list_paginate(dto: any): Promise<Location> {
    console.log(`location_list_paginate dto=`);
    console.info(dto);
    try {
      var location_id: any = dto.location_id; 
      var ipaddress: any = dto.ipaddress;
      var location_detail: any = dto.location_detail;
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.LocationRepository.createQueryBuilder('l');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT l.location_id)', 'cnt');
      } else {
        query.select([ 
            'l.location_id AS location_id',
            'l.location_name AS location_name',
            'l.ipaddress AS ipaddress',
            'l.configdata AS configdata',
            'l.location_detail AS location_detail',
            'l.createddate AS createddate',
            'l.updateddate AS updateddate',
            'l.status AS status',             
        ]);
      } 
      query.where('1=1');
      if (keyword) {
        query.andWhere('l.location_name like :location_name', {
          location_name: keyword ? `%${keyword}%` : '%',
        });
      }
      if (location_id) {
        query.andWhere('l.location_id=:location_id', { location_id: location_id });
      }
      if (ipaddress) {
        query.andWhere('l.ipaddress=:ipaddress', { ipaddress: ipaddress });
      }
      if (createddate) {
        query.andWhere('l.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('l.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('l.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCounts.count = countRs;
        // return tempCounts.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCounts.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `l.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`l.location_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********type**********/
  async maxid_Type(): Promise<Type> { 
        try {
          const RS:any = await this.TypeRepository.query('SELECT MAX(type_id) AS type_id FROM sd_iot_type');
          console.log('type_id');console.info(RS);
          var type_id:any=RS['0'].type_id;
          console.log('max_type_id=');console.info(type_id);
          var max_type_id:any=max_type_id+1;
          console.log('max_type_id=');console.info(max_type_id);
          return max_type_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_type(dto: any): Promise<Type> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.TypeRepository.save(
          this.TypeRepository.create(dto),
        );
        return result;
  }
  async delete_type(type_id: any): Promise<void> {
            try {
             this.logger.log(`Deleting sd_iot_type with type_id: ${type_id}`);
            const consttype = await this.get_type(type_id);
            if (!consttype) {
                throw new NotFoundException(`type_id with type_id ${type_id} not found`);
            }

            await this.TypeRepository.delete(type_id);
            } catch (error) {
            this.logger.error(`Error while deleting type_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_type(type_id: number): Promise<Type> {
        try {
        const rs:any = await this.TypeRepository.findOne({
            where: {
            type_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_type_name(type_name: any): Promise<Type> {
        try {
        const rs:any = await this.TypeRepository.findOne({
            where: {
            type_name,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async update_type(dto) {
        // const type_idx:any = JSON.parse(dto.type_id);
        let type_id = dto.type_id;
        const DataUpdate: any = {};
        const query: any = await this.TypeRepository.createQueryBuilder('t');
        query.select(['t.type_id AS type_id']);
        query.where('1=1');
        query.andWhere('t.type_id=:type_id', { type_id: type_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with type_id ${type_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found type_idtype_id ${type_id}.`,
                message_th: `ไม่พบข้อมูล type_idtype_id ${type_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('type_idx =>'+type_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
        if (dto.type_name) {
            DataUpdate.type_name = dto.type_name;
        }
        if (dto.group_id) {
            DataUpdate.group_id = dto.group_id;
        } 
        if (dto.status) {
            DataUpdate.status = dto.status;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();    
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.TypeRepository
            .createQueryBuilder()
            .update('sd_iot_type')
            .set(DataUpdate)
            .where('type_id=:type_id', { type_id: type_id })
            .execute();
        return 200;
  }
  /********type_list**********/ 
  async type_all(): Promise<Type> {
    console.log(`=type_all=`); 
    try { 
      const query: any = await this.TypeRepository.createQueryBuilder('t'); 
      query.select(['t.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async type_list_paginate(dto: any): Promise<Type> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var type_id: any = dto.type_id; 
      var group_id: any = dto.group_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.TypeRepository.createQueryBuilder('t');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT t.type_id )', 'cnt');
      } else {
        query.select([ 
            't.type_id AS type_id',
            't.group_id AS group_id',
            't.type_name AS type_name', 
            't.createddate AS createddate',
            't.updateddate AS updateddate',
            't.status AS status',             
        ]);
      } 
      query.where('1=1');
      if (keyword) {
        query.andWhere('t.type_name like :type_name', {
          type_name: keyword ? `%${keyword}%` : '%',
        });
      }
      if (type_id) {
        query.andWhere('t.type_id=:type_id', { type_id: type_id });
      }
      if (group_id) {
        query.andWhere('t.group_id=:group_id', { group_id: group_id });
      }
      if (createddate) {
        query.andWhere('t.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('t.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('t.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `t.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`t.type_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********devicetype**********/
  async create_device_type(dto: any): Promise<DeviceType> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.DeviceTypeRepository.save(
          this.DeviceTypeRepository.create(dto),
        );
        return result;
  }
  async delete_device_type(type_id: any): Promise<void> {
            try {
             this.logger.log(`Deleting sd_iot_device_type with type_id: ${type_id}`);
            const constdevicetype = await this.get_device_type(type_id);
            if (!constdevicetype) {
                throw new NotFoundException(`type_id with type_id ${type_id} not found`);
            }

            await this.DeviceTypeRepository.delete(type_id);
            } catch (error) {
            this.logger.error(`Error while deleting type_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_device_type(type_id: number): Promise<DeviceType> {
        try {
        const rs:any = await this.DeviceTypeRepository.findOne({
            where: {
            type_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_device_type_name(type_name: any): Promise<DeviceType> {
        try {
        const rs:any = await this.DeviceTypeRepository.findOne({
            where: {
            type_name,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async update_device_type(dto) {
        // const type_idx:any = JSON.parse(dto.type_id);
        let type_id = dto.type_id;
        const DataUpdate: any = {};
        const query: any = await this.DeviceTypeRepository.createQueryBuilder('dt');
        query.select(['dt.type_id AS type_id']);
        query.where('1=1');
        query.andWhere('dt.type_id=:type_id', { type_id: type_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with type_id ${type_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found type_idtype_id ${type_id}.`,
                message_th: `ไม่พบข้อมูล type_idtype_id ${type_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('type_idx =>'+type_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
        if (dto.type_name) {
            DataUpdate.type_name = dto.type_name;
        }
        if (dto.status) {
            DataUpdate.status = dto.status;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();    
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.DeviceTypeRepository
            .createQueryBuilder()
            .update('sd_iot_device_type')
            .set(DataUpdate)
            .where('type_id=:type_id', { type_id: type_id })
            .execute();
        return 200;
  }
  /********devicetype_list**********/ 
  async maxid_DeviceType(): Promise<DeviceType> { 
        try {
          const RS:any = await this.TypeRepository.query('SELECT MAX(type_id) AS type_id FROM sd_iot_device_type');
          console.log('type_id');console.info(RS);
          var type_id:any=RS['0'].type_id;
          console.log('max_type_id=');console.info(type_id);
          var max_type_id:any=max_type_id+1;
          console.log('max_type_id=');console.info(max_type_id);
          return max_type_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async devicetype_all(): Promise<DeviceType> {
    console.log(`=devicetype_all=`); 
    try { 
      const query: any = await this.DeviceTypeRepository.createQueryBuilder('dt'); 
      query.select(['dt.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async devicetype_all_oi(): Promise<DeviceType> {
    console.log(`=devicetype_all=`); 
    try { 
      const query: any = await this.DeviceTypeRepository.createQueryBuilder('t'); 
      query.select(['t.*',]); 
       query.where('1=1');
       query.andWhere('t.type_id > 1 ');
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async devicetype_list_paginate(dto: any): Promise<Type> {
    console.log(`devicetype_list_paginate dto=`);
    console.info(dto);
    try { 
      var type_id: any = dto.type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.TypeRepository.createQueryBuilder('dt');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT t.type_id )', 'cnt');
      } else {
        query.select([ 
            't.type_id AS type_id',
            't.type_name AS type_name', 
            't.createddate AS createddate',
            't.updateddate AS updateddate',
            't.status AS status',             
        ]);
      } 
      query.where('1=1');
      if (keyword) {
        query.andWhere('t.type_name like :type_name', {
          type_name: keyword ? `%${keyword}%` : '%',
        });
      }
      if (type_id) {
        query.andWhere('t.type_id=:type_id', { type_id: type_id });
      }
      if (createddate) {
        query.andWhere('t.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('t.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('t.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `t.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`t.type_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********devicetype**********/
  /********Sensor**********/
  /********devicetype_list**********/ 
  async maxid_Sensor(): Promise<Sensor> { 
        try {
          const RS:any = await this.SensorRepository.query('SELECT MAX(sensor_id) AS sensor_id FROM sd_iot_sensor');
          console.log('sensor_id');console.info(RS);
          var sensor_id:any=RS['0'].sensor_id;
          console.log('max_sensor_id=');console.info(sensor_id);
          var max_sensor_id:any=max_sensor_id+1;
          console.log('max_sensor_id=');console.info(max_sensor_id);
          return max_sensor_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_sensor(dto: any): Promise<Sensor> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.SensorRepository.save(
          this.SensorRepository.create(dto),
        );
        return result;
  }
  async delete_sensor(sensor_id: any): Promise<void> {
            try { 
            this.logger.log(`Deleting sensor with sensor_id: ${sensor_id}`);
            const constsensor = await this.get_sensor(sensor_id);
            if (!constsensor) {
                throw new NotFoundException(`sensor_id with sensor_id ${sensor_id} not found`);
            }
            await this.SensorRepository.delete(sensor_id);
            } catch (error) {
            this.logger.error(`Error while deleting sensor_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_sensor(sensor_id: any): Promise<Sensor> {
        try {
        const rs:any = await this.SensorRepository.findOne({
            where: {
            sensor_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_sensor_chk(sensor_name: any): Promise<Sensor> {
        try {
        const rs:any = await this.SensorRepository.findOne({
            where: {
            sensor_name,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async update_sensor(dto) {
        // const sensor_idx:any = JSON.parse(dto.sensor_id);
        let sensor_id = dto.sensor_id;
        const DataUpdate: any = {};
        const query: any = await this.SensorRepository.createQueryBuilder('s');
        query.select(['s.sensor_id AS sensor_id']);
        query.where('1=1');
        query.andWhere('s.sensor_id=:sensor_id', { sensor_id: sensor_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with sensor_id ${sensor_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found sensor_idsensor_id ${sensor_id}.`,
                message_th: `ไม่พบข้อมูล sensor_idsensor_id ${sensor_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('sensor_idx =>'+sensor_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        } 
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.SensorRepository
            .createQueryBuilder()
            .update('sd_iot_sensor')
            .set(DataUpdate)
            .where('sensor_id=:sensor_id', { sensor_id: sensor_id })
            .execute();
        return 200;
  }
  /********Sensor_list**********/
  async sensor_all(): Promise<Sensor> {
    console.log(`=sensor_all=`); 
    try { 
      const query: any = await this.SensorRepository.createQueryBuilder('s'); 
      query.select(['s.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async sensor_list_paginate(dto: any): Promise<Sensor> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var type_id: any = dto.type_id; 
      var location_id: any = dto.location_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var sn: any = dto.sn;
      var max: any = dto.max;
      var min: any = dto.min;
      var hardware_id: any = dto.hardware_id;
      var status_high: any = dto.status_high;
      var status_warning: any = dto.status_warning;
      var status_alert: any = dto.status_alert;
      var model: any = dto.model;
      var vendor: any = dto.vendor;
      var comparevalue: any = dto.comparevalue;
      var mqtt_id: any = dto.mqtt_id;
      var oid: any = dto.oid;
      var action_id: any = dto.action_id;
      var mqtt_data_value: any = dto.mqtt_data_value;
      var mqtt_data_control: any = dto.mqtt_data_control;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.SensorRepository.createQueryBuilder('s');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT s.sensor_id)', 'cnt');
      } else { 
        query.select([ 
              's.sensor_id AS sensor_id',
              's.setting_id AS setting_id',
              's.setting_type_id AS setting_type_id',
              's.sensor_name AS sensor_name',
              's.sn AS sn',
              's.max AS max',
              's.min AS min',
              's.hardware_id AS hardware_id',
              's.status_high AS status_high',
              's.status_warning AS status_warning',
              's.status_alert AS status_alert',
              's.model AS model',
              's.vendor AS vendor',
              's.comparevalue AS comparevalue',
              's.createddate AS createddate',
              's.updateddate AS updateddate',
              's.status AS status',
              's.unit AS unit',
              's.mqtt_id AS mqtt_id',
              's.oid AS oid',
              's.action_id AS action_id',
              's.status_alert_id AS status_alert_id',
              's.mqtt_data_value AS mqtt_data_value',
              's.mqtt_data_control AS mqtt_data_control',  
              't.type_name AS type_name',    
              'st.setting_name AS setting_name',    
              'l.location_name AS location_name',              
        ]);
      } 
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= s.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_type",
                        "t",
                        "t.type_id = s.setting_type_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= st.location_id"
                    ); 
      query.where('1=1');
      if (keyword) {
        query.andWhere('s.sensor_name like :sensor_name', {
          sensor_name: keyword ? `%${keyword}%` : '%',
        });
      }
      if (type_id) {
        query.andWhere('s.type_id=:type_id', { type_id: type_id });
      }
      if (location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: location_id });
      }
      /****/
      if (sn) {
        query.andWhere('s.sn=:sn', { sn: sn });
      }if (max) {
        query.andWhere('s.max=:max', { max: max });
      }if (min) {
        query.andWhere('s.min=:min', { min: min });
      }if (hardware_id) {
        query.andWhere('s.hardware_id=:hardware_id', { hardware_id: hardware_id });
      }if (status_high) {
        query.andWhere('s.status_high=:status_high', { status_high: status_high });
      }if (status_warning) {
        query.andWhere('s.status_warning=:status_warning', { status_warning: status_warning });
      }if (status_alert) {
        query.andWhere('s.status_alert=:status_alert', { status_alert: status_alert });
      }if (model) {
        query.andWhere('s.model=:model', { model: model });
      }if (vendor) {
        query.andWhere('s.vendor=:vendor', { vendor: vendor });
      }if (comparevalue) {
        query.andWhere('s.comparevalue:comparevalue', { comparevalue: comparevalue });
      }if (mqtt_id) {
        query.andWhere('s.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (oid) {
        query.andWhere('s.oid=:oid', { oid: oid });
      }if (action_id) {
        query.andWhere('s.action_id=:action_id', { action_id: action_id });
      }if (mqtt_data_value) {
        query.andWhere('s.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: mqtt_data_value });
      }if (mqtt_data_control) {
        query.andWhere('s.mqtt_data_control=::mqtt_data_control', { mqtt_data_control: mqtt_data_control });
      } 
      if (createddate) {
        query.andWhere('s.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('s.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('s.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCounts.count = countRs;
        // return tempCounts.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCounts.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `s.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`s.sensor_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********group**********/ 
  async maxid_Group(): Promise<Group> { 
        try {
          const RS:any = await this.GroupRepository.query('SELECT MAX(group_id) AS group_id FROM sd_iot_group');
          console.log('group_id');console.info(RS);
          var group_id:any=RS['0'].group_id;
          console.log('max_group_id=');console.info(group_id);
          var max_group_id:any=max_group_id+1;
          console.log('max_group_id=');console.info(max_group_id);
          return max_group_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_group(dto: any): Promise<Group> {
        // console.log('create userlog');console.info(dto);   
        const result: any = await this.GroupRepository.save(
          this.GroupRepository.create(dto),
        );
        return result;
  }
  async delete_group(group_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting group with group_id: ${group_id}`);
            const constGroup = await this.get_group(group_id);
            if (!constGroup) {
                throw new NotFoundException(`group_id with group_id ${group_id} not found`);
            }

            await this.GroupRepository.delete(group_id);
            } catch (error) {
            this.logger.error(`Error while deleting group_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_group(group_id: any): Promise<Group> {
        try {
        const rs:any = await this.GroupRepository.findOne({
            where: {
            group_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async get_name_group(group_name: any): Promise<Group> {
        try {
        const rs:any = await this.GroupRepository.findOne({
            where: {
            group_name,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async update_group(dto) {
        // const group_idx:any = JSON.parse(dto.group_id);
        let group_id = dto.group_id;
        const DataUpdate: any = {};
        const query: any = await this.GroupRepository.createQueryBuilder('g');
        query.select(['g.group_id AS group_id']);
        query.where('1=1');
        query.andWhere('g.group_id=:group_id', { group_id: group_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with group_id ${group_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found group_idgroup_id ${group_id}.`,
                message_th: `ไม่พบข้อมูล group_idgroup_id ${group_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('group_idx =>'+group_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        } 
        if (dto.group_id) {
            DataUpdate.group_id = dto.group_id;
        } 
        
        if (dto.group_name) {
            DataUpdate.group_name = dto.group_name;
        }   

        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 

        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.GroupRepository
            .createQueryBuilder()
            .update('sd_iot_group')
            .set(DataUpdate)
            .where('group_id=:group_id', { group_id: group_id })
            .execute();
        return 200;
  }
  /********group_list**********/
  async group_all(): Promise<Group> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.GroupRepository.createQueryBuilder('g'); 
      query.select(['g.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async group_list_paginate(dto: any): Promise<Group> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var group_id: any = dto.group_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.GroupRepository.createQueryBuilder('g');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT g.group_id)', 'cnt');
      } else { 
        query.select([  
            'g.group_id AS group_id',
            'g.group_name AS group_name', 
            'g.createddate AS createddate',
            'g.updateddate AS updateddate',
            'g.status AS status',             
        ]);
      } 
      query.where('1=1');
      if (keyword) {
        query.andWhere('g.group_name like :group_name', {
          group_name: keyword ? `%${keyword}%` : '%',
        });
      } 
      if (group_id) {
        query.andWhere('g.group_id=:group_id', { group_id: group_id });
      }
      if (createddate) {
        query.andWhere('g.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('g.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('g.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `g.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`g.group_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********mqtt**********/
  async maxid_Mqtt(): Promise<Mqtt> { 
        try {
          const RS:any = await this.GroupRepository.query('SELECT MAX(mqtt_id) AS mqtt_id FROM sd_iot_mqtt');
          console.log('mqtt_id');console.info(RS);
          var mqtt_id:any=RS['0'].mqtt_id;
          console.log('max_mqtt_id=');console.info(mqtt_id);
          var max_mqtt_id:any=max_mqtt_id+1;
          console.log('max_mqtt_id=');console.info(max_mqtt_id);
          return max_mqtt_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  } 
  async create_mqtt(dto: any): Promise<Mqtt> {
      console.log('create_mqtt=>'); console.info(dto);
      // ลบ mqtt_id ออกถ้ามี เพื่อให้ auto-generated id ทำงาน
      if ('mqtt_id' in dto) {delete dto.mqtt_id;}
      const result: any = await this.MqttRepository.save(this.MqttRepository.create(dto),);
    return result;
  }
  async delete_mqtt(mqtt_id: any): Promise<void> {
        try {
            this.logger.log(`Deleting mqtt with mqtt_id: ${mqtt_id}`);
            const constmqtt = await this.get_mqtt(mqtt_id);
            if (!constmqtt) {
                throw new NotFoundException(`mqtt_id with mqtt_id ${mqtt_id} not found`);
            }
            const updateResult = await this.MqttRepository.update(
                  { mqtt_id: mqtt_id }, // Criteria: หาจาก bucket
                  { status: 0 }  // Values to update
                );
            //await this.MqttRepository.delete(mqtt_id);
        } catch (error) {
            this.logger.error(`Error while deleting mqtt_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
        }
  }
  async get_mqtt(mqtt_id: any): Promise<Mqtt> {
        try {
        const rs:any = await this.MqttRepository.findOne({
            where: {
            mqtt_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_maxId_mqtt(): Promise<Mqtt> { 
        try {
          const RS:any = await this.MqttRepository.query('SELECT MAX(mqtt_id) AS mqtt_id FROM sd_iot_mqtt');
          console.log('get_maxId_mqttRS=');console.info(RS);
          var maxId:any=RS['0'].mqtt_id;
          console.log('maxId=');console.info(maxId);
          var mqtt_ids:any=maxId+1;
          console.log('mqtt_ids=');console.info(mqtt_ids);
          return mqtt_ids;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async get_name_create_mqtt(mqtt_name: any): Promise<Mqtt> {
        try {
          console.log('mqtt_name=>');console.info(mqtt_name);
          const rs:any = await this.MqttRepository.findOne({
              where: {
              mqtt_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_mqtt_status_2(mqtt_id: number, status: number): Promise<Mqtt> {
    // console.log('mqtt_id =>', mqtt_id); 
    // console.log('status =>', status); 
     try { 
          var rs:any= this.MqttRepository.update({ mqtt_id: mqtt_id }, { status });
          console.log('update_mqtt_status rs=>');console.info(rs);
          return rs;
      } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
      }
  }
  async update_mqtt_status(mqtt_id: number, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${mqtt_id}' to status ${status}`);
    try {
      const updateResult = await this.MqttRepository.update(
        { mqtt_id: mqtt_id }, // Criteria: หาจาก bucket
        { status: status }  // Values to update
      );

      // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for mqtt_id '${mqtt_id}'. Update failed.`);
        throw new NotFoundException(`No devices found with bucket '${mqtt_id}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for mqtt_id '${mqtt_id}'.`);
      
      // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;

    } catch (err) {
      // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
      if (err instanceof NotFoundException) {
        throw err;
      }

      // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
      this.logger.error(`Failed to update device status for mqtt_id '${mqtt_id}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async update_mqtt(dto) {
        // const mqtt_idx:any = JSON.parse(dto.mqtt_id);
        var mqtt_id = dto.mqtt_id;
        var status = dto.status;
        const DataUpdate: any = {};
        const query: any = await this.MqttRepository.createQueryBuilder('mq');
        query.select(['mq.mqtt_id AS mqtt_id']);
        query.where('1=1');
        query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        console.log('dto=>'); console.info(dto);
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with mqtt_id ${mqtt_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found mqtt_idmqtt_id ${mqtt_id}.`,
                message_th: `ไม่พบข้อมูล mqtt_idmqtt_id ${mqtt_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('mqtt_idx =>'+mqtt_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
        if (dto.mqtt_type_id) {
            DataUpdate.mqtt_type_id = dto.mqtt_type_id;
        }
        if (dto.location_id) {
            DataUpdate.location_id = dto.location_id;
        }
        if (dto.mqtt_name) {
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
        }if (status) {
            DataUpdate.status = status;
        }if (dto.latitude) {
            DataUpdate.latitude = dto.latitude;
        }if (dto.longitude) {
            DataUpdate.longitude = dto.longitude;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate=>'); console.info(DataUpdate);
        console.log('mqtt_id=>'+mqtt_id);
        // await this.MqttRepository
        //     .createQueryBuilder()
        //     .update('sd_iot_mqtt')
        //     .set(DataUpdate)
        //     .where('mqtt_id=:mqtt_id', { mqtt_id: mqtt_id })
        //     .execute();
 
        var updateResult: any =     await this.MqttRepository
            .createQueryBuilder()
            .update('sd_iot_mqtt')
            .set(DataUpdate)
            .where('mqtt_id=:mqtt_id', { mqtt_id: mqtt_id })
            .execute();
        if (updateResult.affected == 0) {
              // ถ้า affected เป็น 0 หมายความว่าไม่พบ mqtt_id ที่ตรงกันในฐานข้อมูล
              throw new NotFoundException(`Data with mqtt_id ${mqtt_id} not found.`);
        }     
        return 200; 
  }
  async mqtt_all(): Promise<Mqtt> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.MqttRepository.createQueryBuilder('mq'); 
      query.select(['mq.*',]); 
      query.orderBy('mq.sort', 'ASC');  // Default sorting
      query.addOrderBy(`mq.mqtt_id`, 'ASC');
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async mqtt_list_paginate(dto: any): Promise<Mqtt> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var mqtt_id: any = dto.mqtt_id; 
      var mqtt_type_id: any = dto.mqtt_type_id; 
      var location_id: any = dto.location_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.MqttRepository.createQueryBuilder('mq');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT mq.mqtt_id)', 'cnt');
      } else { 
         
        query.select([  
            'mq.mqtt_id AS mqtt_id',
            'l.location_id AS location_id',
            'mq.sort AS sort',
            'mq.mqtt_type_id AS mqtt_type_id',
            'mq.mqtt_name AS mqtt_name',  
            'mq.host AS host', 
            'mq.port AS port', 
            'mq.username AS username',  
            'mq.password AS password',
            'mq.secret AS secret',
            'mq.expire_in AS expire_in',
            'mq.token_value AS token_value',
            'mq.org AS org',
            'mq.bucket AS bucket',
            'mq.envavorment AS envavorment',
            'mq.updateddate AS updateddate',
            'mq.status AS status',  
            'mq.latitude AS latitude',  
            'mq.longitude AS longitude',  
            't.type_name AS type_name',     
            'l.location_name AS location_name',        
            'l.ipaddress AS ipaddress',    
            'l.location_detail AS location_detail',    
        ]);
      }  
      query.leftJoin(
                        "sd_iot_type",
                        "t",
                        "t.type_id = mq.mqtt_type_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id = mq.location_id"
                    ); 
      query.where('1=1');
      if (keyword) {
        query.andWhere('mq.mqtt_name like :mqtt_name', {
          mqtt_name: keyword ? `%${keyword}%` : '%',
        });
      }  
      if (mqtt_id) {
        query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }
      if (location_id) {
        query.andWhere('mq.location_id=:location_id', { location_id: location_id });
      } 
      if (mqtt_type_id) {
        query.andWhere('mq.mqtt_type_id=:mqtt_type_id', { mqtt_type_id: mqtt_type_id });
      }
      if (createddate) {
        query.andWhere('mq.createddate=:createddate', { createddate: createddate });
      }if (dto.secret) {
              query.andWhere('mq.secret=:secret', { secret: dto.secret });
      }if (dto.expire_in) {
              query.andWhere('mq.expire_in=:expire_in', { expire_in: dto.expire_in });
      }if (dto.token_value) {
              query.andWhere('mq.token_value=:token_value', { token_value: dto.token_value });
      }if (dto.org) {
              query.andWhere('mq.org=:org', { org: dto.org });
      }if (dto.bucket) {
              query.andWhere('mq.bucket=:bucket', { bucket: dto.bucket });
      }if (dto.envavorment) {
              query.andWhere('mq.envavorment=:envavorment', { envavorment: dto.envavorment });
      }if (updateddate) {
        query.andWhere('mq.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('mq.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `mq.${sortField}`,
            sortOrders.toUpperCase(),
          );
          // query.orderBy(
          //   `mq.mqtt_id`,
          //   sortOrder.toUpperCase() == 'ASC' ? 'DESC' : 'ASC',
          // );
        } else {
          // Default sorting
         // query.orderBy(`mq.mqtt_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy(`mq.mqtt_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async mqtt_list_paginate_active(dto: any): Promise<Mqtt> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var mqtt_id: any = dto.mqtt_id; 
      var mqtt_type_id: any = dto.mqtt_type_id; 
      var location_id: any = dto.location_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.MqttRepository.createQueryBuilder('mq');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT mq.mqtt_id)', 'cnt');
      } else { 
         
        query.select([  
            'mq.mqtt_id AS mqtt_id',
            'mq.mqtt_type_id AS mqtt_type_id',
            'mq.mqtt_name AS mqtt_name',  
            'mq.host AS host', 
            'mq.port AS port', 
            'mq.username AS username',  
            'mq.password AS password',
            'mq.secret AS secret',
            'mq.expire_in AS expire_in',
            'mq.token_value AS token_value',
            'mq.org AS org',
            'mq.bucket AS bucket',
            'mq.latitude AS latitude',
            'mq.longitude AS longitude',
            'mq.envavorment AS envavorment',
            'mq.updateddate AS updateddate',
            'mq.status AS status',  
            't.type_name AS type_name',          
        ]);
      } 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = mq.mqtt_type_id"
                    ); 
      query.where('1=1');
      if (keyword) {
        query.andWhere('mq.mqtt_name like :mqtt_name', {
          mqtt_name: keyword ? `%${keyword}%` : '%',
        });
      } 
      if (mqtt_id) {
        query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }
      if (location_id) {
        query.andWhere('mq.location_id=:location_id', { location_id: location_id });
      } 
      if (mqtt_type_id) {
        query.andWhere('mq.mqtt_type_id=:mqtt_type_id', { mqtt_type_id: mqtt_type_id });
      }
      if (createddate) {
        query.andWhere('mq.createddate=:createddate', { createddate: createddate });
      }if (dto.secret) {
              query.andWhere('mq.secret=:secret', { secret: dto.secret });
      }if (dto.expire_in) {
              query.andWhere('mq.expire_in=:expire_in', { expire_in: dto.expire_in });
      }if (dto.token_value) {
              query.andWhere('mq.token_value=:token_value', { token_value: dto.token_value });
      }if (dto.org) {
              query.andWhere('mq.org=:org', { org: dto.org });
      }if (dto.bucket) {
              query.andWhere('mq.bucket=:bucket', { bucket: dto.bucket });
      }if (dto.envavorment) {
              query.andWhere('mq.envavorment=:envavorment', { envavorment: dto.envavorment });
      }if (updateddate) {
        query.andWhere('mq.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('mq.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `mq.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`mq.mqtt_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async update_mqttt_sort(dto) {
        // const mqtt_idx:any = JSON.parse(dto.mqtt_id);
        var mqtt_id = dto.mqtt_id;
        var sort = dto.sort;
        const DataUpdate: any = {};
        const query: any = await this.MqttRepository.createQueryBuilder('mq');
        query.select(['mq.mqtt_id AS mqtt_id']);
        query.where('1=1');
        query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        console.log('dto=>'); console.info(dto);
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with mqtt_id ${mqtt_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found mqtt_idmqtt_id ${mqtt_id}.`,
                message_th: `ไม่พบข้อมูล mqtt_idmqtt_id ${mqtt_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('mqtt_idx =>'+mqtt_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
        DataUpdate.sort = sort;
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate=>'); console.info(DataUpdate);
        console.log('mqtt_id=>'+mqtt_id);
        var updateResult: any =     await this.MqttRepository
            .createQueryBuilder()
            .update('sd_iot_mqtt')
            .set(DataUpdate)
            .where('mqtt_id=:mqtt_id', { mqtt_id: mqtt_id })
            .execute();
        if (updateResult.affected == 0) {
              // ถ้า affected เป็น 0 หมายความว่าไม่พบ mqtt_id ที่ตรงกันในฐานข้อมูล
              throw new NotFoundException(`Data with mqtt_id ${mqtt_id} not found.`);
        }     
        return 200; 
  }
  async mqtt_last_sort(): Promise<Mqtt> {
    try { 
        const query: any = await this.MqttRepository.createQueryBuilder('mqtt');
            query.select(['mqtt.sort AS sort']); 
            query.where('1=1');
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            query.orderBy(`mqtt.sort`, 'DESC');
            var data:any= await query.getRawMany(); 
            console.log(`data=>`);console.info(data);
            var sort:any= data['0'].sort;
            console.log(`sort=>`+sort);
        return  sort;
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Api**********/
  async maxid_Api(): Promise<Api> { 
        try {
          const RS:any = await this.ApiRepository.query('SELECT MAX(api_id) AS api_id FROM sd_iot_api');
          console.log('api_id');console.info(RS);
          var api_id:any=RS['0'].api_id;
          console.log('max_api_id=');console.info(api_id);
          var max_api_id:any=max_api_id+1;
          console.log('max_api_id=');console.info(max_api_id);
          return max_api_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_api(dto: any): Promise<Api> {
        console.log('create_api=>');console.info(dto);   
        const result: any = await this.ApiRepository.save(
          this.ApiRepository.create(dto),
        );
        return result;
  }
  async delete_api(api_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting mqtt with api_id: ${api_id}`);
            const constmqtt = await this.get_api(api_id);
            if (!constmqtt) {
                throw new NotFoundException(`api_id with api_id ${api_id} not found`);
            }

            await this.ApiRepository.delete(api_id);
            } catch (error) {
            this.logger.error(`Error while deleting api_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_api(api_id: any): Promise<Api> {
        try {
        const rs:any = await this.ApiRepository.findOne({
            where: {
            api_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_api(api_name: any): Promise<Api> {
        try {
          console.log('api_name=>');console.info(api_name);
          const rs:any = await this.ApiRepository.findOne({
              where: {
              api_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_api(dto) {
        // const api_idx:any = JSON.parse(dto.api_id);
        let api_id = dto.api_id;
        const DataUpdate: any = {};
        const query: any = await this.ApiRepository.createQueryBuilder('api');
        query.select(['api.api_id AS api_id']);
        query.where('1=1');
        query.andWhere('api.api_id=:api_id', { api_id: api_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with api_id ${api_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found api_idapi_id ${api_id}.`,
                message_th: `ไม่พบข้อมูล api_idapi_id ${api_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('api_idx =>'+api_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.ApiRepository
            .createQueryBuilder()
            .update('sd_iot_api')
            .set(DataUpdate)
            .where('api_id=:api_id', { api_id: api_id })
            .execute();
        return 200;
  } 
  async api_all(): Promise<Api> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.ApiRepository.createQueryBuilder('api'); 
      query.select(['api.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async api_list_paginate(dto: any): Promise<Api> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var api_id: any = dto.api_id; 
      var api_name: any = dto.api_name; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.ApiRepository.createQueryBuilder('api');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT api.api_id)', 'cnt');
      } else {  
        query.select([  
            'api.api_id AS api_id',
            'api.api_name AS api_name',   
            'api.host AS host', 
            'api.port AS port', 
            'api.token_value AS token_value',  
            'api.password AS password',
            'api.updateddate AS updateddate',
            'api.status AS status',  
            't.type_name AS type_name',          
        ]);
      }  
      query.where('1=1');
      if (keyword) {
        query.andWhere('api.api_name like :api_name', {
          api_name: keyword ? `%${keyword}%` : '%',
        });
      } 
      if (api_id) {
        query.andWhere('api.api_id=:api_id', { api_id: api_id });
      } 
      if (createddate) {
        query.andWhere('api.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('api.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('api.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `api.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`api.api_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Device**********/ 
  async maxid_Device(): Promise<Device> { 
        try {
          const RS:any = await this.DeviceRepository.query('SELECT MAX(device_id) AS device_id FROM sd_iot_device');
          console.log('device_id');console.info(RS);
          var device_id:any=RS['0'].device_id;
          console.log('max_device_id=');console.info(device_id);
          var max_device_id:any=max_device_id+1;
          console.log('max_device_id=');console.info(max_device_id);
          return max_device_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_device(dto: any): Promise<Device> {
    try {
      // ตรวจสอบ sn ซ้ำ
      console.log('dto==> ');  console.info(dto);
      const exists = await this.DeviceRepository.findOne({ where: { sn: dto.sn } });
       console.log('exists==> ');  console.info(exists);
      if (exists!=null) {
        throw new ConflictException(`Device with sn ${dto.sn} already exists`);
      }
      const result:any = await this.DeviceRepository.save(this.DeviceRepository.create(dto));
      return result;
    } catch (err) {
      if (err.code == '23505') { // unique constraint violation
        throw new ConflictException('Device with this sn already exists');
      }
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: { errorMessage: err.message },
      });
    }
  }
  async delete_device(device_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting mqtt with device_id: ${device_id}`);
            const constmqtt = await this.get_device(device_id);
            if (!constmqtt) {
                throw new NotFoundException(`device_id with device_id ${device_id} not found`);
            }
            const updateResult = await this.DeviceRepository.update(
                  { device_id: device_id }, // Criteria: หาจาก bucket
                  { status: 0 }  // Values to update
                );
            // await this.DeviceRepository.delete(device_id);
            } catch (error) {
            this.logger.error(`Error while deleting device_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_device(device_id: any): Promise<Device>{
        try {
        const rs:any = await this.DeviceRepository.findOne({
            where: {
            device_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  } 
  async get_name_create_device(device_name: any): Promise<Device> {
        try {
          console.log('device_name=>');console.info(device_name);
          const rs:any = await this.DeviceRepository.findOne({
              where: {
              device_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async get_name_create_sn(sn: any): Promise<Device> {
        try {
          console.log('sn=>');console.info(sn);
          const rs:any = await this.DeviceRepository.findOne({
              where: {
              sn,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_device(dto) {
        // const device_idx:any = JSON.parse(dto.device_id);
        let device_id = dto.device_id;
        const DataUpdate: any = {};
        const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select(['d.device_id AS device_id']);
        query.where('1=1');
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with device_id ${device_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found device_iddevice_id ${device_id}.`,
                message_th: `ไม่พบข้อมูล device_iddevice_id ${device_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('device_idx =>'+device_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
        
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
          DataUpdate.recovery_warning = dto.recovery_warning;
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
        }if (dto.org) {
            DataUpdate.org = dto.org;
        }if (dto.bucket) {
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.DeviceRepository
            .createQueryBuilder()
            .update('sd_iot_device')
            .set(DataUpdate)
            .where('device_id=:device_id', { device_id: device_id })
            .execute();
        return 200;
  } 
  async update_device_mqtt_status_2(bucket: any, status: number): Promise<Device> {
      console.log('bucket =>', bucket); 
      console.log('status =>', status); 
      try { 
            var rs:any= this.DeviceRepository.update({ bucket: bucket }, { status });
            //console.log('getUser=>');console.info(user);
            return rs;
        } catch (err) {
            this.logger.error(`Error ${JSON.stringify(err)}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: err.message,
                },
            });
        }
  }
  /*****************/
  async update_device_mqtt_status(bucket: string, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${bucket}' to status ${status}`);
    
    try {
      const updateResult = await this.DeviceRepository.update(
        { bucket: bucket }, // Criteria: หาจาก bucket
        { status: status }  // Values to update
      );

      // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for bucket '${bucket}'. Update failed.`);
        throw new NotFoundException(`No devices found with bucket '${bucket}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for bucket '${bucket}'.`);
      
      // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;

    } catch (err) {
      // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
      if (err instanceof NotFoundException) {
        throw err;
      }

      // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
      this.logger.error(`Failed to update device status for bucket '${bucket}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  /*****************/
  async update_device_mqtt_status_device_id(device_id: number, status: number): Promise<number> {
    console.log(`Updating devices with device_id '${device_id}' to status ${status}`);
    try {
      const updateResult = await this.DeviceRepository.update(
        { device_id: device_id }, // Criteria: หาจาก bucket
        { status: status }  // Values to update
      );

      // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for device_id '${device_id}'. Update failed.`);
        throw new NotFoundException(`No devices found with device_id '${device_id}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for device_id '${device_id}'.`);
      
      // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;

    } catch (err) {
      // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
      if (err instanceof NotFoundException) {
        throw err;
      }

      // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
      this.logger.error(`Failed to update device status for device_id '${device_id}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  /****************/
  async update_device_status_mqtt_bucket(dto) {
        // const device_idx:any = JSON.parse(dto.device_id);
        let bucket = dto.bucket;
        const DataUpdate: any = {};
        const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select(['d.device_id AS device_id']);
        query.where('1=1');
        query.andWhere('d.bucket=:bucket', { bucket: bucket });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with device_id ${bucket} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found device_iddevice_id ${bucket}.`,
                message_th: `ไม่พบข้อมูล device_iddevice_id ${bucket}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('device_idx =>'+device_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
        var status: any = dto.status;
        if (status!="") {
            DataUpdate.status = status;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.DeviceRepository
            .createQueryBuilder()
            .update('sd_iot_device')
            .set(DataUpdate)
            .where('bucket=:bucket', { bucket: bucket })
            .execute();
        return 200;
  } 
  async device_all(): Promise<Device> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.DeviceRepository.createQueryBuilder('device'); 
      query.select(['d.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async deviceeditget(device_id:any): Promise<Device> {
    console.log(`=device_id=`+device_id);  
        try {
              const rs:any = await this.DeviceRepository.findOne({
                  where: {
                  device_id,
                  },
              });
              //console.log('getUser=>');console.info(user);
              return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async devicedetail(dto:any): Promise<Device> {
    console.log(` device_list_paginate dto=`);
    console.info(dto);
    try { 
        var device_id: any = dto.device_id;   
        var status: any = dto.status || '';
        const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',    
            'st.setting_name AS setting_name',  
            'mq.mqtt_name AS mqtt_name', 
        ]);
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    query.andWhere('d.device_id=:device_id', { device_id: device_id });
      if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      //query.orderBy(`d.device_id`, 'ASC');
      query.orderBy('mq.sort', 'ASC');  // Default sorting
      query.addOrderBy('d.device_id', 'ASC');
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_paginate(dto: any): Promise<Device> {
    console.log(` device_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]);
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    // query.andWhere('d.status=:status', { status: status });
    // query.andWhere('mq.status=:status', { status: status });
    if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_paginateV22(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port',
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',   
        ]);
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    );  
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
      // Keyword search on device_name
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_paginate_active(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      var status: any = 1;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]);
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      var keyword :any=encodeURI(keyword);
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      } 
      var bucket :any=encodeURI(dto.bucket);
      if (bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: bucket});
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_paginate_schedule(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = 1;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    // query.andWhere('d.status=:status', { status: status });
    // query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***************/
  async device_list_paginate_schedule_status(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || ''; 
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    var status: any = 1;
    query.andWhere('d.status=:status', { status: status });
    query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***************/
  async device_list_paginate_all(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = 1;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'mq.sort AS sort', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    // query.andWhere('d.status=:status', { status: status });
    // query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');  
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /*******active*********/
  async device_list_paginate_all_active(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    var status: any = 1;
    query.andWhere('d.status=:status', { status: status });
    query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else { 
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
       throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: { args: { errorMessage: error.message || error } }
        });
    }
  }
  /*******active*********/
  async device_list_paginate_all_active_io(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    var status: any = 1;
    query.andWhere('d.status=:status', { status: status });
    query.andWhere('mq.status=:status', { status: status });
    var type_id: number = dto.type_id;
    if (type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: type_id });
    }else{
        query.andWhere('d.type_id!=1');
    }
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else { 
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
       throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: { args: { errorMessage: error.message || error } }
        });
    }
  }
  async device_list_paginate_all_filter(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = 1;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
        ]); 
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
    query.where('1=1'); 
    // query.andWhere('d.status=:status', { status: status });
    // query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
     if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_all(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
        ]);
      }   
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1'); 
      // Keyword search on device_name
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_ststus_alarm(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'mq.latitude AS latitude',
            'mq.longitude AS longitude',
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
        ]);
      }   
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
      query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
        // Keyword search on device_name
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_ststus_alarm_fan(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'mq.latitude AS latitude',
            'mq.longitude AS longitude',
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
        ]);
      }   
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
      query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1');  
      if (dto.type_id) {
         query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      } 
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }
      var  location_id :Number= dto.location_id;
      if(!location_id){
        var location_id:Number=1;
      } 
      query.andWhere('d.location_id=:location_id', { location_id: location_id}); 
      if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async device_list_ststus_alarm_air(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'mq.latitude AS latitude',
            'mq.longitude AS longitude',
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
        ]);
      }   
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
      query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
      query.andWhere('d.type_id<=3');
      if (dto.type_id) {
        // query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }
        // Keyword search on device_name
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }
      var  location_id :any= dto.location_id;
      if(location_id==""){
        var location_id:any=5;
      } 
      if (location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: location_id});
      }
      if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_list_ststus_alarm_limit(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var type_id: number =  dto.type_id;
      var pageSize: number = dto.pageSize || 30000; 
      const query: any = await this.DeviceRepository.createQueryBuilder('d');  
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            // 'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            // 'd.time_life AS time_life',  
            // 'd.period AS period', 
            // 'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            // 'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            // 'd.model AS model',
            // 'd.vendor AS vendor',
            // 'd.comparevalue AS comparevalue',
            // 'd.createddate AS createddate',
            // 'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            // 'd.action_id AS action_id',
            // 'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            // 'mq.host AS mqtt_host',   
            // 'mq.port AS mqtt_port',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
        ]);  
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    );  
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
        // Keyword search on device_name
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: type_id });
      }if (dto.location_id) {
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_lists(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      var type_id: any = dto.type_id || '';
      var status: any = dto.status;
      var mqtt_data_value: any = dto.mqtt_data_value
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 1000;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      query.select([  
            'd.device_id AS device_id', 
            'd.setting_id AS setting_id', 
            'd.type_id AS type_id', 
            't.type_name AS type_name',    
            'l.location_id AS location_id', 
            'l.location_name AS location_name', 
            'l.configdata AS configdata',  
            'd.device_name AS device_name',
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.model AS model',
            'd.vendor AS vendor',
            'd.status AS status',
            'd.unit AS unit',
            'd.mqtt_id AS mqtt_id',
            'd.oid AS oid',
            'd.status_alert_id AS status_alert_id',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.measurement AS measurement',
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment', 
            'd.sn AS sn',
            'd.max AS max',
            'd.min AS min',
            'd.hardware_id AS hardware_id',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',  
            'd.action_id AS action_id',
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port',   
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
      ]);
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    );  
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    );  
      query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
      var org: any = dto.original;
      var bucket: any = dto.bucket;  
      var mqtt_data_value: any = dto.mqtt_data_value;
      if (dto.location_id) { 
        query.andWhere('d.location_id=:location_id', { location_id: dto.location_id });
      }
      if (mqtt_id) { 
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }
       if (keyword) {
        query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${keyword}%` : '%',});
      } 
      if (type_id) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.type_id=:type_id', { type_id: type_id });
      }
      // d.type_id
      if (org) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.org =:org', { org: org });
      }
      if (bucket) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.bucket =:bucket', { bucket: bucket });
      }if (mqtt_data_value) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.mqtt_data_value =:mqtt_data_value', { mqtt_data_value: mqtt_data_value });
      } 
      if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
    } catch (error) {
        // The 'error' object from the driver is already structured.
        // You can pass it directly or destructure what you need.
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            message: 'Failed to retrieve device list.',
            details: error, // Pass the original error object
          },
        });
    }

  }
  async device_lists_id(dto: any): Promise<Device> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      var type_id: any = dto.type_id || '';
      var status: any = dto.status;
      var mqtt_data_value: any = dto.mqtt_data_value
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 1000;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      query.select([  
            'd.device_id AS device_id',
            'd.type_id AS type_id', 
            't.type_name AS type_name',   
            'd.device_name AS device_name',
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.model AS model',
            'd.vendor AS vendor',
            'd.status AS status',
            'd.unit AS unit',
            'd.mqtt_id AS mqtt_id', 
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.measurement AS measurement',      
            'l.location_name AS location_name',   
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',    
            'd.max AS max',
            'd.min AS min',  
            'd.action_id AS action_id',
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
             'd.mqtt_device_name AS mqtt_device_name', 
          'd.mqtt_status_over_name AS mqtt_status_over_name', 
          'd.mqtt_status_data_name AS mqtt_status_data_name', 
          'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
          'd.mqtt_control_relay_name AS mqtt_control_relay_name',    
      ]);
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    );  
      query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= d.location_id"
                    ); 
      query.where('1=1'); 
      var org: any = dto.original;
      var bucket: any = dto.bucket;  
      var mqtt_data_value: any = dto.mqtt_data_value;
      if (mqtt_id) { 
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }
       if (keyword) {
        query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${keyword}%` : '%',});
      } 
      if (type_id) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.type_id=:type_id', { type_id: type_id });
      }
      // d.type_id
      if (org) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.org =:org', { org: org });
      }
      if (bucket) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.bucket =:bucket', { bucket: bucket });
      }if (mqtt_data_value) {
        // FIX: Add "=" operator and use the correct alias "mq"
        query.andWhere('d.mqtt_data_value =:mqtt_data_value', { mqtt_data_value: mqtt_data_value });
      } 
      if (status) {
        query.andWhere('d.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
    } catch (error) {
        // The 'error' object from the driver is already structured.
        // You can pass it directly or destructure what you need.
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            message: 'Failed to retrieve device list.',
            details: error, // Pass the original error object
          },
        });
    }

  }
  async scheduledevicepage(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var schedule_id: any = dto.schedule_id;    
      var keyword: any = dto.keyword || '';
      
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
         query.select([  
            'd.device_id AS device_id', 
            'sd.schedule_id AS schedule_id',  
            'scd.schedule_name AS schedule_name',  
            'scd.start AS schedule_event_start',  
            'scd.event AS schedule_event',  
            'scd.sunday AS sunday',  
            'scd.monday AS monday',  
            'scd.tuesday AS tuesday',  
            'scd.wednesday AS wednesday',  
            'scd.thursday AS thursday',  
            'scd.friday AS friday',  
            'scd.saturday AS saturday',  
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]); 
      }   
      query.innerJoin(
                        "sd_iot_schedule_device",
                        "sd",
                        "sd.device_id= d.device_id"
                    );  
      query.innerJoin(
                        "sd_iot_schedule",
                        "scd",
                        "scd.schedule_id= sd.schedule_id"
                    );  
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1'); 
      if (dto.status=="") {
        var status: any = 1;
      }else{
         var status: any = dto.status;
      }
      if (status) {
        // query.andWhere('d.status=:status', { status: status });
        // query.andWhere('mq.status=:status', { status: status });
      }if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }if (schedule_id) {
        query.andWhere('scd.schedule_id=:schedule_id', { schedule_id: schedule_id });
      }if (device_id) {
        query.andWhere('scd.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async scheduleprocess(dto: any): Promise<Device> {
    try { 
        var device_id: any = dto.device_id;  
        var schedule_id: any = dto.schedule_id;    
        var keyword: any = dto.keyword || '';
        var createddate: any = dto.createddate;
        var updateddate: any = dto.updateddate;
        var sort: string = dto.sort;
        var page: number = dto.page || 1;
        var pageSize: number = dto.pageSize || 10;
        var isCount: number = dto.isCount || 0;
        var query: any = await this.DeviceRepository.createQueryBuilder('d');
        if (isCount == 1) {
          var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
        } else {    
          query.select([  
              'd.device_id AS device_id', 
              'sd.schedule_id AS schedule_id',  
              'scd.schedule_name AS schedule_name',  
              'scd.start AS schedule_event_start',  
              'scd.event AS schedule_event',  
              'scd.sunday AS sunday',  
              'scd.monday AS monday',  
              'scd.tuesday AS tuesday',  
              'scd.wednesday AS wednesday',  
              'scd.thursday AS thursday',  
              'scd.friday AS friday',  
              'scd.saturday AS saturday',  
              'd.mqtt_id AS mqtt_id',
              'd.setting_id AS setting_id',
              'd.type_id AS type_id',
              'd.device_name AS device_name',
              'd.sn AS sn',
              'd.hardware_id AS hardware_id', 
              'd.status_warning AS status_warning',
              'd.recovery_warning AS recovery_warning',
              'd.status_alert AS status_alert',
              'd.recovery_alert AS recovery_alert', 
              'd.time_life AS time_life',  
              'd.period AS period', 
              'd.work_status AS work_status', 
              'd.max AS max',
              'd.min AS min',  
              'd.oid AS oid',
              'd.mqtt_data_value AS mqtt_data_value',
              'd.mqtt_data_control AS mqtt_data_control',
              'd.model AS model',
              'd.vendor AS vendor',
              'd.comparevalue AS comparevalue',
              'd.createddate AS createddate',
              'd.updateddate AS updateddate', 
              'd.status AS status',
              'd.unit AS unit',
              'd.action_id AS action_id',
              'd.status_alert_id AS status_alert_id',
              'd.measurement AS measurement',
              'd.mqtt_control_on AS mqtt_control_on',
              'd.mqtt_control_off AS mqtt_control_off',  
              'd.org AS device_org', 
              'd.bucket AS device_bucket', 
              't.type_name AS type_name',         
              'l.location_name AS location_name',   
              'l.configdata AS configdata',  
              'mq.mqtt_name AS mqtt_name',   
              'mq.org AS mqtt_org',
              'mq.bucket AS mqtt_bucket',    
              'mq.envavorment AS mqtt_envavorment',  
              'mq.host AS mqtt_host',   
              'mq.port AS mqtt_port', 
              'd.updateddate AS timestamp', 
              'd.mqtt_device_name AS mqtt_device_name', 
              'd.mqtt_status_over_name AS mqtt_status_over_name', 
              'd.mqtt_status_data_name AS mqtt_status_data_name', 
              'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
              'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
          ]); 
        }   
        query.innerJoin(
                          "sd_iot_schedule_device",
                          "sd",
                          "sd.device_id= d.device_id"
                      );  
        query.innerJoin(
                          "sd_iot_schedule",
                          "scd",
                          "scd.schedule_id= sd.schedule_id"
                      );  
        query.innerJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.innerJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.innerJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      ); 
        query.where('1=1'); 
        var status: any = 1;
        query.andWhere('d.status=:status', { status: status });
        query.andWhere('mq.status=:status', { status: status });
        query.andWhere('scd.status=:status', { status: status });
        if (keyword) {
          query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
        }if (schedule_id) {
          query.andWhere('scd.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
          query.andWhere('scd.device_id=:device_id', { device_id: device_id });
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        }if (createddate) {
          query.andWhere('d.createddate=:createddate', { createddate: createddate });
        }if (updateddate) {
          query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
        }if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        }if (dto.sn) {
          query.andWhere('d.sn=:sn', { sn: dto.sn });
        }if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.max) {
          query.andWhere('d.max=:max', { max: dto.max });
        }if (dto.min) {
          query.andWhere('d.min=:min', { min: dto.min });
        }if (dto.hardware_id) {
          query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
        }if (dto.model) {
          query.andWhere('d.model=::model', { model: dto.model });
        }if (dto.vendor) {
          query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
        }if (dto.comparevalue) {
          query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
        }if (dto.mqtt_id) {
          query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
        }if (dto.oid) {
          query.andWhere('d.oid=:oid', { oid: dto.oid });
        }if (dto.action_id) {
          query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
        }if (dto.mqtt_data_value) {
          query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
        }if (dto.mqtt_data_control) {
          query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
        }if (createddate) {
          query.andWhere('d.createddate=:createddate', { createddate: createddate });
        }if (updateddate) {
          query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        if (isCount == 1) {
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          return count;
        } else {
          if (sort) {
            const sortResult = convertSortInput(sort);
            if (sortResult == false) {
              throw new BadRequestException(`Invalid sort option.`);
            }
            const { sortField, sortOrder } = sortResult;
            if(sortOrder=='ASC' || sortOrder=='asc'){
              var sortOrders:any ='ASC';
            }else if(sortOrder=='DESC' || sortOrder=='desc'){
              var sortOrders:any ='DESC';
            }else{
              var sortOrders:any ='ASC';
            }
            query.orderBy(
              `d.${sortField}`,
              sortOrders.toUpperCase(),
            );
          } else {
            query.orderBy('scd.start', 'ASC');  // Default sorting
            query.addOrderBy('scd.schedule_id', 'ASC');   
            query.addOrderBy('mq.sort', 'ASC');   
            query.addOrderBy('d.device_id', 'ASC');
          }
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          const deviceList = await query.getRawMany();
          return deviceList;
        }
    } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error2 },
          },
        });
    }
  }
  /***************/
  async scheduledeviceCOUNT(dto: any): Promise<scheduleDevice> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
        var device_id: any = dto.device_id;  
        var schedule_id: any = dto.schedule_id;    
        const query: any = await this.scheduleDeviceRepository.createQueryBuilder('sc');
        var countRs: number = await query.select('COUNT(DISTINCT sc.device_id)', 'cnt'); 
        query.where('1=1');  
        if (schedule_id) {
          query.andWhere('sc.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
          query.andWhere('sc.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  /********Email**********/
  async maxid_Email(): Promise<Email> { 
        try {
          const RS:any = await this.EmailRepository.query('SELECT MAX(email_id) AS email_id FROM sd_iot_email');
          console.log('email_id');console.info(RS);
          var email_id:any=RS['0'].email_id;
          console.log('max_email_id=');console.info(email_id);
          var max_email_id:any=max_email_id+1;
          console.log('max_email_id=');console.info(max_email_id);
          return max_email_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_email(dto: any): Promise<Email> {
        console.log('create_email=>');console.info(dto);   
        const result: any = await this.EmailRepository.save(
          this.EmailRepository.create(dto),
        );
        return result;
  }
  async delete_email(email_id: any): Promise<void> {
            try {
                this.logger.log(`Deleting email with email_id: ${email_id}`);
                const constemail = await this.get_email(email_id);
                if (!constemail) {
                    throw new NotFoundException(`email_id with email_id ${email_id} not found`);
                } 
                var criteria:any = { email_id: email_id};
                console.log(`Attempting to delete record with criteria:`, criteria);
                const deleteResult:any =await this.EmailRepository.delete(criteria);
                console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting email_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_email(email_id: any): Promise<Email> {
        try {
        const rs:any = await this.EmailRepository.findOne({
            where: {
            email_id,
            },
        });
        console.log('get_email rs=>'); console.info(rs);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_email(email_name: any): Promise<Email> {
        try {
          console.log('email_name=>');console.info(email_name);
          const rs:any = await this.EmailRepository.findOne({
              where: {
              email_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_email(dto) {
        // const email_idx:any = JSON.parse(dto.email_id);
        let email_id = dto.email_id;
        const DataUpdate: any = {};
        const query: any = await this.EmailRepository.createQueryBuilder('e');
        query.select(['e.email_id AS email_id']);
        query.where('1=1');
        query.andWhere('e.email_id=:email_id', { email_id: email_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with email_id ${email_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found email_idemail_id ${email_id}.`,
                message_th: `ไม่พบข้อมูล email_idemail_id ${email_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('email_idx =>'+email_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.EmailRepository
            .createQueryBuilder()
            .update('sd_iot_email')
            .set(DataUpdate)
            .where('email_id=:email_id', { email_id: email_id })
            .execute();
        return 200;
  } 
  async update_email_status(email_id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${email_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdate: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdate.status =statusset;   
              DataUpdate.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdate);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_email')
                  .set(DataUpdate)
                  //.where('email_id!=:email_id', { email_id: email_id })
                  .execute(); 
        }
        var updateResult = await this.EmailRepository.update({ email_id: email_id },{ status: status });
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for mqtt_id '${email_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${email_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for email_id '${email_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for mqtt_id '${email_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async email_all(): Promise<Email> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.EmailRepository.createQueryBuilder('e'); 
      query.select(['e.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async email_list_paginate(dto: any): Promise<Email> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var id: any = dto.id; 
      var email_id: any = dto.email_id; 
      var email_type_id: any = dto.email_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.EmailRepository.createQueryBuilder('e');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT e.email_id)', 'cnt');
      } else { 
        query.select(['e.email_id AS email_id', 
            'e.email_name AS email_name',  
            'e.host AS host', 
            'e.port AS port', 
            'e.username AS username',  
            'e.password AS password',
            'e.updateddate AS updateddate',
            'e.status AS status',          
        ]);
      } 
      if (id) {
        query.andWhere('e.id=:id', { id: id });
      }  
      if (keyword) {
        query.andWhere('e.email_name like :email_name', {email_name: keyword ? `%${keyword}%` : '%',});
      } 
      if (email_id) {
        query.andWhere('e.email_id=:email_id', { email_id: email_id });
      } 
      if (createddate) {
        query.andWhere('e.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('e.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('e.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `e.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`e.email_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  /********MqttHost**********/  
  async create_mqtthost(dto: any): Promise<mqtthost> {
       console.log('create_mqtthost=>');console.info(dto);   
        const result: any = await this.mqtthostRepository.save(
          this.mqtthostRepository.create(dto),
        );
        return result;
  }
  async delete_mqtthost(id: any): Promise<void> {
            try {
                this.logger.log(`Deleting mqtt with id: ${id}`);
                const constmqtt = await this.get_mqtthost(id);
                if (!constmqtt) {
                    throw new NotFoundException(`id with id ${id} not found`);
                } 
                var criteria:any = { id: id};
                console.log(`Attempting to delete record with criteria:`, criteria);
                const deleteResult:any =await this.mqtthostRepository.delete(criteria);
                console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_mqtthost(id: any): Promise<mqtthost> {
        try {
        const rs:any = await this.mqtthostRepository.findOne({
            where: {
            id,
            },
        });
        console.log('get_mqtthost rs=>'); console.info(rs);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_mqtthost(hostname: any): Promise<mqtthost> {
        try {
          console.log('hostname=>');console.info(hostname);
          const rs:any = await this.mqtthostRepository.findOne({
              where: {
              hostname,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_mqtthost(dto) {
        // const idx:any = JSON.parse(dto.id);
        let id = dto.id;
        const DataUpdatmqtt: any = {};
        const query: any = await this.mqtthostRepository.createQueryBuilder('mqtt');
        query.select(['mqtt.id AS id']);
        query.where('1=1');
        query.andWhere('mqtt.id=:id', { id: id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with id ${id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found idid ${id}.`,
                message_th: `ไม่พบข้อมูล idid ${id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('idx =>'+idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
        if (dto.hostname) {
            DataUpdatmqtt.hostname = dto.hostname;
        }if (dto.host) {
            DataUpdatmqtt.host = dto.host;
        }if (dto.port) {
            DataUpdatmqtt.port = dto.port;
        }if (dto.username) {
            DataUpdatmqtt.username = dto.username;
        }if (dto.password) {
            DataUpdatmqtt.password = dto.password;
        }
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdatmqtt.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdatmqtt);
        await this.mqtthostRepository
            .createQueryBuilder()
            .update('sd_mqtt_host')
            .set(DataUpdatmqtt)
            .where('id=:id', { id: id })
            .execute();
        return 200;
  } 
  async update_mqtthost_status(id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdatmqtt: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdatmqtt.status =statusset;   
              DataUpdatmqtt.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdatmqtt);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_mqtt_host')
                  .set(DataUpdatmqtt)
                  //.where('id!=:id', { id: id })
                  .execute(); 
        }
        var updateResult = await this.mqtthostRepository.update({ id: id },{ status: status });
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for mqtt_id '${id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for id '${id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for mqtt_id '${id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async mqtthost_all(): Promise<mqtthost> {
    console.log(`=mqtt_all=`); 
    try { 
      const query: any = await this.mqtthostRepository.createQueryBuilder('mqtt'); 
      query.select(['mqtt.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async mqtthost_list_paginate(dto: any): Promise<mqtthost> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var id: any = dto.id;   
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      var username: any = dto.username;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.mqtthostRepository.createQueryBuilder('mqtt');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT mqtt.id)', 'cnt');
      } else { 
        query.select(['mqtt.id AS id', 
            'mqtt.hostname AS hostname',  
            'mqtt.host AS host', 
            'mqtt.port AS port', 
            'mqtt.username AS username',  
            'mqtt.password AS password',
            'mqtt.updateddate AS updateddate',
            'mqtt.status AS status',          
        ]);
      } 
      if (id) {
        query.andWhere('mqtt.id=:id', { id: id });
      }  
      if (username) {
        query.andWhere('username.id=:username', { username: username });
      } 
      if (keyword) {
        query.andWhere('mqtt.hostname like :hostname', {hostname: keyword ? `%${keyword}%` : '%',});
      }  
      if (createddate) {
        query.andWhere('mqtt.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('mqtt.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('mqtt.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `mqtt.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`mqtt.updateddate`, 'DESC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********MqttHost**********/ 
  /********Host**********/ 
  async maxid_Host(): Promise<Host> { 
        try {
          const RS:any = await this.HostRepository.query('SELECT MAX(host_id) AS host_id FROM sd_iot_host');
          console.log('host_id');console.info(RS);
          var host_id:any=RS['0'].host_id;
          console.log('max_host_id=');console.info(host_id);
          var max_host_id:any=max_host_id+1;
          console.log('max_host_id=');console.info(max_host_id);
          return max_host_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_host(dto: any): Promise<Host> {
        console.log('create_host=>');console.info(dto);   
        const result: any = await this.HostRepository.save(
          this.HostRepository.create(dto),
        );
        return result;
  }
  async delete_host(host_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting email with host_id: ${host_id}`);
            const constemail = await this.get_host(host_id);
            if (!constemail) {
                throw new NotFoundException(`host_id with host_id ${host_id} not found`);
            } 
                var criteria:any = { host_id: host_id};
                console.log(`Attempting to delete record with criteria:`, criteria);
                const deleteResult:any =await this.HostRepository.delete(criteria);
                console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting host_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_host(host_id: any): Promise<Host> {
        try {
        const rs:any = await this.HostRepository.findOne({
            where: {
            host_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_host(host_name: any): Promise<Host> {
        try {
          console.log('host_name=>');console.info(host_name);
          const rs:any = await this.HostRepository.findOne({
              where: {
              host_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_host(dto) {
        // const host_idx:any = JSON.parse(dto.host_id);
        let host_id = dto.host_id;
        const DataUpdate: any = {};
        const query: any = await this.HostRepository.createQueryBuilder('h');
        query.select(['h.host_id AS host_id']);
        query.where('1=1');
        query.andWhere('h.host_id=:host_id', { host_id: host_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with host_id ${host_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found host_idhost_id ${host_id}.`,
                message_th: `ไม่พบข้อมูล host_idhost_id ${host_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('host_idx =>'+host_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.HostRepository
            .createQueryBuilder()
            .update('sd_iot_host')
            .set(DataUpdate)
            .where('host_id=:host_id', { host_id: host_id })
            .execute();
        return 200;
  }
  async host_all(): Promise<Host> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.HostRepository.createQueryBuilder('h'); 
      query.select(['h.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async host_list_paginate(dto: any): Promise<Host> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var host_id: any = dto.host_id; 
      var host_type_id: any = dto.host_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.HostRepository.createQueryBuilder('h');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT h.host_id)', 'cnt');
      } else { 
        query.select([  
            'h.host_id AS host_id', 
            'h.host_name AS host_name',  
            'h.host AS host', 
            'h.port AS port', 
            'h.username AS username',  
            'h.password AS password',
            'h.updateddate AS updateddate',
            'h.status AS status',          
        ]);
      }  
      if (keyword) {
        query.andWhere('h.host_name like :host_name', {host_name: keyword ? `%${keyword}%` : '%',});
      } 
      if (host_id) {
        query.andWhere('h.host_id=:host_id', { host_id: host_id });
      } 
      if (createddate) {
        query.andWhere('h.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('h.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('h.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `h.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`h.host_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Influxdb**********/ 
  async maxid_Influxdb(): Promise<Influxdb> { 
        try {
          const RS:any = await this.HostRepository.query('SELECT MAX(influxdb_id) AS influxdb_id FROM sd_iot_influxdb');
          console.log('influxdb_id');console.info(RS);
          var influxdb_id:any=RS['0'].influxdb_id;
          console.log('max_influxdb_id=');console.info(influxdb_id);
          var max_influxdb_id:any=max_influxdb_id+1;
          console.log('max_influxdb_id=');console.info(max_influxdb_id);
          return max_influxdb_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_influxdb(dto: any): Promise<Influxdb> {
        console.log('create_influxdb=>');console.info(dto);   
        const result: any = await this.InfluxdbRepository.save(
          this.InfluxdbRepository.create(dto),
        );
        return result;
  }
  async delete_influxdb(influxdb_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting email with influxdb_id: ${influxdb_id}`);
            const constemail = await this.get_influxdb(influxdb_id);
            if (!constemail) {
                throw new NotFoundException(`influxdb_id with influxdb_id ${influxdb_id} not found`);
            } 
                var criteria:any = { influxdb_id: influxdb_id};
                console.log(`Attempting to delete record with criteria:`, criteria);
                const deleteResult:any =await this.InfluxdbRepository.delete(criteria);
                console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting influxdb_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_influxdb(influxdb_id: any): Promise<Influxdb> {
        try {
        const rs:any = await this.InfluxdbRepository.findOne({
            where: {
            influxdb_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_influxdb(influxdb_name: any): Promise<Influxdb> {
        try {
          console.log('influxdb_name=>');console.info(influxdb_name);
          const rs:any = await this.InfluxdbRepository.findOne({
              where: {
              influxdb_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_influxdb(dto) {
        // const influxdb_idx:any = JSON.parse(dto.influxdb_id);
        let influxdb_id = dto.influxdb_id;
        const DataUpdate: any = {};
        const query: any = await this.InfluxdbRepository.createQueryBuilder('db');
        query.select(['db.influxdb_id AS influxdb_id']);
        query.where('1=1');
        query.andWhere('db.influxdb_id=:influxdb_id', { influxdb_id: influxdb_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with influxdb_id ${influxdb_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found influxdb_idinfluxdb_id ${influxdb_id}.`,
                message_th: `ไม่พบข้อมูล influxdb_idinfluxdb_id ${influxdb_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('influxdb_idx =>'+influxdb_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        }if (dto.status) {
            DataUpdate.status = dto.status;
        }
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.InfluxdbRepository
            .createQueryBuilder()
            .update('sd_iot_influxdb')
            .set(DataUpdate)
            .where('influxdb_id=:influxdb_id', { influxdb_id: influxdb_id })
            .execute();
        return 200;
  }
  async influxdb_all(): Promise<Influxdb> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.InfluxdbRepository.createQueryBuilder('db'); 
      query.select(['db.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async influxdb_list_paginate(dto: any): Promise<Influxdb> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    /*
          SELECT "db"."influxdb_id"   AS influxdb_id,
              "db"."influxdb_name" AS influxdb_name,
              "db"."host"          AS host,
              "db"."port"          AS port,
              "db"."username"      AS username,
              "db"."password"      AS password,
              "db"."buckets"       AS buckets,
              "db"."token_value"   AS token_value,
              "db"."updateddate"   AS updateddate,
              "db"."status"        AS status
        FROM   "public"."sd_iot_influxdb" "db"
        ORDER  BY "db"."createddate" DESC
        LIMIT  1000 
    */
    try { 
      var influxdb_id: any = dto.influxdb_id;  
      var keyword: any = dto.keyword || ''; 
      /*****************/ 
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.InfluxdbRepository.createQueryBuilder('db');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT db.influxdb_id)', 'cnt');
      } else { 
        query.select([  
            'db.influxdb_id AS influxdb_id', 
            'db.influxdb_name AS influxdb_name',  
            'db.host AS host', 
            'db.port AS port', 
            'db.username AS username',  
            'db.password AS password',
            'db.buckets AS buckets',
            'db.token_value AS token_value',
            'db.updateddate AS updateddate',
            'db.status AS status',          
        ]);
      }  
        /*
            influxdb_id
            influxdb_name
            host
            port
            username
            password
            buckets
            token_value
            createddate
            updateddate
            status
            
        */
      if (dto.keyword) {
          query.andWhere('db.influxdb_name like :influxdb_name', {name: keyword ? `%${dto.keyword}%` : '%',});
      }  
      if (dto.influxdb_id) {
        query.andWhere('db.influxdb_id=:influxdb_id', { influxdb_id: dto.influxdb_id });
      } 
      if (dto.username) {
        query.andWhere('db.username=:username', { username: dto.username });
      }
      if (dto.password) {
        query.andWhere('db.password=:password', { password: dto.password });
      }
      if (dto.buckets) {
        query.andWhere('db.buckets=:buckets', { buckets: dto.buckets });
      }
      if (dto.token_value) {
        query.andWhere('db.token_value=:token_value', { token_value: dto.token_value });
      }
      if (dto.status) {
        query.andWhere('db.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        query.orderBy(`db.createddate`, 'DESC');
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async update_influxdb_status(influxdb_id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${influxdb_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdate: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdate.status =statusset;   
              DataUpdate.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdate);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_influxdb')
                  .set(DataUpdate)
                  //.where('influxdb_id!=:influxdb_id', { influxdb_id: influxdb_id })
                  .execute(); 
        }
 
              var DataUpdatmqtt: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT); 
              DataUpdatmqtt.status =status;   
              DataUpdatmqtt.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdatmqtt);
              var updateResult = await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_influxdb')
                  .set(DataUpdatmqtt)
                  .where('influxdb_id=:influxdb_id', { influxdb_id: influxdb_id })
                  .execute();   
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for mqtt_id '${influxdb_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${influxdb_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for influxdb_id '${influxdb_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for mqtt_id '${influxdb_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  } 
  /********Line**********/ 
  async maxid_Line(): Promise<Line> { 
        try {
          const RS:any = await this.LineRepository.query('SELECT MAX(line_id) AS line_id FROM sd_iot_line');
          console.log('line_id');console.info(RS);
          var line_id:any=RS['0'].line_id;
          console.log('max_line_id=');console.info(line_id);
          var max_line_id:any=max_line_id+1;
          console.log('max_line_id=');console.info(max_line_id);
          return max_line_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_line(dto: any): Promise<Line> { console.log('create_line=>');console.info(dto);   
        const result: any = await this.LineRepository.save(
          this.LineRepository.create(dto),
        );
        return result;
  }
  async delete_line(line_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting email with line_id: ${line_id}`);
            const constemail = await this.get_line(line_id);
            if (!constemail) {
                throw new NotFoundException(`line_id with line_id ${line_id} not found`);
            } 
              var criteria:any = { line_id: line_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const deleteResult:any =await this.LineRepository.delete(criteria);
              console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting line_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_line(line_id: any): Promise<Line> {
        try {
        const rs:any = await this.LineRepository.findOne({
            where: {
            line_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }  
  async update_line_status(line_id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${line_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdate: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdate.status =statusset;   
              DataUpdate.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdate);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_line')
                  .set(DataUpdate)
                  //.where('line_id!=:line_id', { line_id: line_id })
                  .execute(); 
        }
        var updateResult = await this.LineRepository.update({ line_id: line_id },{ status: status });
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for line_id '${line_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${line_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for line_id '${line_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for line_id '${line_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async get_name_create_line(line_name: any): Promise<Line> {
        try {
          console.log('line_name=>');console.info(line_name);
          const rs:any = await this.LineRepository.findOne({
              where: {
              line_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_line(dto) {
        // const line_idx:any = JSON.parse(dto.line_id);
        let line_id = dto.line_id;
        const DataUpdate: any = {};
        const query: any = await this.LineRepository.createQueryBuilder('line');
        query.select(['line.line_id AS line_id']);
        query.where('1=1');
        query.andWhere('line.line_id=:line_id', { line_id: line_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with line_id ${line_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found line_idline_id ${line_id}.`,
                message_th: `ไม่พบข้อมูล line_idline_id ${line_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('line_idx =>'+line_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.LineRepository
            .createQueryBuilder()
            .update('sd_iot_line')
            .set(DataUpdate)
            .where('line_id=:line_id', { line_id: line_id })
            .execute();
        return 200;
  }
  async line_all(): Promise<Line> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.LineRepository.createQueryBuilder('line'); 
      query.select(['line.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async line_list_paginate(dto: any): Promise<Line> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var line_id: any = dto.line_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.LineRepository.createQueryBuilder('line');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT line.line_id)', 'cnt');
      } else {  
        // query.select([  
        //     'line.line_id AS line_id', 
        //     'line.line_name AS line_name',  
        //     'line.client_id AS client_id', 
        //     'line.client_secret AS client_secret', 
        //     'line.secret_key AS secret_key',  
        //     'line.redirect_uri AS redirect_uri',
        //     'line.grant_type AS grant_type',
        //     'line.code AS code',
        //     'line.accesstoken AS accesstoken',
        //     'line.createddate AS createddate',
        //     'line.updateddate AS updateddate',
        //     'line.status AS status',          
        // ]);
        query.select(['*']);
      }  
      if (keyword) {
          query.andWhere('line.line_name like :line_name', {line_name: keyword ? `%${keyword}%` : '%',});
      }  
      if (line_id) {
        query.andWhere('line.line_id=:line_id', { line_id: line_id });
      } 
      if (createddate) {
        query.andWhere('line.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('line.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('line.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `line.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`line.line_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async update_Line_status(line_id: any, status: number): Promise<number> {
    console.log(`Updating devices with line_id '${line_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdatmqtt: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdatmqtt.status =statusset;   
              DataUpdatmqtt.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdatmqtt);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_influxdb')
                  .set(DataUpdatmqtt)
                  .where('line_id=:line_id', { line_id: line_id })
                  .execute(); 
        }
        var updateResult = await this.LineRepository.update({ line_id: line_id },{ status: status });
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for line_id '${line_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${line_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for line_id '${line_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for line_id '${line_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  /********Nodered**********/ 
  async maxid_Nodered(): Promise<Nodered> { 
        try {
          const RS:any = await this.NoderedRepository.query('SELECT MAX(token_id) AS token_id FROM sd_iot_nodered');
          console.log('token_id');console.info(RS);
          var token_id:any=RS['0'].token_id;
          console.log('max_token_id=');console.info(token_id);
          var max_token_id:any=max_token_id+1;
          console.log('max_token_id=');console.info(max_token_id);
          return max_token_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_nodered(dto: any): Promise<Nodered>{ console.log('create_nodered=>');console.info(dto);   
        const result: any = await this.NoderedRepository.save(
          this.NoderedRepository.create(dto),
        );
        return result;
  }
  async delete_nodered(nodered_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting email with nodered_id: ${nodered_id}`);
            const constemail = await this.get_nodered(nodered_id);
            if (!constemail) {
                throw new NotFoundException(`nodered_id with nodered_id ${nodered_id} not found`);
            }  
              var criteria:any = { nodered_id: nodered_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const deleteResult:any =await this.NoderedRepository.delete(criteria);
              console.log(`deleteResult:`, deleteResult);
            } catch (error) {
            this.logger.error(`Error while deleting nodered_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_nodered(nodered_id: any): Promise<Nodered>{
        try {
        const rs:any = await this.NoderedRepository.findOne({
            where: {
            nodered_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_nodered(nodered_name: any): Promise<Nodered>{
        try {
          console.log('nodered_name=>');console.info(nodered_name);
          const rs:any = await this.NoderedRepository.findOne({
              where: {
              nodered_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_nodered(dto) {
        // const nodered_idx:any = JSON.parse(dto.nodered_id);
        let nodered_id = dto.nodered_id;
        const DataUpdate: any = {};
        const query: any = await this.NoderedRepository.createQueryBuilder('nodered');
        query.select(['nodered.nodered_id AS nodered_id']);
        query.where('1=1');
        query.andWhere('nodered.nodered_id=:nodered_id', { nodered_id: nodered_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with nodered_id ${nodered_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found nodered_idnodered_id ${nodered_id}.`,
                message_th: `ไม่พบข้อมูล nodered_idnodered_id ${nodered_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('nodered_idx =>'+nodered_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.NoderedRepository
            .createQueryBuilder()
            .update('sd_iot_nodered')
            .set(DataUpdate)
            .where('nodered_id=:nodered_id', { nodered_id: nodered_id })
            .execute();
        return 200;
  }
  async nodered_all(): Promise<Nodered>{
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.NoderedRepository.createQueryBuilder('nodered'); 
      query.select(['nodered.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async nodered_list_paginate(dto: any): Promise<Nodered>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var nodered_id: any = dto.nodered_id; 
      var nodered_type_id: any = dto.nodered_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.NoderedRepository.createQueryBuilder('nodered');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT nodered.nodered_id)', 'cnt');
      } else { 
        query.select(['nodered.nodered_id AS nodered_id', 
            'nodered.nodered_name AS nodered_name', 
            'nodered.host AS host', 
            'nodered.port AS port', 
            'nodered.routing AS routing', 
            'nodered.client_id AS client_id', 
            'nodered.grant_type AS grant_type', 
            'nodered.scope AS scope', 
            'nodered.username AS username', 
            'nodered.password AS password', 
            'nodered.createddate AS createddate', 
            'nodered.updateddate AS updateddate', 
            'nodered.status AS status',      
        ]);
      }  
      if (keyword) {
          query.andWhere('nodered.nodered_name like :nodered_name', {nodered_name: keyword ? `%${keyword}%` : '%',});
      }  
      if (nodered_id) {
        query.andWhere('nodered.nodered_id=:nodered_id', { nodered_id: nodered_id });
      } 
      if (createddate) {
        query.andWhere('nodered.createddate=:createddate', { createddate: createddate });
      }
      if (updateddate) {
        query.andWhere('nodered.updateddate=:updateddate', { updateddate: updateddate });
      }
      if (status) {
        query.andWhere('nodered.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `nodered.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`nodered.createddate`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async update_nodered_status(nodered_id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${nodered_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdate: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdate.status =statusset;   
              DataUpdate.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdate);
              await this.NoderedRepository
                  .createQueryBuilder()
                  .update('sd_iot_nodered')
                  .set(DataUpdate)
                  //.where('nodered_id!=:nodered_id', { nodered_id: nodered_id })
                  .execute(); 
        }
 
              var DataUpdatmqtt: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT); 
              DataUpdatmqtt.status =status;   
              DataUpdatmqtt.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdatmqtt);
              var updateResult = await this.NoderedRepository
                  .createQueryBuilder()
                  .update('sd_iot_nodered')
                  .set(DataUpdatmqtt)
                  .where('nodered_id=:nodered_id', { nodered_id: nodered_id })
                  .execute();   
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for mqtt_id '${nodered_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${nodered_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for nodered_id '${nodered_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for mqtt_id '${nodered_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  } 
  /********Schedule**********/ 
  async maxid_Schedule(): Promise<Schedule> { 
        try {
          const RS:any = await this.NoderedRepository.query('SELECT MAX(schedule_id) AS schedule_id FROM sd_iot_schedule');
          console.log('schedule_id');console.info(RS);
          var schedule_id:any=RS['0'].schedule_id;
          console.log('max_schedule_id=');console.info(schedule_id);
          var max_schedule_id:any=max_schedule_id+1;
          console.log('max_schedule_id=');console.info(max_schedule_id);
          return max_schedule_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_schedule(dto: any): Promise<Schedule>{ console.log('create_schedule=>');console.info(dto);   
        const result: any = await this.ScheduleRepository.save(
          this.ScheduleRepository.create(dto),
        );
        return result;
  } 
  async get_schedule(schedule_id: number): Promise<Schedule | null> {
      try {
        const schedule = await this.ScheduleRepository.findOne({
          where: { schedule_id },
        });
        return schedule || null;
      } catch (err) {
        this.logger.error(`Error fetching schedule_id ${schedule_id}: ${err.message}`, err.stack);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: err.message,
          },
        });
      }
  }
  async delete_schedule(schedule_id: number): Promise<void> {
    try {
        this.logger.log(`Deleting schedule with schedule_id: ${schedule_id}`);
            /***********************/ 
            const query: any = await this.scheduleDeviceRepository.createQueryBuilder('s');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT s.schedule_id)', 'cnt');
            query.where('1=1'); 
            query.andWhere('s.schedule_id=:schedule_id', { schedule_id: schedule_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = {schedule_id: schedule_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.scheduleDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            } 
         /***********************/ 
              var criteria:any = { schedule_id: schedule_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.ScheduleRepository.delete(criteria);
              console.log(`result:`, result);
        if (result.affected == 0) {
          throw new NotFoundException(`Schedule with schedule_id ${schedule_id} not found`);
        } 
        this.logger.log(`Successfully deleted schedule_id: ${schedule_id}`);
    } catch (error) {
        this.logger.error(`Error while deleting schedule_id: ${schedule_id} - ${error.message}`);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: error.message,
          },
        });
    }
  }
  async get_name_create_schedule(schedule_name: any): Promise<Schedule>{
        try {
          console.log('schedule_name=>');console.info(schedule_name);
          const rs:any = await this.ScheduleRepository.findOne({
              where: {
              schedule_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_schedule(dto: any) {
      const schedule_id = dto.schedule_id;
      if (!schedule_id) {
          throw new BadRequestException('schedule_id is required');
      }

      // ตรวจสอบว่าข้อมูล schedule มีอยู่จริงหรือไม่
      const schedule = await this.ScheduleRepository.findOne({ where: { schedule_id } });
      if (!schedule) {
          throw new NotFoundException(`Data with schedule_id ${schedule_id} not found`);
      }

      // เตรียมข้อมูลสำหรับอัปเดต
      const DataUpdate: any = {};

      // กำหนด field ที่จะอัปเดตแบบ dynamic
      const updatableFields = [
          'schedule_name', 'device_id', 'start', 'event',
          'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
          'status', 'calendar_time' // เพิ่ม calendar_time ถ้ามี
      ];
      for (const key of updatableFields) {
          if (dto[key] !== undefined) {
              DataUpdate[key] = dto[key];
          }
      }

      // อัปเดตวันที่แก้ไขล่าสุด
      DataUpdate.updateddate = new Date();

      // อัปเดตข้อมูลในฐานข้อมูล
      await this.ScheduleRepository
          .createQueryBuilder()
          .update('sd_iot_schedule')
          .set(DataUpdate)
          .where('schedule_id = :schedule_id', { schedule_id })
          .execute();

      return {
          statusCode: 200,
          code: 200,
          message: `Update successful`,
          message_th: `อัปเดตข้อมูลสำเร็จ`,
          payload: null,
      };
  }
  async schedule_alls(): Promise<Schedule>{
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.ScheduleRepository.createQueryBuilder('schedule'); 
      query.select(['schedule.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async schedule_all(dto: any): Promise<Schedule>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
          var schedule_id: any = dto.schedule_id;  
          const query: any = await this.ScheduleRepository.createQueryBuilder('schedule');
          query.select([  
              'schedule.schedule_id AS schedule_id', 
              'schedule.schedule_name AS schedule_name',  
              'schedule.device_id AS device_id', 
              'schedule.start AS start', 
              'schedule.event AS event', 
              'schedule.sunday AS sunday', 
              'schedule.monday AS monday', 
              'schedule.tuesday AS tuesday', 
              'schedule.wednesday AS wednesday', 
              'schedule.thursday AS thursday', 
              'schedule.friday AS friday', 
              'schedule.saturday AS saturday',  
              'schedule.createddate AS createddate',
              'schedule.updateddate AS updateddate',
              'schedule.status AS status',          
          ]);   
        query.andWhere('1=1');
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql(); 
        query.orderBy(`schedule.schedule_id`, 'ASC'); 
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async schedule_list_paginate(dto: any): Promise<Schedule>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var schedule_id: any = dto.schedule_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.ScheduleRepository.createQueryBuilder('schedule');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT schedule.schedule_id)', 'cnt');
      } else {  
        query.select([  
            'schedule.schedule_id AS schedule_id', 
			      'schedule.schedule_name AS schedule_name', 
            'd.device_name AS device_name',  
            'schedule.device_id AS device_id', 
            'schedule.start AS start', 
            'schedule.event AS event', 
            'schedule.sunday AS sunday', 
            'schedule.monday AS monday', 
            'schedule.tuesday AS tuesday', 
            'schedule.wednesday AS wednesday', 
            'schedule.thursday AS thursday', 
            'schedule.friday AS friday', 
            'schedule.saturday AS saturday',  
            'schedule.createddate AS createddate',
            'schedule.updateddate AS updateddate',
            'schedule.status AS status',          
        ]);
        query.leftJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= schedule.schedule_id"
                    );  
      }   
      if (keyword) {
          query.andWhere('schedule.schedule_name like :schedule_name', {schedule_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.schedule_id) {
        query.andWhere('schedule.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
      }if (dto.event) {
        query.andWhere('schedule.event=:event', { event: dto.event });
      }if (dto.sunday) {
        query.andWhere('schedule.sunday=:sunday', { sunday: dto.sunday });
      } if (dto.monday) {
        query.andWhere('schedule.monday=:monday', { monday: dto.monday });
      } if (dto.tuesday) {
        query.andWhere('schedule.tuesday=:tuesday', { tuesday: dto.tuesday });
      } if (dto.wednesday) {
        query.andWhere('schedule.wednesday=:wednesday', { wednesday: dto.wednesday });
      } if (dto.thursday) {
        query.andWhere('schedule.thursday=:thursday', { thursday: dto.thursday });
      } if (dto.friday) {
        query.andWhere('schedule.friday=:friday', { friday: dto.friday });
      } if (dto.saturday) {
        query.andWhere('schedule.saturday=:saturday', { saturday: dto.saturday });
      }  
      if (dto.createddate) {
        query.andWhere('schedule.createddate=:createddate', { createddate: dto.createddate });
      }
      if (dto.updateddate) {
        query.andWhere('schedule.updateddate=:updateddate', { updateddate: dto.updateddate });
      }
      if (dto.status) {
        query.andWhere('schedule.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `schedule.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`schedule.schedule_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Sms **********/ 
  async maxidx_Sms(): Promise<Sms> { 
        try {
          const RS:any = await this.NoderedRepository.query('SELECT MAX(sms_id) AS sms_id FROM sd_iot_sms');
          console.log('sms_id');console.info(RS);
          var sms_id:any=RS['0'].sms_id;
          console.log('max_sms_id=');console.info(sms_id);
          var max_sms_id:any=max_sms_id+1;
          console.log('max_sms_id=');console.info(max_sms_id);
          return max_sms_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async maxid_Sms(): Promise<Sms> { 
        try {
          const RS:any = await this.NoderedRepository.query('SELECT MAX(nodered_id) AS nodered_id FROM sd_iot_sms');
          console.log('sms_id');console.info(RS);
          var sms_id:any=RS['0'].sms_id;
          console.log('max_sms_id=');console.info(sms_id);
          var max_sms_id:any=max_sms_id+1;
          console.log('max_sms_id=');console.info(max_sms_id);
          return max_sms_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_sms(dto: any): Promise<Sms> { console.log('create_sms=>');console.info(dto);   
        const result: any = await this.SmsRepository.save(
          this.SmsRepository.create(dto),
        );
        return result;
  }
  async delete_sms(sms_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting sms with sms_id: ${sms_id}`);
            const constsms = await this.get_sms(sms_id);
            if (!constsms) {
                throw new NotFoundException(`sms_id with sms_id ${sms_id} not found`);
            } 
              var criteria:any = { sms_id: sms_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.SmsRepository.delete(criteria);
              console.log(`result:`, result);
            } catch (error) {
            this.logger.error(`Error while deleting sms_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_sms(sms_id: any): Promise<Sms> {
        try {
        const rs:any = await this.SmsRepository.findOne({
            where: {
            sms_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }  
  async update_sms_status(sms_id: any, status: number): Promise<number> {
    console.log(`Updating devices with bucket '${sms_id}' to status ${status}`);
    try { 
        if(status==1){
              var DataUpdate: any = {};
              var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
              var updateddate = moment(new Date(), DATE_TIME_FORMAT);
              var statusset: any ='0';
              DataUpdate.status =statusset;   
              DataUpdate.updateddate = Date(); 
              console.log('update DataUpdate'); console.info(DataUpdate);
              await this.HostRepository
                  .createQueryBuilder()
                  .update('sd_iot_sms')
                  .set(DataUpdate)
                  //.where('sms_id!=:sms_id', { sms_id: sms_id })
                  .execute(); 
        }
        var updateResult = await this.SmsRepository.update({ sms_id: sms_id },{ status: status });
        // ตรวจสอบว่ามีรายการถูกอัปเดตหรือไม่
        if (updateResult.affected == 0) {
          this.logger.warn(`No devices found for mqtt_id '${sms_id}'. Update failed.`);
          throw new NotFoundException(`No devices found with bucket '${sms_id}'`);
        } 
        this.logger.log(`${updateResult.affected} device(s) updated successfully for sms_id '${sms_id}'.`); 
        // คืนค่าจำนวนแถวที่ถูกอัปเดต ซึ่งเป็นประโยชน์มากกว่า
      return updateResult.affected;
    } catch (err) {
        // ถ้าเป็น NotFoundException ที่เราโยนเอง ก็ให้มันออกไปตรงๆ
        if (err instanceof NotFoundException) {
          throw err;
        }
        // สำหรับ Error อื่นๆ ที่ไม่คาดคิด ให้ log และโยนเป็น Internal Server Error
        this.logger.error(`Failed to update device status for mqtt_id '${sms_id}'. Error: ${err.message}`, err.stack);
        throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async get_name_create_sms(sms_name: any): Promise<Sms> {
        try {
          console.log('sms_name=>');console.info(sms_name);
          const rs:any = await this.SmsRepository.findOne({
              where: {
              sms_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_sms(dto) {
        // const sms_idx:any = JSON.parse(dto.sms_id);
        let sms_id = dto.sms_id;
        const DataUpdate: any = {};
        const query: any = await this.SmsRepository.createQueryBuilder('sms');
        query.select(['sms.sms_id AS sms_id']);
        query.where('1=1');
        query.andWhere('sms.sms_id=:sms_id', { sms_id: sms_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with sms_id ${sms_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found sms_idsms_id ${sms_id}.`,
                message_th: `ไม่พบข้อมูล sms_idsms_id ${sms_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('sms_idx =>'+sms_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
            /*
              sd_iot_sms
                    sms_id
                    sms_name
                    host
                    port
                    username
                    password
                    apikey
                    originator
                    createddate
                    updateddate
                    status
            */ 
        }
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.SmsRepository
            .createQueryBuilder()
            .update('sd_iot_sms')
            .set(DataUpdate)
            .where('sms_id=:sms_id', { sms_id: sms_id })
            .execute();
        return 200;
  }
  async sms_all(): Promise<Sms> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.SmsRepository.createQueryBuilder('sms'); 
      query.select(['sms.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async sms_list_paginate(dto: any): Promise<Sms> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var sms_id: any = dto.sms_id; 
      var sms_type_id: any = dto.sms_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.SmsRepository.createQueryBuilder('sms');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
         var countRs: number = await query.select('COUNT(DISTINCT sms.sms_id)', 'cnt');
      } else { 
        query.select([  
            'sms.sms_id AS sms_id', 
            'sms.sms_name AS sms_name',  
            'sms.host AS host', 
            'sms.port AS port', 
            'sms.username AS username',  
            'sms.password AS password',
            'sms.apikey AS apikey',
            'sms.originator AS originator',
            'sms.updateddate AS updateddate',
            'sms.status AS status',          
        ]);
      } 
      if (keyword) {
          query.andWhere('sms.sms_name like :sms_name', {sms_name: keyword ? `%${keyword}%` : '%',});
      }if (sms_id) {
        query.andWhere('sms.sms_id=:sms_id', { sms_id: sms_id });
      }if (dto.host) {
        query.andWhere('sms.host=:host', { host:  dto.host });
      }if (dto.port) {
        query.andWhere('sms.port=:port', { port:  dto.port });
      }if (dto.username) {
        query.andWhere('sms.username=:username', { username:  dto.username });
      }if (dto.password) {
        query.andWhere('sms.password=:password', { password:  dto.password });
      }if (sms_id) {
        query.andWhere('sms.sms_id=:sms_id', { sms_id: sms_id });
      }if (dto.apikey) {
        query.andWhere('sms.apikey=:apikey', { apikey: dto.apikey });
      }if (dto.originator) {
        query.andWhere('sms.originator=:originator', { originator: dto.originator });
      }if (dto.updateddate) {
        query.andWhere('sms.updateddate=:updateddate', { updateddate:  dto.updateddate });
      }if (dto.status) {
        query.andWhere('sms.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else { 
        query.orderBy(`sms.createddate`, 'DESC');
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /*
      sms_id
      sms_name
      host
      port
      username
      password
      createddate
      updateddate
      status
      apikey
      originator

    SELECT "sms"."sms_id" AS sms_id, "sms"."sms_name" AS sms_name,
      "sms"."host" AS host, "sms"."port" AS port, 
      "sms"."username" AS username, "sms"."password" AS password,
      "sms"."apikey" AS apikey, "sms"."originator" AS originator, 
      "sms"."updateddate" AS updateddate, "sms"."status" AS status 
      FROM "public"."sd_iot_sms" "sms" 
      ORDER BY "sms"."updateddate" DESC  
      LIMIT 1000
  */
  /********Token**********/ 
  async maxid_Token(): Promise<Token> { 
        try {
          const RS:any = await this.TokenRepository.query('SELECT MAX(token_id) AS token_id FROM sd_iot_token');
          console.log('token_id');console.info(RS);
          var token_id:any=RS['0'].token_id;
          console.log('max_token_id=');console.info(token_id);
          var max_token_id:any=max_token_id+1;
          console.log('max_token_id=');console.info(max_token_id);
          return max_token_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_token(dto: any): Promise<Token> { 
        console.log('create_token=>');console.info(dto);   
        const result: any = await this.TokenRepository.save(
          this.TokenRepository.create(dto),
        );
        return result;
  }
  async delete_token(token_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting sms with token_id: ${token_id}`);
            const constsms = await this.get_token(token_id);
            if (!constsms) {
                throw new NotFoundException(`token_id with token_id ${token_id} not found`);
            } 
              var criteria:any = { token_id: token_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.TokenRepository.delete(criteria);
              console.log(`result:`, result);
            } catch (error) {
            this.logger.error(`Error while deleting token_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_token(token_id: any): Promise<Token> {
        try {
        const rs:any = await this.TokenRepository.findOne({
            where: {
            token_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_token(token_name: any): Promise<Token> {
        try {
          console.log('token_name=>');console.info(token_name);
          const rs:any = await this.TokenRepository.findOne({
              where: {
              token_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_token(dto) {
        // const token_idx:any = JSON.parse(dto.token_id);
        let token_id = dto.token_id;
        const DataUpdate: any = {};
        const query: any = await this.TokenRepository.createQueryBuilder('sms');
        query.select(['sms.token_id AS token_id']);
        query.where('1=1');
        query.andWhere('sms.token_id=:token_id', { token_id: token_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with token_id ${token_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found token_idtoken_id ${token_id}.`,
                message_th: `ไม่พบข้อมูล token_idtoken_id ${token_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('token_idx =>'+token_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.TokenRepository
            .createQueryBuilder()
            .update('sd_iot_token')
            .set(DataUpdate)
            .where('token_id=:token_id', { token_id: token_id })
            .execute();
        return 200;
  }
  async token_all(): Promise<Token> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.TokenRepository.createQueryBuilder('sms'); 
      query.select(['sms.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async token_list_paginate(dto: any): Promise<Token> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var token_id: any = dto.token_id; 
      var token_type_id: any = dto.token_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.TokenRepository.createQueryBuilder('token');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT token.token_id)', 'cnt');
      } else { 
        query.select([  
            'token.token_id AS token_id', 
            'token.token_name AS token_name',  
            'token.host AS host', 
            'token.port AS port', 
            'token.username AS username',  
            'token.password AS password',
            'token.updateddate AS updateddate',
            'token.status AS status',          
        ]);
      }  
      if (keyword) {
          query.andWhere('token.token_name like :token_name', {token_name: keyword ? `%${keyword}%` : '%',});
      }if (token_id) {
        query.andWhere('token.token_id=:token_id', { token_id: token_id });
      }if (dto.host) {
        query.andWhere('token.host=:host', { host:  dto.host });
      }if (dto.port) {
        query.andWhere('token.port=:port', { port:  dto.port });
      }if (dto.username) {
        query.andWhere('token.username=:username', { username:  dto.username });
      }if (dto.password) {
        query.andWhere('token.password=:password', { password:  dto.password });
      }if (dto.updateddate) {
        query.andWhere('token.updateddate=:updateddate', { updateddate:  dto.updateddate });
      }if (dto.status) {
        query.andWhere('token.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `token.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`token.token_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /********Telegram **********/ 
  async maxid_telegram(): Promise<Telegram> { 
        try {
          const RS:any = await this.TelegramRepository.query('SELECT MAX(telegram_id) AS telegram_id FROM sd_iot_telegram');
          console.log('telegram_id');console.info(RS);
          var telegram_id:any=RS['0'].telegram_id;
          console.log('max_telegram_id=');console.info(telegram_id);
          var max_telegram_id:any=max_telegram_id+1;
          console.log('max_telegram_id=');console.info(max_telegram_id);
          return max_telegram_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_telegram(dto: any): Promise<Telegram> { console.log('create_Telegram=>');console.info(dto);   
        const result: any = await this.TelegramRepository.save(
          this.TelegramRepository.create(dto),
        );
        return result;
  }
  async delete_telegram(telegram_id: any): Promise<void> {
            try {
            this.logger.log(`Deleting Telegram with telegram_id: ${telegram_id}`);
            const constTelegram = await this.get_telegram(telegram_id);
            if (!constTelegram) {
                throw new NotFoundException(`telegram_id with telegram_id ${telegram_id} not found`);
            } 
              var criteria:any = { telegram_id: telegram_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.TelegramRepository.delete(criteria);
              console.log(`result:`, result);
            } catch (error) {
            this.logger.error(`Error while deleting telegram_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
            }
  }
  async get_telegram(telegram_id: any): Promise<Telegram> {
        try {
        const rs:any = await this.TelegramRepository.findOne({
            where: {
            telegram_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_telegram(telegram_name: any): Promise<Telegram> {
        try {
          console.log('telegram_name=>');console.info(telegram_name);
          const rs:any = await this.TelegramRepository.findOne({
              where: {
              telegram_name,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async update_telegram(dto) {
        // const telegram_idx:any = JSON.parse(dto.telegram_id);
        let telegram_id = dto.telegram_id;
        const DataUpdate: any = {};
        const query: any = await this.TelegramRepository.createQueryBuilder('Telegram');
        query.select(['Telegram.telegram_id AS telegram_id']);
        query.where('1=1');
        query.andWhere('Telegram.telegram_id=:telegram_id', { telegram_id: telegram_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with telegram_id ${telegram_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found telegram_idtelegram_id ${telegram_id}.`,
                message_th: `ไม่พบข้อมูล telegram_idtelegram_id ${telegram_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('telegram_idx =>'+telegram_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }
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
        }
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        console.log('update DataUpdate'); console.info(DataUpdate);
        await this.TelegramRepository
            .createQueryBuilder()
            .update('sd_iot_telegram')
            .set(DataUpdate)
            .where('telegram_id=:telegram_id', { telegram_id: telegram_id })
            .execute();
        return 200;
  }
  async telegram_all(): Promise<Telegram> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.TelegramRepository.createQueryBuilder('Telegram'); 
      query.select(['Telegram.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async telegram_list_paginate(dto: any): Promise<Telegram> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var telegram_id: any = dto.telegram_id; 
      var telegram_type_id: any = dto.telegram_type_id; 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.TelegramRepository.createQueryBuilder('Telegram');
      if (isCount == 1) {
       // var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT Telegram.telegram_id)', 'cnt');
      } else { 
        query.select([  
            'Telegram.telegram_id AS telegram_id', 
            'Telegram.telegram_name AS telegram_name',  
            'Telegram.host AS host', 
            'Telegram.port AS port', 
            'Telegram.username AS username',  
            'Telegram.password AS password',
            'Telegram.updateddate AS updateddate',
            'Telegram.status AS status',          
        ]);
      }  
      if (keyword) {
          query.andWhere('Telegram.telegram_name like :telegram_name', {telegram_name: keyword ? `%${keyword}%` : '%',});
      }if (telegram_id) {
        query.andWhere('Telegram.telegram_id=:telegram_id', { telegram_id: telegram_id });
      }if (dto.host) {
        query.andWhere('Telegram.host=:host', { host:  dto.host });
      }if (dto.port) {
        query.andWhere('Telegram.port=:port', { port:  dto.port });
      }if (dto.username) {
        query.andWhere('Telegram.username=:username', { username:  dto.username });
      }if (dto.password) {
        query.andWhere('Telegram.password=:password', { password:  dto.password });
      }if (dto.updateddate) {
        query.andWhere('Telegram.updateddate=:updateddate', { updateddate:  dto.updateddate });
      }if (dto.status) {
        query.andWhere('Telegram.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `Telegram.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`Telegram.telegram_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
 /********deviceactionuserlog**********/ 
  async maxid_Deviceactionlog(): Promise<Deviceactionlog> { 
        try {
          const RS:any = await this.DeviceactionlogRepository.query('SELECT MAX(log_id) AS log_id FROM sd_iot_device_action_log');
          console.log('log_id');console.info(RS);
          var log_id:any=RS['0'].log_id;
          console.log('max_log_id=');console.info(log_id);
          var max_log_id:any=max_log_id+1;
          console.log('max_log_id=');console.info(max_log_id);
          return max_log_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_deviceactionuserlog(dto: any): Promise<Deviceactionlog> { 
        console.log('create_deviceactionuserlog=>');console.info(dto);   
        const result: any = await this.DeviceactionlogRepository.save(
          this.DeviceactionlogRepository.create(dto),
        );
        return result;
  }
  async delete_deviceactionuserlog(log_id: any): Promise<void> {
          try {
            this.logger.log(`Deleting log with log_id: ${log_id}`);
            const constlog = await this.get_deviceactionuserlog(log_id);
            if (!constlog) {
                throw new NotFoundException(`log_id with log_id ${log_id} not found`);
            } 
            //await this.DeviceactionlogRepository.delete(log_id); 
              var criteria:any = { log_id: log_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.DeviceactionlogRepository.delete(criteria);
              console.log(`result:`, result);
          } catch (error) {
            this.logger.error(`Error while deleting log_id = ${error}`);
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: {
                errorMessage: error.message,
                },
            });
           }
  } 
  // deleteAlarmuserlog =>alarm_action_id ,device_id,uid
  async deleteAlarmuserlog(dto: any): Promise<void> {
      const query: any = await this.DeviceactionlogRepository.createQueryBuilder('log');
      //var countRs: number = await query.getCount();
      var countRs: number = await query.select('COUNT(DISTINCT log.*)', 'cnt');
      if (dto.alarm_action_id) {
          query.andWhere('log.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }
      if (dto.device_id) {
         query.andWhere('log.device_id=:device_id', { device_id: dto.device_id});
      }
      if (dto.uid) {
          query.andWhere('log.uid=:uid', { uid:  dto.uid });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql(); 
      var count: any = await query.getCount();
      let tempCounts: any = {};
      tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
    if(tempCounts.count==0){
        return tempCounts.count;
    }else if(count==0){
        return count;
    }
    var result:any = await this.DeviceactionlogRepository.delete({alarm_action_id: dto.alarm_action_id,device_id: dto.device_id,uid: dto.uid});
    // Optionally, check if any row was deleted
    if (result.affected == 0) {
      throw new NotFoundException('No alarm record found matching the criteria.');
    }
    return result;
  }
  async get_deviceactionuserlog(log_id: any): Promise<Deviceactionlog> {
        try {
        const rs:any = await this.DeviceactionlogRepository.findOne({
            where: {
            log_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  } 
  async get_name_create_deviceactionuserlog(alarm_action_id: any): Promise<Deviceactionlog> {
        try {
          console.log('alarm_action_id=>');console.info(alarm_action_id);
          const rs:any = await this.DeviceactionlogRepository.findOne({
              where: {
              alarm_action_id,
              },
          });
          //console.log('getUser=>');console.info(user);
          return rs;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async deviceactionuserlog_all(): Promise<Deviceactionlog> {
    console.log(`=group_all=`); 
    try { 
      const query: any = await this.DeviceactionlogRepository.createQueryBuilder('log'); 
      query.select(['log.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async deviceactionuserlog_list_paginate(dto: any): Promise<Deviceactionlog> {
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var log_id: any = dto.log_id; 
      var device_id: any = dto.device_id; 
      var uid: any = dto.uid || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceactionlogRepository.createQueryBuilder('log');
      if (isCount == 1) {
        //var countRs: number = await query.getCount();
        var countRs: number = await query.select('COUNT(DISTINCT log.log_id)', 'cnt');
      } else { 
        query.select([  
            'log.log_id AS log_id', 
            'log.alarm_action_id AS alarm_action_id',  
            'log.device_id AS device_id', 
            'log.uid AS uid', 
            'log.createddate AS createddate',  
            'log.status AS status',         
        ]);
      }  
       if (log_id) {
        query.andWhere('log.log_id=:log_id', { log_id: log_id });
      }if (dto.device_id) {
        query.andWhere('log.device_id=:device_id', { device_id:  dto.device_id });
      }if (dto.uid) {
        query.andWhere('log.uid=:uid', { uid:  dto.uid });
      }if (dto.createddate) {
        query.andWhere('log.createddate=:createddate', { createddate:  dto.createddate });
      }if (dto.status) {
        query.andWhere('log.status=:status', { status:  dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `log.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`log.log_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***********************************alarmdevice*************************************/ 
  async maxid_alarmDevice(): Promise<alarmDevice> { 
        try {
          const RS:any = await this.alarmDeviceRepository.query('SELECT MAX(id) AS id FROM sd_iot_alarm_device');
          console.log('id');console.info(RS);
          var id:any=RS['0'].id;
          console.log('max_id=');console.info(id);
          var max_id:any=max_id+1;
          console.log('max_id=');console.info(max_id);
          return max_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async alarm_device_alarm_all(): Promise<alarmDevice> {
    console.log(`=alarmDevice=`); 
    try { 
      const query: any = await this.alarmDeviceRepository.createQueryBuilder('al'); 
      query.select(['al.*',]); 
      return await query.getRawMany(); 
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async update_alarm_device_alarm(dto) {
        // const sensor_idx:any = JSON.parse(dto.sensor_id);
        let alarm_action_id = dto.alarm_action_id;
        const DataUpdate: any = {};
        const query: any = await this.alarmDeviceRepository.createQueryBuilder('al');
        query.select(['al.alarm_action_id AS alarm_action_id']);
        query.where('1=1');
        query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with alarm_action_id ${alarm_action_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found alarm_action_id ${alarm_action_id}.`,
                message_th: `ไม่พบข้อมูล alarm_action_id ${alarm_action_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('sensor_idx =>'+sensor_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        } 
        if (dto.alarm_action_id) {
            DataUpdate.alarm_action_id = dto.alarm_action_id;
        } 
        if (dto.device_id) {
            DataUpdate.device_id = dto.device_id;
        } 
        if (dto.action_name) {
            DataUpdate.action_name = dto.action_name;
        } 
        if (dto.event) {
            DataUpdate.event = dto.event;
        } 
        if (dto.status_warning) {
            DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning) {
            DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert) {
            DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert) {
            DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm) {
            DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm) {
            DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm) {
            DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm) {
            DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm){
            DataUpdate.nonc_alarm = dto.nonc_alarm;
         } 
        if (dto.time_life) {
            DataUpdate.time_life = dto.time_life;
        } 
        if (dto.status) {
            DataUpdate.status = dto.status;
        } 
        await this.alarmDeviceRepository
            .createQueryBuilder()
            .update('sd_iot_sensor')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id })
            .execute();
        return 200;
  }
  async create_alarm_device(dto: any): Promise<alarmDevice>{ 
        console.log('create_alarmdevice=>');console.info(dto);   
        var result: any = await this.alarmDeviceRepository.save(
          this.alarmDeviceRepository.create(dto),
        );
        return result;
  } 
  async get_alarm_device_alarm_action_id(alarm_action_id: number): Promise<alarmDevice | null> {
      try {
        var alarmdevice:any = await this.alarmDeviceRepository.findOne({
          where: { alarm_action_id },
        });
        return alarmdevice || null;
      } catch (err) {
        this.logger.error(`Error fetching alarm_action_id ${alarm_action_id}: ${err.message}`, err.stack);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: err.message,
          },
        });
      }
  } 
  async delete_alarm_device_alarm_action_id_get(alarm_action_id: number): Promise<void> {
    try {
        this.logger.log(`Deleting alarmdevice with alarm_action_id: ${alarm_action_id}`);
            /***********************/ 
            const query: any = await this.alarmDeviceRepository.createQueryBuilder('al');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT al.alarm_action_id)', 'cnt');
            query.where('1=1'); 
            query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = {alarm_action_id: alarm_action_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            } 
         /***********************/
        const result = await this.alarmDeviceRepository.delete(alarm_action_id); 
        if (result.affected == 0) {
          throw new NotFoundException(`Schedule with alarm_action_id ${alarm_action_id} not found`);
        } 
        this.logger.log(`Successfully deleted alarm_action_id: ${alarm_action_id}`);
    } catch (error) {
        this.logger.error(`Error while deleting alarm_action_id: ${alarm_action_id} - ${error.message}`);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: error.message,
          },
        });
    }
  }
  async delete_alarm_device_id_alarm_get(device_id: number): Promise<void> {
    try {
        this.logger.log(`Deleting alarmdevice with alarm_action_id: ${device_id}`);
            /***********************/ 
            const query: any = await this.alarmDeviceRepository.createQueryBuilder('al');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT al.device_id)', 'cnt');
            query.where('1=1'); 
            query.andWhere('al.device_id=:device_id', { device_id: device_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = {device_id: device_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            } 
         /***********************/
            // const result = await this.alarmDeviceRepository.delete(device_id); 
              var criteria:any = { device_id: device_id};
              console.log(`Attempting to delete record with criteria:`, criteria);
              const result:any =await this.alarmDeviceRepository.delete(criteria);
              console.log(`result:`, result);
        if (result.affected == 0) {
          throw new NotFoundException(`Schedule with device_id ${device_id} not found`);
        } 
        this.logger.log(`Successfully deleted device_id: ${device_id}`);
    } catch (error) {
        this.logger.error(`Error while deleting device_id: ${device_id} - ${error.message}`);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: error.message,
          },
        });
    }
  }
  /*******alarm_device_id_alarm_delete*********/
  async alarm_device_id_alarm_delete(dto: any): Promise<Devicealarmaction> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
        var device_id: any = dto.device_id;  
        var alarm_action_id: any = dto.alarm_action_id;    
        const query: any = await this.DevicealarmactionRepository.createQueryBuilder('al');
        var countRs: any = await  query.select('COUNT(DISTINCT al.device_id)', 'cnt'); 
        query.where('1=1');  
        if (alarm_action_id) {
          query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
        }if (device_id) {
          query.andWhere('al.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          if(count>=1){
            if (alarm_action_id) {
                const criteria:any = {alarm_action_id: alarm_action_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                      const deleteResult:any =await this.DevicealarmactionRepository.delete(criteria); 
                    /*********************/ 
                     // const deleteResults:any = await this.alarmDeviceRepository.delete({ alarm_action_id }); 
                    //  const deleteResults2:any = await this.alarmDeviceEventRepository.delete({ alarm_action_id });
                    /*********************/  
                    var criteria1:any = { alarm_action_id: alarm_action_id};
                    console.log(`Attempting to delete record with criteria1:`, criteria1);
                    const deleteResults:any =await this.alarmDeviceRepository.delete(criteria1);
                    console.log(`deleteResults:`, deleteResults); 
                    const deleteResults2:any =await this.alarmDeviceEventRepository.delete(criteria1);
                    console.log(`deleteResults2:`, deleteResults2);

                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            }if (device_id) {
                const criteria:any = {device_id: device_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            } 
        }
        return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  /*******alarm_device_id_alarm_delete*********/
  async alarm_device_id_alarm_deletev2(dto: any): Promise<alarmDevice> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
        var device_id: any = dto.device_id;  
        var alarm_action_id: any = dto.alarm_action_id;    
        const query: any = await this.alarmDeviceRepository.createQueryBuilder('al');
        var countRs: any = await  query.select('COUNT(DISTINCT al.device_id)', 'cnt'); 
        query.where('1=1');  
        if (alarm_action_id) {
          query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
        }if (device_id) {
          query.andWhere('al.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          if(count>=1){
            if (alarm_action_id) {
                const criteria:any = {alarm_action_id: alarm_action_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    await this.DevicealarmactionRepository.delete(criteria); 
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            }if (device_id) {
                const criteria:any = {device_id: device_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    } 
            } 
        }
        return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async alarm_device_id_alarm_count(dto: any): Promise<alarmDevice> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
        var alarm_action_id: any = dto.alarm_action_id;   
        var device_id: any = dto.device_id;    
        const query: any = await this.alarmDeviceRepository.createQueryBuilder('al');
        var countRs: any = await  query.select('COUNT(DISTINCT al.device_id)', 'cnt'); 
        query.where('1=1');  
        if (alarm_action_id) {
          query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
        }if (device_id) {
          query.andWhere('al.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async alarm_device_paginate(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var alarm_action_id: any = dto.alarm_action_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status; 
      var sort: string = dto.sort;
      var page: any = dto.page || 1;
      var pageSize: any = dto.pageSize || 10;
      var isCount: any = dto.isCount || 0;
      const query: any = await this.DevicealarmactionRepository.createQueryBuilder('al');  
      if (isCount == 1) {  
         var countRs: number = await query.select('COUNT(DISTINCT al.alarm_action_id)', 'cnt');
      } else {    
        query.select([  
            'al.*',          
        ]);
        //   query.leftJoin(
        //                   "sd_iot_alarm_device",
        //                   "ad",
        //                   "ad.device_id= al.device_id"
        //               );  
      }   
      if (keyword) {
        query.andWhere('al.action_name like :action_name', {action_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.alarm_action_id) {
        query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }if (dto.event) {
        query.andWhere('al.event=:event', { event: dto.event });
      }if (status) {
        query.andWhere('al.status=:status', { status: status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `al.alarm_action_id.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`al.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }  
  async alarm_device_paginate_status(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var alarm_action_id: any = dto.alarm_action_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status; 
      var sort: string = dto.sort;
      var page: any = dto.page || 1;
      var pageSize: any = dto.pageSize || 10;
      var isCount: any = dto.isCount || 0;
      const query: any = await this.DevicealarmactionRepository.createQueryBuilder('al');  
      if (isCount == 1) {  
         var countRs: number = await query.select('COUNT(DISTINCT al.alarm_action_id)', 'cnt');
      } else {    
        query.select([  
            'al.*',          
        ]);
      }   
      if (keyword) {
        query.andWhere('al.action_name like :action_name', {action_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.alarm_action_id) {
        query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }if (dto.event) {
        query.andWhere('al.event=:event', { event: dto.event });
      }
      var status:any=1;
      query.andWhere('al.status=:status', { status: status });
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `al.alarm_action_id.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`al.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }  
  async get_alarm_device_map(alarm_action_id: number): Promise<alarmDevice | null> {
      try {
        const rs:any = await this.alarmDeviceRepository.findOne({
          where: { alarm_action_id },
        });
        return rs || null;
      } catch (err) {
        this.logger.error(`Error fetching alarm_action_id ${alarm_action_id}: ${err.message}`, err.stack);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: err.message,
          },
        });
      }
  }
  async get_alarm_device(alarm_action_id: number): Promise<Devicealarmaction | null> {
      try {
        const schedule:any = await this.DevicealarmactionRepository.findOne({
          where: { alarm_action_id },
        });
        return schedule || null;
      } catch (err) {
        this.logger.error(`Error fetching alarm_action_id ${alarm_action_id}: ${err.message}`, err.stack);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: err.message,
          },
        });
      }
  }
  async update_alarm_device_status_val(alarm_action_id: number, dto: any): Promise<number> {
    try {
      console.log(`Updating devices with alarm_action_id '${alarm_action_id}'`);
      console.log(`dto:`, dto);
      const DataUpdate: any = {};
      // อัปเดตเฉพาะวันที่มีการส่งค่ามา (ไม่ใช่ undefined และไม่ใช่ค่าว่าง)
      const valdata1 = ['status_warning','recovery_warning', 'status_alert', 'recovery_alert', 'email_alarm', 'line_alarm', 'telegram_alarm', 'sms_alarm', 'nonc_alarm', 'event', 'status'];
      const valdata = ['action_name','status_warning','recovery_warning', 'status_alert', 'recovery_alert', 'email_alarm', 'line_alarm', 'telegram_alarm', 'sms_alarm', 'nonc_alarm','time_life', 'event', 'status'];
      
      for (const da of valdata) {
        if (dto[da] !== undefined && dto[da] !== '') {
          DataUpdate[da] = dto[da];
        }
      } 
      if (Object.keys(DataUpdate).length == 0) {
        this.logger.warn(`No valid fields to update for alarm_action_id '${alarm_action_id}'.`);
        throw new UnprocessableEntityException('No valid fields to update.');
      }

      const updateResult = await this.scheduleDeviceRepository
        .createQueryBuilder()
        .update('sd_iot_device_alarm_action')
        .set(DataUpdate)
        .where('alarm_action_id=:alarm_action_id', { alarm_action_id })
        .execute();

      if (updateResult.affected == 0) {
        this.logger.warn(`No devices found for alarm_action_id '${alarm_action_id}'. Update failed.`);
        throw new NotFoundException(`No devices found with alarm_action_id '${alarm_action_id}'`);
      }

      this.logger.log(`${updateResult.affected} device(s) updated successfully for alarm_action_id '${alarm_action_id}'.`);
      return updateResult.affected;

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      this.logger.error(`Failed to update device status for schedule_id '${alarm_action_id}'. Error: ${err.message}`, err.stack);
      throw new UnprocessableEntityException('An unexpected error occurred while updating status.');
    }
  }
  async update_alarm_device(dto) {
        // const sensor_idx:any = JSON.parse(dto.sensor_id);
        var alarm_action_id = dto.alarm_action_id;
        var DataUpdate: any = {};  
        var query: any = await this.DevicealarmactionRepository.createQueryBuilder('al');
        query.select(['al.alarm_action_id AS alarm_action_id']);
        query.where('1=1');
        query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        var count: any = await query.getCount();
        var dataRs: any = await query.getRawMany();
        // console.info(dto)
        // return dto
        if (!dataRs) {
            throw new NotFoundException(`Data with alarm_action_id ${alarm_action_id} not found`);
            var result: any = {
                statusCode: 200,
                code: 422,
                message: `Data not found alarm_action_id ${alarm_action_id}.`,
                message_th: `ไม่พบข้อมูล alarm_action_id ${alarm_action_id}.`,
                payload: null,
            };
            return result;
        } else {
            // console.log('sensor_idx =>'+sensor_idx);  console.log(`count=`); console.info(count);
            // console.log('**************** dataRs =>'+dataRs+'****************');
            // console.info(dataRs);
        }  
        if (dto.action_name!='') {
            DataUpdate.action_name = dto.action_name;
        } 
        if (dto.status_warning!='') {
            DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {
            DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
            DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
            DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
            DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm!='') {
            DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm) {
            DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
            DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
            DataUpdate.nonc_alarm = dto.nonc_alarm;
         } 
        if (dto.time_life!='') {
            DataUpdate.time_life = dto.time_life;
        }  
        if (dto.event!='') {
            DataUpdate.event = dto.event;
        } 
        if (dto.status!='') {
            DataUpdate.status = dto.status;
        } 
        await this.alarmDeviceRepository
            .createQueryBuilder()
            .update('sd_iot_device_alarm_action')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id })
            .execute();
        return 200;
  }
  async create_alarmdevice(dto: any): Promise<Devicealarmaction>{ 
        // var schedule_id = dto.schedule_id;
        // var device_id = dto.device_id;
        console.log('create dto=>');console.info(dto);   
        const DataAdd: any = {};
         const valdata = ['action_name','status_warning','recovery_warning', 'status_alert', 'recovery_alert', 'email_alarm', 'line_alarm', 'telegram_alarm', 'sms_alarm', 'nonc_alarm','time_life', 'event', 'status'];
      
      for (const da of valdata) {
        if (dto[da] !== undefined && dto[da] !== '') {
          DataAdd[da] = dto[da];
        }
      } 
      DataAdd.status = 1;
            const result: any = await this.DevicealarmactionRepository.save(
            this.DevicealarmactionRepository.create(DataAdd),
        );
        return result;
  } 
  /*******active*********/
  async device_alarm_list_paginate(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var schedule_id: any = dto.schedule_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DevicealarmactionRepository.createQueryBuilder('alarm');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT alarm.alarm_action_id)', 'cnt');
      } else {  
        query.select([  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
           
        ]);
        query.leftJoin(
                        "sd_iot_alarm_device",
                        "al",
                        "al.alarm_action_id= alarm.alarm_action_id"
                    );  
      } 
      query.where('1=1'); 
      if (keyword) {
          query.andWhere('alarm.action_name like :action_name', {action_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.alarm_action_id) {
        query.andWhere('alarm.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }if (dto.event) {
        query.andWhere('alarm.event=:event', { event: dto.event });
      }if (dto.status_warning) {
        query.andWhere('alarm.status_warning=:status_warning', { status_warning: dto.status_warning });
      } if (dto.recovery_warning) {
        query.andWhere('alarm.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      } if (dto.status_alert) {
        query.andWhere('alarm.status_alert=:status_alert', { status_alert: dto.status_alert });
      } if (dto.recovery_alert) {
        query.andWhere('alarm.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      } if (dto.email_alarm) {
        query.andWhere('alarm.email_alarm=:email_alarm', { email_alarm: dto.email_alarm });
      } if (dto.line_alarm) {
        query.andWhere('alarm.line_alarm=:line_alarm', { line_alarm: dto.line_alarm });
      } if (dto.telegram_alarm) {
        query.andWhere('alarm.telegram_alarm=:telegram_alarm', { telegram_alarm: dto.telegram_alarm });
      }  
      if (dto.sms_alarm) {
        query.andWhere('alarm.sms_alarm=:sms_alarm', { sms_alarm: dto.sms_alarm });
      }
      if (dto.nonc_alarm) {
        query.andWhere('alarm.nonc_alarm=:nonc_alarm', { nonc_alarm: dto.nonc_alarm });
      }
      if (dto.status) {
        query.andWhere('alarm.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `alarm.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`alarm.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async alarm_device_list_paginate_all_active(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var alarm_action_id: any = dto.alarm_action_id;  
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
     
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id',  
            'ad.alarm_action_id AS alarm_action_id',
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
        ]); 
      }   
       query.leftJoin(
                        "sd_iot_alarm_device",
                        "ad",
                        "ad.device_id= d.device_id"
                    ); 
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
    query.where('1=1'); 
    var status: any = 1;
    query.andWhere('d.status=:status', { status: status });
    query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
     
      // if (alarm_action_id) {
      //   query.andWhere('ad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      // } if (device_id) {
      //   query.andWhere('d.device_id=:device_id', { device_id: device_id });
      // }
      if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else { 
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
       throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: { args: { errorMessage: error.message || error } }
        });
    }
  }
  async device_alarm_event_list_paginate_active(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var schedule_id: any = dto.schedule_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.ScheduleRepository.createQueryBuilder('alarm');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT alarm.alarm_action_id)', 'cnt');
      } else {  
        query.select([  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
             
        ]);
      }
        query.leftJoin(
                        "sd_iot_alarm_device_event",
                        "ev",
                        "ev.alarm_action_id= alarm.alarm_action_id"
                    );  
        query.leftJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= ev.device_id"
                    );     
        query.leftJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.leftJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.leftJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      ); 
    query.where('1=1'); 
    var status: any = 1;
    query.andWhere('d.status=:status', { status: status });
    query.andWhere('mq.status=:status', { status: status });
    if (keyword) {
      query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
    }
     
      // if (alarm_action_id) {
      //   query.andWhere('ad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      // } if (device_id) {
      //   query.andWhere('d.device_id=:device_id', { device_id: device_id });
      // }
      if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      } 
      if (dto.event) {
        query.andWhere('alarm.event=:event', { event: dto.event });
      }if (dto.status_warning) {
        query.andWhere('alarm.status_warning=:status_warning', { status_warning: dto.status_warning });
      } if (dto.recovery_warning) {
        query.andWhere('alarm.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      } if (dto.status_alert) {
        query.andWhere('alarm.status_alert=:status_alert', { status_alert: dto.status_alert });
      } if (dto.recovery_alert) {
        query.andWhere('alarm.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      } if (dto.email_alarm) {
        query.andWhere('alarm.email_alarm=:email_alarm', { email_alarm: dto.email_alarm });
      } if (dto.line_alarm) {
        query.andWhere('alarm.line_alarm=:line_alarm', { line_alarm: dto.line_alarm });
      } if (dto.telegram_alarm) {
        query.andWhere('alarm.telegram_alarm=:telegram_alarm', { telegram_alarm: dto.telegram_alarm });
      }  
      if (dto.sms_alarm) {
        query.andWhere('alarm.sms_alarm=:sms_alarm', { sms_alarm: dto.sms_alarm });
      }
      if (dto.nonc_alarm) {
        query.andWhere('alarm.nonc_alarm=:nonc_alarm', { nonc_alarm: dto.nonc_alarm });
      }
      if (dto.status) {
        query.andWhere('alarm.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `alarm.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`alarm.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async device_alarm_action_list_paginate(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var schedule_id: any = dto.schedule_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.ScheduleRepository.createQueryBuilder('alarm');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT alarm.alarm_action_id)', 'cnt');
      } else {  
        query.select([  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
             
        ]);
      }
        query.leftJoin(
                        "sd_iot_alarm_device",
                        "ad",
                        "ad.alarm_action_id= alarm.alarm_action_id"
                    );  
        query.leftJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= ad.device_id"
                    );     
        query.leftJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.leftJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.leftJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      );  
      if (keyword) {
          query.andWhere('alarm.action_name like :action_name', {action_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.alarm_action_id) {
        query.andWhere('alarm.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }if (dto.event) {
        query.andWhere('alarm.event=:event', { event: dto.event });
      }if (dto.status_warning) {
        query.andWhere('alarm.status_warning=:status_warning', { status_warning: dto.status_warning });
      } if (dto.recovery_warning) {
        query.andWhere('alarm.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      } if (dto.status_alert) {
        query.andWhere('alarm.status_alert=:status_alert', { status_alert: dto.status_alert });
      } if (dto.recovery_alert) {
        query.andWhere('alarm.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      } if (dto.email_alarm) {
        query.andWhere('alarm.email_alarm=:email_alarm', { email_alarm: dto.email_alarm });
      } if (dto.line_alarm) {
        query.andWhere('alarm.line_alarm=:line_alarm', { line_alarm: dto.line_alarm });
      } if (dto.telegram_alarm) {
        query.andWhere('alarm.telegram_alarm=:telegram_alarm', { telegram_alarm: dto.telegram_alarm });
      }  
      if (dto.sms_alarm) {
        query.andWhere('alarm.sms_alarm=:sms_alarm', { sms_alarm: dto.sms_alarm });
      }
      if (dto.nonc_alarm) {
        query.andWhere('alarm.nonc_alarm=:nonc_alarm', { nonc_alarm: dto.nonc_alarm });
      }
      if (dto.status) {
        query.andWhere('alarm.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `alarm.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`alarm.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async device_alarm_event_list_paginate(dto: any): Promise<Devicealarmaction>{
    console.log(`type_list_paginate dto=`);
    console.info(dto);
    try { 
      var schedule_id: any = dto.schedule_id;  
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.ScheduleRepository.createQueryBuilder('alarm');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT alarm.alarm_action_id)', 'cnt');
      } else {  
        query.select([  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
             
        ]);
      }
        query.leftJoin(
                        "sd_iot_alarm_device_event",
                        "ev",
                        "ev.alarm_action_id= alarm.alarm_action_id"
                    );  
        query.leftJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= ev.device_id"
                    );     
        query.leftJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.leftJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.leftJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      );  
      if (keyword) {
          query.andWhere('alarm.action_name like :action_name', {action_name: keyword ? `%${keyword}%` : '%',});
      }if (dto.alarm_action_id) {
        query.andWhere('alarm.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
      }if (dto.event) {
        query.andWhere('alarm.event=:event', { event: dto.event });
      }if (dto.status_warning) {
        query.andWhere('alarm.status_warning=:status_warning', { status_warning: dto.status_warning });
      } if (dto.recovery_warning) {
        query.andWhere('alarm.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      } if (dto.status_alert) {
        query.andWhere('alarm.status_alert=:status_alert', { status_alert: dto.status_alert });
      } if (dto.recovery_alert) {
        query.andWhere('alarm.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      } if (dto.email_alarm) {
        query.andWhere('alarm.email_alarm=:email_alarm', { email_alarm: dto.email_alarm });
      } if (dto.line_alarm) {
        query.andWhere('alarm.line_alarm=:line_alarm', { line_alarm: dto.line_alarm });
      } if (dto.telegram_alarm) {
        query.andWhere('alarm.telegram_alarm=:telegram_alarm', { telegram_alarm: dto.telegram_alarm });
      }  
      if (dto.sms_alarm) {
        query.andWhere('alarm.sms_alarm=:sms_alarm', { sms_alarm: dto.sms_alarm });
      }
      if (dto.nonc_alarm) {
        query.andWhere('alarm.nonc_alarm=:nonc_alarm', { nonc_alarm: dto.nonc_alarm });
      }
      if (dto.status) {
        query.andWhere('alarm.status=:status', { status: dto.status });
      }
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `alarm.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`alarm.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  /*****alarmDeviceEvent****/  
  async alarm_device_id_event_count(dto: any): Promise<alarmDeviceEvent> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
        var device_id: any = dto.device_id;  
        var alarm_action_id: any = dto.alarm_action_id;    
        const query: any = await this.alarmDeviceEventRepository.createQueryBuilder('al');
        var countRs: any = await  query.select('COUNT(DISTINCT al.device_id)', 'cnt'); 
        query.where('1=1');  
        if (alarm_action_id) {
          query.andWhere('al.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
        }if (device_id) {
          query.andWhere('al.device_id=:device_id', { device_id: device_id });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }  
  /****************/
  async get_alarm_device_event_map(alarm_action_id: number): Promise<alarmDeviceEvent | null> {
      try {
        const schedule:any = await this.alarmDeviceEventRepository.findOne({
          where: { alarm_action_id },
        });
        return schedule || null;
      } catch (err) {
        this.logger.error(`Error fetching alarm_action_id ${alarm_action_id}: ${err.message}`, err.stack);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            errorMessage: err.message,
          },
        });
      }
  }
  async create_alarm_device_map(dto: any): Promise<alarmDevice>{ 
        // var schedule_id = dto.schedule_id;
        // var device_id = dto.device_id;
        console.log('create_nodered=>');console.info(dto);   
            const result: any = await this.alarmDeviceRepository.save(
            this.alarmDeviceRepository.create(dto),
        );
        return result;
  }
  async create_alarm_device_event_map(dto: any): Promise<alarmDeviceEvent>{ 
        // var schedule_id = dto.schedule_id;
        // var device_id = dto.device_id;
        console.log('create_nodered=>');console.info(dto);   
            const result: any = await this.alarmDeviceEventRepository.save(
            this.alarmDeviceEventRepository.create(dto),
        );
        return result;
  }
  async delete_alarm_device_map(dto: any): Promise<alarmDevice>{ 
      try {
            var device_id: any = dto.device_id || '';
            var alarm_action_id: any = dto.alarm_action_id || '';  
            const query: any = await this.alarmDeviceRepository.createQueryBuilder('a');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT a.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('a.device_id=:device_id', { device_id: device_id });
            query.andWhere('a.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  async delete_alarm_device_event_map(dto: any): Promise<alarmDeviceEvent>{ 
      try {
            var device_id: any = dto.device_id || '';
            var alarm_action_id: any = dto.alarm_action_id || '';  
            const query: any = await this.alarmDeviceEventRepository.createQueryBuilder('a');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT a.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('a.device_id=:device_id', { device_id: device_id });
            query.andWhere('a.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){
                    const criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id}; 
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmDeviceEventRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  /***********************************alarmdevice*************************************/ 
  async device_list_paginate_alarm_active(dto: any): Promise<Device> {
    console.log(`dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
        ]); 
      }   
      query.innerJoin(
                        "sd_iot_alarm_device",
                        "alarm",
                        "alarm.device_id= d.device_id"
                    );  
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
    query.where('1=1'); 
      var status: any = 1;
      // query.andWhere('d.status=:status', { status: status });
      // query.andWhere('mq.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else { 
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
       throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: { args: { errorMessage: error.message || error } }
        });
    }
  }
  async device_event_list_paginate_alarm_active(dto: any): Promise<Device> {
    console.log(`dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate', 
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.updateddate AS timestamp', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
        ]); 
      }   
      query.innerJoin(
                        "sd_iot_alarm_device_event",
                        "alarm",
                        "alarm.device_id= d.device_id"
                    );  
      query.leftJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.leftJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.leftJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.leftJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
    query.where('1=1'); 
      var status: any = 1;
      // query.andWhere('d.status=:status', { status: status });
      // query.andWhere('mq.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.device_name LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else { 
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        const deviceList = await query.getRawMany();
        return deviceList;
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
       throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: { args: { errorMessage: error.message || error } }
        });
    }
  }
  /***********scheduleprocesslog**************/
  async maxid_UID_scheduleprocesslog(): Promise<scheduleprocesslog> { 
        try {
          const RS:any = await this.scheduleprocesslogRepository.query('SELECT MAX(id) AS id FROM sd_schedule_process_log');
          console.log('id');console.info(RS);
          var id:any=RS['0'].id;
          console.log('max_id=');console.info(id);
          var max_id:any=max_id+1;
          console.log('max_id=');console.info(max_id);
          return max_id;
        } catch (err) {
          this.logger.error(`Error ${JSON.stringify(err)}`);
          throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
              errorMessage: err.message,
              },
          });
        }
  }
  async create_scheduleprocesslog(dto: any): Promise<scheduleprocesslog>{ 
            //console.log('create_scheduleprocesslog dto=>');console.info(dto);  
              var schedule_id:any = dto.schedule_id;                                                                                                                                                                           
              var device_id:any = dto.device_id;
              var schedule_event_start:any = dto.schedule_event_start;                                                                                                                                                           
              var day:any = dto.day;                                                                                                                                                                         
              var dotime:any = dto.dotime;
              var schedule_event:any = dto.schedule_event;
              if(dto.device_status=='undefined' || dto.device_status=='0'){  
                  dto.device_status=0;
              } 
              if(dto.status=='undefined' || dto.status=='0'){ var status :any=dto.status; } 
              var date:any = dto.date;
              var time:any = dto.time; 
              const chkset: any = {  
                                    schedule_id: schedule_id,
                                    device_id: device_id, 
                                    schedule_event_start: schedule_event_start,
                                    day: day, 
                                    date: date
                          } 
              let count_alarmprocesslog: any = await this.scheduleprocesslog_count(chkset); 
              //console.log('create_scheduleprocesslog count_alarmprocesslog>');console.info(count_alarmprocesslog);  
              if(count_alarmprocesslog==0){ 
                                        if (dto.device_status==dto.schedule_event) {
                                             dto.status= 1;
                                          }else{
                                             dto.status= 0;
                                          }  
                          var createset:any={ 
                                              schedule_id:schedule_id,
                                              device_id: device_id,
                                              schedule_event_start: schedule_event_start,
                                              day: dto.day,
                                              doday: dto.doday,
                                              dotime: dto.dotime,
                                              schedule_event: dto.schedule_event, 
                                              device_status: dto.device_status,
                                              status:dto.status,
                                              date:dto.date,
                                              time:dto.time,
                                              createddate:Date(),
                                              updateddate:Date()
                                    };
                    await this.scheduleprocesslogRepository.save(this.scheduleprocesslogRepository.create(createset));
                    var rss:any = 1;
                  return rss;
              }else if(count_alarmprocesslog>=1){  
                        var DataUpdate: any = {};   
                        if (dto.day!='') {
                            DataUpdate.day = dto.day;
                        } 
                        if (dto.doday!='') {
                            DataUpdate.doday = dto.doday;
                        } 
                        if (dto.dotime!='') {
                            DataUpdate.dotime = dto.dotime;
                        } 
                        if (dto.time!='') {
                            DataUpdate.time = dto.time;
                        }  
                        if (dto.device_status) {
                            DataUpdate.device_status = dto.device_status;
                        } 
                        if (dto.status!='') {
                            DataUpdate.status = dto.status;
                        }  
                        //const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
                        //const updateddate = moment(new Date(), DATE_TIME_FORMAT);
                        DataUpdate.updateddate = Date(); 
                        /*************************/ 
                            const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('l');
                            var countRs: any = await  query.select('l.*'); 
                            query.where('1=1');  
                            if (dto.schedule_id) {
                              query.andWhere('l.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
                            }if (dto.device_id) {
                              query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
                            }if (dto.schedule_event_start) {
                              query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
                            } if (dto.schedule_event) {
                              query.andWhere('l.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
                            }if (dto.date) {
                              query.andWhere('l.date=:date', { date: dto.date });
                            }    
                            query.printSql();
                            query.maxExecutionTime(10000);
                            query.getSql();
                            var count: any = await query.getCount();
                            let tempCounts: any = {};
                            tempCounts.count = countRs;
                            console.log(`count =>` + count);
                            console.log(`tempCountt.count =>` + tempCounts.count);
                            // return count;
                            var result = await query.getRawMany();
                        /*************************/
                        if(result){
                              var result_get :any =result['0'];
                              var device_status :any =result_get.device_status;
                              var status :any =result_get.status;
                              if(device_status!=null || device_status!=""){ 
                                          if (dto.device_status==dto.schedule_event) {
                                             DataUpdate.status = 1;
                                          }else{
                                             DataUpdate.status = 0;
                                          }  
                                          await this.scheduleprocesslogRepository
                                            .createQueryBuilder()
                                            .update('sd_schedule_process_log')
                                            .set(DataUpdate)
                                            .where('schedule_id=:schedule_id', { schedule_id: dto.schedule_id })
                                            .andWhere('device_id=:device_id', { device_id: dto.device_id })
                                            .andWhere('schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start })
                                            .andWhere('schedule_event=:schedule_event', { schedule_event: dto.schedule_event })
                                            .andWhere('date=:date', { date: dto.date }) 
                                            .execute(); 
                                      var rs:any = 1;
                                  return rs;
                              }
                        }
                      var rs:any = 0;
                    return rs;      
              }
  } 
  async update_scheduleprocesslog(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};  
        if (dto.schedule_id!='') {
            DataUpdate.schedule_id = dto.schedule_id;
        } 
        if (dto.device_id!='') {
            DataUpdate.device_id = dto.device_id;
        } 
        if (dto.schedule_event_start!='') {
            DataUpdate.schedule_event_start = dto.schedule_event_start;
        } 
        if (dto.day!='') {
            DataUpdate.day = dto.day;
        } 
        if (dto.doday!='') {
            DataUpdate.doday = dto.doday;
        } 
        if (dto.dotime!='') {
            DataUpdate.dotime = dto.dotime;
        } 
        if (dto.schedule_event!='') {
            DataUpdate.schedule_event = dto.schedule_event;
        } 
        if (dto.device_status) {
            DataUpdate.device_status = dto.device_status;
        } 
        if (dto.status!='') {
            DataUpdate.status = dto.status;
        }  
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        await this.alarmDeviceRepository
            .createQueryBuilder()
            .update('sd_schedule_process_log')
            .set(DataUpdate)
            .where('id=:id', { id: id })
            .execute();
        return 200;
  }
  async update_scheduleprocesslog_v2(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};  
        if (dto.day!='') {
            DataUpdate.day = dto.day;
        } 
        if (dto.doday!='') {
            DataUpdate.doday = dto.doday;
        } 
        if (dto.dotime!='') {
             DataUpdate.dotime = dto.dotime;
        } 
        if (dto.time!='') {
            DataUpdate.time = dto.time;
        }  
        if (dto.device_status) {
            DataUpdate.device_status = dto.device_status;
        } 
        // if (dto.status!='') {
        //     DataUpdate.status = dto.status;
        // }  
        if (dto.device_status==dto.schedule_event) {
            DataUpdate.status = 1;
        }else{
            DataUpdate.status = 0;
        }  
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date(); 
        await this.alarmDeviceRepository
            .createQueryBuilder()
            .update('sd_schedule_process_log')
            .set(DataUpdate)
            .where('schedule_id=:schedule_id', { schedule_id: dto.schedule_id })
            .andWhere('device_id=:device_id', { device_id: dto.device_id })
            .andWhere('schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start })
            .andWhere('schedule_event=:schedule_event', { schedule_event: dto.schedule_event })
            .andWhere('date=:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async scheduleprocesslog_count_status(dto: any): Promise<scheduleprocesslog> {
    console.log(`scheduleprocesslog_count_status_dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (schedule_id) {
            query.andWhere('l.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
        }if (schedule_event_start) {
            query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: schedule_event_start });
        }if (dto.date) {
            query.andWhere('l.date=:date', { date: dto.date });
        }if (dto.schedule_event) {
            query.andWhere('l.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        }
        var status: any = 1;   
        query.andWhere('l.status=:status', { status: status}); 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async scheduleprocesslog_count(dto: any): Promise<scheduleprocesslog> {
    console.log(`scheduleprocesslog_count_dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (schedule_id) {
            query.andWhere('l.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
        }if (schedule_event_start) {
            query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: schedule_event_start });
        }if (dto.date) {
            query.andWhere('l.date=:date', { date: dto.date });
        }if (dto.schedule_event) {
            query.andWhere('l.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        }      
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async scheduleprocesslog_count_v2(dto: any): Promise<scheduleprocesslog> {
    console.log(`dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (schedule_id) {
            query.andWhere('l.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
        }if (schedule_event_start) {
            query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: schedule_event_start });
        }if (dto.date) {
            query.andWhere('l.date=:date', { date: dto.date });
        }if (dto.status) {
            query.andWhere('l.status=:status', { date: dto.status });
        }      
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async scheduleprocesslog_rs(dto: any): Promise<scheduleprocesslog> {
    console.log(`dto=`);
    console.info(dto);
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (schedule_id) {
            query.andWhere('l.schedule_id=:schedule_id', { schedule_id: schedule_id });
        }if (device_id) {
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
        }if (schedule_event_start) {
            query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: schedule_event_start });
        }if (dto.date) {
            query.andWhere('l.date=:date', { date: dto.date });
        }  
        // dto.status
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          // return count;
          const rss = await query.getRawMany();
          return rss;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async scheduleprocesslog_paginate(dto: any): Promise<scheduleprocesslog>{
    console.log(`dto=>`);
    console.info(dto);
    try { 
      var keyword: any = dto.keyword || '';
      var status: any = dto.status;
      /*****************/
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('sl');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT sl.device_id)', 'cnt');
      } else {   
        query.select([  
            'sl.id AS id', 
            'sl.schedule_id AS schedule_id', 
            'sl.schedule_event_start AS schedule_event_start', 
            'sl.day AS day', 
            'sl.doday AS doday', 
            'sl.dotime AS dotime', 
            'sl.schedule_event AS schedule_event', 
            'sl.device_status AS device_status', 
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket',  
            'd.mqtt_device_name AS mqtt_device_name', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
             
        ]);
      } 
        query.leftJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= sl.device_id"
                    );     
        query.leftJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.leftJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.leftJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      );  
        if (keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('l.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('l.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('l.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('l.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('l.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('l.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (status) {
          query.andWhere('l.status=:status', { status: status});
        }  
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `alarm.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`alarm.alarm_action_id`, 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async scheduleprocesslogpaginate(dto: any): Promise<scheduleprocesslog>{
    console.log(`dto=>`);
    console.info(dto);
    try {  
      var bucket: any = dto.bucket || '';
      var keyword: any = dto.keyword || '';
      var event: any = dto.event || '';
      var status: any = dto.status;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.scheduleprocesslogRepository.createQueryBuilder('sl');
      if (isCount == 1) {
        //var countRs: number = await query.getCount(); 
        var countRs: number = await query.select('COUNT(DISTINCT sl.id)', 'cnt');
      } else {    
          query.select(['sl.id AS id',  
              'd.device_id AS device_id',   
              'd.bucket AS bucket',   
              'sdd.schedule_id AS schedule_id',   
              'sl.schedule_event_start AS schedule_event_start', 
              'sl.day AS day', 
              'sl.doday AS doday', 
              'sl.dotime AS dotime', 
              'sl.schedule_event AS schedule_event', 
              'sl.device_status AS device_status', 
              'sl.status AS status', 
              'sl.date AS date', 
              'sl.time AS time', 
              'sl.createddate AS createddate', 
              'sl.updateddate AS updateddate', 
              'd.device_id AS deviceid', 
              'd.mqtt_id AS mqtt_id',
              'd.setting_id AS setting_id',
              'd.type_id AS type_id',
              'd.device_name AS device_name',
              'd.mqtt_device_name AS mqtt_device_name', 
              't.type_name AS type_name',         
              'l.location_name AS location_name',    
              'mq.mqtt_name AS mqtt_name',   
              'mq.org AS mqtt_org',
              'mq.bucket AS mqtt_bucket',    
              'mq.envavorment AS mqtt_envavorment',   
              'sdc.schedule_name AS schedule_name',   
              'sdc.event AS event',    
          ]);
        } 
        query.innerJoin(
                        "sd_iot_schedule_device",
                        "sdd",
                        "sdd.schedule_id= sl.schedule_id  and sdd.device_id = sl.device_id"
                    );  

        query.innerJoin(
                        "sd_iot_schedule",
                        "sdc",
                       // "sdc.schedule_id= sdd.schedule_id and sdc.start = sl.schedule_event_start"
                        "sdc.schedule_id= sdd.schedule_id"
                    );   
        query.innerJoin(
                        "sd_iot_device",
                        "d",
                        "d.device_id= sdd.device_id"
                    );     
        query.innerJoin(
                          "sd_iot_device_type",
                          "t",
                          "t.type_id = d.type_id"
                      ); 
        query.innerJoin(
                          "sd_iot_mqtt",
                          "mq",
                          "mq.mqtt_id = d.mqtt_id"
                      ); 
        query.innerJoin(
                          "sd_iot_location",
                          "l",
                          "l.location_id= mq.location_id"
                      );  
        if (keyword) {
            query.andWhere('sdc.schedule_name like :schedule_name', {schedule_name: keyword ? `%${keyword}%` : '%',});
        }  
        if (dto.event) {
          query.andWhere('sdc.event=:event', { event: dto.event });
        }
        if (dto.schedule_id) {
          query.andWhere('sdc.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('d.device_id=:device_id', { device_id: dto.device_id });
        }if (status) {
          query.andWhere('sdc.status=:status', { status: status});
        }if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('l.location_id=:location_id', { location_id: dto.location_id });
        }if (dto.bucket) {
          query.andWhere('d.bucket=:bucket', { bucket: dto.bucket });
        }   
        // เงื่อนไข BETWEEN createddate
        if (dto.start && dto.end) {
          query.andWhere('sl.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('sl.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('sl.createddate <= :endDate', { endDate: dto.end });
        } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) { 
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `sl.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          query.orderBy(`sl.date`, 'DESC');
          query.addOrderBy('sl.time', 'DESC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  /***********device_list_paginate_active_alarm_device**************/
  async device_list_paginate_active_alarm_device(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var type_id: any = dto.type_id;  
      var location_id: any = dto.location_id;  
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'sad.alarm_action_id AS alarm_action_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS time_life',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
        ]);
      }   
        
      // sd_iot_alarm_device_event
      // sd_iot_alarm_device
      /********************************************/ 
      // sd_iot_device_alarm_action
      query.innerJoin(
                        "sd_iot_alarm_device",
                        "sad",
                        "sad.device_id= d.device_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_alarm_action",
                        "alarm",
                        "alarm.alarm_action_id= sad.alarm_action_id"
                    ); 
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1');  
      var status: number = 1;
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      query.andWhere('alarm.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (alarm_action_id) {
        query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***********device_list_paginate_alarm_device_event**************/
  async device_list_paginate_alarm_device_event(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
      if (isCount == 1) {
        var countRs: number = await query.select('COUNT(DISTINCT d.device_id)', 'cnt');
      } else {    
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'sad.alarm_action_id AS alarm_action_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS timelife',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
        ]);
      }    
      /********************************************/  
      query.innerJoin(
                        "sd_iot_alarm_device_event",
                        "sad",
                        "sad.device_id= d.device_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_alarm_action",
                        "alarm",
                        "alarm.alarm_action_id= sad.alarm_action_id"
                    ); 
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1');  
      var status: number = 1;
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      query.andWhere('alarm.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (alarm_action_id) {
        query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      if (isCount == 1) {
        // let tempCounts:any = {};
        // tempCountt.count = countRs;
        // return tempCountt.count;
        var count: any = await query.getCount();
        let tempCounts: any = {};
        tempCounts.count = countRs;
        console.log(`count =>` + count);
        console.log(`tempCountt.count =>` + tempCounts.count);
        return count;
      } else {
        // Sorting logic
        if (sort) {
          const sortResult = convertSortInput(sort);
          if (sortResult == false) {
            throw new BadRequestException(`Invalid sort option.`);
          }
          const { sortField, sortOrder } = sortResult;
          console.log(`sort=`);
          console.info(sort);
          console.log(`sortField=`+sortField);
          console.log(`sortOrder=`+sortOrder);
          console.log(`sortResult=`);
          console.info(sortResult); 
          if(sortOrder=='ASC' || sortOrder=='asc'){
            var sortOrders:any ='ASC';
          }else if(sortOrder=='DESC' || sortOrder=='desc'){
            var sortOrders:any ='DESC';
          }else{
            var sortOrders:any ='ASC';
          }
          query.orderBy(
            `d.${sortField}`,
            sortOrders.toUpperCase(),
          );
        } else {
          // Default sorting
          //query.orderBy(`d.device_id`, 'ASC');
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
        }
        query.limit(pageSize);
        query.offset(pageSize * (page - 1));
        return await query.getRawMany();
      }
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  } 
  async sd_iot_alarm_device_list(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'sad.alarm_action_id AS alarm_action_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS timelife',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
        ]); 
      query.innerJoin(
                        "sd_iot_alarm_device",
                        "sad",
                        "sad.device_id= d.device_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_alarm_action",
                        "alarm",
                        "alarm.alarm_action_id= sad.alarm_action_id"
                    ); 
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1');  
      var status: number = 1;
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      query.andWhere('alarm.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (alarm_action_id) {
        query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      query.orderBy('mq.sort', 'ASC');  // Default sorting
      query.addOrderBy('d.device_id', 'ASC');
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  async sd_iot_alarm_device_event_list(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'sad.alarm_action_id AS alarm_action_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS timelife',  
            'd.period AS period', 
            'd.work_status AS work_status', 
            'd.max AS max',
            'd.min AS min',  
            'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
        ]); 
      query.innerJoin(
                        "sd_iot_alarm_device_event",
                        "sad",
                        "sad.device_id= d.device_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_alarm_action",
                        "alarm",
                        "alarm.alarm_action_id= sad.alarm_action_id"
                    ); 
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
     query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1');  
      var status: number = 1;
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      query.andWhere('alarm.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (alarm_action_id) {
        query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      query.orderBy('mq.sort', 'ASC');  // Default sorting
      query.addOrderBy('d.device_id', 'ASC');
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***********device_list_paginate_alarm_device_event_control**************/
  async device_list_paginate_alarm_device_event_control(dto: any): Promise<Device> {
    console.log(`device_list_paginate_alarm_device_event_control dto=`);
    console.info(dto);
    try { 
      var type_id: any = dto.type_id;  
      var location_id: any = dto.location_id;  
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');  
            query.select([  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                // 'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS time_life',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                // 'd.max AS max',
                // 'd.min AS min',  
                // 'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                // 'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                // 'mq.envavorment AS mqtt_envavorment',  
                // 'mq.host AS mqtt_host',   
                // 'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]);
          query.innerJoin(
                            "sd_iot_alarm_device",
                            "sad",
                            "sad.device_id= d.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= sad.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
          query.where('1=1');  
          var status: number = 1;
          query.andWhere('d.status=:status', { status: status });
          query.andWhere('mq.status=:status', { status: status });
          query.andWhere('alarm.status=:status', { status: status });
          if (keyword) {
            query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
          }
          if (alarm_action_id) {
            query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
          }
          if (device_id) {
            query.andWhere('d.device_id=:device_id', { device_id: device_id });
          }if (dto.bucket) {
            query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
          }if (mqtt_id) {
            query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
          }if (dto.org) {
            query.andWhere('d.org=:org', { org: dto.org });
          }if (createddate) {
            query.andWhere('d.createddate=:createddate', { createddate: createddate });
          }if (updateddate) {
            query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
          }if (dto.type_id) {
            query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
          }if (dto.location_id) {
            query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
          }if (dto.sn) {
            query.andWhere('d.sn=:sn', { sn: dto.sn });
          }if (dto.status_warning) {
            query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
          }if (dto.recovery_warning) {
            query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
          }if (dto.status_alert) {
            query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
          }if (dto.recovery_alert) {
            query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
          }if (dto.time_life) {
            query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
          }if (dto.period) {
            query.andWhere('d.period=:period', { period: dto.period });
          }if (dto.max) {
            query.andWhere('d.max=:max', { max: dto.max });
          }if (dto.min) {
            query.andWhere('d.min=:min', { min: dto.min });
          }if (dto.hardware_id) {
            query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
          }if (dto.model) {
            query.andWhere('d.model=::model', { model: dto.model });
          }if (dto.vendor) {
            query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
          }if (dto.comparevalue) {
            query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
          }if (dto.oid) {
            query.andWhere('d.oid=:oid', { oid: dto.oid });
          }if (dto.action_id) {
            query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
          }if (dto.mqtt_data_value) {
            query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
          }if (dto.mqtt_data_control) {
            query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
          }if (createddate) {
            query.andWhere('d.createddate=:createddate', { createddate: createddate });
          }if (updateddate) {
            query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
          } 
          query.printSql();
          query.maxExecutionTime(10000);
          query.getSql();
          query.orderBy('mq.sort', 'ASC');  // Default sorting
          query.addOrderBy('d.device_id', 'ASC');
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  /***********alarmprocesslogRepository**************/
  async create_alarmprocesslog(dto: any): Promise<alarmprocesslog>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocesslogRepository.save(
              this.alarmprocesslogRepository.create(dto),
        );
        return result;
  } 
  async update_alarmprocesslog(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm!='') {
          DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async delete_alarmprocesslog(dto: any): Promise<alarmprocesslog>{ 
      try { 
            var device_id: any = dto.device_id;
            var alarm_action_id: any = dto.alarm_action_id;  
            var type_id: any = dto.type_id;  
            var date_now: any = dto.date_now;  
            var data_alarm: any = dto.data_alarm;  
            var alarm_status: any = dto.alarm_status;  
            const query: any = await this.alarmprocesslogRepository.createQueryBuilder('l');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT l.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
            query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.andWhere('l.type_id=:type_id', { type_id: type_id });
            query.andWhere('l.date=:date', { date: date_now });
            query.andWhere('l.data_alarm=:data_alarm', { data_alarm: data_alarm });
            if(alarm_status){
              query.andWhere('l.alarm_status=:alarm_status', { alarm_status: alarm_status });
            }
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){ 
                    if(alarm_status){
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm,alarm_status:alarm_status}; 
                    }else{
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm}; 
                    }
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmprocesslogRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                    var rt :any= Number('1');
                return rt;
            }else{
                  var rt :any= Number('0');
                return rt;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  async count_alarmprocesslog(dto: any): Promise<alarmprocesslog> {
    console.log(`count_alarmprocesslogdto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        /*
          SELECT COUNT(1) AS "cnt"
          FROM "public"."sd_alarm_process_log" "l" 
            WHERE 1=1 
              AND "l"."device_id"=$1 
              AND "l"."alarm_action_id"=$2 
              AND "l"."type_id"=$3 
              AND l.date=$4 
              AND "l"."data_alarm"=$5 
              AND "l"."alarm_status"=$6"
            sd_alarm_process_log
              - id: string; // The uuid is now string
              - alarm_action_id: number;
              - device_id: number;
              - type_id: number;  // email=1 , control=1
              - event: string;
              - larm_type: string;
              - status_warning: string;
              - recovery_warning: string;
              - status_alert: string;
              - recovery_alert: string;
              - email_alarm: number=0;
              - line_alarm: number=0;
              - telegram_alarm: number=0;
              - sms_alarm: number=0;
              - nonc_alarm: number=0;
              - status: string;
              - date: string;
              - time: string;
              - data: string;
              - ata_alarm: string;
              - alarm_status: string;  
              - subject: string;    
              - ontent: string;  
              - reateddate: Date;
              - updateddate: Date;
            
        */
        const query: any = await this.alarmprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count_alarmprocesslog-count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async get_alarmprocesslog(alarm_action_id: any): Promise<alarmprocesslog> {
        try {
        const rs:any = await this.alarmprocesslogRepository.findOne({
            where: {
            alarm_action_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async alarm_processlog_page(dto: any): Promise<alarmprocesslog> {
      console.log(`dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var keyword: any = dto.keyword || '';
            /*****************/
            var createddate: any = dto.createddate;
            var updateddate: any = dto.updateddate;
            var sort: string = dto.sort;
            var page: number = dto.page || 1;
            var pageSize: number = dto.pageSize || 10;
            var isCount: number = dto.isCount || 0;
            const query: any = await this.alarmprocesslogRepository.createQueryBuilder('l');
            if (isCount == 1) {
              var countRs: number = await query.select('COUNT(DISTINCT l.id)', 'cnt');
            } else {     
            query.select(['l.*',  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS timelife',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                'd.max AS max',
                'd.min AS min',  
                'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                'mq.envavorment AS mqtt_envavorment',  
                'mq.host AS mqtt_host',   
                'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]); 
          }
          /********************************************/  
          query.innerJoin(
                            "sd_iot_alarm_device_event",
                            "sad",
                            "sad.device_id= l.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= l.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        }if (dto.keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${dto.keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('l.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('l.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('l.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('l.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('l.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('l.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('l.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status});
        }  
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async chk_alarmprocesslog(dto: any): Promise<alarmprocesslog> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocesslogRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*');  
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  /***********alarmprocesslogtemp**************/ 
  async alarmlogpaginate(dto: any): Promise<alarmprocesslogtemp> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocesslogtempRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  }
  /***********alarmlogpaginateemail**************/  
  async alarmlogpaginateemail(dto: any): Promise<alarmprocesslogemail> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocesslogemailRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  } 
  /***********alarmlogpaginateecontrol**************/  
  async alarmlogpaginateecontrol(dto: any): Promise<alarmprocesslog> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocesslogRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  }
  /***********alarmlogpagline**************/  
  async alarmlogpagline(dto: any): Promise<alarmprocesslogline> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocessloglineRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  }
  /***********alarmlogpagesms**************/  
  async alarmlogpagesms(dto: any): Promise<alarmprocesslogsms> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocesslogsmsRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  }
  /***********alarmlogpaginatetelegram**************/  
  async alarmlogpaginatetelegram(dto: any): Promise<alarmprocesslogtelegram> {
      console.log('dto=>');
      console.info(dto);
      try {
        const bucket:any = dto.bucket || '';
        const keyword:any = dto.keyword || '';
        const event:any = dto.event || '';
        const status:any = dto.status;
        const sort:any = dto.sort;
        const page = Number(dto.page) || 1;
        const pageSize = Number(dto.pageSize) || 10;
        const isCount = Number(dto.isCount) || 0;
        const type_id_log = Number(dto.type_id_log);

        // กำหนดค่า filter alarm type ตาม type_id_log
        let email_alarm = undefined;
        let line_alarm = undefined;
        let telegram_alarm = undefined;
        let sms_alarm = undefined;
        let nonc_alarm = undefined;

        switch (type_id_log) {
          case 1:
            email_alarm = Number(1);
            break;
          case 2:
            line_alarm = Number(1);
            break;
          case 3:
            telegram_alarm = Number(1);
            break;
          case 4:
            sms_alarm = Number(1);
            break;
          case 5:
            nonc_alarm = Number(1);
            break;
        }

        // สร้าง query builder พร้อม alias 'al'
        const query = this.alarmprocesslogtelegramRepository.createQueryBuilder('al');

        // กำหนด select สำหรับกรณีไม่ใช่ count
        if (isCount !== 1) {
          query.select(['al.id AS id',
            'al.alarm_action_id AS alarm_action_id',
            'al.event AS event_log',
            'al.alarm_type AS alarm_type',
            'al.status_warning AS status_warning',
            'al.recovery_warning AS recovery_warning',
            'al.status_alert AS status_alert',
            'al.recovery_alert AS recovery_alert',
            'al.email_alarm AS email_alarm',
            'al.line_alarm AS line_alarm',
            'al.telegram_alarm AS telegram_alarm',
            'al.sms_alarm AS sms_alarm',
            'al.nonc_alarm AS nonc_alarm',
            'al.status AS status',
            'al.date AS date',
            'al.time AS time',
            'al.data AS data',
            'al.data_alarm AS data_alarm',
            'al.alarm_status AS alarm_status',
            'al.date AS date',
            'al.createddate AS createddate',
            'al.updateddate AS updateddate',
            'al.subject AS subject',
            'al.content AS content',
            'd.device_id AS device_id',
            'd.bucket AS bucket', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            'd.mqtt_device_name AS mqtt_device_name',
            't.type_name AS type_name',
            'l.location_name AS location_name',
            'mq.mqtt_name AS mqtt_name',
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',
            'mq.envavorment AS mqtt_envavorment',
            'daa.action_name AS action_name',
            'daa.status_warning AS warning',
            'daa.recovery_warning AS recoverywarning',
            'daa.status_alert AS alert',
            'daa.recovery_alert AS recoveryalert',
            'daa.email_alarm AS emailalarm',
            'daa.line_alarm AS linealarm',
            'daa.telegram_alarm AS telegramalarm',
            'daa.sms_alarm AS smsalarm',
            'daa.nonc_alarm AS noncalarm',
            'daa.time_life AS timelife',
            'daa.event AS event',
          ]);
        } else {
          // กรณี isCount = 1 นับจำนวน record
          query.select('COUNT(DISTINCT al.id)', 'cnt');
        }

        // Join ตารางตาม alias ที่ถูกต้อง
        query.innerJoin(
          'sd_iot_device_alarm_action',
          'daa',
          'daa.alarm_action_id = al.alarm_action_id',
        ); 
        query.innerJoin('sd_iot_device', 'd', 'd.device_id = al.device_id');
        query.innerJoin('sd_iot_device_type', 't', 't.type_id = d.type_id');
        query.innerJoin('sd_iot_mqtt', 'mq', 'mq.mqtt_id = d.mqtt_id');
        query.innerJoin('sd_iot_location', 'l', 'l.location_id = mq.location_id');

        // เริ่มกำหนด where เงื่อนไข
        query.where('1=1');

        if (keyword) {
          query.andWhere('daa.action_name LIKE :action_name', {
            action_name: `%${keyword}%`,
          });
        }

        if (event) {
          query.andWhere('daa.event = :event', { event });
        }

        if (dto.alarm_action_id) {
          query.andWhere('al.alarm_action_id = :alarm_action_id', {
            alarm_action_id: dto.alarm_action_id,
          });
        }

        if (dto.device_id) {
          query.andWhere('d.device_id = :device_id', { device_id: dto.device_id });
        }

        if (status !== undefined && status !== null && status !== '') {
          query.andWhere('daa.status = :status', { status });
        }

        if (dto.type_id) {
          query.andWhere('d.type_id = :type_id', { type_id: dto.type_id });
        }

        if (dto.location_id) {
          query.andWhere('l.location_id = :location_id', {
            location_id: dto.location_id,
          });
        }

        if (bucket) {
          query.andWhere('d.bucket = :bucket', { bucket });
        }

        if (dto.start && dto.end) {
          query.andWhere('al.createddate BETWEEN :startDate AND :endDate', {
            startDate: dto.start,
            endDate: dto.end,
          });
        } else if (dto.start) {
          query.andWhere('al.createddate >= :startDate', { startDate: dto.start });
        } else if (dto.end) {
          query.andWhere('al.createddate <= :endDate', { endDate: dto.end });
        }

        // กรองตามประเภท alarm ที่ตั้งใน switch case
        if (email_alarm !== undefined) {
          query.andWhere('al.email_alarm = :email_alarm', { email_alarm });
        }
        if (line_alarm !== undefined) {
          query.andWhere('al.line_alarm = :line_alarm', { line_alarm });
        }
        if (telegram_alarm !== undefined) {
          query.andWhere('al.telegram_alarm = :telegram_alarm', { telegram_alarm });
        }
        if (sms_alarm !== undefined) {
          query.andWhere('al.sms_alarm = :sms_alarm', { sms_alarm });
        }
        if (nonc_alarm !== undefined) {
          query.andWhere('al.nonc_alarm = :nonc_alarm', { nonc_alarm });
        }

        // แสดง SQL Query เพื่อ debug (ลบออกเมื่อ deploy จริง)
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();

        if (isCount == 1) {
          // นับจำนวน record
          const countResult: any = await query.getRawOne();
          // countResult.cnt จะได้ค่าจำนวน
          const count:any = countResult ? Number(countResult.cnt) : 0;
          console.log('count =>', count);
          return count;
        } else {
          // Sorting
          if (sort) {
            const sortResult = convertSortInput(sort);

            if (sortResult == false) {
              throw new BadRequestException('Invalid sort option.');
            }

            const { sortField, sortOrder }:any = sortResult;
            console.log('sort=', sort);
            console.log('sortField=', sortField);
            console.log('sortOrder=', sortOrder);

            // *** แก้ alias เป็น 'al' เพราะ table alias ที่ใช้: al, d, daa, t, mq, l
            // กรณีพิเศษ หาก sortField มาจาก alias อื่น ปรับตามต้องการ
            query.orderBy(`al.${sortField}`, sortOrder.toUpperCase());
          } else {
            query.orderBy('al.createddate', 'DESC');
            query.addOrderBy('al.updateddate', 'DESC');
          }
          // pagination
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          // ดึงข้อมูล
           var rs:any= await query.getRawMany();
          return rs;
        }
      } catch (error) {
        console.error('alarmlogpaginate error:', error);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            args: { errorMessage: error.message || error },
          },
        });
      }
  } 
  /************/
  async create_alarmprocesslogtemp(dto: any): Promise<alarmprocesslogtemp>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocesslogtempRepository.save(
              this.alarmprocesslogtempRepository.create(dto),
        );
        return result;
  } 
  async update_alarmprocesslogtemp(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm!='') {
          DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log_temp')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async count_alarmprocesslogtemp(dto: any): Promise<alarmprocesslogtemp> {
    console.log(`count_alarmprocesslogdto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.alarmprocesslogtempRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async get_alarmprocesslogtemp(alarm_action_id: any): Promise<alarmprocesslogtemp> {
        try {
        const rs:any = await this.alarmprocesslogtempRepository.findOne({
            where: {
            alarm_action_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async alarm_processlog_page_temp(dto: any): Promise<alarmprocesslogtemp> {
      console.log(`dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var keyword: any = dto.keyword || '';
            /*****************/
            var createddate: any = dto.createddate;
            var updateddate: any = dto.updateddate;
            var sort: string = dto.sort;
            var page: number = dto.page || 1;
            var pageSize: number = dto.pageSize || 10;
            var isCount: number = dto.isCount || 0;
            const query: any = await this.alarmprocesslogtempRepository.createQueryBuilder('lg');
            if (isCount == 1) {
              var countRs: number = await query.select('COUNT(DISTINCT lg.id)', 'cnt');
            } else {     
            query.select(['lg.*',  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS timelife',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                'd.max AS max',
                'd.min AS min',  
                'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                'mq.envavorment AS mqtt_envavorment',  
                'mq.host AS mqtt_host',   
                'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]); 
          }
          /********************************************/  
          query.innerJoin(
                            "sd_iot_alarm_device",
                            "sad",
                            "sad.device_id= lg.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= lg.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
        query.where('1=1');   
         query.andWhere('lg.alarm_status=1');
        if (dto.alarm_action_id) {
          query.andWhere('lg.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.alarm_type) {
          query.andWhere('lg.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('lg.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('lg.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('lg.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('lg.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('lg.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('lg.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        }if (dto.keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${dto.keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('lg.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('lg.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('lg.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('lg.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('lg.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('lg.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('lg.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status});
        }  
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('lg.createddate', 'DESC');  // Default sorting
          query.addOrderBy('lg.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async alarm_processlog_page_temp_control(dto: any): Promise<alarmprocesslogtemp> {
      console.log(`dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var keyword: any = dto.keyword || '';
            /*****************/
            var createddate: any = dto.createddate;
            var updateddate: any = dto.updateddate;
            var sort: string = dto.sort;
            var page: number = dto.page || 1;
            var pageSize: number = dto.pageSize || 10;
            var isCount: number = dto.isCount || 0;
            const query: any = await this.alarmprocesslogtempRepository.createQueryBuilder('lg');
            if (isCount == 1) {
              var countRs: number = await query.select('COUNT(DISTINCT lg.id)', 'cnt');
            } else {     
            query.select(['lg.*',  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS timelife',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                'd.max AS max',
                'd.min AS min',  
                'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                'mq.envavorment AS mqtt_envavorment',  
                'mq.host AS mqtt_host',   
                'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]); 
          }
          /********************************************/  
          query.innerJoin(
                            "sd_iot_alarm_device_event",
                            "sad",
                            "sad.device_id= lg.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= lg.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
        query.where('1=1');  
        query.andWhere('lg.alarm_status=2'); 
        if (dto.alarm_action_id) {
          query.andWhere('lg.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }
        if (dto.alarm_type) {
          query.andWhere('lg.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('lg.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('lg.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('lg.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('lg.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('lg.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('lg.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        }if (dto.keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${dto.keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('lg.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('lg.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('lg.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('lg.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('lg.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('lg.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('lg.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status});
        }  
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('lg.createddate', 'DESC');  // Default sorting
          query.addOrderBy('lg.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async chk_alarmprocesslogtemp(dto: any): Promise<alarmprocesslogtemp> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocesslogtempRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  /***********alarmprocesslogtemp**************/
  async create_alarmprocesslogemail(dto: any): Promise<alarmprocesslogemail>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocesslogemailRepository.save(
              this.alarmprocesslogemailRepository.create(dto),
        );
        return result;
  } 
  async update_alarmprocesslogemail(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm!='') {
          DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log_email')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async delete_alarmprocesslog_email(dto: any): Promise<alarmprocesslogemail>{ 
      try { 
            var device_id: any = dto.device_id;
            var alarm_action_id: any = dto.alarm_action_id;  
            var type_id: any = dto.type_id;  
            var date_now: any = dto.date_now;  
            var data_alarm: any = dto.data_alarm;  
            var alarm_status: any = dto.alarm_status;  
            const query: any = await this.alarmprocesslogemailRepository.createQueryBuilder('l');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT l.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
            query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.andWhere('l.type_id=:type_id', { type_id: type_id });
            query.andWhere('l.date=:date', { date: date_now });
            query.andWhere('l.data_alarm=:data_alarm', { data_alarm: data_alarm });
            if(alarm_status){
               query.andWhere('l.alarm_status=:alarm_status', { alarm_status: alarm_status });
            }
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){  
                     
                    if(alarm_status){
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm,alarm_status:alarm_status}; 
                    }else{
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm};
                    }
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmprocesslogemailRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  async count_alarmprocesslogemail(dto: any): Promise<alarmprocesslogemail> {
    console.log(`count_alarmprocesslogdto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.alarmprocesslogemailRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async get_alarmprocesslogemail(alarm_action_id: any): Promise<alarmprocesslogemail> {
        try {
        const rs:any = await this.alarmprocesslogemailRepository.findOne({
            where: {
            alarm_action_id,
            },
        });
        //console.log('getUser=>');console.info(user);
        return rs;
        } catch (err) {
        this.logger.error(`Error ${JSON.stringify(err)}`);
        throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
            errorMessage: err.message,
            },
        });
        }
  }
  async alarm_proce_log_page_email(dto: any): Promise<alarmprocesslogemail> {
      console.log(`dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var keyword: any = dto.keyword || '';
            /*****************/
            var createddate: any = dto.createddate;
            var updateddate: any = dto.updateddate;
            var sort: string = dto.sort;
            var page: number = dto.page || 1;
            var pageSize: number = dto.pageSize || 10;
            var isCount: number = dto.isCount || 0;
            const query: any = await this.alarmprocesslogemailRepository.createQueryBuilder('lg');
            if (isCount == 1) {
              var countRs: number = await query.select('COUNT(DISTINCT lg.id)', 'cnt');
            } else {     
            query.select(['lg.*',  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS timelife',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                'd.max AS max',
                'd.min AS min',  
                'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                'mq.envavorment AS mqtt_envavorment',  
                'mq.host AS mqtt_host',   
                'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]); 
          }
          /********************************************/  
          query.innerJoin(
                            "sd_iot_alarm_device",
                            "sad",
                            "sad.device_id= lg.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= lg.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
        query.where('1=1');   
         query.andWhere('lg.alarm_status=1');
        if (dto.alarm_action_id) {
          query.andWhere('lg.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.alarm_type) {
          query.andWhere('lg.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('lg.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('lg.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('lg.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('lg.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('lg.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('lg.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        }if (dto.keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${dto.keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('lg.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('lg.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('lg.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('lg.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('lg.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('lg.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('lg.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status});
        }  
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('lg.createddate', 'DESC');  // Default sorting
          query.addOrderBy('lg.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async alarm_proce_log_paging_email(dto: any): Promise<alarmprocesslogemail> {
      console.log(`dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var keyword: any = dto.keyword || '';
            /*****************/
            var createddate: any = dto.createddate;
            var updateddate: any = dto.updateddate;
            var sort: string = dto.sort;
            var page: number = dto.page || 1;
            var pageSize: number = dto.pageSize || 10;
            var isCount: number = dto.isCount || 0;
            const query: any = await this.alarmprocesslogemailRepository.createQueryBuilder('lg');
            if (isCount == 1) {
              var countRs: number = await query.select('COUNT(DISTINCT lg.id)', 'cnt');
            } else {     
            query.select(['lg.*',  
                'd.device_id AS device_id', 
                'd.mqtt_id AS mqtt_id',
                'd.setting_id AS setting_id',
                'sad.alarm_action_id AS alarm_action_id',
                'd.type_id AS type_id',
                'd.device_name AS device_name',
                'd.sn AS sn',
                'd.hardware_id AS hardware_id', 
                'd.status_warning AS status_warning',
                'd.recovery_warning AS recovery_warning',
                'd.status_alert AS status_alert',
                'd.recovery_alert AS recovery_alert', 
                'd.time_life AS timelife',  
                'd.period AS period', 
                'd.work_status AS work_status', 
                'd.max AS max',
                'd.min AS min',  
                'd.oid AS oid',
                'd.mqtt_data_value AS mqtt_data_value',
                'd.mqtt_data_control AS mqtt_data_control',
                'd.model AS model',
                'd.vendor AS vendor',
                'd.comparevalue AS comparevalue',
                'd.createddate AS createddate',
                'd.updateddate AS updateddate',
                'd.status AS status',
                'd.unit AS unit',
                'd.action_id AS action_id',
                'd.status_alert_id AS status_alert_id',
                'd.measurement AS measurement',
                'd.mqtt_control_on AS mqtt_control_on',
                'd.mqtt_control_off AS mqtt_control_off',  
                'd.org AS device_org', 
                'd.bucket AS device_bucket', 
                't.type_name AS type_name',         
                'l.location_name AS location_name',   
                'l.configdata AS configdata',  
                'mq.mqtt_name AS mqtt_name',   
                'mq.org AS mqtt_org',
                'mq.bucket AS mqtt_bucket',    
                'mq.envavorment AS mqtt_envavorment',  
                'mq.host AS mqtt_host',   
                'mq.port AS mqtt_port', 
                'd.mqtt_device_name AS mqtt_device_name', 
                'd.mqtt_status_over_name AS mqtt_status_over_name', 
                'd.mqtt_status_data_name AS mqtt_status_data_name', 
                'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
                'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
                'alarm.alarm_action_id AS alarm_action_id', 
                'alarm.action_name AS action_name', 
                'alarm.status_warning AS status_warning', 
                'alarm.recovery_warning AS recovery_warning', 
                'alarm.status_alert AS status_alert', 
                'alarm.recovery_alert AS recovery_alert', 
                'alarm.email_alarm AS email_alarm', 
                'alarm.line_alarm AS line_alarm', 
                'alarm.telegram_alarm AS telegram_alarm', 
                'alarm.sms_alarm AS sms_alarm', 
                'alarm.nonc_alarm AS nonc_alarm', 
                'alarm.time_life AS time_life', 
                'alarm.event AS event', 
                'alarm.status AS status',
            ]); 
          }
          /********************************************/  
          query.innerJoin(
                            "sd_iot_alarm_device_event",
                            "sad",
                            "sad.device_id= lg.device_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_alarm_action",
                            "alarm",
                            "alarm.alarm_action_id= lg.alarm_action_id"
                        ); 
          query.innerJoin(
                            "sd_iot_setting",
                            "st",
                            "st.setting_id= d.setting_id"
                        ); 
          query.innerJoin(
                            "sd_iot_device_type",
                            "t",
                            "t.type_id = d.type_id"
                        ); 
          query.innerJoin(
                            "sd_iot_mqtt",
                            "mq",
                            "mq.mqtt_id = d.mqtt_id"
                        ); 
          query.innerJoin(
                            "sd_iot_location",
                            "l",
                            "l.location_id= mq.location_id"
                        ); 
        query.where('1=1');  
        query.andWhere('lg.alarm_status=2'); 
        if (dto.alarm_action_id) {
          query.andWhere('lg.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }
        if (dto.alarm_type) {
          query.andWhere('lg.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('lg.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('lg.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('lg.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('lg.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('lg.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('lg.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        }if (dto.keyword) {
            query.andWhere('d.device_name like :device_name', {device_name: keyword ? `%${dto.keyword}%` : '%',});
        }if (dto.org) {
          query.andWhere('d.org=:org', { org: dto.org });
        }if (dto.bucket) {
          query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
        } if (dto.type_id) {
          query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.location_id) {
          query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
        } if (dto.status_warning) {
          query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
        }if (dto.recovery_warning) {
          query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
        }if (dto.status_alert) {
          query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
        }if (dto.recovery_alert) {
          query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
        }if (dto.time_life) {
          query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
        }if (dto.period) {
          query.andWhere('d.period=:period', { period: dto.period });
        }if (dto.schedule_id) {
          query.andWhere('lg.schedule_id=:schedule_id', { schedule_id: dto.schedule_id });
        }if (dto.device_id) {
          query.andWhere('lg.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.schedule_event_start) {
          query.andWhere('lg.schedule_event_start=:schedule_event_start', { schedule_event_start: dto.schedule_event_start });
        } if (dto.day) {
          query.andWhere('lg.day=:day', { day: dto.day });
        } if (dto.doday) {
          query.andWhere('lg.doday=:doday', { doday: dto.doday });
        } if (dto.dotime) {
          query.andWhere('lg.dotime=:dotime', { dotime: dto.dotime });
        } if (dto.schedule_event) {
          query.andWhere('lg.schedule_event=:schedule_event', { schedule_event: dto.schedule_event });
        } if (dto.device_status) {
          query.andWhere('lg.device_status=:device_status', { device_status: dto.device_status });
        }  
        if (dto.status) {
          query.andWhere('lg.status=:status', { status: dto.status});
        }  
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('lg.createddate', 'DESC');  // Default sorting
          query.addOrderBy('lg.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async chk_alarmprocesslogemail(dto: any): Promise<alarmprocesslogemail> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocesslogemailRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async alarm_device_active_map(dto: any): Promise<Device> {
      console.log(`device_list_paginate_active dto=`);
      console.info(dto);
      try { 
            var device_id: any = dto.device_id;  
            var type_id: any = dto.type_id;  
            var alarm_action_id: any = dto.alarm_action_id;  
            const query: any = await this.DeviceRepository.createQueryBuilder('d');
              query.select([  
                  'd.device_id AS device_id', 
                  'd.mqtt_id AS mqtt_id',
                  'd.setting_id AS setting_id',
                  'd.type_id AS type_id',
                  'd.device_name AS device_name',
                  'd.hardware_id AS hardware_id', 
                  'd.status_warning AS status_warning',
                  'd.recovery_warning AS recovery_warning',
                  'd.status_alert AS status_alert',
                  'd.recovery_alert AS recovery_alert', 
                  'd.time_life AS time_life',  
                  'd.period AS period', 
                  'd.work_status AS work_status', 
                  'd.max AS max',
                  'd.min AS min',  
                  'd.oid AS oid',
                  'd.mqtt_data_value AS mqtt_data_value',
                  'd.mqtt_data_control AS mqtt_data_control',
                  'd.measurement AS measurement',
                  'd.mqtt_control_on AS mqtt_control_on',
                  'd.mqtt_control_off AS mqtt_control_off',   
                  'd.bucket AS device_bucket', 
                  'ar.alarm_action_id AS alarm_action_id',
                  'arc.action_name AS action_name',
                  'arc.time_life AS time_life',
              ]); 
            query.innerJoin(
                              "sd_iot_alarm_device",
                              "ar",
                              "ar.device_id= d.device_id"
                          ); 
            query.innerJoin(
                              "sd_iot_device_alarm_action",
                              "arc",
                              "arc.alarm_action_id= ar.alarm_action_id"
                          ); 
        
            query.where('1=1'); 
            var status: any = 1;  
            query.andWhere('d.status=:status', { status: status });
            query.andWhere('arc.status=:status', { status: status });
            if (device_id) {
              query.andWhere('ar.device_id=:device_id', { device_id: device_id });
            }if (dto.alarm_action_id) {
              query.andWhere('ar.alarm_action_id =:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
            }if (dto.type_id) {
              query.andWhere('d.type_id =:type_id', { type_id: dto.type_id });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            query.orderBy('d.device_id', 'ASC');  // Default sorting
            query.addOrderBy('arc.alarm_action_id', 'ASC');
          return await query.getRawMany();
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async sd_iot_alarm_device_list_map(dto: any): Promise<Device> {
    console.log(`device_list_paginate_active dto=`);
    console.info(dto);
    try { 
      var device_id: any = dto.device_id;  
      var alarm_action_id: any = dto.alarm_action_id;  
      var mqtt_id: any = dto.mqtt_id;  
      var keyword: any = dto.keyword || '';
      /*****************/
      var createddate: any = dto.createddate;
      var updateddate: any = dto.updateddate;
      var sort: string = dto.sort;
      var page: number = dto.page || 1;
      var pageSize: number = dto.pageSize || 10;
      var isCount: number = dto.isCount || 0;
      const query: any = await this.DeviceRepository.createQueryBuilder('d');
        query.select([  
            'd.device_id AS device_id', 
            'd.mqtt_id AS mqtt_id',
            'd.setting_id AS setting_id',
            'sad.alarm_action_id AS alarm_action_id',
            'd.type_id AS type_id',
            'd.device_name AS device_name',
            //'d.sn AS sn',
            'd.hardware_id AS hardware_id', 
            'd.status_warning AS status_warning',
            'd.recovery_warning AS recovery_warning',
            'd.status_alert AS status_alert',
            'd.recovery_alert AS recovery_alert', 
            'd.time_life AS timelife',  
            'd.period AS period', 
            // 'd.work_status AS work_status', 
            // 'd.max AS max',
            // 'd.min AS min',  
            // 'd.oid AS oid',
            'd.mqtt_data_value AS mqtt_data_value',
            'd.mqtt_data_control AS mqtt_data_control',
            'd.model AS model',
            // 'd.vendor AS vendor',
            'd.comparevalue AS comparevalue',
            'd.createddate AS createddate',
            'd.updateddate AS updateddate',
            'd.status AS status',
            'd.unit AS unit',
            'd.action_id AS action_id',
            'd.status_alert_id AS status_alert_id',
            // 'd.measurement AS measurement',
            'd.mqtt_control_on AS mqtt_control_on',
            'd.mqtt_control_off AS mqtt_control_off',  
            'd.org AS device_org', 
            'd.bucket AS device_bucket', 
            't.type_name AS type_name',         
            'l.location_name AS location_name',   
            'l.configdata AS configdata',  
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment',  
            'mq.host AS mqtt_host',   
            'mq.port AS mqtt_port', 
            'd.mqtt_device_name AS mqtt_device_name', 
            'd.mqtt_status_over_name AS mqtt_status_over_name', 
            'd.mqtt_status_data_name AS mqtt_status_data_name', 
            'd.mqtt_act_relay_name AS mqtt_act_relay_name', 
            'd.mqtt_control_relay_name AS mqtt_control_relay_name',  
            'alarm.alarm_action_id AS alarm_action_id', 
            'alarm.action_name AS action_name', 
            'alarm.status_warning AS status_warning', 
            'alarm.recovery_warning AS recovery_warning', 
            'alarm.status_alert AS status_alert', 
            'alarm.recovery_alert AS recovery_alert', 
            'alarm.email_alarm AS email_alarm', 
            'alarm.line_alarm AS line_alarm', 
            'alarm.telegram_alarm AS telegram_alarm', 
            'alarm.sms_alarm AS sms_alarm', 
            'alarm.nonc_alarm AS nonc_alarm', 
            'alarm.time_life AS time_life', 
            'alarm.event AS event', 
            'alarm.status AS status',
        ]); 
      query.innerJoin(
                        "sd_iot_alarm_device",
                        "sad",
                        "sad.device_id= d.device_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_alarm_action",
                        "alarm",
                        "alarm.alarm_action_id= sad.alarm_action_id"
                    ); 
      query.innerJoin(
                        "sd_iot_setting",
                        "st",
                        "st.setting_id= d.setting_id"
                    ); 
      query.innerJoin(
                        "sd_iot_device_type",
                        "t",
                        "t.type_id = d.type_id"
                    ); 
      query.innerJoin(
                        "sd_iot_mqtt",
                        "mq",
                        "mq.mqtt_id = d.mqtt_id"
                    ); 
      query.innerJoin(
                        "sd_iot_location",
                        "l",
                        "l.location_id= mq.location_id"
                    ); 
      query.where('1=1');  
      var status: number = 1;
      query.andWhere('d.status=:status', { status: status });
      query.andWhere('mq.status=:status', { status: status });
      query.andWhere('alarm.status=:status', { status: status });
      if (keyword) {
        query.andWhere('d.keyword LIKE :keyword', { keyword: `%${keyword}%` });
      }
      if (alarm_action_id) {
        query.andWhere('sad.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
      }
      if (device_id) {
        query.andWhere('d.device_id=:device_id', { device_id: device_id });
      }if (dto.bucket) {
        query.andWhere('d.bucket =:bucket', { bucket: dto.bucket });
      }if (mqtt_id) {
        query.andWhere('d.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
      }if (dto.org) {
        query.andWhere('d.org=:org', { org: dto.org });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      }if (dto.type_id) {
        query.andWhere('d.type_id=:type_id', { type_id: dto.type_id });
      }if (dto.location_id) {
        query.andWhere('st.location_id=:location_id', { location_id: dto.location_id });
      }if (dto.sn) {
        query.andWhere('d.sn=:sn', { sn: dto.sn });
      }if (dto.status_warning) {
        query.andWhere('d.status_warning=:status_warning', { status_warning: dto.status_warning });
      }if (dto.recovery_warning) {
        query.andWhere('d.recovery_warning=:recovery_warning', { recovery_warning: dto.recovery_warning });
      }if (dto.status_alert) {
        query.andWhere('d.status_alert=:status_alert', { status_alert: dto.status_alert });
      }if (dto.recovery_alert) {
        query.andWhere('d.recovery_alert=:recovery_alert', { recovery_alert: dto.recovery_alert });
      }if (dto.time_life) {
        query.andWhere('d.time_life=:time_life', { time_life: dto.time_life });
      }if (dto.period) {
        query.andWhere('d.period=:period', { period: dto.period });
      }if (dto.max) {
        query.andWhere('d.max=:max', { max: dto.max });
      }if (dto.min) {
        query.andWhere('d.min=:min', { min: dto.min });
      }if (dto.hardware_id) {
        query.andWhere('d.hardware_id=:hardware_id', { hardware_id: dto.hardware_id });
      }if (dto.model) {
        query.andWhere('d.model=::model', { model: dto.model });
      }if (dto.vendor) {
        query.andWhere('d.vendor=:vendor', { vendor: dto.vendor });
      }if (dto.comparevalue) {
        query.andWhere('d.comparevalue=:comparevalue', { comparevalue: dto.comparevalue });
      }if (dto.oid) {
        query.andWhere('d.oid=:oid', { oid: dto.oid });
      }if (dto.action_id) {
        query.andWhere('d.action_id=:action_id', { action_id: dto.action_id });
      }if (dto.mqtt_data_value) {
        query.andWhere('d.mqtt_data_value=:mqtt_data_value', { mqtt_data_value: dto.mqtt_data_value });
      }if (dto.mqtt_data_control) {
        query.andWhere('d.mqtt_data_control=:mqtt_data_control', { mqtt_data_control: dto.mqtt_data_control });
      }if (createddate) {
        query.andWhere('d.createddate=:createddate', { createddate: createddate });
      }if (updateddate) {
        query.andWhere('d.updateddate=:updateddate', { updateddate: updateddate });
      } 
      query.printSql();
      query.maxExecutionTime(10000);
      query.getSql();
      query.orderBy('mq.sort', 'ASC');  // Default sorting
      query.addOrderBy('d.device_id', 'ASC');
      return await query.getRawMany();
    } catch (error) {
      var error1: any = JSON.stringify(error);
      var error2: any = JSON.parse(error1);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          //args: { errorMessage: JSON.stringify(error) },
          args: { errorMessage: error2 },
        },
      });
    }
  }
  
  /***********alarmprocesslogline start**************/
  async count_alarmprocesslogline(dto: any): Promise<alarmprocesslogline> {
    console.log(`count_dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.alarmprocessloglineRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async chk_alarmprocesslogline(dto: any): Promise<alarmprocesslogline> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocessloglineRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  } 
  async create_alarmprocesslogline(dto: any): Promise<alarmprocesslogline>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocessloglineRepository.save(
              this.alarmprocessloglineRepository.create(dto),
        );
        return result;
  } 
  async update_larmprocesslogline(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.line_alarm!='') {
          DataUpdate.line_alarm = dto.line_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log_line')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async delete_alarmprocesslog_line(dto: any): Promise<alarmprocesslogline>{ 
      try { 
            var device_id: any = dto.device_id;
            var alarm_action_id: any = dto.alarm_action_id;  
            var type_id: any = dto.type_id;  
            var date_now: any = dto.date_now;  
            var data_alarm: any = dto.data_alarm;  
            var alarm_status: any = dto.alarm_status;  
            const query: any = await this.alarmprocessloglineRepository.createQueryBuilder('l');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT l.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
            query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.andWhere('l.type_id=:type_id', { type_id: type_id });
            query.andWhere('l.date=:date', { date: date_now });
            query.andWhere('l.data_alarm=:data_alarm', { data_alarm: data_alarm });
            if(alarm_status){
               query.andWhere('l.alarm_status=:alarm_status', { alarm_status: alarm_status });
            }
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){  
                     
                    if(alarm_status){
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm,alarm_status:alarm_status}; 
                    }else{
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm};
                    }
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmprocessloglineRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  /***********alarmprocesslogline end**************/
  /***********alarmprocesslogsms start**************/
  async count_alarmprocesslogsms(dto: any): Promise<alarmprocesslogsms> {
    console.log(`count_dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.alarmprocesslogsmsRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async chk_alarmprocesslogsms(dto: any): Promise<alarmprocesslogsms> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocesslogsmsRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async create_alarmprocesslogsms(dto: any): Promise<alarmprocesslogsms>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocesslogsmsRepository.save(
              this.alarmprocesslogsmsRepository.create(dto),
        );
        return result;
  }
  async update_larmprocesslogsms(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log_sms')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async delete_alarmprocesslog_sms(dto: any): Promise<alarmprocesslogsms>{ 
      try { 
            var device_id: any = dto.device_id;
            var alarm_action_id: any = dto.alarm_action_id;  
            var type_id: any = dto.type_id;  
            var date_now: any = dto.date_now;  
            var data_alarm: any = dto.data_alarm;  
            var alarm_status: any = dto.alarm_status;  
            const query: any = await this.alarmprocesslogsmsRepository.createQueryBuilder('l');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT l.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
            query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.andWhere('l.type_id=:type_id', { type_id: type_id });
            query.andWhere('l.date=:date', { date: date_now });
            query.andWhere('l.data_alarm=:data_alarm', { data_alarm: data_alarm });
            if(alarm_status){
               query.andWhere('l.alarm_status=:alarm_status', { alarm_status: alarm_status });
            }
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){  
                     
                    if(alarm_status){
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm,alarm_status:alarm_status}; 
                    }else{
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm};
                    }
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmprocesslogsmsRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  /***********alarmprocesslogsms end**************/
  /***********alarmprocesslogtelegram start**************/
  async count_alarmprocesslogtelegram(dto: any): Promise<alarmprocesslogtelegram> {
    console.log(`count_dto=`);
    console.info(dto);  
    try { 
        var schedule_id: any = dto.schedule_id;  
        var device_id: any = dto.device_id;    
        var schedule_event_start: any = dto.schedule_event_start;   
        var day: any = dto.day;   
        var doday: any = dto.doday;   
        var dotime: any = dto.dotime;   
        var schedule_event: any = dto.schedule_event;   
        var device_status: any = dto.device_status;   
        var status: any = dto.status;   
        const query: any = await this.alarmprocesslogtelegramRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('COUNT(DISTINCT l.id)', 'cnt'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } 
        if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          return count;
    
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async chk_alarmprocesslogtelegram(dto: any): Promise<alarmprocesslogtelegram> {
    console.log(`dto=`);
    console.info(dto);  
    try {  
        const query: any = await this.alarmprocesslogtelegramRepository.createQueryBuilder('l');
        var countRs: any = await  query.select('l.*'); 
        query.where('1=1');  
        if (dto.alarm_action_id) {
          query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id });
        }if (dto.device_id) {
          query.andWhere('l.device_id=:device_id', { device_id: dto.device_id });
        }if (dto.type_id) {
          query.andWhere('l.type_id=:type_id', { type_id: dto.type_id });
        }if (dto.alarm_type) {
          query.andWhere('l.alarm_type=:alarm_type', { alarm_type: dto.alarm_type });
        } if (dto.event) {
          query.andWhere('l.event=:event', { event: dto.event });
        }if (dto.date) {
          query.andWhere('l.date=:date', { date: dto.date });
        } if (dto.time) {
          query.andWhere('l.time=:time', { time: dto.time });
        }if (dto.status) {
          query.andWhere('l.status=:status', { status: dto.status });
        }if (dto.data) {
          query.andWhere('l.data=:data', { data: dto.data });
        }if (dto.data_alarm) {
          query.andWhere('l.data_alarm=:data_alarm', { data_alarm: dto.data_alarm });
        } if (dto.alarm_status) {
          query.andWhere('l.alarm_status=:alarm_status', { alarm_status: dto.alarm_status });
        } 
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCountt.count =>` + tempCounts.count);
          query.orderBy('l.createddate', 'DESC');  // Default sorting
          query.addOrderBy('l.updateddate', 'DESC');
          return await query.getRawMany(); 
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async create_alarmprocesslogtelegram(dto: any): Promise<alarmprocesslogtelegram>{ 
            console.log('dto=>');console.info(dto);   
              const result: any = await this.alarmprocesslogtelegramRepository.save(
              this.alarmprocesslogtelegramRepository.create(dto),
        );
        return result;
  }
  async update_larmprocesslogtelegram(dto) { 
        var id = dto.id;
        var DataUpdate: any = {};     
        if (dto.event!='') {
          DataUpdate.event = dto.event;
        } 
        if (dto.alarm_type!='') {
          DataUpdate.alarm_type = dto.alarm_type;
        } 
        if (dto.status_warning!='') {
          DataUpdate.status_warning = dto.status_warning;
        } 
        if (dto.recovery_warning!='') {  
          DataUpdate.recovery_warning = dto.recovery_warning;
        } 
        if (dto.status_alert!='') {
          DataUpdate.status_alert = dto.status_alert;
        } 
        if (dto.recovery_alert!='') {
          DataUpdate.recovery_alert = dto.recovery_alert;
        } 
        if (dto.email_alarm!='') {
          DataUpdate.email_alarm = dto.email_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.telegram_alarm!='') {
          DataUpdate.telegram_alarm = dto.telegram_alarm;
        } 
        if (dto.sms_alarm!='') {
          DataUpdate.sms_alarm = dto.sms_alarm;
        } 
        if (dto.nonc_alarm!='') {
          DataUpdate.nonc_alarm = dto.nonc_alarm;
        } 
        if (dto.status!='') { 
          DataUpdate.status = dto.status;
        } 
        if (dto.time!='') {
          DataUpdate.time = dto.time;
        }  
        if (dto.data!='') {
          DataUpdate.data = dto.data;
        }  
        if (dto.alarm_status!='') {
          DataUpdate.alarm_status = dto.alarm_status;
        } 
        if (dto.subject!='') {
          DataUpdate.subject = dto.subject;
        } 
        if (dto.content!='') {
          DataUpdate.content = dto.content;
        } 
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        const updateddate = moment(new Date(), DATE_TIME_FORMAT);
        DataUpdate.updateddate = Date();  
        await this.alarmprocesslogRepository
            .createQueryBuilder()
            .update('sd_alarm_process_log_telegram')
            .set(DataUpdate)
            .where('alarm_action_id=:alarm_action_id', { alarm_action_id: dto.alarm_action_id })
            .andWhere('device_id =:device_id', { device_id: dto.device_id })
            .andWhere('type_id =:type_id', { type_id: dto.type_id })
            .andWhere('data_alarm =:data_alarm', { data_alarm: dto.data_alarm })
            .andWhere('date =:date', { date: dto.date }) 
            .execute();
        return 200;
  }
  async delete_alarmprocesslog_telegram(dto: any): Promise<alarmprocesslogtelegram>{ 
      try { 
            var device_id: any = dto.device_id;
            var alarm_action_id: any = dto.alarm_action_id;  
            var type_id: any = dto.type_id;  
            var date_now: any = dto.date_now;  
            var data_alarm: any = dto.data_alarm;  
            var alarm_status: any = dto.alarm_status;  
            const query: any = await this.alarmprocesslogtelegramRepository.createQueryBuilder('l');
            //var countRs: number = await query.getCount();
            var countRs: number = await query.select('COUNT(DISTINCT l.alarm_action_id)', 'cnt');
            query.where('1=1');
            query.andWhere('l.device_id=:device_id', { device_id: device_id });
            query.andWhere('l.alarm_action_id=:alarm_action_id', { alarm_action_id: alarm_action_id });
            query.andWhere('l.type_id=:type_id', { type_id: type_id });
            query.andWhere('l.date=:date', { date: date_now });
            query.andWhere('l.data_alarm=:data_alarm', { data_alarm: data_alarm });
            if(alarm_status){
               query.andWhere('l.alarm_status=:alarm_status', { alarm_status: alarm_status });
            }
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            var count: any = await query.getCount();
            let tempCounts: any = {};
            tempCounts.count = countRs;
            console.log(`count =>` + count);console.log(`tempCountt.count =>` + tempCounts.count);
            if(count>=1){  
                     
                    if(alarm_status){
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm,alarm_status:alarm_status}; 
                    }else{
                        var criteria:any = { device_id: device_id,alarm_action_id: alarm_action_id,type_id: type_id,date: date_now,data_alarm: data_alarm};
                    }
                    console.log(`Attempting to delete record with criteria:`, criteria);
                    const deleteResult:any =await this.alarmprocesslogtelegramRepository.delete(criteria);
                    // The result object contains information about the operation.
                    // The 'affected' property shows how many rows were deleted.
                    if (deleteResult.affected && deleteResult.affected > 0) {
                        console.log(`Successfully deleted ${deleteResult.affected} record(s).`);
                    } else {
                        console.log('No records found matching the criteria. Nothing was deleted.');
                    }
                return deleteResult;
            }else{
                return null;
            }
    } catch (error) {
          var error1: any = JSON.stringify(error);
          var error2: any = JSON.parse(error1);
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
              //args: { errorMessage: JSON.stringify(error) },
              args: { errorMessage: error2 },
            },
          });
    }
  }
  /***********alarmprocesslogtelegram end**************/
  /***********user start**************/
  async useractiveemail(dto: any): Promise<User> {
          console.log(`dto=`);
          console.info(dto); 
          try {
            const isCount: number = 0;
            const active_status: any = 1;
            var status: any = '1';
            const query: any = await this.userRepository.createQueryBuilder('u');
            if (isCount == 1) {
              var countRs: number = await query.getCount(['u.id AS uid']);
            } else {
              /*
               SELECT 
                  "u"."role_id" as role_id, 
                  "u"."email" as email, 
                  "u"."username" as username, 
                  "u"."public_notification" as public_notification, 
                  "u"."sms_notification" as sms_notification, 
                  "u"."email_notification" as email_notification, 
                  "u"."line_notification" as line_notification, 
                  "u"."mobile_number" as mobile_number, 
                  "u"."phone_number" as phone_number, 
                  "u"."lineid" as lineid 
                FROM 
                  "public"."sd_user" "u" 
                WHERE 
                  (
                    1 = 1 
                    AND "u"."email_notification" = 1
                    AND "u"."active_status" = 1
                    AND "u"."status" IN(1)
                  ) 
                  AND ("u"."deletedate" IS NULL) -- PARAMETERS: [1,1,1,2,3,4,5,6]
                */
              query.select(['u.role_id as role_id',
                            'u.email as email',
                            'u.username as username',
                            // 'u.firstname as firstname',
                            // 'u.lastname as lastname',
                            // 'u.fullname as fullname',
                            // 'u.nickname as nickname',
                            // 'u.status as status',
                            // 'u.active_status as active_status',
                            // 'u.network_id as network_id',
                            // 'u.infomation_agree_status as infomation_agree_status',
                            // 'u.online_status as online_status',
                            // 'u.network_type_id as network_type_id',
                            // 'u.public_status as public_status',
                            // 'u.type_id as type_id',
                            'u.public_notification as public_notification',
                            'u.sms_notification as sms_notification',
                            'u.email_notification as email_notification',
                            'u.line_notification as line_notification',
                            'u.mobile_number as mobile_number',
                            'u.phone_number as phone_number',
                            'u.lineid as lineid']);
            }
            query.where('1=1');  
            query.andWhere('u.email_notification=:email_notification', {
                email_notification: active_status,
              });
            if (active_status) {
              query.andWhere('u.active_status=:active_status', {
                active_status: active_status,
              });
              query.andWhere('u.status IN(:...status)', { status: [1] });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            if (isCount == 1) {
              var count: any = await query.getCount();
              let tempCounts: any = {};
              tempCounts.count = countRs;
              console.log(`count =>` + count);
              console.log(`tempCounts.count =>` + tempCounts.count);
              // return tempCounts.count;
              return count;
            } else {
              query.orderBy(`u.createddate`, 'ASC');
              var rs: any = await query.getRawMany();
              console.log(`rs =>` + rs);
              return rs;
            }
          } catch (error) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
                args: { errorMessage: JSON.stringify(error) },
              },
            });
          }
  }
  async useractivesms(dto: any): Promise<User> {
          console.log(`dto=`);
          console.info(dto); 
          try {
            const isCount: number = 0;
            const active_status: any = 1;
            var status: any = '1';
            const query: any = await this.userRepository.createQueryBuilder('u');
            if (isCount == 1) {
              var countRs: number = await query.getCount(['u.id AS uid']);
            } else {
              query.select(['u.role_id',
                            'u.email',
                            'u.username',
                            'u.firstname',
                            'u.lastname',
                            'u.fullname',
                            'u.nickname',
                            'u.status',
                            'u.active_status',
                            'u.network_id',
                            'u.infomation_agree_status',
                            'u.online_status',
                            'u.network_type_id',
                            'u.public_status',
                            'u.type_id',
                            'u.public_notification',
                            'u.sms_notification',
                            'u.email_notification',
                            'u.line_notification',
                            'u.mobile_number',
                            'u.phone_number',
                            'u.lineid']);
            }
            query.where('1=1'); 
            /* 
                sms_notification
                email_notification
                line_notification
                mobile_number
                phone_number
                lineid
            */
             query.andWhere('u.sms_notification=:sms_notification', {
                sms_notification: active_status,
              });
            if (active_status) {
              query.andWhere('u.active_status=:active_status', {
                active_status: active_status,
              });
              query.andWhere('u.status IN(:...status)', { status: [1] });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            if (isCount == 1) {
              var count: any = await query.getCount();
              let tempCounts: any = {};
              tempCounts.count = countRs;
              console.log(`count =>` + count);
              console.log(`tempCounts.count =>` + tempCounts.count);
              // return tempCounts.count;
              return count;
            } else {
              query.orderBy(`u.createddate`, 'ASC');
              var rs: any = await query.getRawMany();
              console.log(`rs =>` + rs);
              return rs;
            }
          } catch (error) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
                args: { errorMessage: JSON.stringify(error) },
              },
            });
          }
  }
  async useractiveline(dto: any): Promise<User> {
          console.log(`dto=`);
          console.info(dto); 
          try {
            const isCount: number = 0;
            const active_status: any = 1;
            var status: any = '1';
            const query: any = await this.userRepository.createQueryBuilder('u');
            if (isCount == 1) {
              var countRs: number = await query.getCount(['u.id AS uid']);
            } else {
              query.select(['u.role_id',
                            'u.email',
                            'u.username',
                            'u.firstname',
                            'u.lastname',
                            'u.fullname',
                            'u.nickname',
                            'u.status',
                            'u.active_status',
                            'u.network_id',
                            'u.infomation_agree_status',
                            'u.online_status',
                            'u.network_type_id',
                            'u.public_status',
                            'u.type_id',
                            'u.public_notification',
                            'u.sms_notification',
                            'u.email_notification',
                            'u.line_notification',
                            'u.mobile_number',
                            'u.phone_number',
                            'u.lineid']);
            }
            query.where('1=1');  
             query.andWhere('u.line_notification=:line_notification', {
                line_notification: active_status,
              });
            if (active_status) {
              query.andWhere('u.active_status=:active_status', {
                active_status: active_status,
              });
              query.andWhere('u.status IN(:...status)', { status: [1] });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            if (isCount == 1) {
              var count: any = await query.getCount();
              let tempCounts: any = {};
              tempCounts.count = countRs;
              console.log(`count =>` + count);
              console.log(`tempCounts.count =>` + tempCounts.count);
              // return tempCounts.count;
              return count;
            } else {
              query.orderBy(`u.createddate`, 'ASC');
              var rs: any = await query.getRawMany();
              console.log(`rs =>` + rs);
              return rs;
            }
          } catch (error) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
                args: { errorMessage: JSON.stringify(error) },
              },
            });
          }
  }
  async listpaginateAdmin(dto: any): Promise<User> {
      console.log(`getProfile dto=`);
      console.info(dto);
      try {
        var idx: string = dto.idx || '';
        var keyword: any = dto.keyword || '';
        var status: any = dto.status || '1';
        var active_status: any = dto.active_status || '0,1';
        var sort: string = dto.sort;
        var page: number = dto.page || 1;
        var pageSize: number = dto.pageSize || 10;
        var isCount: number = dto.isCount || 0;
        const query: any = await this.userRepository.createQueryBuilder('u');
        if (isCount == 1) {
         // var countRs: number = await query.getCount();
          var countRs: number = await query.select('COUNT(DISTINCT u.id)', 'cnt');
        } else {
          query.select([
            'DISTINCT u.id AS uid',
            'u.role_id AS role_id',
            'u.email AS email',
            'u.username AS username',
            'u.firstname AS firstname',
            'u.lastname AS lastname',
            'u.fullname AS fullname',
            'u.nickname AS nickname',
            'u.idcard AS idcard',
            'u.lastsignindate AS lastsignindate',
            'u.status AS status',
            'u.active_status AS active_status',
            'u.network_id AS network_id',
            'u.remark AS remark',
            'u.infomation_agree_status AS infomation_agree_status',
            'u.gender AS gender',
            'u.birthday AS birthday',
            'u.online_status AS online_status',
            'u.message AS message',
            'u.network_type_id AS network_type_id',
            'u.public_status AS public_status',
            'u.type_id AS type_id',
            'u.avatarpath AS avatarpath',
            'u.avatar AS avatar',
            'u.loginfailed AS loginFailed',
            'u.createddate AS createddate',
            'u.updateddate AS updateddate',
            'u.deletedate AS deletedate',
            'u.mobile_number AS mobile_number',
            'u.lineid AS lineid',
            'u.loginfailed AS loginfailed',
            'u.public_notification AS public_notification',
            'u.sms_notification AS sms_notification',
            'u.email_notification AS email_notification',
            'u.line_notification AS line_notification',
            'u.mobile_number AS mobile_number',
            'u.phone_number AS phone_number',
            'role.title AS rolename',
            'access.role_type_id AS role_type_id',
            'permision.name  AS permision_name',
            'permision.detail  AS permision_detail',
            'permision.created  AS permision_created',
            'permision.updated  AS permision_updated',
            'permision.insert  AS permision_insert',
            'permision.update  AS permision_update',
            'permision.delete  AS permision_delete',
            'permision.select  AS permision_select',
            'permision.log  AS permision_log',
            'permision.config  AS permision_config',
            'permision.truncate  AS permision_truncate',
          ]);
        }
        query.innerJoin(
                          "sd_user_role",
                          "role",
                          "u.role_id = role.role_id"
                      ); 
        query.innerJoin(
                          "sd_user_roles_access",
                          "access",
                          "role.role_id = access.role_type_id"
                      ); 
        query.innerJoin(
                          "sd_user_roles_permision",
                          "permision",
                          "access.role_type_id = permision.role_type_id"
                      );  
        query.where('1=1'); 
        if (keyword) {
          query.andWhere('u.username like :username', {
            username: keyword ? `%${keyword}%` : '%',
          });
        }
        if (idx) {
          query.andWhere('u.id=:id', { id: idx });
        }
        if (status) {
           query.andWhere("u.status IN(:...status)", { status: [1] });
           const statusArray: any = status.split(',').map(Number);
           query.andWhere('u.status IN(:...status)', { status: statusArray });
        }
        if (active_status) {
          //query.andWhere('u.active_status=:active_status', {active_status: active_status});
          const statusArray: any = active_status.split(',').map(Number);
          query.andWhere('u.active_status IN(:...active_status)', {
            active_status: statusArray,
          });
        }
       // query.groupBy('u.id');
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        if (isCount == 1) {
          // let tempCounts:any = {};
          // tempCounts.count = countRs;
          // return tempCounts.count;
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCounts.count =>` + tempCounts.count);
          return count;
        } else {
          // Sorting logic
          if (sort) {
            const sortResult = convertSortInput(sort);
            if (sortResult == false) {
              throw new BadRequestException(`Invalid sort option.`);
            }
            const { sortField, sortOrder } = sortResult;
            console.log(`sort=`);
            console.info(sort);
            console.log(`sortField=`+sortField);
            console.log(`sortOrder=`+sortOrder);
            console.log(`sortResult=`);
            console.info(sortResult); 
            if(sortOrder=='ASC' || sortOrder=='asc'){
              var sortOrders:any ='ASC';
            }else if(sortOrder=='DESC' || sortOrder=='desc'){
              var sortOrders:any ='DESC';
            }else{
              var sortOrders:any ='ASC';
            }
            query.orderBy(
              `u.${sortField}`,
              sortOrders.toUpperCase(),
            );
          } else {
            // Default sorting
            query.orderBy(`u.createddate`, 'ASC');
          }
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          return await query.getRawMany();
        }
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async listpaginate(dto: any): Promise<User> {
      console.log(`getProfile dto=`);
      console.info(dto);
      try {
        var idx: string = dto.idx || '';
        var keyword: any = dto.keyword || '';
        var status: any = dto.status || '1';
        var active_status: any = dto.active_status || '0,1';
        var sort: string = dto.sort;
        var page: number = dto.page || 1;
        var pageSize: number = dto.pageSize || 10;
        var isCount: number = dto.isCount || 0;
        const query: any = await this.userRepository.createQueryBuilder('u');
        if (isCount == 1) {
         // var countRs: number = await query.getCount();
          var countRs: number = await query.select('COUNT(DISTINCT u.id)', 'cnt');
        } else {
          query.select([
            'u.id AS uid',
            'u.role_id AS role_id',
            'u.email AS email',
            'u.username AS username',
            'u.firstname AS firstname',
            'u.lastname AS lastname',
            'u.fullname AS fullname',
            'u.nickname AS nickname',
            'u.idcard AS idcard',
            'u.lastsignindate AS lastsignindate',
            'u.status AS status',
            'u.active_status AS active_status',
            'u.network_id AS network_id',
            'u.remark AS remark',
            'u.infomation_agree_status AS infomation_agree_status',
            'u.gender AS gender',
            'u.birthday AS birthday',
            'u.online_status AS online_status',
            'u.message AS message',
            'u.network_type_id AS network_type_id',
            'u.public_status AS public_status',
            'u.type_id AS type_id',
            'u.avatarpath AS avatarpath',
            'u.avatar AS avatar',
            'u.loginfailed AS loginFailed',
            'u.createddate AS createddate',
            'u.updateddate AS updateddate',
            'u.deletedate AS deletedate',
          ]);
        }
        query.where('1=1');
        if (keyword) {
          query.andWhere('u.username like :username', {
            username: keyword ? `%${keyword}%` : '%',
          });
        }
        if (idx) {
          query.andWhere('u.id=:id', { id: idx });
        }
        if (status) {
          //query.andWhere("u.status IN(:...status)", { status: [1,88,99] });
          const statusArray: any = status.split(',').map(Number);
          query.andWhere('u.status IN(:...status)', { status: statusArray });
        }
        if (active_status) {
          //query.andWhere('u.active_status=:active_status', {active_status: active_status});
          const statusArray: any = active_status.split(',').map(Number);
          query.andWhere('u.active_status IN(:...active_status)', {
            active_status: statusArray,
          });
        }
        query.printSql();
        query.maxExecutionTime(10000);
        query.getSql();
        if (isCount == 1) {
          // let tempCounts:any = {};
          // tempCounts.count = countRs;
          // return tempCounts.count;
          var count: any = await query.getCount();
          let tempCounts: any = {};
          tempCounts.count = countRs;
          console.log(`count =>` + count);
          console.log(`tempCounts.count =>` + tempCounts.count);
          return count;
        } else {
          // Sorting logic
          if (sort) {
            const sortResult = convertSortInput(sort);
            if (sortResult == false) {
              throw new BadRequestException(`Invalid sort option.`);
            }
            const { sortField, sortOrder } = sortResult;
            
            console.log(`sort=`);
            console.info(sort);
            console.log(`sortField=`+sortField);
            console.log(`sortOrder=`+sortOrder);
            console.log(`sortResult=`);
            console.info(sortResult); 
            if(sortOrder=='ASC' || sortOrder=='asc'){
              var sortOrders:any ='ASC';
            }else if(sortOrder=='DESC' || sortOrder=='desc'){
              var sortOrders:any ='DESC';
            }else{
              var sortOrders:any ='ASC';
            }
            query.orderBy(
              `u.${sortField}`,
              sortOrders.toUpperCase(),
            );
          } else {
            // Default sorting
            query.orderBy(`u.createddate`, 'ASC');
          }
          query.limit(pageSize);
          query.offset(pageSize * (page - 1));
          return await query.getRawMany();
        }
      } catch (error) {
        var error1: any = JSON.stringify(error);
        var error2: any = JSON.parse(error1);
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            //args: { errorMessage: JSON.stringify(error) },
            args: { errorMessage: error2 },
          },
        });
      }
  }
  async useractivetelegram(dto: any): Promise<User> {
          console.log(`dto=`);
          console.info(dto); 
          try {
            const isCount: number = 0;
            const active_status: any = 1;
            var status: any = '1';
            const query: any = await this.userRepository.createQueryBuilder('u');
            if (isCount == 1) {
              var countRs: number = await query.getCount(['u.id AS uid']);
            } else {
              query.select(['u.role_id',
                            'u.email',
                            'u.username',
                            'u.firstname',
                            'u.lastname',
                            'u.fullname',
                            'u.nickname',
                            'u.status',
                            'u.active_status',
                            'u.network_id',
                            'u.infomation_agree_status',
                            'u.online_status',
                            'u.network_type_id',
                            'u.public_status',
                            'u.type_id',
                            'u.public_notification',
                            'u.sms_notification',
                            'u.email_notification',
                            'u.line_notification',
                            'u.mobile_number',
                            'u.phone_number',
                            'u.lineid']);
            }
            query.where('1=1'); 
            /* 
                sms_notification
                email_notification
                line_notification
                mobile_number
                phone_number
                lineid
            */
             query.andWhere('u.sms_notification=:sms_notification', {
                sms_notification: active_status,
              });
            if (active_status) {
              query.andWhere('u.active_status=:active_status', {
                active_status: active_status,
              });
              query.andWhere('u.status IN(:...status)', { status: [1] });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            if (isCount == 1) {
              var count: any = await query.getCount();
              let tempCounts: any = {};
              tempCounts.count = countRs;
              console.log(`count =>` + count);
              console.log(`tempCounts.count =>` + tempCounts.count);
              // return tempCounts.count;
              return count;
            } else {
              query.orderBy(`u.createddate`, 'ASC');
              var rs: any = await query.getRawMany();
              console.log(`rs =>` + rs);
              return rs;
            }
          } catch (error) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
                args: { errorMessage: JSON.stringify(error) },
              },
            });
          }
  }
  /***********user end**************/
  async useractive(dto: any): Promise<User> {
          console.log(`dto=`);
          console.info(dto); 
          try {
            const isCount: number = 0;
            const active_status: any = 1;
            var status: any = '1';
            const query: any = await this.userRepository.createQueryBuilder('u');
            if (isCount == 1) {
              var countRs: number = await query.getCount(['u.id AS uid']);
            } else {
              query.select(['u.*']);
            }
            query.where('1=1'); 
            if (active_status) {
              query.andWhere('u.active_status=:active_status', {
                active_status: active_status,
              });
              query.andWhere('u.status IN(:...status)', { status: [1] });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql();
            if (isCount == 1) {
              var count: any = await query.getCount();
              let tempCounts: any = {};
              tempCounts.count = countRs;
              console.log(`count =>` + count);
              console.log(`tempCounts.count =>` + tempCounts.count);
              // return tempCounts.count;
              return count;
            } else {
              query.orderBy(`u.createddate`, 'ASC');
              var rs: any = await query.getRawMany();
              console.log(`rs =>` + rs);
              return rs;
            }
          } catch (error) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: {
                args: { errorMessage: JSON.stringify(error) },
              },
            });
          }
  }
  async getdevicedata(topics: any): Promise<void> {
        var topic:any =encodeURI(topics);
        console.log(`---------getdevicedata------------`);
        console.log(`topics=>`);
        console.info(topics);  
        if(!topic){
                      var ResultData:any = {
                            statusCode: 200,
                            code: 200,
                            topic: topic,
                            payload: [], 
                            status: 0,
                            message: `Please specify topic..`,
                            message_th: `กรุณาระบุ topic..`,
                          }; 
                      return ResultData; 
          }    
        try {  
                if(topic){
                
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
                  console.log(`Requesting data from topic: ${topic}`);
                  var data:any =  await Cache.GetCacheData(topic); 
                    if (data) { 
                        var dataObject:any = data; 
                        var getdataFrom = 'Cache';
                    }else if (!data) { 
                        var data = await this.getDataFromTopic(topic); 
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
                                var ResultData:any = {
                                    statusCode: 200,
                                    code: 200,
                                    topic: topic,
                                    payload: dataObjects, 
                                    mqttdata: {},    
                                    status: 0,
                                    message: `Please specify topic..`,
                                    message_th: `กรุณาระบุ topic..`,
                                  };
                              return ResultData; 
                        }
                      //  var InpuDatacache: any = {keycache: `${topic}`,time: 30,data: data};
                      //  await Cache.SetCacheData(InpuDatacache); 
                        var getdataFrom = 'MQTT';
                        var mqttdata = await this.getDataFromTopic(topic);
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
                        var InpuDatacache: any = {keycache: `${topic}`,time: 20,data: dataObject};
                        await Cache.SetCacheData(InpuDatacache); 
                    }    
                        
                        // var mqttdata = await this.getDataFromTopic(topic);
                        // const parts =mqttdata.split(','); 
                        /**********แจ้งเตียน**********/  
                        var temperature:any = dataObject['temperature'];
                        var fan1:any = dataObject['fan1'];
                        var fan2:any = dataObject['fan2'];
                        var overFan1:any = dataObject['overFan1'];
                        var overFan2:any = dataObject['overFan2'];
                        if(overFan1==0){
                          /**********แจ้งเตียน**********/    
                          var fan1:any = dataObject['fan1'];           
                        }if(overFan2==0){
                          /**********แจ้งเตียน**********/  
                        } 
                        /**********แจ้งเตียน**********/  
                        var dataObjectRs: any = { 
                                  mqtt_dada: topic, 
                                  timestamp: timestamp, 
                                  temperature: temperature,
                                  contRelay1: dataObject['contRelay1'],
                                  actRelay1:dataObject['actRelay1'],
                                  fan1: fan1,
                                  overFan1: overFan1,
                                  contRelay2: dataObject['contRelay2'],
                                  actRelay2: dataObject['actRelay2'],
                                  fan2: fan2,
                                  overFan2: overFan2,
                        }; 
                        
  
                    var ResultData:any = {
                              statusCode: 200,
                              code: 200,
                              topic: topic,  
                              payload: dataObjectRs,  
                              mqttdata: mqttdata,   
                              getdataFrom:getdataFrom,
                              version: '1.0.1',
                              status: 1,
                              message: `Message successfully Get to topic: ${topic}`,
                              message_th: `Message successfully Get to topic: ${topic}`,
                            };
                  return ResultData; 
          }
        
        } catch (err) {
                   this.logger.error(`Error ${JSON.stringify(err)}`);
                   throw new UnprocessableEntityException({
                       status: HttpStatus.UNPROCESSABLE_ENTITY,
                       error: {
                       errorMessage: err.message,
                       ms: 'Unprocessable Entity Exception',
                       },
                   });
        }
  }
  async publish(topics: string, payload: any): Promise<void> {
      var topic:any =encodeURI(topics);
      console.log(`---------publish------------`);
      console.log(`topics=>`);
      console.info(topics); 
      console.log(`payload=>`);
      console.info(payload); 
      try {
        // client.emit() is for fire-and-forget messaging
        await firstValueFrom(this.client.emit(topic, payload));
        var InpuDatacache: any = { 
                      keycache: `${topic}`,
                      time: 86400,
                      data: payload,   
        };
        await Cache.SetCacheData(InpuDatacache); 
        const originalTopic = topic;
        // แทนที่ 'CONTROL' ด้วย 'DATA'
        const newTopic = originalTopic.replace('CONTROL', 'DATA'); 
        Cache.DeleteCacheData(newTopic); 
        this.logger.log(`Published to topic "${topic}"`);
      } catch (error) {
        this.logger.error(`Failed to publish to topic "${topic}"`, error);
      }
  }
  async _getDataFromTopic(topics: string): Promise<any> {
      var topic:any =encodeURI(topics);
      console.log(`---------getDataFromTopic------------`);
      console.log(`topic=>`);
      console.info(topic); 
      return new Promise((resolve, reject) => {
        // Subscribe ไปยัง topic ที่ต้องการ
        this.mqttClient.subscribe(topic, (err) => {
          if (err) {
            return reject(err);
          }
        });
  
        // รอรับ message แรกจาก topic ที่ตรงกัน
        this.messageStream
          .pipe(
            filter((message) => message.topic == topic), // กรองเฉพาะ topic ที่สนใจ
            first(), // เอาแค่ message แรกที่เข้ามา
            timeout(60000), // ตั้งเวลา timeout 60 วินาที หากไม่มี message เข้ามา
          )
          .subscribe({
            next: (message) => {
              // เมื่อได้รับข้อมูลแล้ว ให้ unsubscribe ทันทีเพื่อไม่รับข้อมูลซ้ำ
              this.mqttClient.unsubscribe(topic);
              try {
                // ข้อมูลที่ได้รับจาก MQTT จะเป็น Buffer ต้องแปลงเป็น string ก่อน
                // และอาจจะต้อง parse เป็น JSON หากข้อมูลที่ส่งมาเป็น JSON string
                resolve(JSON.parse(message.payload.toString()));
              } catch (e) {
                // หาก parse JSON ไม่ได้ ให้ส่งกลับเป็น string ธรรมดา
                resolve(message.payload.toString());
              }
            },
            error: (err) => {
              this.mqttClient.unsubscribe(topic);
              reject(new Error(`Timeout: No message received from topic "${topic}" within 60 seconds.`));
            },
          });
      });
  }
  async getDataFromTopic(topics: string): Promise<any> {
      const topic = encodeURI(topics);
      console.log(`---------getDataFromTopic------------`);
      console.log(`topic=>`, topic);

      // สมมติว่า mqttClient.subscribe รองรับ Promise (หรือใช้ wrapper เพื่อ await)
      await new Promise<void>((resolve, reject) => {
          this.mqttClient.subscribe(topic, (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve();
              }
          });
      });

      return new Promise((resolve, reject) => {
          const subscription = this.messageStream.pipe(
              filter((message) => message.topic == topic),
              first(),
              timeout(60000)
          ).subscribe({
              next: (message) => {
                  this.mqttClient.unsubscribe(topic, () => {
                      // Unsubscribe callback ถ้าต้องการ
                  });
                  try {
                      const payloadStr = message.payload.toString();
                      resolve(JSON.parse(payloadStr));
                  } catch {
                      resolve(message.payload.toString());
                  }
                  subscription.unsubscribe();
              },
              error: (err) => {
                  this.mqttClient.unsubscribe(topic);
                  if (err.name == 'TimeoutError') {
                      reject(new Error(`Timeout: No message received from topic "${topic}" within 60 seconds.`));
                  } else {
                      reject(err);
                  }
                  subscription.unsubscribe();
              }
          });
      });
  }
  async getdevicedataAll(topics: any): Promise<void> {
            var topic:any =encodeURI(topics);
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
          console.log(`---------getdevicedataAll------------`);
          console.log(`datePart=>`);
          console.info(datePart);
          console.log(`timePart=>`);
          console.info(timePart);
          console.log(`topics=>`);
          console.info(topics);
          console.log(`topic=>`);
          console.info(topic);
          console.log(`Requesting data from topic: ${topic}`);
           if(!topic){
                        var ResultData:any = {
                              topic: topic,
                              data: [], 
                              timestamp: timestamp, 
                              status: 0,
                              message: `Please specify topic..`,
                              message_th: `กรุณาระบุ topic..`,
                            }; 
                        return ResultData; 
            }     
          var keycache :any=md5('mqtt_get_data_'+topic);
          try {  
                      console.log(`Requesting data from keycache: ${keycache}`);
                      var data:any= await Cache.GetCacheData(keycache); 
                      if (data) {   
                          return data; 
                      }else {
                            var mqttdata:any=await this.getDataFromTopic(topic);
                            var parts:any=mqttdata.split(','); 
                            var dataObjects:any={
                                          topic: topic,   
                                          cache: 'cache', 
                                          status: 1,
                                          timestamp: timestamp, 
                                          mqtt: mqttdata, 
                                          data:parts
                                      };
                            var InpuDatacache: any = {keycache: keycache,time: 5,data: dataObjects};
                            await Cache.SetCacheData(InpuDatacache);   
                          return dataObjects; 
                      }  
          } catch (err) {
                     this.logger.error(`Error ${JSON.stringify(err)}`);
                     throw new UnprocessableEntityException({
                         status: HttpStatus.UNPROCESSABLE_ENTITY,
                         error: {
                         errorMessage: err.message,
                         ms: 'Unprocessable Entity Exception',
                         },
                     });
          }
  }
  async devicecontrol(topics: string, message_mqtt: any): Promise<void> {
      console.log(`---------devicecontrol------------`);
      console.log(`topics=>`);
      console.info(topics);
      console.log(`message_mqtt=>`);
      console.info(message_mqtt);
            var topic_mqtt:any =encodeURI(topics);
             try {
                 var Rt:any= await this.publish(topic_mqtt,message_mqtt); 
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
                   var dataRs = await this.getDataFromTopic(newTopic);
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
              var InpuDatacache: any = {keycache: `${newTopic}`,time: 30,data: getDataObject};
              await Cache.SetCacheData(InpuDatacache); 
              var ResultData:any={
                            statusCode: 200,
                            code: 200,
                            topic_mqtt: topic_mqtt, 
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
                            message: `Topic: ${topic_mqtt} value: ${message_mqtt}`,
                            message_th: `Topic: ${topic_mqtt} value: ${message_mqtt}`,
                     };
                return ResultData; 
           } catch (err) {
                   this.logger.error(`Error ${JSON.stringify(err)}`);
                  //  throw new UnprocessableEntityException({
                  //      status: HttpStatus.UNPROCESSABLE_ENTITY,
                  //      error: {
                  //      errorMessage: err.message,
                  //      },
                  //  });
                  var ResultDataerr:any={
                                          statusCode: 500,
                                          code: 500,
                                          message: err.message,
                                          errorMessage: err.message,
                                        }
                   return ResultDataerr; 
          }
  }
  //async function
  // ฟังก์ชันย่อยสำหรับคำนวณรายละเอียด Alarm
  async getAlarmDetails(dto: any) {
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 999;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue !=1) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        }
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async _manageAlarmLog(inputCreate: any, 
                          setdataChk: any, 
                          validateCount: number) {
        const countAlarm: any = await this.count_alarmprocesslog(setdataChk);
        if (countAlarm <= validateCount) {
            const countCheck: any = await this.count_alarmprocesslog({ ...setdataChk,
                time: format.getCurrentTimenow()
            });
            // if (countCheck <= 1) {
            //     await this.create_alarmprocesslog(inputCreate);
            //     await this.create_alarmprocesslogtemp(inputCreate);
            // }
            var count_alarm: number = Number(await this.count_alarmprocesslog(setdataChk));
            if (count_alarm == 0) {
                  await this.create_alarmprocesslog(inputCreate);
                  await this.create_alarmprocesslogtemp(inputCreate);
            }
        } else if (countAlarm > validateCount) {
            await this.delete_alarmprocesslog({
                alarm_action_id: setdataChk.alarm_action_id,
                device_id: setdataChk.device_id,
                type_id: setdataChk.type_id,
                date_now: setdataChk.date,
                data_alarm: setdataChk.data_alarm
            });
        }
        // ฟังก์ชันนี้ไม่ส่งคืนค่าใด ๆ (void) เนื่องจากมีหน้าที่เพียงแค่จัดการข้อมูลในฐานข้อมูล
  }
  async manageAlarmLog(inputCreate:any, setdataChk:any,validateCount:number) {
      const countAlarm :number=Number(await this.count_alarmprocesslog(setdataChk));
      if (countAlarm < validateCount) {
          // Only create a new log entry if no existing log is found
          // or if the count is less than the validation limit.
          if (countAlarm == 0) {
              await this.create_alarmprocesslog(inputCreate);
              await this.create_alarmprocesslogtemp(inputCreate);
          }
      } else if (countAlarm >= validateCount) {
          // If the number of alarms exceeds or equals the limit, delete the oldest one.
          await this.delete_alarmprocesslog({
              alarm_action_id: setdataChk.alarm_action_id,
              device_id: setdataChk.device_id,
              type_id: setdataChk.type_id,
              date_now: setdataChk.date,
              data_alarm: setdataChk.data_alarm
          });
      }
  }
   //async function Email
  async getAlarmDetailsChkEmail(dto: any) {
        var device_status:any = 0;
            var ResultDatasendEmail:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } 
        // sendEmail
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr; 
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async getAlarmDetailsSendEmail(dto: any) {
        var device_status:any = 0;
            var ResultDatasendEmail:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        }
        // sendEmail
        var log_alarm_log :any='';
            for (const [k, v] of Object.entries(useractive)) {
                var email:any = useractive[k].email;
                var mobile_number:any = useractive[k].mobile_number;
                var lineid:any = useractive[k].lineid;
                var user_arr:any= {email:email,mobile:mobile_number,lineid:lineid};
                useractive_arr.push(user_arr);
                if(alarmStatusSet==0){}else{
                  var ResultDatasendEmail: any = await this.sendEmail(email, subject,content);
                  var ResultDatasendEmail: any ='sendEmail';
                }
            }
        // sendEmail
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr;
                    rt.ResultDatasendEmail;
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async manageAlarmLogEmail(inputCreate: any, 
                          setdataChk: any, 
                          validateCount: number) {
        const countAlarm: any = await this.count_alarmprocesslogemail(setdataChk);
        if (countAlarm <= validateCount) {
            const countCheck: any = await this.count_alarmprocesslogemail({ ...setdataChk,
                time: format.getCurrentTimenow()
            });
            // if (countCheck <= 1) {
            //     await this.create_alarmprocesslogemail(inputCreate);
            //     await this.create_alarmprocesslogtemp(inputCreate);
            // }
           var count_alarm: number = Number(await this.count_alarmprocesslogemail(setdataChk));
            if (count_alarm == 0) {
                  await this.create_alarmprocesslogemail(inputCreate);
                  await this.create_alarmprocesslogtemp(inputCreate);
            }
        } else if (countAlarm > validateCount) {
            await this.delete_alarmprocesslog_email({
                alarm_action_id: setdataChk.alarm_action_id,
                device_id: setdataChk.device_id,
                type_id: setdataChk.type_id,
                date_now: setdataChk.date,
                data_alarm: setdataChk.data_alarm
            });
        }
        // ฟังก์ชันนี้ไม่ส่งคืนค่าใด ๆ (void) เนื่องจากมีหน้าที่เพียงแค่จัดการข้อมูลในฐานข้อมูล
  }
  //async function Line
  async getAlarmDetailsChkLine(dto: any) {
        var device_status:any = 0;
            var ResultDatasendLine:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } 
        // sendLine
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr; 
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async getAlarmDetailsSendLine(dto: any) {
        var device_status:any = 0;
            var ResultDatasendLine:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        }
        // sendLine
        var log_alarm_log :any='';
            for (const [k, v] of Object.entries(useractive)) {
                var Line:any = useractive[k].Line;
                var mobile_number:any = useractive[k].mobile_number;
                var lineid:any = useractive[k].lineid;
                var user_arr:any= {Line:Line,mobile:mobile_number,lineid:lineid};
                useractive_arr.push(user_arr);
                if(alarmStatusSet==0){}else{
                  var ResultDatasendLine: any ='send Line';
                }
            }
        // sendLine
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr;
                    rt.ResultDatasendLine;
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async manageAlarmLogLine(inputCreate: any,setdataChk: any,validateCount: number) {
        const countAlarm: any = await this.count_alarmprocesslogline(setdataChk);
        if (countAlarm <= validateCount) {
            const countCheck: any = await this.count_alarmprocesslogline({ ...setdataChk,
                time: format.getCurrentTimenow()
            });
            // if (countCheck <= 1) {
            //     await this.create_alarmprocesslogline(inputCreate);
            //     await this.create_alarmprocesslogtemp(inputCreate);
            // }
           var count_alarm: number = Number(await this.count_alarmprocesslogline(setdataChk));
            if (count_alarm == 0) {
                  await this.create_alarmprocesslogline(inputCreate);
                  await this.create_alarmprocesslogtemp(inputCreate);
            }
        } else if (countAlarm > validateCount) {
            await this.delete_alarmprocesslog_line({
                alarm_action_id: setdataChk.alarm_action_id,
                device_id: setdataChk.device_id,
                type_id: setdataChk.type_id,
                date_now: setdataChk.date,
                data_alarm: setdataChk.data_alarm
            });
        }
        // ฟังก์ชันนี้ไม่ส่งคืนค่าใด ๆ (void) เนื่องจากมีหน้าที่เพียงแค่จัดการข้อมูลในฐานข้อมูล
  }
 //async function sms
  async getAlarmDetailsChksms(dto: any) {
        var device_status:any = 0;
            var ResultDatasendsms:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } 
        // sendsms
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr; 
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async getAlarmDetailsSendsms(dto: any) {
        var device_status:any = 0;
            var ResultDatasendsms:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        }
        // sendsms
        var log_alarm_log :any='';
            for (const [k, v] of Object.entries(useractive)) {
                var sms:any = useractive[k].sms;
                var mobile_number:any = useractive[k].mobile_number;
                var smsid:any = useractive[k].smsid;
                var user_arr:any= {sms:sms,mobile:mobile_number,smsid:smsid};
                useractive_arr.push(user_arr);
                if(alarmStatusSet==0){}else{
                  var ResultDatasendsms: any ='send sms';
                }
            }
        // sendsms
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr;
                    rt.ResultDatasendsms;
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async manageAlarmLogsms(inputCreate: any,setdataChk: any,validateCount: number) {
        const countAlarm: any = await this.count_alarmprocesslogsms(setdataChk);
        if (countAlarm <= validateCount) {
            const countCheck: any = await this.count_alarmprocesslogsms({ ...setdataChk,
                time: format.getCurrentTimenow()
            });
            // if (countCheck <= 1) {
            //     await this.create_alarmprocesslogsms(inputCreate);
            //     await this.create_alarmprocesslogtemp(inputCreate);
            // }
            // }
           var count_alarm: number = Number(await this.count_alarmprocesslogsms(setdataChk));
            if (count_alarm == 0) {
                await this.create_alarmprocesslogsms(inputCreate);
                await this.create_alarmprocesslogtemp(inputCreate);
            }
        } else if (countAlarm > validateCount) {
            await this.delete_alarmprocesslog_sms({
                alarm_action_id: setdataChk.alarm_action_id,
                device_id: setdataChk.device_id,
                type_id: setdataChk.type_id,
                date_now: setdataChk.date,
                data_alarm: setdataChk.data_alarm
            });
        }
        // ฟังก์ชันนี้ไม่ส่งคืนค่าใด ๆ (void) เนื่องจากมีหน้าที่เพียงแค่จัดการข้อมูลในฐานข้อมูล
  }
 //async function telegram
  async getAlarmDetailsChktelegram(dto: any) {
        var device_status:any = 0;
            var ResultDatasendtelegram:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } 
        // sendtelegram
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr; 
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async getAlarmDetailsSendtelegram(dto: any) {
        var device_status:any = 0;
            var ResultDatasendtelegram:any=[];
            var useractive_arr:any = []
            var filter_useractive:any = {status:1}
            var useractive: any = await this.useractiveemail(filter_useractive);
            var user_arr:any = [];
          console.log(`getAlarmDetails dto-->`);
          console.info(dto);
              var alarmStatusSet: number = 0;
                  var alarmTypeId: any = dto.alarmTypeId;
                  var sensorValue: any = dto.sensorValueData;
                  var statusAlert: any = dto.status_alert;
                  var statusWarning: any = dto.status_warning;
                  var recoveryWarning: any = dto.recovery_warning;
                  var recoveryAlert: any = dto.recovery_alert;
                  var mqttName: any = dto.mqtt_name;
                  var deviceName: any = dto.device_name;
                  var alarmActionName: any = dto.action_name;
                  var mqttControlOn: any = dto.mqtt_control_on;
                  var mqttControlOff: any = dto.mqtt_control_off;
                  var event: any = dto.event;
        var subject: string = 'Normal status';
        var content: string = 'Normal status';
        var dataAlarm: number = 0;
        var eventControl: number = event;
        var messageMqttControl: string = event ==1 ? mqttControlOn : mqttControlOff;
        if (alarmTypeId ==1) {
            if (sensorValue >= statusAlert) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string =`${mqttName} ${alarmActionName} Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else if (sensorValue >= statusWarning) {
                var alarmStatusSet:number = 1;
                var subject: string =`${mqttName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusWarning;
            } else if (sensorValue <= recoveryAlert) {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number =  event ==1 ? 0 : 1;
                var messageMqttControl: string =  event ==1 ? mqttControlOff : mqttControlOn;
            } else if (sensorValue <= recoveryWarning) {
                var alarmStatusSet:number = 3;
                var subject: string =`${mqttName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Warning Device Sensor: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryWarning;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        } else if (alarmTypeId ==2) {
            if (sensorValue ==0) {
                var alarmStatusSet:number = 2;
                var subject: string =`${mqttName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =statusAlert;
            } else {
                var alarmStatusSet:number = 4;
                var subject: string =`${mqttName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var content : string = `${mqttName} ${alarmActionName} Recovery Alarm Alarm Device IO: ${deviceName} value: ${sensorValue}`;
                var dataAlarm : number =recoveryAlert;
                var eventControl : number = event ==1 ? 0 : 1;
                var messageMqttControl: string = event ==1 ? mqttControlOff : mqttControlOn;
            }
        }
        // sendtelegram
        var log_alarm_log :any='';
            for (const [k, v] of Object.entries(useractive)) {
                var telegram:any = useractive[k].telegram;
                var mobile_number:any = useractive[k].mobile_number;
                var telegramid:any = useractive[k].telegramid;
                var user_arr:any= {telegram:telegram,mobile:mobile_number,telegramid:telegramid};
                useractive_arr.push(user_arr);
                if(alarmStatusSet==0){}else{
                  var ResultDatasendtelegram: any ='send telegram';
                }
            }
        // sendtelegram
        // ส่งคืน object ที่มีรายละเอียด alarm
            let rt:any={};
                    rt.alarmStatusSet = alarmStatusSet;   
                    rt.subject = subject;
                    rt.content = content;
                    rt.dataAlarm = dataAlarm; 
                    rt.eventControl = eventControl; 
                    rt.messageMqttControl = messageMqttControl; 
                    rt.sensor_data=sensorValue;
                    rt.user=useractive_arr;
                    rt.ResultDatasendtelegram;
         console.log(`rt-->`);
         console.info(rt);
        return await rt;
  }
  async manageAlarmLogtelegram(inputCreate: any,setdataChk: any,validateCount: number) {
        const countAlarm: any = await this.count_alarmprocesslogtelegram(setdataChk);
        if (countAlarm <= validateCount) {
            const countCheck: any = await this.count_alarmprocesslogtelegram({ ...setdataChk,
                time: format.getCurrentTimenow()
            });
            // if (countCheck <= 1) {
            //     await this.create_alarmprocesslogtelegram(inputCreate);
            //     await this.create_alarmprocesslogtemp(inputCreate);
            // }
            var count_alarm: number = Number(await this.count_alarmprocesslogtelegram(setdataChk));
            if (count_alarm == 0) {
                await this.create_alarmprocesslogtelegram(inputCreate);
                await this.create_alarmprocesslogtemp(inputCreate);
            }
        } else if (countAlarm > validateCount) {
            await this.delete_alarmprocesslog_telegram({
                alarm_action_id: setdataChk.alarm_action_id,
                device_id: setdataChk.device_id,
                type_id: setdataChk.type_id,
                date_now: setdataChk.date,
                data_alarm: setdataChk.data_alarm
            });
        }
        // ฟังก์ชันนี้ไม่ส่งคืนค่าใด ๆ (void) เนื่องจากมีหน้าที่เพียงแค่จัดการข้อมูลในฐานข้อมูล
  }
}