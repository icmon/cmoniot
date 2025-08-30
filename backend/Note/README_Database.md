 
## Dataase
## Installation

 /* 
            smtp.gmail.com  
              - kongnakornit@gmail.com : asahzdatmywtwrji  : asah zdat mywt wrji 
              - icmon0955@gmail.com : mbwodofvkznougir
              - monitoring.system.report@gmail.com : owortggrxrqhubxa  
          */
          // var email_host :any='smtp.gmail.com';
          // var email_ports :any='465';
          // var email_port :number=email_ports;
          // var email_username :any='icmon0955@gmail.com';
          // var email_passwordemail :any='mbwodofvkznougir'; 


```bash
services:
  postgres:
    environment:
      POSTGRES_DB: my_db_name
      POSTGRES_USER: my_name
      POSTGRES_PASSWORD: my_password
  volumes:
    - ./devops/db/dummy_dump.sql:/docker-entrypoint-initdb.d/dummy_dump.sql

sudo docker exec postgres psql -U postgres my_db_name < dump.sql

docker exec -i ${CONTAINER_ID} psql -U ${USER} < ${SQL_FILE}

cat ${BACKUP_SQL_File} | docker exec -i ${CONTAINER_NAME} pg_restore \
    --verbose \
    --clean \
    --no-acl \
    --no-owner \
    -U ${USER} \
    -d ${DATABASE}


version: "3.9"

services:
  db:
    container_name: postgis_my_db_name
    image: postgis/postgis:14-3.3
    ports:
      - "5430:5432"
    # restart: always
    volumes:
    - ./my_db_name.sql:/my_db_name.sql
    - ./restore.sh:/docker-entrypoint-initdb.d/restore.sh
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: my_password
      POSTGRES_DB: my_db_name

 pg_restore -d my_db_name my_db_name.sql


start first container
docker compose start $db_container

# dump intial database
docker compose exec db pg_dump -U $user -Fc $database > $dump_file

# start container db
docker compose start $db_container

# get container id 
docker ps

# copy to container
docker cp $dump_file $container_id:/var

# delete database container / Can't use
docker compose exec $db_container dropdb -U $user $database

# user pg_restore
docker compose exec $db_container pg_restore -U $user -C -d postgres /var/$dump_file


CONTAINER_NAME="postgres"
DB_USER=postgres
LOCAL_DUMP_PATH="..."
docker run --name "${CONTAINER_NAME}" postgres
docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER}" < "${LOCAL_DUMP_PATH}"


# ####################
SELECT "sl"."id" AS id,
       "d"."device_id" AS device_id,
       "sdd"."schedule_id" AS schedule_id,
       "sl"."schedule_event_start" AS schedule_event_start,
       "sl"."day" AS day,
       "sl"."doday" AS doday,
       "sl"."dotime" AS dotime,
       "sl"."schedule_event" AS schedule_event,
       "sl"."device_status" AS device_status,
       "sl"."status" AS status,
       "sl"."date" AS date,
       "sl"."time" AS time,
       "sl"."createddate" AS createddate,
       "sl"."updateddate" AS updateddate,
       "d"."device_id" AS deviceid,
       "d"."mqtt_id" AS mqtt_id,
       "d"."setting_id"  AS setting_id,
       "d"."type_id" AS type_id,
       "d"."device_name" AS device_name,
       "d"."mqtt_device_name"      AS mqtt_device_name,
       "t"."type_name" AS type_name,
       "l"."location_name" AS location_name,
       "mq"."mqtt_name" AS mqtt_name,
       "mq"."org" AS mqtt_org,
       "mq"."bucket" AS mqtt_bucket,
       "mq"."envavorment" AS mqtt_envavorment,
       "sdc"."schedule_name" AS schedule_name,
       "sdc"."event"   AS event
FROM   "public"."sd_schedule_process_log" "sl"
       INNER JOIN "public"."sd_iot_schedule_device" "sdd"
               ON "sdd"."schedule_id" = "sl"."schedule_id"
        -------------------------
        AND "sdd"."device_id" = "sl"."device_id"
        -------------------------
       INNER JOIN "public"."sd_iot_schedule" "sdc"
               ON "sdc"."schedule_id" = "sdd"."schedule_id"
       INNER JOIN "public"."sd_iot_device" "d"
               ON "d"."device_id" = "sdd"."device_id"
       INNER JOIN "public"."sd_iot_device_type" "t"
               ON "t"."type_id" = "d"."type_id"
       INNER JOIN "public"."sd_iot_mqtt" "mq"
               ON "mq"."mqtt_id" = "d"."mqtt_id"
       INNER JOIN "public"."sd_iot_location" "l"
               ON "l"."location_id" = "mq"."location_id"
ORDER  BY "sl"."date" DESC,"sl"."time" DESC
LIMIT  10 
////////
SELECT "d"."device_id"               AS device_id,
       "sd"."schedule_id"            AS schedule_id,
       "scd"."schedule_name"         AS schedule_name,
       "scd"."start"                 AS schedule_event_start,
       "scd"."event"                 AS schedule_event,
       "scd"."sunday"                AS sunday,
       "scd"."monday"                AS monday,
       "scd"."tuesday"               AS tuesday,
       "scd"."wednesday"             AS wednesday,
       "scd"."thursday"              AS thursday,
       "scd"."friday"                AS friday,
       "scd"."saturday"              AS saturday,
       "d"."mqtt_id"                 AS mqtt_id,
       "d"."setting_id"              AS setting_id,
       "d"."type_id"                 AS type_id,
       "d"."device_name"             AS device_name,
       "d"."sn"                      AS sn,
       "d"."hardware_id"             AS hardware_id,
       "d"."status_warning"          AS status_warning,
       "d"."recovery_warning"        AS recovery_warning,
       "d"."status_alert"            AS status_alert,
       "d"."recovery_alert"          AS recovery_alert,
       "d"."time_life"               AS time_life,
       "d"."period"                  AS period,
       "d"."work_status"             AS work_status,
       "d"."max"                     AS max,
       "d"."min"                     AS min,
       "d"."oid"                     AS oid,
       "d"."mqtt_data_value"         AS mqtt_data_value,
       "d"."mqtt_data_control"       AS mqtt_data_control,
       "d"."model"                   AS model,
       "d"."vendor"                  AS vendor,
       "d"."comparevalue"            AS comparevalue,
       "d"."createddate"             AS createddate,
       "d"."updateddate"             AS updateddate,
       "d"."status"                  AS status,
       "d"."unit"                    AS unit,
       "d"."action_id"               AS action_id,
       "d"."status_alert_id"         AS status_alert_id,
       "d"."measurement"             AS measurement,
       "d"."mqtt_control_on"         AS mqtt_control_on,
       "d"."mqtt_control_off"        AS mqtt_control_off,
       "d"."org"                     AS device_org,
       "d"."bucket"                  AS device_bucket,
       "t"."type_name"               AS type_name,
       "l"."location_name"           AS location_name,
       "l"."configdata"              AS configdata,
       "mq"."mqtt_name"              AS mqtt_name,
       "mq"."org"                    AS mqtt_org,
       "mq"."bucket"                 AS mqtt_bucket,
       "mq"."envavorment"            AS mqtt_envavorment,
       "mq"."host"                   AS mqtt_host,
       "mq"."port"                   AS mqtt_port,
       "d"."updateddate"             AS timestamp,
       "d"."mqtt_device_name"        AS mqtt_device_name,
       "d"."mqtt_status_over_name"   AS mqtt_status_over_name,
       "d"."mqtt_status_data_name"   AS mqtt_status_data_name,
       "d"."mqtt_act_relay_name"     AS mqtt_act_relay_name,
       "d"."mqtt_control_relay_name" AS mqtt_control_relay_name
FROM   "public"."sd_iot_device" "d"
       INNER JOIN "public"."sd_iot_schedule_device" "sd"
               ON "sd"."device_id" = "d"."device_id"
       INNER JOIN "public"."sd_iot_schedule" "scd"
               ON "scd"."schedule_id" = "sd"."schedule_id"
       INNER JOIN "public"."sd_iot_device_type" "t"
               ON "t"."type_id" = "d"."type_id"
       INNER JOIN "public"."sd_iot_mqtt" "mq"
               ON "mq"."mqtt_id" = "d"."mqtt_id"
       INNER JOIN "public"."sd_iot_location" "l"
               ON "l"."location_id" = "mq"."location_id"
WHERE  1 = 1
       AND "d"."status" ='1'
       AND "mq"."status" ='1'
       AND "scd"."status" ='1'
ORDER  BY "scd"."start" ASC,"scd"."schedule_id" ASC,"mq"."sort" ASC,"d"."device_id" ASC
LIMIT  100000000000 

////////
SELECT "d"."device_id"               AS device_id,
       "d"."mqtt_id"                 AS mqtt_id,
       "d"."setting_id"              AS setting_id,
       "sad"."alarm_action_id"       AS alarm_action_id,
       "d"."type_id"                 AS type_id,
       "d"."device_name"             AS device_name,
       "d"."sn"                      AS sn,
       "d"."hardware_id"             AS hardware_id,
       "d"."status_warning"          AS status_warning,
       "d"."recovery_warning"        AS recovery_warning,
       "d"."status_alert"            AS status_alert,
       "d"."recovery_alert"          AS recovery_alert,
       "d"."time_life"               AS time_life,
       "d"."period"                  AS period,
       "d"."work_status"             AS work_status,
       "d"."max"                     AS max,
       "d"."min"                     AS min,
       "d"."oid"                     AS oid,
       "d"."mqtt_data_value"         AS mqtt_data_value,
       "d"."mqtt_data_control"       AS mqtt_data_control,
       "d"."model"                   AS model,
       "d"."vendor"                  AS vendor,
       "d"."comparevalue"            AS comparevalue,
       "d"."createddate"             AS createddate,
       "d"."updateddate"             AS updateddate,
       "d"."status"                  AS status,
       "d"."unit"                    AS unit,
       "d"."action_id"               AS action_id,
       "d"."status_alert_id"         AS status_alert_id,
       "d"."measurement"             AS measurement,
       "d"."mqtt_control_on"         AS mqtt_control_on,
       "d"."mqtt_control_off"        AS mqtt_control_off,
       "d"."org"                     AS device_org,
       "d"."bucket"                  AS device_bucket,
       "t"."type_name"               AS type_name,
       "l"."location_name"           AS location_name,
       "l"."configdata"              AS configdata,
       "mq"."mqtt_name"              AS mqtt_name,
       "mq"."org"                    AS mqtt_org,
       "mq"."bucket"                 AS mqtt_bucket,
       "mq"."envavorment"            AS mqtt_envavorment,
       "mq"."host"                   AS mqtt_host,
       "mq"."port"                   AS mqtt_port,
       "d"."mqtt_device_name"        AS mqtt_device_name,
       "d"."mqtt_status_over_name"   AS mqtt_status_over_name,
       "d"."mqtt_status_data_name"   AS mqtt_status_data_name,
       "d"."mqtt_act_relay_name"     AS mqtt_act_relay_name,
       "d"."mqtt_control_relay_name" AS mqtt_control_relay_name,
       "alarm"."alarm_action_id"     AS alarm_action_id,
       "alarm"."action_name"         AS action_name,
       "alarm"."status_warning"      AS status_warning,
       "alarm"."recovery_warning"    AS recovery_warning,
       "alarm"."status_alert"        AS status_alert,
       "alarm"."recovery_alert"      AS recovery_alert,
       "alarm"."email_alarm"         AS email_alarm,
       "alarm"."line_alarm"          AS line_alarm,
       "alarm"."telegram_alarm"      AS telegram_alarm,
       "alarm"."sms_alarm"           AS sms_alarm,
       "alarm"."nonc_alarm"          AS nonc_alarm,
       "alarm"."time_life"           AS time_life,
       "alarm"."event"               AS event,
       "alarm"."status"              AS status
FROM   "public"."sd_iot_device" "d"
       INNER JOIN "public"."sd_iot_alarm_device" "sad"
               ON "sad"."device_id" = "d"."device_id"
       INNER JOIN "public"."sd_iot_device_alarm_action" "alarm"
               ON "alarm"."alarm_action_id" = "sad"."alarm_action_id"
       INNER JOIN "public"."sd_iot_setting" "st"
               ON "st"."setting_id" = "d"."setting_id"
       INNER JOIN "public"."sd_iot_device_type" "t"
               ON "t"."type_id" = "d"."type_id"
       INNER JOIN "public"."sd_iot_mqtt" "mq"
               ON "mq"."mqtt_id" = "d"."mqtt_id"
       INNER JOIN "public"."sd_iot_location" "l"
               ON "l"."location_id" = "mq"."location_id"
WHERE  1 = 1
       AND "d"."status" ='1'
       AND "mq"."status" ='1'
       AND "alarm"."status" ='1'
       AND "sad"."alarm_action_id" ='2'
ORDER  BY "mq"."sort" ASC,
          "d"."device_id" ASC
LIMIT  10 
////////
////////
////////
sd_schedule_process_log
      id
      schedule_id
      device_id
      schedule_event_start
      day
      doday
      dotime
      schedule_event
      device_status
      status
      date
      time
      createddate
      updateddate
////////
sd_iot_schedule
      schedule_id
      schedule_name
      device_id
      start
      event
      sunday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
      createddate
      updateddate
      status
////////
sd_iot_schedule_device
    id
    schedule_id
    device_id
////////
sd_iot_alarm_device
    id
    alarm_action_id
    device_id
////////
sd_iot_alarm_device_event
    id
    alarm_action_id
    device_id
////////
sd_alarm_process_log
    id
    alarm_action_id
    device_id
    type_id
    event
    alarm_type
    status_warning
    recovery_warning
    status_alert
    recovery_alert
    email_alarm
    line_alarm
    telegram_alarm
    sms_alarm
    nonc_alarm
    status
    date
    time
    createddate
    updateddate
////////
sd_iot_device_alarm_action
    alarm_action_id
    action_name
    status_warning
    recovery_warning
    status_alert
    recovery_alert
    email_alarm
    line_alarm
    telegram_alarm
    sms_alarm
    nonc_alarm
    time_life
    event
    status
////////
////////
////////
////////

JavaScript  
String.prototype.replace()
str.replace(searchValue, replaceValue)


const str = "foo foo foo";
const newStr = str.replace(/foo/g, "bar");
console.log(newStr); // "bar bar bar"


  /***********schedule proce V1**********************/
  @HttpCode(200)
  @Get('scheduleproceV1')
  @ApiOperation({ summary: 'schedule process' })
  async scheduleproceV1(
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
          var rowResultData: any = await this.settingsService.scheduleprocess(filter);
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
          var today_name: any = '';
          var now_time: any= format.getCurrentTime();
          var now_time_cal: any = 3;
          var start_time: any = '';
          var end_time: any = '';
          var do_ststus: any = '';
          var ResultData: any = await this.settingsService.scheduleprocess(filter2);
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
              var today_name: any= format.getCurrentDayname();
              var now_time: any= format.getCurrentTime();
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
                      var now_time_1: any= format.getCurrentTimeStatus(now_time,schedule_event_start);
                      var now_time_2: any= format.getCurrentTimeStatus(schedule_event_start,schedule_event_start);
                      var now_time_1_s: any= format.getCurrentTimeStatusMsg(now_time,schedule_event_start);
                      var now_time_2_s: any= format.getCurrentTimeStatusMsg(schedule_event_start,schedule_event_start);
                      var date_now =format.getCurrentDatenow();
                      var time_now =format.getCurrentTimenow();
                      if((today_satatus==1) && (now_time_1==now_time_2)){
                          if(now_time_1=='1' && now_time_2=='1'){
                              var dataset:any={ 
                                            schedule_id:schedule_id,
                                            device_id: device_id, 
                                            schedule_event_start: schedule_event_start,  
                                            date:date_now, 
                                            schedule_event:schedule_event,
                              };
                              var log_count :any= await this.settingsService.scheduleprocesslog_count(dataset);
                              if(log_count>=1){ 
                                        console.log(`------------------log_count>=1------------------`);
                                        console.log(`1-log_count=>` + log_count);
                                        var cases:any=1; 
                                        console.log(`devicecontrol=>`); console.info(devicecontrol);
                                         console.log(`1-log_count=>` + log_count);
                                        var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                        if(deviceData){ 
                                          
                                            /*
                                              var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control); 
                                              var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                              var device_1:any = devicecontrol['dataObject']['device_1'];  // 1 0
                                              var device_status:any = devicecontrol['dataObject']['device_status'];  // on  off
                                            */
                                            var datasetupdate: any = {  
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
                                            console.log(`createset=>update=>`); console.info(datasetupdate);
                                            await this.settingsService.update_scheduleprocesslog_v2(datasetupdate);
                                        }  
                              }else if(log_count==0){  
                                console.log(`------------------log_count==0------------------`);
                                console.log(`2-log_count=>` + log_count);
                                // console.log(`2-mqtt_data_control=>` + mqtt_data_control);
                                // console.log(`2-message_mqtt_control=>` + message_mqtt_control);
                                var cases:any=2; 
                                var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                // console.log(`2-devicecontrol=>`); console.info(devicecontrol);
                                var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                var device_1:any = devicecontrol['dataObject']['device_1'];  // 1 0
                                var device_status:any = devicecontrol['dataObject']['device_status'];  // on  off
                                // console.log(`2-now_time_s=>`+now_time_s);
                                // console.log(`2-device_1=>`+device_1);
                                // console.log(`2-device_status=>`+device_status);
                                var createset:any={ 
                                              schedule_id:schedule_id,
                                              device_id: device_id,
                                              schedule_event_start: schedule_event_start,
                                              day: today_name,
                                              doday: today_name,
                                              dotime: now_time_s,
                                              schedule_event: message_mqtt_control,  
                                              device_status: device_1,
                                              status:device_1,
                                              date:date_now,
                                              time:time_now,
                                              createddate:Date(),
                                              updateddate:Date(),
                                    };
                                    /*
                                        {
                                            schedule_id: 2,                                                                                                                                                                                             
                                            device_id: 9,                                                                                                                                                                                               
                                            schedule_event_start: '12:53',                                                                                                                                                                              
                                            day: 'saturday',
                                            doday: 'saturday',                                                                                                                                                                                          
                                            dotime: '2025-08-02 13:02:16',
                                            schedule_event: '0',
                                            device_status: 0,                                                                                                                                                                                           
                                            status: 0,
                                            date: '2025-08-02',                                                                                                                                                                                         
                                            time: '13:02',
                                            createddate: 'Sat Aug 02 2025 13:02:20 GMT+0700 (Indochina Time)',                                                                                                                                          
                                            updateddate: 'Sat Aug 02 2025 13:02:20 GMT+0700 (Indochina Time)'
                                        }        
                                    */
                                    // console.log(`2-log_count-createset=>`);
                                    // console.info(createset); 
                                  const dataset1: any = {  
                                            schedule_id: schedule_id,
                                            device_id: device_id, 
                                            schedule_event_start: schedule_event_start,  
                                            date: date_now,  
                                            schedule_event:schedule_event,
                                    }; 
                                    // console.log(`2-dataset1=>`);
                                    // console.info(dataset1); 
                                  var logcount :any= await this.settingsService.scheduleprocesslog_count(dataset1);
                                  // console.log(`2-logcount=>`+logcount);
                                  // console.log(`2-schedule_id=>`+schedule_id);
                                  // console.log(`2-device_id=>`+device_id);
                                  // console.log(`2-schedule_event_start=>`+schedule_event_start);
                                  // console.log(`2-date_now=>`+date_now);
                                  // console.log(`2-schedule_event=>`+schedule_event);
                                  // console.log(`2-device_1=>`+device_1);
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
                                                   // console.log(`2createset=>`); console.info(createset);
                                                await this.settingsService.create_scheduleprocesslog(createset); 
                                  if(logcount>=1){ 
                                            //console.log(`2-2-logcount>=1=`+logcount);
                                            const dataset: any = {  
                                                    schedule_id: schedule_id,
                                                    device_id: device_id, 
                                                    schedule_event_start: schedule_event_start, 
                                                    schedule_event: schedule_event, 
                                                    date: date_now, 
                                                    time: time_now,
                                                    device_status: device_1,
                                                    status: 1,
                                                    updateddate:Date(),
                                            };
                                            var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                            if(deviceData){
                                                //await this.settingsService.update_scheduleprocesslog_v2(dataset);
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
                                                   // console.log(`createset=>`); console.info(createset);
                                                await this.settingsService.create_scheduleprocesslog(createset); 
                                            } 
                                  }else if(device_1!=""){ 
                                        //console.log(`2-2-device_1=`+device_1);
                                        var to: any = SEND_EMAIL;
                                        var subject: any = 'Schedule process '+schedule_name;   
                                        var dates=format.getCurrentDatenow();
                                        var times =format.getCurrentTimenow();
                                        var date_now_send=format.getCurrentDatenow();
                                        var time_now_send =format.getCurrentTimenow();
                                        // format.convertTZ(date_now_send); 
                                        var content: any = 'Name: '+schedule_name+' schedule event :'+schedule_event+'start :'+schedule_event_start+' date: '+date_now_send+':'+time_now_send; 
                                        let ResultData: any = await this.settingsService.sendEmail(to, subject,content);
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
                                            //console.log(`createset=>`); console.info(createset);
                                            await this.settingsService.create_scheduleprocesslog(createset); 
                                  }else if(device_1!="" && logcount==0){ 
                                          // console.log(`device_1!="" && logcount==0`);
                                          // console.log(`device_1=>` + device_1);
                                          // console.log(`logcount=>` + logcount);
                                          // console.log(`3-log_count=>` + log_count);
                                          var devicecontrol:any = await this.mqttService.devicecontrol(mqtt_data_control,message_mqtt_control);
                                          //console.log(`devicecontrol=>`); console.info(devicecontrol);
                                          var now_time_s:any = devicecontrol['dataObject']['timestamp'];
                                          var device_1:any = devicecontrol['dataObject']['device_1'];  // 1 0
                                          var device_status:any = devicecontrol['dataObject']['device_status'];  // on  off 
                                        var deviceData:any = await this.mqttService.getdevicedata(mqtt_data_value);
                                        if(deviceData){
                                           var createset:any={ 
                                                schedule_id:schedule_id,
                                                device_id: device_id,
                                                schedule_event_start: schedule_event_start,
                                                day: today_name,
                                                doday: today_name,
                                                dotime: now_time_s,
                                                schedule_event: schedule_event, 
                                                device_status: device_1,
                                                status:device_1,
                                                date:date_now,
                                                time:time_now,
                                                createddate:Date(),
                                                updateddate:Date(),
                                            };
                                           // console.log(`createset=>`); console.info(createset);
                                            await this.settingsService.create_scheduleprocesslog(createset); 
                                        }
                                  }
                              }   
                          } 
                      }else{ 
                        const ts: any = {  
                                  device_id: device_id,
                                  schedule_id: schedule_id, 
                          };
                      }      
              const ProfileRs: any = {  
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

  
``` 
{
                                            schedule_id: 2,                                                                                                                                                                                             
                                            device_id: 9,                                                                                                                                                                                               
                                            schedule_event_start: '12:53',                                                                                                                                                                              
                                            day: 'saturday',
                                            doday: 'saturday',                                                                                                                                                                                          
                                            dotime: '2025-08-02 13:02:16',
                                            schedule_event: '0',
                                            device_status: 0,                                                                                                                                                                                           
                                            status: 0,
                                            date: '2025-08-02',                                                                                                                                                                                         
                                            time: '13:02',
                                            createddate: 'Sat Aug 02 2025 13:02:20 GMT+0700 (Indochina Time)',                                                                                                                                          
                                            updateddate: 'Sat Aug 02 2025 13:02:20 GMT+0700 (Indochina Time)'
                                        }  