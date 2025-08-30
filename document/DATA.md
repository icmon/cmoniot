###
#  docker compose up --build -d  
#  docker ps               
#  docker-compose down
#  docker-compose up --build
#  docker-compose logs grafana
#  docker ps -a
#  docker logs grafana
#  docker-compose down
#  docker-compose up -d
#  docker-compose down -v
#  docker-compose up -d
#  docker volume ls


#  http://localhost:3003/v1/mqtt/getdata?topic=BAACTW02/DATA
#  http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=2
#  http://localhost:3003/v1/settings/listlocation?location_id=1
#  http://localhost:3003/v1/mqtt/getdata?topic=AIR1/DATA
#  http://localhost:3003/v1/settings/listdevicealarm?deletecache=
/*

    var mqtt_id:any=await this.settingsService.get_maxId_mqtt();
    console.log('mqtt_id='); console.info(mqtt_id);
    var DataDtos:any={
          mqtt_id: mqtt_id, 


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

{
    "mqtt_type_id": "1",
    "location_id": "5",
    "sort": "1",
    "mqtt_name": "อาคาร 1 ชั้น 13 ระบบแอร์",
    "host": "192.168.1.59",
    "port": "80",
    "username": "admin",
    "password": "Na@0955@#@#",
    "secret": "Na@0955##",
    "expire_in": "365d",
    "token_value": "BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==",
    "org": "cmon_org",
    "bucket": "AIR13",
    "envavorment": "measurement",
    "status": "0",
    "latitude": "1.022",
    "longitude": "-25.110"
}

*/

node-red-service 1
@cgjgh/node-red-dashboard-2-authentik-auth
@cgjgh/node-red-dashboard-2-cloudflare-auth
@flowfuse/node-red-dashboard
@marozz/node-red-contrib-ui-time-scheduler
@rcomanne/node-red-contrib-influxdb
node-red-contrib-influxdb
node-red-contrib-influxdb-backup
node-red-contrib-mdashboard
node-red-contrib-ui-time-scheduler
node-red-contrib-ui-time-scheduler-french
node-red-contrib-ui-time-scheduler-italian
node-red-contrib-ui-time-scheduler-spanish
node-red-dashboard
node-red-dashboard-2-t86
node-red-node-email
node-red-node-random
node-red-node-redis


