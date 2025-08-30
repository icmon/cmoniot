import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
  OnModuleInit, 
  OnModuleDestroy,
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
/****entity****/
import { DeviceType } from '@src/modules/settings/entities/devicetype.entity';
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';   
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
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
import { scheduleprocesslog } from '@src/modules/settings/entities/scheduleprocesslog.entity';
import { alarmprocesslog } from '@src/modules/settings/entities/alarmprocesslog.entity';
/****entity****/
import * as format from '@src/helpers/format.helper';
import { CreateMqttDto } from '@src/modules/mqtt/dto/create-mqtt.dto';
import { UpdateMqttDto } from '@src/modules/mqtt/dto/update-mqtt.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CacheDataOne } from '@src/utils/cache/redis.cache';
import { redisDto } from '@src/modules/redis/dto/redis.dto';
import { redisUserDto } from '@src/modules/redis/dto/redisuser.dto';
const tz = require('moment-timezone');
var Cache = new CacheDataOne();
var md5 = require('md5');
import { connect, MqttClient } from 'mqtt'; // <-- ใช้ 'mqtt' โดยตรง
import { Subject } from 'rxjs';
import { filter, first, timeout,map } from 'rxjs/operators';
import {
  getCurrentDateTimeForSQL,
  convertSortInput,
} from '@helpers/format.helper';
import * as moment from 'moment'; 
var connectUrl_mqtt:any = process.env.MQTT_HOST;  
if(!connectUrl_mqtt){
       var connectUrl_mqtt:any = 'mqtt://localhost:1883';  
} 
if(!connectUrl_mqtt){
       var connectUrl_mqtt:any = 'mqtt://127.0.0.1:1883';  
} 

