import { Injectable } from '@nestjs/common';
import { CreateIotDto } from '@src/modules/iot/dto/create-iot.dto';
import { UpdateIotDto } from '@src/modules/iot/dto/update-iot.dto';
import * as path from 'path';
import * as format from '@src/helpers/format.helper';
var { promisify } = require('util');
import { GetSenserDto } from '@src/modules/iot/dto/getsenser.dto';
var axios = require('axios');
var moment = require('moment');
import 'dotenv/config';
require('dotenv').config();
console.log(
  '===============================influxdb Ready process================================================================',
);
/** InfluxDB v2 URL */
var InfluxDB_url = process.env.INFLUX_URL;
/** InfluxDB authorization token */
var InfluxDB_token =
  process.env.INFLUX_TOKEN;
/** Organization within InfluxDB  */
var InfluxDB_org = process.env.INFLUX_ORG || 'cmon_org';
/**InfluxDB bucket used in examples  */
var InfluxDB_bucket = process.env.INFLUX_BUCKET || 'BAACTW02';
// ONLY onboarding example
/**InfluxDB user  */
var InfluxDB_username = process.env.INFLUXDB_USERNAME || 'admin';
/**InfluxDB password  */
var InfluxDB_password = process.env.INFLUXDB_PASSWORD || 'Na@0955@#@#';
console.log('InfluxDB_url==>' + InfluxDB_url);
console.log('InfluxDB_token==>' + InfluxDB_token);
console.log('InfluxDB_org==>' + InfluxDB_org);
console.log('InfluxDB_bucket==>' + InfluxDB_bucket);
console.log('InfluxDB_username==>' + InfluxDB_username);
console.log('InfluxDB_password==>' + InfluxDB_password);
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

@Injectable()
export class IotService {
  private influxDB: InfluxDB;
  private writeApi;
  private queryApi;
  constructor() { 
    var url = InfluxDB_url;
    var token = InfluxDB_token;
    var org = InfluxDB_org;
    var bucket = InfluxDB_bucket;
    console.log('InfluxDB_url==>' + InfluxDB_url);
    console.log('InfluxDB_token==>' + InfluxDB_token);
    console.log('InfluxDB_org==>' + InfluxDB_org);
    console.log('InfluxDB_bucket==>' + InfluxDB_bucket);
    console.log('InfluxDB_username==>' + InfluxDB_username);
    console.log('InfluxDB_password==>' + InfluxDB_password);
    this.influxDB = new InfluxDB({ url, token });
    this.writeApi = this.influxDB.getWriteApi(org, bucket);
    this.queryApi = this.influxDB.getQueryApi(InfluxDB_org);
  }

  async backup(database: string, backupDir: string) {
    return new Promise((resolve, reject) => {
      exec(
        `influxd backup -portable -db ${database} ${backupDir}`,
        (error, stdout, stderr) => {
          if (error) return reject(stderr);
          resolve(stdout);
        },
      );
    });
  }

  async restore(database: string, backupDir: string) {
    return new Promise((resolve, reject) => {
      exec(
        `influxd restore -portable -db ${database} ${backupDir}`,
        (error, stdout, stderr) => {
          if (error) return reject(stderr);
          resolve(stdout);
        },
      );
    });
  }

  async writeData(
    measurement: string,
    fields: Record<string, any>,
    tags?: Record<string, string>,
  ) {
    var point = new Point(measurement);
    // Add fields and tags to the point
    Object.entries(fields).forEach(([key, value]) =>
      point.floatField(key, value),
    );
    if (tags) {
      Object.entries(tags).forEach(([key, value]) => point.tag(key, value));
    }
    /**
       {
        "bucket": "cmon_bucket", 
        "measurement": "Temperature",
        "fields": {
          "value": 34.5,
          "max": 50.0,
          "min": 24.0
        },
        "tags": {
          "location": "office"
        }
      }
     */
    console.log('point==>' + point);
    console.log('measurement==>');
    console.info(measurement);
    console.log('fields==>');
    console.info(fields);
    console.log('tags==>');
    console.info(tags);
    console.log('writeApi==>');
    this.writeApi.writePoint(point);
    console.info(this.writeApi.flush());

    await this.writeApi.flush();
  }