=======
 
  // http://192.168.1.59:3003/v1/settings/sendemail
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
      var to: any = query.to; 
      if(to==''){
         var to: any = 'icmon0955@gmail.com';
      }
      var subject: any = query.subject; 
      if(subject==''){
         var to: any = 'CmonIot Alarm';
      }
      var content: any = query.content; 
      if(subject==''){
         var subject: any = 'Alarm Test';
      }
      let ResultData: any = await this.settingsService.sendEmail(to, subject,content);
      let payloadData: any = {
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


# ###############

Temperature
Fan1
Fan2
BAACTW17
"mqtt_id": "16",  
"measurement": "temperature",
"sn": "Cmon-2025-03-19-01-C48",
# ###############


# ###############

# ###############
  {
      "setting_id": "1",
      "type_id": "1",
      "location_id": "1",
      "device_name": "Temperature", //  Temperature  Exhaust Fan1 Fan2
      "sn": "Cmon-2025-03-19-01-C47",
      "max": "35",
      "min": "30",
      "mqtt_id": "16",  
      "hardware_id": "1",
      "status_warning": "32",
      "recovery_warning": "30",
      "status_alert": "35",
      "recovery_alert": "30.5",
      "time_life": "36000",
      "period": "36000",
      "work_status": "1",
      "model": "Cmon-01-SP09",
      "vendor": "kongnakorn",
      "comparevalue": "0",
      "unit":"°C", 
      "oid":"12421111", 
      "action_id": "0",
      "status_alert_id": "0",
      "mqtt_data_value": "BAACTW17/DATA",
      "mqtt_data_control": "BAACTW17/CONTROL",
      "measurement": "temperature", // temperature  Exhaust fan1 fan2
      "mqtt_control_on":  "1",  
      "mqtt_control_off": "0",
      "org": "cmon_org",
      "bucket": "BAACTW17"
  }





  {
      "setting_id": "1",
      "type_id": "1",
      "location_id": "1",
      "device_name": "Fan1", //  Temperature  Exhaust Fan1 Fan2
      "sn": "Cmon-2025-03-19-01-C48",
      "max": "35",
      "min": "30",
      "mqtt_id": "16",  //11
      "hardware_id": "1",
      "status_warning": "32",
      "recovery_warning": "30",
      "status_alert": "35",
      "recovery_alert": "30.5",
      "time_life": "36000",
      "period": "36000",
      "work_status": "1",
      "model": "Cmon-01-SP09",
      "vendor": "kongnakorn",
      "comparevalue": "0",
      "unit":"°C", 
      "oid":"12421111", 
      "action_id": "0",
      "status_alert_id": "0",
      "mqtt_data_value": "BAACTW17/DATA",
      "mqtt_data_control": "BAACTW17/CONTROL",
      "measurement": "fan2", // temperature  Exhaust fan1 fan2
      "mqtt_control_on":  "1",  
      "mqtt_control_off": "0",
      "org": "cmon_org",
      "bucket": "BAACTW17"
  }



  {
      "setting_id": "1",
      "type_id": "1",
      "location_id": "1",
      "device_name": "Fan2", //  Temperature  Exhaust Fan1 Fan2
      "sn": "Cmon-2025-03-19-01-C49",
      "max": "35",
      "min": "30",
      "mqtt_id": "16",  //11
      "hardware_id": "1",
      "status_warning": "32",
      "recovery_warning": "30",
      "status_alert": "35",
      "recovery_alert": "30.5",
      "time_life": "36000",
      "period": "36000",
      "work_status": "1",
      "model": "Cmon-01-SP09",
      "vendor": "kongnakorn",
      "comparevalue": "0",
      "unit":"°C", 
      "oid":"12421111", 
      "action_id": "0",
      "status_alert_id": "0",
      "mqtt_data_value": "BAACTW17/DATA",
      "mqtt_data_control": "BAACTW17/CONTROL",
      "measurement": "fan2", // temperature  Exhaust fan1 fan2
      "mqtt_control_on":  "1",  
      "mqtt_control_off": "0",
      "org": "cmon_org",
      "bucket": "BAACTW17"
  }

{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"IO1","4":"overIO1","5":"contRelay2","6":"actRelay2","7":"IO2","8":"overIO2","9":"contRelay3","10":"actRelay3","11":"IO3","12":"overIO3"}
{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"fan1","4":"overFan1","5":"contRelay2","6":"actRelay2","7":"fan2","8":"overFan2"}

  # ###############

https://medium.com/@mikess_dev/creating-a-nest-js-project-with-sequelize-and-sqlite-870d29908a8c

npm install @nestjs/sequelize sequelize sqlite3


# Search: docker backup and restore sql postgresql
# docker backup and restore sql postgresql command line

-  docker ps
- docker exec -t <container_name> pg_dump -U <username> <database_name> > backup.sql

CONTAINER ID   IMAGE                          COMMAND                  CREATED       STATUS                 PORTS                                                      NAMES
232ad039df3a   demet-webserver                "httpd-foreground"       9 days ago    Up 39 minutes          0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp                   demet-webserver
3db889e162d1   demet-php                      "docker-php-entrypoi…"   9 days ago    Up 6 hours             9000/tcp                                                   demet-php
21da262bd30e   iot-node-red-service           "./entrypoint.sh"        9 days ago    Up 6 hours (healthy)   1881/tcp, 0.0.0.0:1881->1880/tcp                           iot-node-red-service-1
49202e021ef8   postgres:15-alpine             "docker-entrypoint.s…"   11 days ago   Up 7 minutes           5434/tcp, 0.0.0.0:5434->5432/tcp                           docker.postgres
cf5ad6b69317   redis:6.2-alpine               "docker-entrypoint.s…"   11 days ago   Up 7 minutes           6379/tcp, 0.0.0.0:6380->6380/tcp                           redis
f9a5f3ec8a08   eclipse-mosquitto:latest       "/docker-entrypoint.…"   2 weeks ago   Up 6 hours             1884/tcp, 0.0.0.0:9001->9001/tcp, 0.0.0.0:1884->1883/tcp   mosquitto
17a83f8a7ab6   fabianlee/my-mongoclient:3.9   "/bin/sleep 1d"          2 weeks ago   Up 6 hours                                                                        cmon-mongoclient
0bc81428bd85   mongo:4.2.3-bionic             "docker-entrypoint.s…"   2 weeks ago   Up 6 hours             27018/tcp, 0.0.0.0:27018->27017/tcp                        cmon-mongodb
372555a31f3c   grafana/grafana                "/run.sh"                2 weeks ago   Up 6 hours             3008/tcp, 0.0.0.0:3008->3000/tcp                           grafana
0e134486e3af   influxdb:latest                "/entrypoint.sh infl…"   2 weeks ago   Up 6 hours             0.0.0.0:8086->8086/tcp                                     influxdb

# PostgreSQL
DATABASE_HOST=postgres
DATABASE_NAME=nest_cmon
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5434 

docker ps
docker ps -a -s
# Backup  a Plain SQL File (.sql)
- docker exec -t <container_name> pg_dump -U <username> <database_name> > backup.sql
- docker exec -t docker.postgres pg_dump -U postgres nest_cmon > public/backup.sql
- 
# Restore from a Plain SQL File (.sql)
- docker exec -i <container_name> psql -U <username> <database_name> < backup.sql
cd public
 E:\cmonproject\backend\public> 
 PS E:\cmonproject\backend\public> ls  
docker cp backup.sql docker.postgres:/tmp/backup.sql
# Successfully copied 84.5kB to docker.postgres:/tmp/backup.sql
- 
# TEST
-  cd public
-- Backup 
-  docker exec -t docker.postgres pg_dump -U postgres nest_cmon > backup_20250614.sql
-- Restore
-  docker cp backup_20250614.sql docker.postgres:/tmp/backup_20250614.sql
 # Successfully copied 84.5kB to docker.postgres:/tmp/backup_20250614.sql
# https://medium.com/@wkasunsampath/setup-mqtt-in-a-nest-js-app-using-docker-b4c10b4c2eba
# https://medium.com/widle-studio/mastering-microservices-in-nest-js-eb143a6b9639
# https://dev.to/techjayvee/1-building-a-project-setup-for-microservices-with-nestjs-and-mongodb-2161
# MQTT microservice server and client with same ClientID
# nestjs-mqtt-broker


docker-compose up --build
docker-compose build
docker-compose up -d



```


/*
* การแจ้งเตือน 
* * * * * * * * * * * * * * * * * * 
1. Warning เตือนภัยระดับกลาง   เช่น =>  35  องศาเชลเชียส
2. Alarm  เตือนภัยระดับร้ายแรง    เช่น =>37  องศาเชลเชียส
3. Warning recovery ยกเลิก=>เตือนภัยระดับกลาง   เช่น =>32  องศาเชลเชียส
4. Alarm recovery   ยกเลิก=>เตือนภัยระดับร้ายแรง  เช่น =>34  องศาเชลเชียส
* * * * * * * * * * * * * * * * * * 
* การแจ้งเตือน  แบบ Popup 
* การแจ้งเตือน แบบ สัญลักษณ์บอลลูน (Set up a balloon symbol alarm.) 
* การแจ้งเตือน บน Dashboard
* การแจ้งเตือน ส่งการแจ้งเตียน 
  1. Warning 
      =>ส่งการแจ้งเตียนภัย 
      1.1.1  Email -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.2  Line  -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.3  SMS   -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.4 NO/NC   
        1.1.4.1.Siren speaker (ลำโพงไซเรน) 
        1.1.4.2.Siren Light (แสงสว่างไซเรน)
       
    1.2 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 

  * * * * * * * * * * * * * * * * * * 
  2. Alarm
     =>ส่งการแจ้งเตียนภัย
      2.1.เลือกทำงาน 
      2.1.1  Email ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.2  Line  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.3  SMS   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.4 NO/NC 
        2.1.4.1.Siren speaker (ลำโพงไซเรน) 
        2.1.4.2.Siren Light (แสงสว่างไซเรน)
        1.1.5 เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.5 เลือคนที่จะส่ง การ แจ้งเตียนภัย
    2.2 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 
  * * * * * * * * * * * * * * * * * * 
  3. Recovery Warning  ระบบกลับมาสู่ภาวะ ปกติ
    3.1.เลือกทำงาน 
      3.1.1  Email ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      3.1.2  Line  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      3.1.3  SMS   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
    3.2 เลือคนที่จะส่ง การ แจ้งเตียนภัย
    3.3 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 
  * * * * * * * * * * * * * * * * * * 
  4. Recovery Alarm   ระบบกลับมาสู่ภาวะ ปกติ
      4.1.เลือกทำงาน 
            4.1.1  Email  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
            4.1.2  Line   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
            4.1.3  SMS    ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      4.2 เลือคนที่จะส่ง การ แจ้งเตียนภัย
      4.3 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์   

  - การบันทึกกระบวนการทำงาน แต่สถานะ  
  - ไม่ให้มีการส่ง ซ้ำ xxx ชั่วโมง
  - การบันทึก  สถานะ การส่ง ตรวจสอบว่าส่ง  
  - สร้าง Link กด รับทราบแล้ว  updat status action
  - ปิดการแจ้งเตียน รายบุคคล
  - ปิดการแจ้งเตียน ทั้งหมด
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
  Schedule  ตั้งค่าทำงาน ตามตารางเวลา 
  1.ตั้งค่าชื่อการ ทำงาน
  2.ตั้งค่าทำงาน ตามตารางเวลา เช่น 8.00
  3.ที่เลือกให้ทำงาน
  4.เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์     
  5.เลือกการ สั่งงานอุปกรณ์  ตามปฎิทิน สัปดาห์ 
    -จันทร์
    -อังคาร
    -พุธ
    -พถหัส
    -ศุกร์
    -เสาร์
    -อาทิตย์
  - การบันทึกกระบวนการทำงาน แต่สถานะ  
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
 - https://github.com/bitnami/containers/tree/main/bitnami/kafka
 - Deploy NestJS บน Lambda ด้วย Docker มันทำยังไง
 - https://medium.com/abboncorp/deploy-nestjs-บน-lambda-ด้วย-docker-มันทำยังไงว้า-7730f0e2e7ac
 - lambda.ts

 - Jenkins บน Docker 
 - https://rukpong.medium.com/มาติดตั้ง-jenkins-บน-docker-กัน-ae9c34b459b3
 - docker pull jenkins/jenkins
 - docker images
        FROM jenkins/jenkins:latest
        USER root
        RUN mkdir /var/log/jenkins
        RUN mkdir /var/cache/jenkins
        RUN chown -R jenkins:jenkins /var/log/jenkins
        RUN chown -R jenkins:jenkins /var/cache/jenkins
        USER jenkins
        ENV JAVA_OPTS="-Xmx8192m"
  docker pull jenkins/jenkins
  docker images


  https://www.somkiat.cc/start-jenkins2-with-docker/
  

  
BAACTW03,
27.16,
1,
0,
0,
0,
1,
0,
1,
0


{
"timestamp":"2025-07-10 00:46:07",
"temperature":29.18,
"contRelay1":1,
"actRelay1":1,
"fan1":1,
"overFan1":1,
"contRelay2":0,
"actRelay2":0,
"fan2":0,
"overFan2":0,
"deviceId":"BAACTW03/DATA
"}


    /*
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
    /////////////////////////////////////////
    var kaycache2:any='get_startend_data_v2_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache2); 
    }
    var data1:any =  await Cache.GetCacheData(kaycache2); 
    if(!data1){
            var data1: any = await this.IotService.influxdbFilterchart1(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache2}`,time: 60,data: data1};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    }  
    /////////////////////////////////////////
    var kaycache3:any='get_startend_data_v3_'+md5(start+stop+windowPeriod+tzString+bucket+measurement+field+time+limit+offset+mean);
    if(deletecache==1){
          await Cache.DeleteCacheData(kaycache3); 
    }
    var data2:any =  await Cache.GetCacheData(kaycache3); 
    if(!data2){
            var data2: any = await this.IotService.influxdbFilterchart2(Dtos2);
            var InpuDatacache: any = {keycache: `${kaycache3}`,time: 60,data: data2};
            await Cache.SetCacheData(InpuDatacache); 
            var cache_data:any='no cache'; 
    }else{
            var cache_data:any='cache'; 
    } 
    */
    /***************************************/
    res.status(200).json({ 
                        code: 200,    
                        location_id:location_id, 
                        location_name:location_name, 
                        configdata:configdata, 
                        bucket:buckets, 
                        Resultate:Resultate, 
                        mqtt_data_value:mqtt_data_value, 
                        mqtt_data_control:mqtt_data_control, 
                        device:ResultDatadevice,
                        mqtt_data:mqttdata, 
                        obj_configdata:obj_configdata, 
                        //chart: { data: data1, date: data2 }
                    });
    return;

