import * as path from 'path';
//const envPath = path.join(__dirname, '../config.conf')
//require('dotenv').config({ path: envPath })
import * as format from '@src/helpers/format.helper';
import 'dotenv/config';
require('dotenv').config();
const API_VERSION = '1';
const redis_option: any = process.env.REDIS_OPTION || '1';
const redis_host: any = process.env.REDIS_HOST || "192.168.1.37" || "192.168.1.37";
const redis_port: any = parseInt(process.env.REDIS_PORT, 10) || '6380';
const redis_ttl: any = parseInt(process.env.REDIS_TTL, 10) || undefined;
const redis_password: any = process.env.REDIS_PASSWORD || '';
const redis_key_file: any = process.env.REDIS_KEY_FILE || '';
const redis_cert: any = process.env.REDIS_CERT || '';
const redis_ca: any = process.env.REDIS_CA || '';
const { promisify } = require('util');
const axios = require('axios');
const redis = require('redis');
const ioRedis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
const moment = require('moment');
const clients = redis.createClient(redis_port, redis_host);
console.log(
  '===============================Redis createClient...================================================================',
);
const retRet: any = {
  result: true,
  remark: 'success',
  runlotime: null,
  data: [],
};
console.log('REDIS_OPTION: ' + process.env.REDIS_OPTION);
console.log('REDIS_HOSTT: ' + process.env.REDIS_HOST);
console.log('REDIS_PORT PASSWORD=>' + redis_password);
console.log('REDIS_PORT: ' + process.env.REDIS_PORT);
const client = ioRedis.createClient({
  host: redis_host,
  port: parseInt(redis_port),
  password: redis_password,
});
// console.log('Redis client=>')
// console.info(client)
const clienton = client.on('ready', () => {
  console.log(
    'Services Connecting to redis!',
    ' host:' +
      redis_host +
      ' port:' +
      redis_port +
      ' password :' +
      redis_password,
  );
});
//console.info('clienton=>'+clienton)
const clienterror = client.on('error', (err: any) => {
  console.log(`REDIS init fail : ${err}`);
});
console.info('clienterror=>');
console.info(clienterror);
const redis_ready = client.ready;
console.log('=====Redis ready...==============');
console.info(redis_ready);
console.log(
  '===============================Redis ready process================================================================',
);
export class CacheDataOne {
  async SetCacheData(setData: any) {
    const time = setData.time;
    const keycache = setData.keycache;
    const data = setData.data;
    console.log('setcache setData',setData);
    await client.setex(keycache, time, JSON.stringify(data)); // set data cache
    console.log('keycache',keycache);
    return keycache;
  }
  async SetCacheKey(setData: any) {
    const keycache = setData.keycache;
    const data = setData.data;
    // console.log('setcache setData',setData);
    await client.set(keycache, JSON.stringify(data)); // set data cache
    // console.log('keycache',keycache);
    return keycache;
  }
  async UpdateCacheData(setData: any) {
    const time = setData.time;
    const keycache = setData.keycache;
    const data = setData.data;
    // console.log('Update setData',setData);
    await client.hset(keycache, time, JSON.stringify(data)); // set data cache
    // console.log('keycache',keycache);
    return keycache;
  }
  async GetCacheData(keycache: any) {
    console.log('------GetCacheData------');
    const result = await promisify(client.get).bind(client)(keycache); // get data cache
    const resultcache = JSON.parse(result);
    console.log('keycache',keycache);
    console.log('getcache resultcache',resultcache);
    return resultcache;
  }
  async DeleteCacheData(keycache: any) {
    await promisify(client.del).bind(client)(keycache); // del data cache
    //   console.log('del keycache',keycache);
    return keycache;
  }
  async OTP(keycache: any) {
    let date: any = Date.now();
    let nowseconds = new Date().getTime();
    let timestamp: any = nowseconds;
    let datenew = new Date(timestamp);
    const dayth = format.toThaiDate(datenew);
    const dayen = format.toEnDate(datenew);
    const time = 30;
    const data = format.getRandomint(6);
    const keyotp = format.getRandomString(11);
    //  const key: any = 'OTP_'+keyotp+'_'+data+'_'+timestamp;
    //const keys: any = 'OTP_'+data;
    const key: any = keyotp;
    // console.log('key=>', key);
    // console.log('Randomint==>', data);
    // console.log('keyOtp==>',keyotp);
    await client.setex(key, time, JSON.stringify(data)); // set data cache
    // console.log('keycache==>', key);
    const getOTP = await promisify(client.get).bind(client)(key); // get data cache
    const result_cache_OTP = JSON.parse(getOTP);
    let startDate = new Date(timestamp);
    let endDate = new Date(timestamp);
    if (startDate < endDate) {
      // Do something
    }
    const OTP = {
      key: key,
      time: time,
      OTP: result_cache_OTP,
      day_th: dayth,
      day_en: dayen,
      timestamp: timestamp,
      time_start: datenew,
    };
    // console.log('OTP', OTP);
    return OTP;
    // await client.disconnect();
  }
  async OTPTIME(keycache: any, ttm: any) {
    let date: any = Date.now();
    let nowseconds = new Date().getTime();
    let timestamp: any = nowseconds;
    let datenew = new Date(timestamp);
    const dayth = format.toThaiDate(datenew);
    const dayen = format.toEnDate(datenew);
    const data: number = format.getRandomint(6);
    const keyotp = format.getRandomString(11);
    //  const key: any = 'OTP_'+keyotp+'_'+data+'_'+timestamp;
    //  const keys: any = 'OTP_'+data;
    const key: any = keyotp;
    console.log('key=>', key);
    console.log('Randomint==>', data);
    console.log('keyOtp==>', keyotp);
    if (ttm) {
      const time = ttm;
      await client.setex(key, time, JSON.stringify(data)); // set data cache
      console.log('keycache==>', key);
      const getOTP = await promisify(client.get).bind(client)(key); // get data cache
      const result_cache_OTP = JSON.parse(getOTP);
      let startDate = new Date(timestamp);
      let endDate = new Date(timestamp);
      if (startDate < endDate) {
        // Do something
      }
      const OTP = {
        key: key,
        time: time,
        OTP: result_cache_OTP,
        day_th: dayth,
        day_en: dayen,
        timestamp: timestamp,
        time_start: datenew,
      };
      console.log('OTP', OTP);
      return OTP;
      // await client.disconnect();
    } else {
      const time = 30;
      await client.setex(key, time, JSON.stringify(data)); // set data cache
      console.log('keycache==>', key);
      const getOTP = await promisify(client.get).bind(client)(key); // get data cache
      const result_cache_OTP = JSON.parse(getOTP);
      let startDate = new Date(timestamp);
      let endDate = new Date(timestamp);
      if (startDate < endDate) {
        // Do something
      }
      const OTP = {
        key: key,
        time: time,
        OTP: result_cache_OTP,
        day_th: dayth,
        day_en: dayen,
        timestamp: timestamp,
        time_start: datenew,
      };
      console.log('OTP', OTP);
      return OTP;
      // await client.disconnect();
    }
  }
  async validateOTP(setData: any) {
    // otpvalidate  , keycache
    const keycache = setData.keycache;
    const otpvalidate = setData.otpvalidate;
    const rsOTP = await promisify(client.get).bind(client)(keycache); // get data cache
    const resultlocacheloOTP = JSON.parse(rsOTP);
    console.log('validateOTP otpvalidate=>', otpvalidate);
    console.log('keycache=>', keycache);
    if (otpvalidate == resultlocacheloOTP) {
      await this.DeleteCacheData(keycache);
      let status: number = 1;
      console.log('status=>', status);
      return status;
    } else {
      let status: number = 0;
      console.log('status=>', status);
      return status;
    }
  }
  async validateGet(setData: any) {
    // otpvalidate  , keycache
    const keycache = setData.keycache;
    const otpvalidate = setData.otpvalidate;
    const rsOTP = await promisify(client.get).bind(client)(keycache); // get data cache
    if (!rsOTP) {
      // let status:number=0
      console.log('---------null-----------------');
      let status: number = 0;
      return status;
    }
    const resultlocacheloOTP = JSON.parse(rsOTP);
    console.log('validateOTP otpvalidate=>', otpvalidate);
    console.log('keycache=>', keycache);
    if (otpvalidate == resultlocacheloOTP) {
      // await this.DeleteCacheData(keycache);
      let status: number = 1;
      return status;
    } else {
      let status: number = 0;
      return status;
    }
  }
  async Run(datars: any) {
    const time = 30;
    const dataotp = format.getRandomint(6);
    const data = datars;
    let keyotp = format.getRandomString(8);
    //const key: any = 'OTP_'+keyotp+'_'+data;
    const key: any = keyotp;
    //console.log('Random int', data);
    //console.log('key otp',keyotp);
    //await client.setex(key,time,JSON.stringify(data));  // set data cache
    //console.log('keycache', key);
    //const result =await promisify(client.get).bind(client)(key); // get data cache
    //const resultcache = JSON.parse(result);
    const input: any = {};
    input.key = key;
    input.time = time;
    input.OTP = data;
    //console.log('input', input);
    return input;
    // await client.disconnect();
  }
  async OTPTIMEUSER(
    keycache: any,
    ttm: any,
    uid: any,
    email: any,
    username: any,
    token: any,
    roleId: any,
  ) {
    let date: any = Date.now();
    let nowseconds = new Date().getTime();
    let timestamp: any = nowseconds;
    let datenew = new Date(timestamp);
    const dayth = format.toThaiDate(datenew);
    const dayen = format.toEnDate(datenew);
    const data: number = format.getRandomint(6);
    const dataRs: any = {
      otp: data,
      uid: uid,
      email: email,
      username: username,
      token: token,
      roleId: roleId,
    };
    const keyotp = format.getRandomString(11);
    //  const key: any = 'OTP_'+keyotp+'_'+data+'_'+timestamp;
    //  const keys: any = 'OTP_'+data;
    const key: any = keyotp;
    // console.log('key=>', key);
    // console.log('Randomint==>');  console.info(dataRs);
    // console.log('keyOtp==>',keyotp);
    if (ttm) {
      const time = ttm;
      await client.setex(key, time, JSON.stringify(dataRs)); // set data cache
      // console.log('keycache==>', key);
      const getOTP = await promisify(client.get).bind(client)(key); // get data cache
      const result_cache_OTP = JSON.parse(getOTP);
      let startDate = new Date(timestamp);
      let endDate = new Date(timestamp);
      if (startDate < endDate) {
        // Do something
      }
      const OTP = {
        key: key,
        time: time,
        OTP: result_cache_OTP,
        day_th: dayth,
        day_en: dayen,
        timestamp: timestamp,
        time_start: datenew,
      };
      // console.log('OTP', OTP);
      return OTP;
      // await client.disconnect();
    } else {
      const time = 120;
      await client.setex(key, time, JSON.stringify(dataRs)); // set data cache
      // console.log('keycache==>', key);
      const getOTP = await promisify(client.get).bind(client)(key); // get data cache
      const result_cache_OTP = JSON.parse(getOTP);
      let startDate = new Date(timestamp);
      let endDate = new Date(timestamp);
      if (startDate < endDate) {
        // Do something
      }
      const OTP = {
        key: key,
        time: time,
        OTP: result_cache_OTP,
        day_th: dayth,
        day_en: dayen,
        timestamp: timestamp,
        time_start: datenew,
      };
      // console.log('OTP', OTP);
      return OTP;
      // await client.disconnect();
    }
  }
  async validateGetUser(setData: any) {
    // console.log('------------- validateGetUser-------------');
    // console.log('setData=>'); console.info(setData);
    const keycache = setData.keycache;
    const otpvalidate: number = setData.otpvalidate;
    const rsOTP = await promisify(client.get).bind(client)(keycache); // get data cache
    if (!rsOTP) {
      // let status:number=0
      //  console.log('---------null-----------------');
      return null;
    }
    const resultOTP = JSON.parse(rsOTP);
    const otp: number = resultOTP.otp;
    const resultlocacheOTP: any = {
      otp: resultOTP.otp,
      uid: resultOTP.uid,
      username: resultOTP.username,
      roleId: resultOTP.roleId,
      email: resultOTP.email,
      token: resultOTP.token,
    };
    //  console.log('--------------------------');
    //  console.log('resultOTP----->');console.info(resultOTP);
    if (otpvalidate === otp) {
      // console.log('--------------------------');
      // console.log('otpvalidate----->'+otpvalidate+'--otp----->'+otp);
      //  console.log('--------------------------');
      //  console.log('resultlocacheOTP----->');console.info(resultlocacheOTP);
      //  console.log('--------------------------');
      // await this.DeleteCacheData(keycache);
      //let status:number=1
      return resultlocacheOTP;
    } else {
      // let status:number=0
      // console.log('---------null-----------------');
      return null;
    }
  }
}
