# Note Js
 
```bash
 /*********************************/
  @HttpCode(200)
  @AuthUserRequired()
  @UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'list page sensor' })
  @Get('listpagesensor')
  async list_page_sensor(
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

``` 

  /***********alarmdevice*************/
  // http://192.168.1.57:3003/v1/settings/alarmdevicestatus?page=1
  @HttpCode(200)
  //@AuthUserRequired()
  //@UseGuards(AuthGuardUser)
  @ApiOperation({ summary: 'alarm device status' })
  @Get('alarmdevicestatus')
  async alarm_device_status(
      @Res() res: Response,
      @Query() query: any,
      @Headers() headers: any,
      @Param() params: any,
      @Req() req: any,
    ): Promise<any> { 
      const page: number = Number(query.page) || 1;
      const pageSize: number = Number(query.pageSize) || 100000000;
      var alarm_action_id: any = query.alarm_action_id || '';  
      var status: any = query.status || ''; 
      var sort: any = query.sort || 'createddate-ASC';
      let keyword: any = query.keyword || '';
      let filter: any = {};
      filter.sort = query.sort;
      filter.keyword = keyword || '';    
      filter.alarm_action_id = alarm_action_id || '';  
      filter.event = query.event || '';  
      filter.isCount = 1;
      let rowResultData: any = await this.settingsService.alarm_device_paginate_status(filter);
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
      filter2.keyword = keyword || '';    
      filter2.alarm_action_id = alarm_action_id || '';  
      filter2.event = query.event || '';  
      filter2.isCount = 0;
      filter2.page = page;
      filter2.pageSize = pageSize;
      console.log(`filter2=`);
      console.info(filter2);
      let ResultData: any = await this.settingsService.alarm_device_paginate_status(filter2);
      let tempDataoid = []; 
      for (const [key, va] of Object.entries(ResultData)) { 
        var alarm_action_id:any=ResultData[key].alarm_action_id; 
        var action_name:any=ResultData[key].action_name; 
            var filter1: any = {};
            filter1.alarm_action_id = alarm_action_id;  
            var count_device: any = await this.settingsService.alarm_device_id_alarm_count(filter1);
            var filter3: any = {};
            filter3.alarm_action_id = alarm_action_id;  
            var count_device_event: any = await this.settingsService.alarm_device_id_event_count(filter3);
            var filter34: any = {};
            filter34.alarm_action_id = alarm_action_id;  
            var device_event: any = await this.settingsService.device_list_paginate_active_event(filter34); 
            /*
             
            
            */
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


            var alarm_action_id: any = alarm_action_id;
            var action_name: any = action_name;
            var status_warning: any = ResultData[key].status_warning;
            var recovery_warning: any = ResultData[key].recovery_warning;
            var status_alert: any = ResultData[key].status_alert;
            var recovery_alert: any = ResultData[key].recovery_alert;
            var email_alarm: any = ResultData[key].email_alarm;
            var line_alarm: any = ResultData[key].line_alarm;
            var telegram_alarm: any = ResultData[key].telegram_alarm;
            var sms_alarm: any = ResultData[key].sms_alarm;
            var nonc_alarm: any = ResultData[key].nonc_alarm;
            var time_life: any = ResultData[key].time_life;
            var event: any = ResultData[key].event;
            var status: any = ResultData[key].status;  
            const DataRs: any = { 
                      alarm_action_id: alarm_action_id,  
                      action_name: action_name,  
                      status_warning: status_warning, 
                      recovery_warning: recovery_warning,
                      status_alert: status_alert,
                      recovery_alert: recovery_alert,
                      email_alarm: email_alarm,
                      line_alarm: line_alarm,
                      telegram_alarm: telegram_alarm,
                      sms_alarm: sms_alarm,
                      nonc_alarm: nonc_alarm,
                      time_life: time_life,
                      event: event,
                      status: status,
                      count_device:count_device,
                      count_device_event:count_device_event,
                      device_event:device_event,
        }
        tempDataoid.push(DataRs);
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
            data: tempDataoid,
        },
        message: 'get data success.',
        message_th: 'get data success.',
      });
  }