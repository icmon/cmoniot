# CI-with-HMVC
Setup HMVC and local session storage with Codeigniter 3

Modules are groups of independent components, typically model, controller and view, arranged in an application modules sub-directory that can be dropped into other Codeigniter applications. This allows easy distribution of independent components (MVC) in a single directory across other CodeIgniter applications
# https://dev.to/francescoxx/python-crud-rest-api-using-django-postgres-docker-and-docker-compose-4nhe
 

# Updated for PHP 8

```bash
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
# http://192.168.1.57:3003/v1/settings/listdevicepageactive?page=1&pageSize=10&bucket=BAACTW02


      ////////////////
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
        ////////////////


{
    "device_id": 8,
    "mqtt_id": 2,
    "setting_id": 1,
    "alarm_action_id": 1,
    "type_id": 1,
    "device_name": "Temperature",
    "sn": "A1408",
    "hardware_id": 1,
    "status_warning": "32",
    "recovery_warning": "30",
    "status_alert": "38",
    "recovery_alert": "30",
    "time_life": 45,
    "period": "35",
    "work_status": 1,
    "max": "35",
    "min": "25",
    "oid": "1",
    "mqtt_data_value": "BAACTW02/DATA",
    "mqtt_data_control": "BAACTW02/CONTROL",
    "model": "cmon",
    "vendor": "cmon",
    "comparevalue": "1",
    "createddate": "2025-07-10T20:59:48.643Z",
    "updateddate": "2025-07-24T11:58:07.531Z",
    "status": 1,
    "unit": "°C",
    "action_id": 1,
    "status_alert_id": 1,
    "measurement": "temperature",
    "mqtt_control_on": "1",
    "mqtt_control_off": "0",
    "device_org": "cmon_org",
    "device_bucket": "BAACTW02",
    "type_name": "Sensor",
    "location_name": "ธกส ระบบพัดลม",
    "configdata": ,
    "mqtt_name": "อาคาร 1 ชั้น 1",
    "mqtt_org": "cmon_org",
    "mqtt_bucket": "BAACTW02",
    "mqtt_envavorment": "measurement",
    "mqtt_host": "192.168.1.57",
    "mqtt_port": 8086,
    "mqtt_device_name": "temperature",
    "mqtt_status_over_name": "overFan1",
    "mqtt_status_data_name":  ,
    "mqtt_act_relay_name": "actRelay1",
    "mqtt_control_relay_name": "contRelay1",
    "action_name": "Over load sensor",
    "email_alarm": 1,
    "line_alarm": 0,
    "telegram_alarm": 0,
    "sms_alarm": 0,
    "nonc_alarm": 0,
    "event": 1
}
        

``` 