// if(!connectUrl_mqtt){
//        var connectUrl_mqtt:any = 'mqtt://172.25.99.60:1883';  
// } 
@Injectable()
export class MqttService {
   // Key: ชื่อ topic (string), Value: ข้อมูลที่ได้รับ (any)
  private latestData = new Map<string, any>();
  private mqttClient: MqttClient;
  // ใช้ Subject เพื่อจัดการกับ message ที่เข้ามาแบบ stream
  private messageStream = new Subject<{ topic: string; payload: Buffer }>();
  private readonly logger = new Logger(MqttService.name);
 constructor(
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
    @InjectRepository(scheduleprocesslog) private scheduleprocesslogRepository: Repository<scheduleprocesslog>,
    @InjectRepository(alarmprocesslog) private alarmprocesslogRepository: Repository<alarmprocesslog>,
  ){
      this.logger.log('MqttService initialized. In-memory state is ready.');
  }
  // tzString
  onModuleInit() {
    // โค้ดสร้างการเชื่อมต่อจะอยู่ในนี้...
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`; // สร้าง Client ID ที่ไม่ซ้ำกัน
    console.log(`mqtt_connectUrl_mqtt=>`+connectUrl_mqtt); 
    console.log(`mqtt_clientId=>`+clientId); 
    this.mqttClient = connect(connectUrl_mqtt, {
      clientId,
      clean: true,
      connectTimeout: 60000,
      // username: 'your_username', // ถ้ามี
      // password: 'your_password', // ถ้ามี
      reconnectPeriod: 60000,
    });

    this.mqttClient.on('connect', () => {
      console.log(`mqtt_hostt=>`+connectUrl_mqtt); 
      console.log('Connected to MQTT Broker ready!');
    });

    this.mqttClient.on('error', (err) => {
      console.log(`mqtt_hostt=>`+connectUrl_mqtt);  
      console.error('MQTT Connection Error:', err);
    });

    // เมื่อมี message เข้ามา ให้ส่งข้อมูลเข้า stream 
    this.mqttClient.on('message', (topic, payload) => {
      console.log(`topic=>`); 
      console.info(topic); 
      console.log(`payload=>`); 
      console.info(payload); 
      this.messageStream.next({ topic, payload });
    });
  }
  onModuleDestroy() {
    this.mqttClient.end();
  }
  async getDataFromTopic(topics: string): Promise<any> {
      var topic: any = encodeURI(topics); 
      console.log(`------getDataFromTopic------`);
      console.log(`connectUrl_mqtt=>`); 
      console.info(connectUrl_mqtt);  
      console.log(`topic=>`); 
      console.info(topic);  
      // async await
      // สร้าง Promise สำหรับรับ message แรกจาก topic ที่ subscribe
        var messagePromise: any = new Promise((resolve, reject) => {
        this.mqttClient.subscribe(topic, (err) => {
          if (err) {
            return reject(err);
          }
        });
        var subscription = this.messageStream
          .pipe(
            filter((message) => message.topic === topic),
            first(),
            timeout(60000), // timeout 60 วินาที ตามที่เขียนไว้ใน comment
          )
          .subscribe({
            next: (message) => {
              this.mqttClient.unsubscribe(topic);
              subscription.unsubscribe();
              try {
                resolve(JSON.parse(message.payload.toString()));
                console.log(`try=>`+message.payload.toString()); 
              } catch (e) {
                console.log(`catch=>`+message.payload.toString()); 
                resolve(message.payload.toString());
              }
            },
            error: (err) => {
              this.mqttClient.unsubscribe(topic);
              subscription.unsubscribe();
              console.log(`mqtt_hostt=>`+connectUrl_mqtt); 
              console.log(`Timeout: No message received from topic "${topic}" within 60 seconds.`); 
              reject(new Error(`Timeout: No message received from topic "${topic}" within 60 seconds.`));
              var messagePromise:any=`Timeout: No message received from topic "${topic}" within 60 seconds.`;
              return messagePromise; 
            },
          });
      });
      // ใช้ await รอการรับ message
      return await messagePromise; 
  } 
  publishs(topics: string, payload: any) {
    var topic:any =encodeURI(topics);
    var message = typeof payload === 'object' ? JSON.stringify(payload) : payload.toString();
    console.log(`----publishs------`);
    console.log(`mqtt_hostt=>`+connectUrl_mqtt); 
    console.log(`topic=>`); console.info(topic);
    console.log(`message=>`); console.info(message);
    var rss:any = this.mqttClient.publish(topic, message);
    console.log(`rss=>`); console.info(rss); 
  }
  async publish(topics: string, payload: any): Promise<void> {
    console.log(`------publish------`); 
    var topic:any =encodeURI(topics);
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
      console.log(`originalTopic=>`); 
      console.info(originalTopic); 
      console.log(`newTopic=>`); 
      console.info(newTopic); 
      Cache.DeleteCacheData(newTopic); 
      console.log(`mqtt_hostt=>`+connectUrl_mqtt); 
      this.logger.log(`Published to topic "${topic}"`); 
    } catch (error) { 
      const originalTopic = topic;
      const newTopic = originalTopic.replace('CONTROL', 'DATA'); 
      this.logger.error(`newTopic "${newTopic}"`, error);
      this.logger.error(`connectUrl_mqtt "${connectUrl_mqtt}"`, error);
      this.logger.error(`Failed to publish to topic "${topic}"`, error);
    }
  }
  async updateData(topics: string, payload: any): Promise<void> {
        var topic:any =encodeURI(topics);
        //const dataString = JSON.stringify(payload);
        var InpuDatacache: any = { 
                    keycache: `topic-${topic}`,
                    time: 86400,
                    data: `mqtt:data:${topic}`,   
           };
        await Cache.SetCacheData(InpuDatacache); 
        this.logger.log(`Cached data for topic: ${topic}`);
  } 
  async getData(topics: string): Promise<any | null> {
        var topic:any =encodeURI(topics);
        const dataString =  await Cache.GetCacheData(topic); 
        if (!dataString) {
            return null;
        }
        return dataString;
  }
  async cacheMqttData(topics: string, payload: any): Promise<void> {
    var topic:any =encodeURI(topics);
    const cacheKey = `mqtt-data:${topic}`;
    await Cache.SetCacheData({ keycache: cacheKey, time: 86400, data: payload });
    this.logger.log(`Cached data for topic: ${topic}`);
  }
  async getDataFromCache(topics: string): Promise<any | null> {
    var topic:any =encodeURI(topics);
    const cacheKey = `mqtt-data:${topic}`;
    const data = await Cache.GetCacheData(cacheKey);
    return data;
  }
  updateLatestData(topics: string, payload: any): void {
    var topic:any =encodeURI(topics);
    this.latestData.set(topic, payload);
    this.logger.log(`In-memory state updated for topic: ${topic}`);
  }
  getLatestData(topics: string): any | null {
    var topic:any =encodeURI(topics);
    if (this.latestData.has(topic)) {
      this.logger.log(`Retrieved data from in-memory state for topic: ${topic}`);
      return this.latestData.get(topic);
    }
    this.logger.warn(`No data in memory for topic: ${topic}`);
    return null;
  }
  async devicecontrol(topics: string, message_mqtt: any): Promise<void> {
          var topic_mqtt:any =encodeURI(topics); 
          this.logger.log(`devicecontrol connectUrl_mqtt: ${connectUrl_mqtt}`);
          this.logger.log(`devicecontrol topic_mqtt: ${topic_mqtt}`);
          this.logger.log(`devicecontrol message_mqtt: ${message_mqtt}`);
           try {
               var Rt:any= await this.publish(topic_mqtt,message_mqtt); 
               this.logger.log(`devicecontrol publish Rt: ${Rt}`);
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
              this.logger.log(`devicecontrol newTopic: ${newTopic}`);
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
                                     device: 0, 
                                     device_status: 'off', 
                             }; 
     
               }else if(message_mqtt==1){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_1: 1, 
                                     device: 1, 
                                     device_status: 'on', 
                             }; 
                 
               }else if(message_mqtt==2){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 0, 
                                     device: 0, 
                                     device_status: 'off', 
                             }; 
                 
                 
               }else if(message_mqtt==3){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 1, 
                                     device: 1, 
                                     device_status: 'on', 
                             }; 
               }else if(message_mqtt==4){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 0, 
                                     device: 0, 
                                     device_status: 'off', 
                             }; 
                 
                 
               }else if(message_mqtt==5){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 1, 
                                     device: 1, 
                                     device_status: 'on', 
                             }; 
               }else if(message_mqtt==6){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 0, 
                                     device: 0, 
                                     device_status: 'off', 
                             }; 
                 
                 
               }else if(message_mqtt==7){
                 var dataObject:any={ 
                                     timestamp: timestamp,  
                                     device_2: 1, 
                                     device: 1, 
                                     device_status: 'on', 
                             }; 
               }   
                 var dataRs = await this.getDataFromTopic(newTopic);
                 this.logger.log(`devicecontrol getDataFromTopic dataRs: ${dataRs}`);
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
  async getdevicedata(topics: any): Promise<void> {
      var topic:any =encodeURI(topics);
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

  async getMqttdata(topics: any): Promise<void> {
      var topic:any =encodeURI(topics);
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
  async getdevicedataAll(topics: any): Promise<void> {
        console.log('------mqtt getdevicedataAll------');
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
      console.log('-topic------'+topic);
      console.log('-now------'+now);
      console.log('-----datePart------');
      console.info(datePart);
      console.log('-----timePart------');
      console.info(timePart);
      console.log('-----timestamp------');
      console.info(timestamp);
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
                        console.log(`connectUrl_mqtt=>`); 
                        console.info(connectUrl_mqtt);   
                        console.log(`mqttdata-getDataFromTopic-topic==>`);
                        console.info(mqttdata);

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
  /********mqtt**********/ 
  async getdevicedataDirec(topics: string): Promise<any> {
    var topic:any =encodeURI(topics);
      // Subscribe ไปยัง topic ที่ต้องการ
      await new Promise<void>((resolve, reject) => {
        this.mqttClient.subscribe(topic, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
          
      try {
        // รอรับ message แรกจาก topic ที่ตรงกัน
        const message = await firstValueFrom(
          this.messageStream.pipe(
            filter((message) => message.topic === topic),
            timeout(60000)
          )
        );

        // เมื่อได้รับข้อมูลแล้ว ให้ unsubscribe ทันทีเพื่อไม่รับข้อมูลซ้ำ
        this.mqttClient.unsubscribe(topic);

        try {
          // ข้อมูลที่ได้รับจาก MQTT จะเป็น Buffer ต้องแปลงเป็น string ก่อน
          // และอาจจะต้อง parse เป็น JSON หากข้อมูลที่ส่งมาเป็น JSON string
          return JSON.parse(message.payload.toString());
        } catch (e) {
          // หาก parse JSON ไม่ได้ ให้ส่งกลับเป็น string ธรรมดา
          return message.payload.toString();
        }
      } catch (err) {
        this.mqttClient.unsubscribe(topic);
        throw new Error(`Timeout: No message received from topic "${topic}" within 60 seconds.`);
      }
  }
  /********mqtt**********/
  async mqtt_all(): Promise<Mqtt> {
      console.log(`=group_all=`); 
      try { 
        const query: any = await this.MqttRepository.createQueryBuilder('mq'); 
        query.select(['mq.*',]); 
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
        var keyword: any = dto.keyword || '';
        var status: any = dto.status;
        /*****************/
        var createddate: any = dto.createddate;
        var updateddate: any = dto.updateddate;
        var sort: string = dto.sort;
        var page: number = dto.page || 1;
        var pageSize: number = dto.pageSize || 100;
        var isCount: number = dto.isCount || 0;
        const query: any = await this.MqttRepository.createQueryBuilder('mq');
        if (isCount == 1) {
         // var countRs: number = await query.getCount();
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
              'mq.token AS token',
              'mq.org AS org',
              'mq.bucket AS bucket',
              'mq.envavorment AS envavorment',
              'mq.updateddate AS updateddate',
              'mq.latitude AS latitude',
              'mq.longitude AS longitude',
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
            name: keyword ? `%${keyword}%` : '%',
          });
        } 
        if (mqtt_id) {
          query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: mqtt_id });
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
        }if (dto.token) {
                query.andWhere('mq.token=:token', { token: dto.token });
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
            if (sortResult === false) {
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
            query.orderBy(`mq.mqtt_id `, 'ASC');
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
            // var mqtt_id: any = dto.mqtt_id; 
            // var mqtt_type_id: any = dto.mqtt_type_id; 
            // var keyword: any = dto.keyword || '';
            // var status: any = dto.status; 
            // var createddate: any = dto.createddate;
            // var updateddate: any = dto.updateddate;
            // var sort: string = dto.sort;
            const query: any = await this.MqttRepository.createQueryBuilder('mq');
            query.select([   
                  'mq.mqtt_id AS mqtt_id',
                  'mq.mqtt_type_id AS mqtt_type_id',
                  'mq.sort AS sort',
                  'mq.mqtt_name AS mqtt_name',  
                  'mq.org AS org',
                  'mq.bucket AS bucket',
                  'mq.envavorment AS envavorment',
                  'mq.status AS status',   
                  'mq.latitude AS latitude',
                  'mq.longitude AS longitude',
                  't.type_name AS type_name',          
            ]);
            query.leftJoin(
                              "sd_iot_device_type",
                              "t",
                              "t.type_id = mq.mqtt_type_id"
                          ); 
            query.where('1=1');
            if (dto.keyword) {
              query.andWhere('mq.mqtt_name like :mqtt_name', {
                name: dto.keyword ? `%${dto.keyword}%` : '%',
              });
            } 
            if (dto.mqtt_id) {
              query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
            }
            if (dto.mqtt_type_id) {
              query.andWhere('mq.mqtt_type_id=:mqtt_type_id', { mqtt_type_id: dto.mqtt_type_id });
            }
            if (dto.createddate) {
              query.andWhere('mq.createddate=:createddate', { createddate: dto.createddate });
            }if (dto.secret) {
                    query.andWhere('mq.secret=:secret', { secret: dto.secret });
            }if (dto.expire_in) {
                    query.andWhere('mq.expire_in=:expire_in', { expire_in: dto.expire_in });
            }if (dto.token) {
                    query.andWhere('mq.token=:token', { token: dto.token });
            }if (dto.org) {
                    query.andWhere('mq.org=:org', { org: dto.org });
            }if (dto.bucket) {
                    query.andWhere('mq.bucket=:bucket', { bucket: dto.bucket });
            }if (dto.envavorment) {
                    query.andWhere('mq.envavorment=:envavorment', { envavorment: dto.envavorment });
            }if (dto.updateddate) {
              query.andWhere('mq.updateddate=:updateddate', { updateddate: dto.updateddate });
            }if (dto.status) {
               query.andWhere('mq.status=:status', { status: dto.status });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql(); 
            if (dto.sort) {
                const sortResult = convertSortInput(dto.sort);
                if (sortResult === false) {
                  throw new BadRequestException(`Invalid sort option.`);
                }
                const { sortField, sortOrder } = sortResult; 
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
                query.orderBy(`mq.mqtt_id `, 'ASC');
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
  async mqtt_list_paginate_active_fan(dto: any): Promise<Mqtt> {
      console.log(`type_list_paginate dto=`);
      console.info(dto);
      try { 
            // var mqtt_id: any = dto.mqtt_id; 
            // var mqtt_type_id: any = dto.mqtt_type_id; 
            // var keyword: any = dto.keyword || '';
            // var status: any = dto.status; 
            // var createddate: any = dto.createddate;
            // var updateddate: any = dto.updateddate;
            // var sort: string = dto.sort;
            /*
                SELECT  
                  "mq".*, 
                  "t"."type_name" AS type_name, 
                  "l"."location_id" AS location_id, 
                  "l"."location_name" AS location_name 
                  FROM  "public"."sd_iot_mqtt" "mq" 
                  INNER JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
                  INNER JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "mq"."mqtt_type_id" 
                  WHERE 1 = 1  AND "mq"."location_id" =1 
                  AND "mq"."status" = 1
                  AND "mq"."bucket" = 'BAACTW05'
                  ORDER BY "mq"."mqtt_id" ASC  
            */
            /*
                  SELECT distinct "mq".*, 
                  "t"."type_name" AS type_name, 
                  "l"."location_id" AS location_id, 
                  "l"."location_name" AS location_name 
                  FROM  "public"."sd_iot_mqtt" "mq" 
                  INNER JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
                  INNER JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "mq"."mqtt_type_id" 
                  INNER JOIN "public"."sd_iot_device" "d" ON "d"."bucket" = "mq"."bucket" 
                  WHERE 1 = 1  AND "mq"."location_id" =1 
                  AND "mq"."status" = 1
                  ORDER BY "mq"."mqtt_id" ASC  
           */
            var location_id :any =1;
            const query: any = await this.MqttRepository.createQueryBuilder('mq');
            query.select([   
                  'mq.*',  
                  't.type_name AS type_name', 
                  'l.location_id AS location_id', 
                  'l.location_name AS location_name',          
            ]).distinct(true);
             query.innerJoin(
                              "sd_iot_location",
                              "l",
                              "l.location_id = mq.location_id"
                          ); 
            query.innerJoin(
                              "sd_iot_device_type",
                              "t",
                              "t.type_id = mq.mqtt_type_id"
                          ); 
            query.innerJoin(
                              "sd_iot_device",
                              "d",
                              "d.bucket = mq.bucket"
                          ); 
            query.where('1=1');
            if (dto.keyword) {
              query.andWhere('mq.mqtt_name like :mqtt_name', {
                name: dto.keyword ? `%${dto.keyword}%` : '%',
              });
            } 
            query.andWhere('mq.location_id=:location_id', { location_id: location_id});
            if (dto.mqtt_id) {
              query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
            }
            if (dto.mqtt_type_id) {
              query.andWhere('mq.mqtt_type_id=:mqtt_type_id', { mqtt_type_id: dto.mqtt_type_id });
            }
            if (dto.createddate) {
              query.andWhere('mq.createddate=:createddate', { createddate: dto.createddate });
            }if (dto.secret) {
                    query.andWhere('mq.secret=:secret', { secret: dto.secret });
            }if (dto.expire_in) {
                    query.andWhere('mq.expire_in=:expire_in', { expire_in: dto.expire_in });
            }if (dto.token) {
                    query.andWhere('mq.token=:token', { token: dto.token });
            }if (dto.org) {
                    query.andWhere('mq.org=:org', { org: dto.org });
            }if (dto.bucket) {
                    query.andWhere('mq.bucket=:bucket', { bucket: dto.bucket });
            }if (dto.envavorment) {
                    query.andWhere('mq.envavorment=:envavorment', { envavorment: dto.envavorment });
            }if (dto.updateddate) {
              query.andWhere('mq.updateddate=:updateddate', { updateddate: dto.updateddate });
            }if (dto.status) {
               query.andWhere('mq.status=:status', { status: dto.status });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql(); 
            if (dto.sort) {
                const sortResult = convertSortInput(dto.sort);
                if (sortResult === false) {
                  throw new BadRequestException(`Invalid sort option.`);
                }
                const { sortField, sortOrder } = sortResult; 
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
                query.orderBy(`mq.mqtt_id `, 'ASC');
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
  /********mqtt**********/
  async mqtt_list_paginate_all_data(dto: any): Promise<Mqtt> {
      console.log(`type_list_paginate dto=`);
      console.info(dto);
      try { 
            // var mqtt_id: any = dto.mqtt_id; 
            // var mqtt_type_id: any = dto.mqtt_type_id; 
            // var keyword: any = dto.keyword || '';
            // var status: any = dto.status; 
            // var createddate: any = dto.createddate;
            // var updateddate: any = dto.updateddate;
            // var sort: string = dto.sort;
            const query: any = await this.MqttRepository.createQueryBuilder('mq');
            query.select([   
                  'mq.mqtt_id AS mqtt_id',
                  'mq.mqtt_type_id AS mqtt_type_id',
                  'mq.sort AS sort',
                  'mq.mqtt_name AS mqtt_name',  
                  'mq.org AS org',
                  'mq.bucket AS bucket',
                  'mq.envavorment AS envavorment',
                  'mq.status AS status',  
                  'mq.latitude AS latitude',
                  'mq.longitude AS longitude',
                  't.type_name AS type_name',          
            ]);
            query.leftJoin(
                              "sd_iot_device_type",
                              "t",
                              "t.type_id = mq.mqtt_type_id"
                          ); 
            query.where('1=1');
            if (dto.keyword) {
              query.andWhere('mq.mqtt_name like :mqtt_name', {
                name: dto.keyword ? `%${dto.keyword}%` : '%',
              });
            } 
            if (dto.mqtt_id) {
              query.andWhere('mq.mqtt_id=:mqtt_id', { mqtt_id: dto.mqtt_id });
            }
            if (dto.mqtt_type_id) {
              query.andWhere('mq.mqtt_type_id=:mqtt_type_id', { mqtt_type_id: dto.mqtt_type_id });
            }
            if (dto.createddate) {
              query.andWhere('mq.createddate=:createddate', { createddate: dto.createddate });
            }if (dto.secret) {
                    query.andWhere('mq.secret=:secret', { secret: dto.secret });
            }if (dto.expire_in) {
                    query.andWhere('mq.expire_in=:expire_in', { expire_in: dto.expire_in });
            }if (dto.token) {
                    query.andWhere('mq.token=:token', { token: dto.token });
            }if (dto.org) {
                    query.andWhere('mq.org=:org', { org: dto.org });
            }if (dto.bucket) {
                    query.andWhere('mq.bucket=:bucket', { bucket: dto.bucket });
            }if (dto.envavorment) {
                    query.andWhere('mq.envavorment=:envavorment', { envavorment: dto.envavorment });
            }if (dto.updateddate) {
              query.andWhere('mq.updateddate=:updateddate', { updateddate: dto.updateddate });
            }if (dto.status) {
               query.andWhere('mq.status=:status', { status: dto.status });
            } 
            query.printSql();
            query.maxExecutionTime(10000);
            query.getSql(); 
            if (dto.sort) {
                const sortResult = convertSortInput(dto.sort);
                if (sortResult === false) {
                  throw new BadRequestException(`Invalid sort option.`);
                }
                const { sortField, sortOrder } = sortResult; 
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
                query.orderBy(`mq.mqtt_id `, 'ASC');
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
  /********mqtt**********/
}