SELECT "sl"."id"                   AS id,
       "d"."device_id"             AS device_id,
       "sdd"."schedule_id"         AS schedule_id,
       "sl"."schedule_event_start" AS schedule_event_start,
       "sl"."day"                  AS day,
       "sl"."doday"                AS doday,
       "sl"."dotime"               AS dotime,
       "sl"."schedule_event"       AS schedule_event,
       "sl"."device_status"        AS device_status,
       "sl"."status"               AS status,
       "sl"."date"                 AS date,
       "sl"."time"                 AS time,
       "sl"."createddate"          AS createddate,
       "sl"."updateddate"          AS updateddate,
       "d"."device_id"             AS deviceid,
       "d"."mqtt_id"               AS mqtt_id,
       "d"."setting_id"            AS setting_id,
       "d"."type_id"               AS type_id,
       "d"."device_name"           AS device_name,
       "d"."mqtt_device_name"      AS mqtt_device_name,
       "t"."type_name"             AS type_name,
       "l"."location_name"         AS location_name,
       "mq"."mqtt_name"            AS mqtt_name,
       "mq"."org"                  AS mqtt_org,
       "mq"."bucket"               AS mqtt_bucket,
       "mq"."envavorment"          AS mqtt_envavorment,
       "sdc"."schedule_name"       AS schedule_name,
       "sdc"."event"               AS event
FROM   "public"."sd_schedule_process_log" "sl"
       INNER JOIN "public"."sd_iot_schedule_device" "sdd"
               ON "sdd"."schedule_id" = "sl"."schedule_id" and "sdd"."device_id" = "sl"."device_id"
       INNER JOIN "public"."sd_iot_schedule" "sdc"
               ON "sdc"."schedule_id" = "sdd"."schedule_id"   and "sdc"."start" = "sl"."schedule_event_start" 
       INNER JOIN "public"."sd_iot_device" "d"
               ON "d"."device_id" = "sdd"."device_id"
       INNER JOIN "public"."sd_iot_device_type" "t"
               ON "t"."type_id" = "d"."type_id"
       INNER JOIN "public"."sd_iot_mqtt" "mq"
               ON "mq"."mqtt_id" = "d"."mqtt_id"
       INNER JOIN "public"."sd_iot_location" "l"
               ON "l"."location_id" = "mq"."location_id"
ORDER  BY "sl"."date" DESC,
          "sl"."time" DESC
LIMIT  10 

*/

 