import {
  Controller,
  Header,
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
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
require('dotenv').config();
console.log(
  '===============================influxdb Ready process================================================================',
);
/** InfluxDB v2 URL */
const InfluxDB_url = process.env.INFLUX_URL;
/** InfluxDB authorization token */
const InfluxDB_token =
  process.env.INFLUX_TOKEN;
/** Organization within InfluxDB  */
const InfluxDB_org = process.env.INFLUX_ORG || 'cmon_org';
/**InfluxDB bucket used in examples  */
const InfluxDB_bucket = process.env.INFLUX_BUCKET || 'cmon_bucket';
// ONLY onboarding example
/**InfluxDB user  */
const InfluxDB_username = process.env.INFLUXDB_USERNAME || 'admin';
/**InfluxDB password  */
const InfluxDB_password = process.env.INFLUXDB_PASSWORD || 'Na@0955@#@#';
const tzString = process.env.tzString;
console.log(
  '===============================influxdb Client Start=============================================================',
);
import { InfluxDB, Point } from '@influxdata/influxdb-client';
export {
  InfluxDB_url,
  InfluxDB_token,
  InfluxDB_org,
  InfluxDB_bucket,
  InfluxDB_username,
  InfluxDB_password,
};
import { exec } from 'child_process';

const moment = require('moment');
const tz = require('moment-timezone');
import * as format from '@src/helpers/format.helper';
import { IotService } from '@src/modules/iot/iot.service';
import { CreateIotDto } from '@src/modules/iot/dto/create-iot.dto';
import { UpdateIotDto } from '@src/modules/iot/dto/update-iot.dto';
import { AuthUserRequired } from '@src/modules/auth/auth.decorator';
/*** CacheDataOne****/
import { CacheDataOne } from '@src/utils/cache/redis.cache';
import { redisDto } from '@src/modules/redis/dto/redis.dto';
import { redisUserDto } from '@src/modules/redis/dto/redisuser.dto';
import { GetSenserDto } from '@src/modules/iot/dto/getsenser.dto';
var Cache = new CacheDataOne();

const API_VERSION = '1';
import * as argon2 from 'argon2';
var md5 = require('md5');
/*** CacheDataOne****/

@Controller('iot')
export class IotController {
  constructor(private readonly IotService: IotService) {}

  async getChartio(Dto: any) {
    // console.log('Dto=>'); console.info(Dto);
    const time_start: any = Dto.time_start || '-1h';
    const bucket: any = process.env.INFLUX_BUCKET || Dto.bucket;
    const measurement: any =
      Dto.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = Dto.field || 'temperature';
    const start: any = Dto.start || '-1h';
    const stop: any = Dto.stop || 'now()';
    const windowPeriod: any = Dto.windowPeriod || '5s'; // Example: 1h, 5m, 24h
    const tzString: any = Dto.tzString || 'Asia/Bangkok';
    const mean: any = Dto.mean || 'now'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    // console.log('Dtos=>'); console.info(Dtos);
    let all: any = await this.IotService.getStartend(Dtos);
    let deta: any = await this.IotService.getStartend1(Dtos);
    let date: any = await this.IotService.getStartend2(Dtos);
    const rt: any = {
      all: all['0'].field,
      deta: deta,
      date: date,
    };
    return rt;
  }

  getRandomsrtsmallandint(length: any) {
    var randomChars: any = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result: any = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('')
  findIndex() {
    return this.IotService.findAll();
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Post('write')
  async writeData(
    @Res() res: Response,
    @Req() req: any,
    @Body()
    body: {
      measurement: string;
      fields: Record<string, any>;
      tags?: Record<string, string>;
    },
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    console.log('req.headers=>');
    console.info(req.headers);
    let idx = req.headers.id;
    console.log('idx=>' + idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    await this.IotService.writeData(body.measurement, body.fields, body.tags);
    return { message: 'Data written successfully' };
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('readone')
  async getTemperatureData(
    @Res() res: Response,
    @Req() req: any,
    @Body() body,
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    console.log('req.headers=>');
    console.info(req.headers);
    let idx = req.headers.id;
    console.log('idx=>' + idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    const Results = await this.IotService.queryTemperatureData();
    let ArrData: any = [];
    if (Results) {
      for (const [key, value] of Object.entries(Results)) {
        let result: any = Results[key].result;
        let table: any = Results[key].table;
        let start: any = format.convertDatetime(Results[key]._start);
        let stop: any = format.convertDatetime(Results[key]._stop);
        let time: any = format.convertDatetime(Results[key]._time);
        let value: any = format.convertToTwoDecimals(Results[key]._value);
        let field: any = Results[key]._field;
        let measurement: any = Results[key]._measurement;
        const datas = {
          field: field,
          measurement: measurement,
          // start: start,
          // stop: stop,
          time: time,
          value: value,
        };
        ArrData.push(datas);
      }
    } else {
      ArrData = null;
    }
    return ArrData;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getstartends')
  async getStartends(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-1h&stop=now()&windowPeriod=5s&mean=last
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-30m&stop=now()&windowPeriod=5s&mean=mean

    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    /*
      if(secretkey!=process.env.SECRET_KEY){ 
            res.status(200).json({  
              statusCode: 403,code:403, 
              message: 'Forbidden! KEY is not valid ..',
              message_th: 'KEY นี้ไม่มีในระบบ.'
            });   
          return 
      }
      */
    const time_start: any = query.time_start || '-1h';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = query.field || 'temperature';
    const start: any = query.start || '-1h';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '5s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'now'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    // console.log('Dtos=>');  console.info(Dtos);

    let rt: any = await this.getChartio(Dtos);
    // console.log('rt=>'); console.info(rt);
    if (!rt.all) {
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
        chart: rt,
      });
      return;
    }
  }

  //B1Data
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('B1Data')
  async B1Data(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-1h&stop=now()&windowPeriod=5s&mean=last
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-30m&stop=now()&windowPeriod=5s&mean=mean

    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    /*
      if(secretkey!=process.env.SECRET_KEY){ 
            res.status(200).json({  
              statusCode: 403,code:403, 
              message: 'Forbidden! KEY is not valid ..',
              message_th: 'KEY นี้ไม่มีในระบบ.'
            });   
          return 
      }
      */
    const time_start: any = query.time_start || '-1h';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = query.field || 'temperature';
    const start: any = query.start || '-1h';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '5s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'now'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    // console.log('Dtos=>');  console.info(Dtos);

    //let rt : any =await this.getChartio(Dtos);

    let all: any = await this.IotService.B1Data(Dtos);
    // console.log('rt=>'); console.info(rt);
    if (!all) {
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
        chart: all,
      });
      return;
    }
  }
  /*******senser charts**********/
  // http://localhost:3003/v1/iot/sensercharts?bucket=BAACTW02&field=value&start=-1m&stop=now()&measurement=temperature&windowPeriod=1m&limit=10&offset=0&mean=last
  // http://localhost:3003/v1/iot/sensers?bucket=BAACTW02&field=value&start=-1m&stop=now()&measurement=temperature&windowPeriod=15s&limit=1&offset=0&mean=last

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
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    const start: any = query.start || '-1m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '1m';
    const limit: any = query.limit || 1;
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
    var kaycache1:any='getstartends_v1_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache1); 
    }
    var data:any =  await Cache.GetCacheData(kaycache1); 
    if(!data){
            var data: any = await this.IotService.influxdbFilterData(Dtos);
            var InpuDatacache: any = {keycache: `${kaycache1}`,time: 300,data: data};
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
    var kaycache2:any='getstartends_v2_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            let data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 300,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    /***************************************/

    //var -0-p: any = await this.IotService.influxdbFilterchart2(Dtos2);
     /***************************************/
    var kaycache3:any='getstartends_v3_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 300,data: data2};
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
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('sensers')
  async sensers(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    // http://localhost:3003/v1/iot/sensers?bucket=BAACTW02&field=value&start=-1m&stop=now()&measurement=temperature&windowPeriod=15s&limit=1&offset=0&mean=last
    const start: any = query.start || '-1m';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const bucket: any = query.bucket; // BAACTW02
    const measurement: any = query.measurement || 'temperature';
    const field: any = query.field || 'value';
    const time: any = query.time || '1m';
    const limit: any = query.limit || 1;
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
    let data: any = await this.IotService.influxdbFilterData(Dtos);
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
        // , field:data[0].field
        // , payload:data
        chart: { data: data },
        name: data[0].field,
      });
      return;
    }
  }

  /*******senser charts**********/

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
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    // http://localhost:3003/v1/iot/getsenserchart?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=5s&limit=100&offset=0&mean=last
    const time_start: any = query.time_start || '-15m';
    const bucket: any = query.bucket;
    const measurement: any =
      query.measurement || 'temperature' || process.env.INFLUXDB_Envavorment;
    const field: any = query.field || 'value';
    const start: any = query.start || '-15m';
    const stop: any = query.stop || 'now()';
    const limit: any = query.limit || 150;
    const offset: any = query.offset || 0;
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: 1,
      offset: 0,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: limit,
      offset: offset,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
    let data1: any = await this.IotService.getSenserchart1(Dtos2);
    let data2: any = await this.IotService.getSenserchart2(Dtos2);
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
        payload: data,
        chart: { data: data1, date: data2 },
        name: data[0].field,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('senser')
  async senser(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    // http://localhost:3003/v1/iot/getsenser?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=room1Amp&windowPeriod=5s&limit=1&offset=0&mean=last
    const time_start: any = query.time_start || '-15m';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || 'temperature' || process.env.INFLUXDB_Envavorment;
    const field: any = query.field || 'value';
    const start: any = query.start || '-15m';
    const stop: any = query.stop || 'now()';
    const limit: any = query.limit || 150;
    const offset: any = query.offset || 0;
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: limit,
      offset: offset,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.getSenser(Dtos);
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
        // , field:data[0].field
        // , payload:data
        chart: { data: data },
        name: data[0].field,
      });
      return;
    }
  }
  /*****************/
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getsenserchart')
  async getStartendchart(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    // http://localhost:3003/v1/iot/getsenserchart?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=5s&limit=100&offset=0&mean=last
    const time_start: any = query.time_start || '-15m';
    const bucket: any = query.bucket;
    const measurement: any =
      query.measurement || 'temperature' || process.env.INFLUXDB_Envavorment;
    const field: any = query.field || 'value';
    const start: any = query.start || '-15m';
    const stop: any = query.stop || 'now()';
    const limit: any = query.limit || 150;
    const offset: any = query.offset || 0;
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: 1,
      offset: 0,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.getSenser(Dtos);
    const Dtos2: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: limit,
      offset: offset,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos2);
    let data1: any = await this.IotService.getSenserchart1(Dtos2);
    let data2: any = await this.IotService.getSenserchart2(Dtos2);
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
        payload: data,
        chart: { data: data1, date: data2 },
        name: data[0].field,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getsenser')
  async getSenser(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    /*
        from(bucket: "cmon_bucket")
          |> range(start: -15m, stop: now())
          |> filter(fn: (r) => r["_measurement"] == "temperature")
          |> filter(fn: (r) => r["_field"] == "value")
          |> aggregateWindow(every: 10s, fn: last, createEmpty: false)
          |> limit(n:1, offset: 0)
          |> yield(name: "last")
      */
    // http://localhost:3003/v1/iot/getsenser?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=room1Amp&windowPeriod=5s&limit=1&offset=0&mean=last
    const time_start: any = query.time_start || '-15m';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || 'temperature' || process.env.INFLUXDB_Envavorment;
    const field: any = query.field || 'value';
    const start: any = query.start || '-15m';
    const stop: any = query.stop || 'now()';
    const limit: any = query.limit || 1;
    const offset: any = query.offset || 0;
    const windowPeriod: any = query.windowPeriod || '15s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'last'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: limit,
      offset: offset,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.getSenser(Dtos);
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
        // , field:data[0].field
        // , payload:data
        chart: { data: data },
        name: data[0].field,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getstartend')
  async getStartend(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-1h&stop=now()&windowPeriod=5s&mean=last
    // http://localhost:3003/v1/iot/getstartend?field=temperature&start=-30m&stop=now()&windowPeriod=5s&mean=mean

    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    const time_start: any = query.time_start || '-1h';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = query.field || 'temperature';
    const start: any = query.start || '-1h';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '5s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'now'; //  mean median  last  now
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.getStartend(Dtos);
    let data1: any = await this.IotService.getStartend1(Dtos);
    let data2: any = await this.IotService.getStartend2(Dtos);
    // http://localhost:3003/v1/iot/getstartend?field=Latitude&start=-1s&stop=now()&windowPeriod=5s&mean=now
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
        // , field:data[0].field
        // , payload:data
        chart: { data: data1, date: data2 },
        name: data[0].field,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getstartendlimit')
  async getStartendlimit(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // http://localhost:3003/v1/iot/getstartendlimit?field=temperature&start=-1h&stop=now()&windowPeriod=5s&mean=last&limit=5&offset=0
    // http://localhost:3003/v1/iot/getstartendlimit?field=temperature&start=-30m&stop=now()&windowPeriod=5s&mean=mean&limit=5&offset=0
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 203,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    const time_start: any = query.time_start || '-1h';
    const bucket: any = process.env.INFLUX_BUCKET || query.bucket;
    const measurement: any =
      query.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = query.field || 'temperature';
    const start: any = query.start || '-1h';
    const stop: any = query.stop || 'now()';
    const windowPeriod: any = query.windowPeriod || '5s'; // Example: 1h, 5m, 24h
    const tzString: any = query.tzString || 'Asia/Bangkok';
    const mean: any = query.mean || 'now'; //  mean median  last  now
    const limit: any = query.limit || 10;
    const offset: any = query.offset || 20;
    const Dtos: any = {
      time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
      limit: limit,
      offset: offset,
    };
    // console.log('Dtos=>');  console.info(Dtos);

    var keycache_set: any =
      time_start +
      bucket +
      field +
      start +
      stop +
      windowPeriod +
      tzString +
      mean +
      limit +
      offset;
    // https://www.npmjs.com/package/md5
    if (time_start === '-1h') {
      var keycache_time: number = 30;
    } else if (time_start === '-7d') {
      var keycache_time: number = 300;
    } else {
      var keycache_time: number = 60;
    }
    let keycache_md5: any = md5(keycache_set);
    const keycache: any = 'get_startend_limit_' + keycache_md5;
    // console.log("keycache_time=>"+keycache_time);
    // console.log("keycache=>"+keycache);
    var DataCacheGet: any = await Cache.GetCacheData(keycache);
    // console.log("DataCacheGet=>"); console.info(DataCacheGet);
    if (DataCacheGet == null) {
      var Results: any = await this.IotService.getStartendlimit(Dtos);
      // console.log("Results=>"); console.info(Results);
      var setDataCache: any = {};
      setDataCache.keycache = keycache;
      setDataCache.time = keycache_time;
      setDataCache.data = Results;
      await Cache.SetCacheData(setDataCache);
      var cache: any = 0;
    } else {
      var cache: any = 1;
      var Results: any = await Cache.GetCacheData(keycache);
    }
    // http://localhost:3003/v1/iot/getstartend?field=Latitude&start=-1s&stop=now()&windowPeriod=5s&mean=now
    if (!Results) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        cache: cache,
        //, query:query
        payload: {
          bucket: bucket,
          result: 'now',
          // "table": 0,
          // "start": "2025-01-00:00:00:00",
          // "stop": "2025-01-00:00:00:00",
          time: '2025-01-00:00:00:00',
          value: 0,
          field: field,
          measurement: measurement,
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        message: 'OK',
        satatus: 1,
        //, query:query
        cache: cache,
        payload: Results,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('getone')
  async getGetone(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    const field: any = query.field || 'temperature';
    const Dtos: any = {
      time_start: '-10s', //time_start.split(),
      bucket: process.env.INFLUX_BUCKET, // bucket.split(),
      measurement: process.env.INFLUXDB_Envavorment,
      field: field,
      start: '-10s',
      stop: 'now()',
      windowPeriod: '10s',
      tzString: process.env.tzString,
      mean: 'now',
    };
    let data: any = await this.IotService.getStartend(Dtos);
    let length: number = data.length;
    if (length == 0) {
      const nodata: any = {
        bucket: process.env.INFLUX_BUCKET,
        result: 'now',
        // "table": 0,
        // "start": "2025-01-00:00:00:00",
        // "stop": "2025-01-00:00:00:00",
        time: '2025-01-00:00:00:00',
        value: 0,
        field: field,
        measurement: process.env.INFLUXDB_Envavorment,
      };
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        payload: nodata,
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        payload: data[0],
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('queryFilterData')
  async getqueryFilterData(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    const time_start: any = query.time_start || '-1d';
    const bucket: any = query.bucket || process.env.INFLUX_BUCKET;
    const measurement: any =
      query.measurement || process.env.INFLUXDB_Envavorment || 'Envavorment';
    const field: any = query.field || 'temperature';
    const time: any = query.time || '1d';
    /*
       from(bucket: "cmon_bucket")
          |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "location" or r["_field"] == "Voltage" or r["_field"] == "Temperature2" 
          or r["_field"] == "Temperature" or r["_field"] == "Longitude" or r["_field"] == "Latitude" 
          or r["_field"] == "temperature" or r["_field"] == "Amp" or r["_field"] == "sensors_Relay1")
          |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
          |> yield(name: "mean")
      */
    const Dtos: any = {
      time_start: time_start.split(),
      bucket: bucket.split(),
      measurement: measurement.split(),
      field: field.split(),
      time: time.split(),
    };
    let Results: any = await this.IotService.queryFilterData(Dtos);
    let ArrData: any = [];
    for (const [key, value] of Object.entries(Results)) {
      let result: any = Results[key].result;
      let table: any = Results[key].table;
      let start: any = format.convertDatetime(Results[key]._start);
      let stop: any = format.convertDatetime(Results[key]._stop);
      let time: any = format.convertDatetime(Results[key]._time);
      let value: any = format.convertToTwoDecimals(Results[key]._value);
      let field: any = Results[key]._field;
      let measurement: any = Results[key]._measurement;
      const datas = {
        field: field,
        measurement: measurement,
        // start: start,
        // stop: stop,
        time: time,
        value: value,
      };
      ArrData.push(datas);
    }
    res.status(200).json({
      statusCode: 200,
      code: 200,
      message: 'OK',
      query: query,
      payload: ArrData,
    });
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('read')
  async readDatafilters(
    @Res() res: Response,
    @Req() req: any,
    @Query('measurement') measurement: string,
    @Query('filters') filters: string,
    @Query('timeRange') timeRange: string,
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    // console.log('Query measurement:', measurement);
    // console.log('Query filters:', filters);
    // console.log('Query timeRange:', timeRange);
    const parsedFilters = JSON.parse(filters); // Filters should be passed as a JSON string in the query
    // console.log(' parsedFilters:', parsedFilters);
    const data = await this.IotService.queryFilteredData(
      measurement,
      parsedFilters,
      timeRange,
    );
    //console.log(' data:', data);
    // console.log('Query data:');
    // console.info(data);
    res.status(200).json(data);
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Post('read1')
  async readData(
    @Res() res: Response,
    @Req() req: any,
    @Body() body: { query: string },
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    // await this.IotService.writeData(body.measurement, body.fields, body.tags);
    // return { message: 'Data written successfully' };
    //const data1 = await this.IotService.queryData(body.query);
    const data = await this.IotService.queryDataRow(body.query);
    res.status(200).json(data);
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('query')
  async queryData(
    @Res() res: Response,
    @Req() req: any,
    @Body() body: { query: string },
  ) {
    /*
        @Res() res: Response,
        @Req() req:any,
      */
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    if (secretkey != process.env.SECRET_KEY) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! KEY is not valid ..',
        message_th: 'KEY นี้ไม่มีในระบบ.',
      });
      return;
    }
    const data = await this.IotService.queryData(body.query);
    res.status(200).json(data);
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired()
  @Get('removemeasurement')
  async removemeasurement(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let header = req.headers;
    let idx = header.id;
    // console.log('idx=>'+idx);
    let secretkey: any = header.secretkey;
    let start_filter: any = '2025-05-01T00:00:00Z';
    // let stop_filter:any = $(date +"%Y-%m-%dT%H:%M:%SZ");
    /*
          --start ${token}1970-01-01T00:00:00Z   
          --stop $(date +"%Y-%m-%dT%H:%M:%SZ")   
          --predicate '_measurement="MyMeasurementXXX"'
          
              const fluxQuery = `influx delete   
              --org '${org}'   
              --token '${token}'   
              --bucket '${bucket}'   
              --start ${start}   
              --stop $(date +"${stop}")   
              --predicate '_measurement="${measurement}"'`;  
          console.log('Dto==>'); console.info(Dto);
          console.log('fluxQuery==>'+fluxQuery);
          await this.queryApi.queryRows(fluxQuery);
          return `This action removes Measurement  #${measurement}`;
          } 
        */

    if (secretkey != process.env.SECRET_KEY) {
      //   res.status(200).json({
      //     statusCode: 403,code:403,
      //     message: 'Forbidden! KEY is not valid ..',
      //     message_th: 'KEY นี้ไม่มีในระบบ.'
      //   });
      // return
    }
    // INFLUX_TOKEN
    const tz: any = process.env.tzString;
    const datanow = Date.now();
    let date = moment(datanow);
    let syncDate = date.tz(tz);
    console.log(syncDate.format());
    const token = req.headers.authorization.replace('Bearer ', '').trim();
    const measurement: any = query.measurement;
    if (!measurement) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: 'Forbidden! measurement ..',
        message_th: 'กรุณาระบุ measurement.',
      });
      return;
    }
    const Dtos: any = {
      org: InfluxDB_org,
      token: InfluxDB_token,
      bucket: InfluxDB_bucket,
      start: start_filter,
      stop: syncDate,
      measurement: measurement,
    };
    console.log('Dtos=>');
    console.info(Dtos);
    let data: any = await this.IotService.removeMeasurement(Dtos);
    if (!data) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        payload: {
          value: 0,
        },
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        data: data,
      });
      return;
    }
  }

  /*
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired() 
  @Post('/create')
  create(@Body() createIotDto: CreateIotDto) {
    return this.IotService.create(createIotDto);
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired() 
  @Get('all')
  findAll() {
    return this.IotService.findAll();
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired() 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.IotService.findOne(+id);
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  //@AuthUserRequired() 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIotDto: UpdateIotDto) {
    return this.IotService.update(+id, updateIotDto);
  }
  */
}