  async B1Data(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';

    var fluxQuery = `
        from(bucket: "cmon_bucket")
        |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
        |> filter(fn: (r) => r["_measurement"] == "FAN_control_TEST2")
        |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "TimeStamp" or r["_field"] == "SN" or r["_field"] == "Relay2" or r["_field"] == "Relay1" or r["_field"] == "Location" or r["_field"] == "Current")
        |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
        |> yield(name: "mean")
      `;
    var results: any[] = [];
    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          var data = tableMeta.toObject(row);
          /*
                  {
                        "result": "_result",
                        "table": 0,
                        "Start": "2025-04-08T10:00:25.338277301Z",
                        "Stop": "2025-04-08T11:00:25.338277301Z",
                        "Time": "2025-04-08T10:01:00Z",
                        "Value": 63.8125,
                        "Field": "Humidity",
                        "Measurement": "Envavorment"
                    },
                */
          results.push(data);
        },
        error(error) {
          console.error('Error querying data:', error);
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }

  async queryFilterData(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';

    var fluxQuery = `
        from(bucket: "${bucket}")
          |> range(start: ${time_start}) 
          |> filter(fn: (r) => r["_measurement"] == "${measurement}")
          |> filter(fn: (r) => r["_field"] == "${field}")
          |> aggregateWindow(every: ${time}, fn: mean, createEmpty: true)
      `;
    var results: any[] = [];
    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          var data = tableMeta.toObject(row);
          /*
                  {
                        "result": "_result",
                        "table": 0,
                        "Start": "2025-04-08T10:00:25.338277301Z",
                        "Stop": "2025-04-08T11:00:25.338277301Z",
                        "Time": "2025-04-08T10:01:00Z",
                        "Value": 63.8125,
                        "Field": "Humidity",
                        "Measurement": "Envavorment"
                    },
                */
          results.push(data);
        },
        error(error) {
          console.error('Error querying data:', error);
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }

