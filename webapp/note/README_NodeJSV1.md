# Note Js
```bash
# http://192.168.1.59:3003/v1/settings/sendemail
/* 
  smtp.gmail.com  
    - kongnakornit@gmail.com : asahzdatmywtwrji  : asah zdat mywt wrji 
    - icmon0955@gmail.com : mbwodofvkznougir
    - monitoring.system.report@gmail.com : owortggrxrqhubxa 
      GMAIL_USERNAME_b=icmon0955@gmail.com
      GMAIL_APP_PASSWORD_b=mbwodofvkznougir
      GMAIL_USERNAME=monitoring.system.report@gmail.com
      GMAIL_APP_PASSWORD=owortggrxrqhubxa
      GMAIL_APP_PASSWORD2=ninizjkybvrreguw
      GMAIL_APP_PASSWORD3=mbwo dofv kzno ugir
      GMAIL_APP_PASSWORD4=nini zjky bvrr eguw
      SEND_EMAIL=icmon0955@gmail.com,cmoniots@gmail.com,monitoring.system.report@gmail.com
*/
  {
      "timestamp":"2025-08-10 16:35:29",
      "temperature":29.24,
      "contRelay1":0,
      "actRelay1":0,
      "IO1":0,
      "overIO1":0,
      "contRelay2":0,
      "actRelay2":1,
      "IO2":1,
      "overIO2":1,
      "contRelay3":0,
      "actRelay3":1,
      "IO3":1,
      "overIO3":0,
      "deviceId":"AIR3/DATA"
  }
  /***********/
  {
      "0":"bucket",
      "1":"temperature",
      "2":"contRelay1",
      "3":"actRelay1",
      "4":"IO1",
      "5":"overIO1",
      "6":"contRelay2",
      "7":"actRelay2",
      "8":"IO2",
      "9":"overIO2",
      "10":"contRelay3",
      "11":"actRelay3",
      "12":"IO3",
      "13":"overIO3"
  }


SELECT 
  "d"."device_id" AS device_id, 
  "d"."setting_id" AS setting_id, 
  "d"."type_id" AS type_id, 
  "t"."type_name" AS type_name, 
  "l"."location_id" AS location_id, 
  "l"."location_name" AS location_name, 
  "l"."configdata" AS configdata, 
  "d"."device_name" AS device_name, 
  "d"."status_warning" AS status_warning, 
  "d"."recovery_warning" AS recovery_warning, 
  "d"."status_alert" AS status_alert, 
  "d"."recovery_alert" AS recovery_alert, 
  "d"."time_life" AS time_life, 
  "d"."period" AS period, 
  "d"."model" AS model, 
  "d"."vendor" AS vendor, 
  "d"."status" AS status, 
  "d"."unit" AS unit, 
  "d"."mqtt_id" AS mqtt_id, 
  "d"."oid" AS oid, 
  "d"."status_alert_id" AS status_alert_id, 
  "d"."mqtt_data_value" AS mqtt_data_value, 
  "d"."mqtt_data_control" AS mqtt_data_control, 
  "d"."mqtt_control_on" AS mqtt_control_on, 
  "d"."mqtt_control_off" AS mqtt_control_off, 
  "d"."measurement" AS measurement, 
  "mq"."mqtt_name" AS mqtt_name, 
  "mq"."org" AS mqtt_org, 
  "mq"."bucket" AS mqtt_bucket, 
  "mq"."envavorment" AS mqtt_envavorment, 
  "d"."sn" AS sn, 
  "d"."max" AS max, 
  "d"."min" AS min, 
  "d"."hardware_id" AS hardware_id, 
  "d"."comparevalue" AS comparevalue, 
  "d"."createddate" AS createddate, 
  "d"."updateddate" AS updateddate, 
  "d"."action_id" AS action_id, 
  "mq"."host" AS mqtt_host, 
  "mq"."port" AS mqtt_port, 
  "d"."mqtt_device_name" AS mqtt_device_name, 
  "d"."mqtt_status_over_name" AS mqtt_status_over_name, 
  "d"."mqtt_status_data_name" AS mqtt_status_data_name, 
  "d"."mqtt_act_relay_name" AS mqtt_act_relay_name, 
  "d"."mqtt_control_relay_name" AS mqtt_control_relay_name 
FROM 
  "public"."sd_iot_device" "d" 
  LEFT JOIN "public"."sd_iot_setting" "st" ON "st"."setting_id" = "d"."setting_id" 
  LEFT JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "d"."type_id" 
  LEFT JOIN "public"."sd_iot_mqtt" "mq" ON "mq"."mqtt_id" = "d"."mqtt_id" 
  LEFT JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
WHERE  1 = 1  AND "d"."bucket" ='BAACTW04'

  
 - http://192.168.1.59:3003/v1/settings/listdevicepageactive?page=1&pageSize=10&bucket=BAACTW03

SELECT 
  COUNT(DISTINCT "d"."device_id") AS "cnt" 
FROM 
  "public"."sd_iot_device" "d" 
  LEFT JOIN "public"."sd_iot_setting" "st" ON "st"."setting_id" = "d"."setting_id" 
  LEFT JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "d"."type_id" 
  LEFT JOIN "public"."sd_iot_mqtt" "mq" ON "mq"."mqtt_id" = "d"."mqtt_id" 
  LEFT JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
WHERE 
  1 = 1 
  AND "d"."status" = $1 
  AND "mq"."status" = $1 
  AND "d"."bucket" = $2 -- PARAMETERS: [1,"BAACTW03"]
  backendcmon | query : 
SELECT 
  COUNT(
    DISTINCT("d"."device_id")
  ) AS "cnt" 
FROM 
  "public"."sd_iot_device" "d" 
  LEFT JOIN "public"."sd_iot_setting" "st" ON "st"."setting_id" = "d"."setting_id" 
  LEFT JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "d"."type_id" 
  LEFT JOIN "public"."sd_iot_mqtt" "mq" ON "mq"."mqtt_id" = "d"."mqtt_id" 
  LEFT JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
WHERE 
  1 = 1 
  AND "d"."status" = 1
  AND "mq"."status" = 1
  AND "d"."bucket" = 'BAACTW03'
  
  
  -- PARAMETERS: [1,"BAACTW03"]


SELECT 
  "d"."device_id" AS device_id, 
  "d"."mqtt_id" AS mqtt_id, 
  "d"."setting_id" AS setting_id, 
  "d"."type_id" AS type_id, 
  "d"."device_name" AS device_name, 
  "d"."sn" AS sn, 
  "d"."hardware_id" AS hardware_id, 
  "d"."status_warning" AS status_warning, 
  "d"."recovery_warning" AS recovery_warning, 
  "d"."status_alert" AS status_alert, 
  "d"."recovery_alert" AS recovery_alert, 
  "d"."time_life" AS time_life, 
  "d"."period" AS period, 
  "d"."work_status" AS work_status, 
  "d"."max" AS max, 
  "d"."min" AS min, 
  "d"."oid" AS oid, 
  "d"."mqtt_data_value" AS mqtt_data_value, 
  "d"."mqtt_data_control" AS mqtt_data_control, 
  "d"."model" AS model, 
  "d"."vendor" AS vendor, 
  "d"."comparevalue" AS comparevalue, 
  "d"."createddate" AS createddate, 
  "d"."updateddate" AS updateddate, 
  "d"."status" AS status, 
  "d"."unit" AS unit, 
  "d"."action_id" AS action_id, 
  "d"."status_alert_id" AS status_alert_id, 
  "d"."measurement" AS measurement, 
  "d"."mqtt_control_on" AS mqtt_control_on, 
  "d"."mqtt_control_off" AS mqtt_control_off, 
  "d"."org" AS device_org, 
  "d"."bucket" AS device_bucket, 
  "t"."type_name" AS type_name, 
  "l"."location_name" AS location_name, 
  "l"."configdata" AS configdata, 
  "mq"."mqtt_name" AS mqtt_name, 
  "mq"."org" AS mqtt_org, 
  "mq"."bucket" AS mqtt_bucket, 
  "mq"."envavorment" AS mqtt_envavorment, 
  "mq"."host" AS mqtt_host, 
  "mq"."port" AS mqtt_port, 
  "d"."mqtt_device_name" AS mqtt_device_name, 
  "d"."mqtt_status_over_name" AS mqtt_status_over_name, 
  "d"."mqtt_status_data_name" AS mqtt_status_data_name, 
  "d"."mqtt_act_relay_name" AS mqtt_act_relay_name, 
  "d"."mqtt_control_relay_name" AS mqtt_control_relay_name 
FROM 
  "public"."sd_iot_device" "d" 
  LEFT JOIN "public"."sd_iot_setting" "st" ON "st"."setting_id" = "d"."setting_id" 
  LEFT JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "d"."type_id" 
  LEFT JOIN "public"."sd_iot_mqtt" "mq" ON "mq"."mqtt_id" = "d"."mqtt_id" 
  LEFT JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
WHERE 
  1 = 1 
  AND "d"."status" = 1 
  AND "mq"."status" = 1 
  AND "d"."bucket" = 'BAACTW02'
ORDER BY 
  "mq"."sort" ASC, 
  "d"."device_id" ASC 
LIMIT  10 




  /****************Sensor_list******************/
  @HttpCode(200)
  @AuthUserRequired()
  @UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list sensor page' })
  @Get('listsensor')
  async list_page_sensor(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> {
      const idx: any = query.id || '';
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 10;
      var status: any = query.status || '';
      let select_status: any = query.select_status || '';
      var sort: any = query.sort || 'createddate-DESC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = sort || 'ASC';
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
      filter2.sort = sort || 'ASC';
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
      let ResultData: any = await this.settingsService.sensor_list_paginate(filter2);
      let tempData = [];
      let tempDataoid = [];
      let tempData2 = []; 
      for (const [key, va] of Object.entries(ResultData)) {
        // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ 
        const ArrayRs: any = {  
            sensor_id: ResultData[key].sensor_id,
            setting_id: ResultData[key].setting_id,
            type_id: ResultData[key].type_id,
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


``` 