  /*** influxdb Filter****/
  async influxdbFilterDatas(Dto: any) {
    var start: any = Dto.start || '-1m';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // BAACTW02
    var measurement: any = Dto.measurement || 'temperature';
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var limit: any = Dto.limit || 150;
    var offset: any = Dto.offset || 0;
    var mean: any = Dto.mean || 'last';
    // |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    var fluxQuery = `
                from(bucket: "${bucket}")
                  |> range(start: ${start}, stop: ${stop})
                  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
                  |> filter(fn: (r) => r["_field"] == "${field}") 
                  |> limit(n:${limit}, offset: ${offset})
                  |> yield(name: "${mean}")`;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          var data = tableMeta.toObject(row);
          results.push(data);
        },
        error(error) {
          console.error('Error querying data:', error);
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }

  async influxdbFilterData(Dto: any) {
    var start: any = Dto.start || '-1m';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // BAACTW02
    var measurement: any = Dto.measurement || 'temperature';
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var limit: any = Dto.limit || 1;
    var offset: any = Dto.offset || 0;
    var mean: any = Dto.mean || 'last';
    // |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    var fluxQuery = `
                from(bucket: "${bucket}")
                  |> range(start: ${start}, stop: ${stop})
                  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
                  |> filter(fn: (r) => r["_field"] == "${field}") 
                  |> limit(n:${limit}, offset: ${offset})
                  |> yield(name: "${mean}")`;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            console.log('influxdbFilterData==>');
            console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results.push({
              bucket: bucket,
              measurement: data._measurement,
              result: data.result,
              table: data.table,
              field: data._field,
              start: format.convertDatetime(start),
              stop: format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async influxdbFilterchart1(Dto: any) {
    var start: any = Dto.start || '-1m';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // BAACTW02
    var measurement: any = Dto.measurement || 'Temp'; // measurementList = ["Fan1", "Fan2", "Temp"]
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var limit: any = Dto.limit || 150;
    var offset: any = Dto.offset || 0;
    var mean: any = Dto.mean || 'last';
    var fluxQuery = `
                from(bucket: "${bucket}")
                  |> range(start: ${start}, stop: ${stop})
                  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
                  |> filter(fn: (r) => r["_field"] == "${field}") 
                  |> limit(n:${limit}, offset: ${offset})
                  |> yield(name: "${mean}")`;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertToTwoDecimals(data._value));
          },

          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async influxdbFilterchart2(Dto: any) {
    var start: any = Dto.start || '-1m';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // BAACTW02
    var measurement: any = Dto.measurement || 'Temp'; // measurementList = ["Fan1", "Fan2", "Temp"]
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var limit: any = Dto.limit || 150;
    var offset: any = Dto.offset || 0;
    var mean: any = Dto.mean || 'last';
    var fluxQuery = `
                from(bucket: "${bucket}")
                  |> range(start: ${start}, stop: ${stop})
                  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
                  |> filter(fn: (r) => r["_field"] == "${field}") 
                  |> limit(n:${limit}, offset: ${offset})
                  |> yield(name: "${mean}")`;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertDatetime(dtime));
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }
  /*** influxdb Filter****/

  async getStartendlimit(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-30d';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'median'; //  mean median  last
    var limit: any = Dto.limit;
    var offset: any = Dto.offset;

    var fluxQuery = `
        from(bucket: "${bucket}")
          |> range(start: ${start}, stop: ${stop})
          |> filter(fn: (r) => r["_measurement"] == "${measurement}")
          |> filter(fn: (r) => r["_field"] == "${field}")
          |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
          |> yield(name: "${mean}")
          |> limit(n:${limit}, offset: ${offset})
      `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results.push({
              bucket: bucket,
              result: data.result,
              // table: data.table,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
              field: data._field,
              measurement: data._measurement,
            });
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async getStartend(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-30d';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'median'; //  mean median  last
    var fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["_field"] == "${field}")
        |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
        |> yield(name: "${mean}")
    `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async getStartend1(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-30d';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'median'; //  mean median  last
    var fluxQuery = `
        from(bucket: "${bucket}")
          |> range(start: ${start}, stop: ${stop})
          |> filter(fn: (r) => r["_measurement"] == "${measurement}")
          |> filter(fn: (r) => r["_field"] == "${field}")
          |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
          |> yield(name: "${mean}")
      `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertToTwoDecimals(data._value));
          },

          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }
  async getStartend2(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket;
    var measurement: any = Dto.measurement || 'Envavorment';
    var field: any = Dto.field || 'Humidity';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-30d';
    var stop: any = Dto.stop || 'now()';
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'median'; //  mean median  last
    //http://localhost:3003/v1/iot/getstartend?field=Temperature&start=-5m&stop=now()&windowPeriod=5s&mean=last
    var fluxQuery = `
        from(bucket: "${bucket}")
          |> range(start: ${start}, stop: ${stop})
          |> filter(fn: (r) => r["_measurement"] == "${measurement}")
          |> filter(fn: (r) => r["_field"] == "${field}")
          |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
          |> yield(name: "${mean}")
      `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertDatetime(dtime));
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  /***Project bank****/
  async getSenser(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // cmon_bucket
    var measurement: any = Dto.measurement || 'room2Temp'; // room2Temp
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-15m';
    var stop: any = Dto.stop || 'now()';
    var limit: any = Dto.limit || 1;
    var offset: any = Dto.offset || 0;
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'last'; //  mean median  last
    var fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["_field"] == "${field}")
        |> aggregateWindow(every: ${windowPeriod}, fn: last, createEmpty: false)
        |> limit(n:${limit}, offset: ${offset})
        |> yield(name: "${mean}")
    `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results.push({
              bucket: bucket,
              measurement: data._measurement,
              result: data.result,
              table: data.table,
              field: data._field,
              start: format.convertDatetime(start),
              stop: format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async getSenserchart1(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // BAACTW02
    var measurement: any = Dto.measurement || 'room2Temp'; // room2Temp
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-15m';
    var stop: any = Dto.stop || 'now()';
    var limit: any = Dto.limit || 1;
    var offset: any = Dto.offset || 0;
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'last'; //  mean median  last
    var fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["_field"] == "${field}")
        |> aggregateWindow(every: ${windowPeriod}, fn: last, createEmpty: false)
        |> limit(n:${limit}, offset: ${offset})
        |> yield(name: "${mean}")
    `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertToTwoDecimals(data._value));
          },

          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }

  async getSenserchart2(Dto: any) {
    var time_start: any = Dto.time_start || '-1h';
    var bucket: any = Dto.bucket || InfluxDB_bucket; // cmon_bucket
    var measurement: any = Dto.measurement || 'room2Temp'; // room2Temp
    var field: any = Dto.field || 'value';
    var time: any = Dto.time || '1m';
    var start: any = Dto.start || '-15m';
    var stop: any = Dto.stop || 'now()';
    var limit: any = Dto.limit || 1;
    var offset: any = Dto.offset || 0;
    var windowPeriod: any = Dto.windowPeriod || '12h'; // Example: 1h, 5m, 24h
    var tzString: any = Dto.tzString || 'Asia/Bangkok';
    var mean: any = Dto.mean || 'last'; //  mean median  last
    var fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["_field"] == "${field}")
        |> aggregateWindow(every: ${windowPeriod}, fn: last, createEmpty: false)
        |> limit(n:${limit}, offset: ${offset})
        |> yield(name: "${mean}")
    `;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    var results: any[] = [];
    var results1: any[] = [];
    try {
      await new Promise((resolve, reject) => {
        this.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            var data = tableMeta.toObject(row);
            // console.log('data==>');
            // console.info(data);
            var start: any = format.convertTZ(data._start, tzString);
            var stop: any = format.convertTZ(data._stop, tzString);
            var dtime: any = format.convertTZ(data._time, tzString);
            results1.push({
              bucket: bucket,
              // result: data.result,
              // table: data.table,
              field: data._field,
              // measurement: data._measurement,
              // start : format.convertDatetime(start),
              // stop : format.convertDatetime(stop),
              time: format.convertDatetime(dtime),
              value: format.convertToTwoDecimals(data._value),
            });
            results.push(format.convertDatetime(dtime));
          },
          error(error) {
            console.error('Query failed:', error);
            reject(error);
          },
          complete() {
            resolve(results);
          },
        });
      });
    } catch (error) {
      throw new Error(`Failed to query InfluxDB: ${error.message}`);
    }
    return results;
  }
  /***Project bank****/
  async queryTemperatureData(): Promise<any[]> {
    var fluxQuery1 = `
        from(bucket: "${InfluxDB_bucket}")
          |> range(start: -1h) 
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity" or r["_field"] == "Latitude" or r["_field"] == "Longitude" or r["_field"] == "Temperature" or r["_field"] == "Temperature2" or r["_field"] == "Voltage" or r["_field"] == "sensors_Relay1")
          |> yield(name: "mean")
      `;
    var fluxQuery2 = `
        from(bucket: "${InfluxDB_bucket}")
          |> range(start: -1d) 
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity" or r["_field"] == "Latitude" or r["_field"] == "Longitude" or r["_field"] == "Temperature" or r["_field"] == "Temperature2" or r["_field"] == "Voltage" or r["_field"] == "sensors_Relay1")
          |> aggregateWindow(every: 30m, fn: mean, createEmpty: true)
      `;

    var time_start = '-1h';
    var bucket = InfluxDB_bucket;
    var _measurement = 'Envavorment';
    var _field = 'Humidity';
    var time = '1m';

    var fluxQuery = `
        from(bucket: "${InfluxDB_bucket}")
          |> range(start: ${time_start}) 
          |> filter(fn: (r) => r["_measurement"] == "${_measurement}")
          |> filter(fn: (r) => r["_field"] == "${_field}")
          |> aggregateWindow(every: ${time}, fn: mean, createEmpty: true)
      `;

    var results: any[] = [];
    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          var data = tableMeta.toObject(row);
          results.push(data);
        },
        error(error) {
          console.error('Error querying data:', error);
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }

  async queryFilteredData(
    measurement: string,
    filters: Record<string, any>,
    timeRange: string,
  ): Promise<any[]> {
    var queryApi = this.queryApi;
    // Varruct Flux query with filters and time range
    let fluxQuery = `from(bucket: "${process.env.INFLUX_BUCKET}") |> range(start: ${timeRange}) |> filter(fn: (r) => r._measurement == "${measurement}")`;
    // Add filters for fields and tags
    for (var [key, value] of Object.entries(filters)) {
      fluxQuery += ` |> filter(fn: (r) => r.${key} == "${value}")`;
    }
    // Execute the query and collect rows
    var rows = [];
    await queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        var obj = tableMeta.toObject(row);
        rows.push(obj);
      },
      error(error) {
        console.error('Query failed:', error);
      },
      complete() {
        console.log('Query completed');
      },
    });
    return rows;
  }

  async recordTemperature(sensorId: string, value: number) {
    var point = new Point('temperature')
      .tag('sensor_id', sensorId)
      .floatField('value', value);
    await this.writeApi.writePoint(point);
  }

  async queryData(queryData: string): Promise<any> {
    var query = "from(bucket: 'cmon_bucket') |> range(start: -1h)";
    console.log('query==>');
    console.info(query);
    var queryApi: any = await this.queryApi.collectRows(query);
    console.log('queryApi==>');
    console.info(queryApi);
    return queryApi;
  }

  async getRecentReadings() {
    var query = `
      from(bucket: "sensors")
        |> range(start: -1h)
        |> filter(fn: (r) => r._measurement == "temperature")
    `;
    return this.queryApi.queryRows(query);
  }
  async queryDataRow(fluxQuery: string) {
    var rows = [];
    await new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row) {
          rows.push(row);
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve(rows);
        },
      });
    });
    return rows;
  }

  create(createIotDto: CreateIotDto) {
    return 'This action adds a new iot';
  }

  findAll() {
    return `This action returns all iot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iot`;
  }

  update(id: number, updateIotDto: UpdateIotDto) {
    return `This action updates a #${id} iot`;
  }

  remove(id: number) {
    return `This action removes a #${id} iot`;
  }

  async removeMeasurement(Dto: any) {
    var org: any = Dto.org;
    var token: any = Dto.token;
    var bucket: any = Dto.bucket;
    var start: any = Dto.start;
    var stop: any = Dto.stop;
    var measurement: any = Dto.measurement;
    /*
     --start ${token}1970-01-01T00:00:00Z   
     --stop $(date +"%Y-%m-%dT%H:%M:%SZ")   
     --predicate '_measurement="MyMeasurementXXX"'
    */
    var fluxQuery = `influx delete --org '${org}' --token '${token}' --bucket '${bucket}' --start ${start} --stop $(date +"${stop}") --predicate '_measurement="${measurement}"'`;
    console.log('Dto==>');
    console.info(Dto);
    console.log('fluxQuery==>' + fluxQuery);
    await this.queryApi.queryRows(fluxQuery);
    return `This action removes Measurement  #${measurement}`;
  }
}


/*

 from(bucket: "${InfluxDB_bucket}")
          |> range(start: -1h) 
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Amp"
          or r["_field"] == "Humidity" 
          or r["_field"] == "Latitude" 
          or r["_field"] == "Longitude"
          or r["_field"] == "Temperature" 
          or r["_field"] == "Temperature2" 
          or r["_field"] == "Voltage" 
          or r["_field"] == "sensors_Relay1")
          |> yield(name: "mean")


 var fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["_field"] == "${field}")
        |> aggregateWindow(every: ${windowPeriod}, fn: last, createEmpty: false)
        |> limit(n:${limit}, offset: ${offset})
        |> yield(name: "${mean}")
    `;

*/
/*

from(bucket: "AIR1")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => 
  r["_measurement"] == "ActRelay1" 
  or r["_measurement"] == "ActRelay2" 
  or r["_measurement"] == "ActRelay3" 
  or r["_measurement"] == "ContRelay1" 
  or r["_measurement"] == "ContRelay2" 
  or r["_measurement"] == "ContRelay3" 
  or r["_measurement"] == "IO1" 
  or r["_measurement"] == "IO2" 
  or r["_measurement"] == "IO3" 
  or r["_measurement"] == "temperature" 
  or r["_measurement"] == "OverIO3" 
  or r["_measurement"] == "OverIO2" 
  or r["_measurement"] == "OverIO1")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> limit(n:100, offset: 0)
  |> yield(name: "mean")

*/