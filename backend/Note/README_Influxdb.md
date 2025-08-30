### Influxdb
-   
-  
```bash
from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity" or r["_field"] == "Latitude" or r["_field"] == "Longitude" or r["_field"] == "Temperature" or r["_field"] == "Temperature2" or r["_field"] == "Voltage" or r["_field"] == "sensors_Relay1")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
 
from(bucket: "BAACTW10")
 |> range(start: -5m, stop: now())                                                                                                                                                             
 |> filter(fn: (r) => r["_measurement"] == "temperature")
 |> filter(fn: (r) => r["_field"] == "value") 
 |> limit(n:50, offset: 0)                                                                                                                                                                     
 |> yield(name: "last")


 
```
### 2. Overview and delete files
### 3. Create module
# https://docs.nestjs.com/recipes/crud-generator
```bash 
```
### 4. Check endpoint and create CRUD
```ts 
```
### 5. Intall DB (Docker) sql
``` 
```
### 7. Intall TypeOrm
```bash
 
```
### 8. App Module
```ts 
```
### 9. Task Entity
```ts 
```
### 10. Tasks Module
```ts 
```
### 11 Service
```ts 
```
### 12 Controller
```ts 
```
### 13 Migrations
```json 
```
### 14 Create mpm scripts
```json
 
```
### 15. Set entity
```ts 
``` 
```bash
/*

  nestjs influxdb-client-api crud example code

  nestjs @influxdata/influxdb-client crud example code
  msg.topic = "InfluxData";

  var  timeStamp = global.get('timeStamp');
  var  temp  = global.get('Temp');
  var  humi = global.get('Humi');
  var Amp = global.get('Amp');
  var Voltage = global.get('Voltage');
  var sensors_temp = global.get('sensors/temp1');
  var sensors_Relay1 = global.get('sensors/Relay1');
  var location = 'office';
  var tags = { "location": "office" };
  //var Latitude = global.get('Latitude');
  //var Longitude = global.get('Longitude');

  msg.payload = {
      "TimeStamp": timeStamp,
      "Temperature":temp,
      "Temperature2": sensors_temp,
      "sensors_Relay1": sensors_Relay1,
      "Humidity" : humi,
      "Amp": Amp,
      "Voltage": Voltage,
      "Latitude": 13.8170338,
      "Longitude": 100.6848789,
      "tags": tags
  }  
  return msg;
      http://localhost:3003/v1/iot/getstartend?field=Latitude&start=-5s&stop=now()&windowPeriod=5s&mean=now
      http://localhost:3003/v1/iot/getstartend?field=Latitude&start=-5s&stop=now()&windowPeriod=5s&mean=last
      http://localhost:3003/v1/iot/getstartend?field=Temperature&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Temperature2&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=sensors_Relay1&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Humidity&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Amp&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Voltage&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Latitude&start=-30m&stop=now()&windowPeriod=5s&mean=mean
      http://localhost:3003/v1/iot/getstartend?field=Longitude&start=-30m&stop=now()&windowPeriod=5s&mean=mean
 */

 

/*
from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity" or r["_field"] == "Latitude" or r["_field"] == "Longitude" or r["_field"] == "Temperature" or r["_field"] == "Temperature2" or r["_field"] == "Voltage" or r["_field"] == "sensors_Relay1")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")

http://localhost:3003/v1/iot/write
Post
raw

{
  "bucket": "cmon_bucket", 
  "measurement": "TemperatureCmon",
  "fields": {
    "value": 34.5,
    "max": 50.0,
    "min": 24.0
  },
  "tags": {
    "location": "office"
  }
}

}

http://localhost:3003/v1/iot/queryData

{
  "query": "from(bucket: 'cmon_bucket') |> range(start: -1h)"
}

AI
nestjs influxdb-client-api crud example code


http://localhost:3003/v1/iot/getone?field=Humidity
http://localhost:3003/v1/iot/getstartend?field=Humidity&start=-1h&stop=now()&windowPeriod=5s&mean=last
http://localhost:3003/v1/iot/write

import "strings"
from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> range(start: -15m, stop: now())
  |> sort(columns: ["_value"], desc: false)
  |> stateCount(fn: (r) => r._field == "state", column: "stateCount")
  |> stateDuration(fn: (r) => r._measurement == "state", column: "stateDuration", unit: 1s)



from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "TemperatureCmonIoT")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "sensor_id" or r["_field"] == "value")
  |> filter(fn: (r) => r["location"] == "office")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "TemperatureCmonIoT")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "sensor_id" or r["_field"] == "value")
  |> filter(fn: (r) => r["location"] == "office")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> limit(n:1, offset: 0)


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "TemperatureCmonIoT")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "sensor_id" or r["_field"] == "value")
  |> filter(fn: (r) => r["location"] == "office")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> limit(n:5, offset: 1)
  |> count(column: "_value")



from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Temperature")  
  |> range(start: -5s, stop: now())  


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> range(start: -15m, stop: now())
  |> sort(columns: ["_value"], desc: false)
  |> stateCount(fn: (r) => r._field == "state", column: "stateCount")
  |> stateDuration(fn: (r) => r._measurement == "state", column: "stateDuration", unit: 1s)

 
INFLUX_HOST=https://your-influxdb-url
INFLUX_TOKEN=your-api-token
INFLUX_BUCKET=your-bucket-name
INFLUX_ORG=your-organization-name


 from(bucket: "cmon_bucket")
          |> range(start: -1h, stop: now())
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Humidity")
          |> aggregateWindow(every: 5s, fn: mean, createEmpty: false)
          |> yield(name: "last")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> range(start: -30d, stop: now())
 

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
  |> limit(n:10, offset: 0)
  |> range(start: -30d, stop: now())
 





repl.repl.ignoreUndefined=true
const {InfluxDB, Point} = require('@influxdata/influxdb-client')
const token = process.env.INFLUXDB_TOKEN
const url = 'http://localhost:8086'
const client = new InfluxDB({url, token})



let org = `cmon_org`
let bucket = `cmon_bucket`

let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++) {
  let point = new Point('measurement1')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


let queryClient = client.getQueryApi(org)
let fluxQuery = `from(bucket: "cmon_bucket")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})




queryClient = client.getQueryApi(org)
fluxQuery = `from(bucket: "cmon_bucket")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")
 |> mean()`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})



*/


/*
 1m  now()
from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> unique()
  |> yield(name: "unique")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> sort()
  |> yield(name: "sort")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> yield(name: "last")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: first, createEmpty: false)
  |> yield(name: "first")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: stddev, createEmpty: false)
  |> yield(name: "stddev")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> spread()
  |> yield(name: "spread")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> skew()
  |> yield(name: "skew")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> increase()
  |> yield(name: "increase")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> count()
  |> yield(name: "count")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> distinct()
  |> yield(name: "distinct")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> derivative(unit: 1s, nonNegative: true)
  |> yield(name: "nonnegative derivative")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> derivative(unit: 1s, nonNegative: false)
  |> yield(name: "derivative")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: sum, createEmpty: false)
  |> yield(name: "sum")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: min, createEmpty: false)
  |> yield(name: "min")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: max, createEmpty: false)
  |> yield(name: "max")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Temperature1")
  |> filter(fn: (r) => r["_field"] == "max" or r["_field"] == "min" or r["_field"] == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: median, createEmpty: false)
  |> yield(name: "median")


   https://docs.influxdata.com/influxdb/v2/query-data/influxql/explore-data/offset-and-soffset/


 influx delete --bucket datastorage --predicate '_measurement="Control_1_sensor1"'


influx delete \
  --bucket <cmon_bucket> \
  --org <cmon_org> \ 
  --predicate '_measurement="<Control_1_sensor1>"'



from(bucket: "cmon_bucket")
  |> range(start: -1h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" 
    or r["_field"] == "SN"
    or r["_field"] == "Relay2" 
    or r["_field"] == "Relay1" 
    or r["_field"] == "Current")
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" 
    or r["_field"] == "SN"
//     or r["_field"] == "Relay2" 
//     or r["_field"] == "Relay1" 
//     or r["_field"] == "Current"
    )
  |> yield(name: "mean")


  where SN=='DFADBEEFFEEF'


from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" 
   or r["_field"] == "SN" 
    and r["_value"] == "DFADBEEFFEEF"
    )
  |> yield(name: "mean")


 or  (r["_field"] == "SN" and r["_value"] == "DFADBEEFFEEF")


from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "SN")
  |> yield(name: "mean")



from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => 
      r["_measurement"] == "TEST3" and 
      r["_field"] == "SN" and 
      r["_value"] == "DFADBEEFFEEF"
    )
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) =>
      r._measurement == "TEST3" and
      r._field == "Temperature"
    )
  |> filter(fn: (r) => r.SN == "DFADBEEFFEEF")
  |> yield(name: "mean")


  from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature"
   and r["_field"] == "SN" 
   and r["_value"] == "DFADBEEFFEEF"
  )
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" or(r["_field"] == "SN" and r["_value"] == "DFADBEEFFEEF"))
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: -10s, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> yield(name: "mean")



from(bucket: "cmon_bucket")
  |> range(start: -10s, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "TEST3")
  |> filter(fn: (r) => r["_field"] == "Temperature" or(r["_field"] == "SN" and r["_value"] == "DFADBEEFFEEF"))
  |> yield(name: "mean")



*/


/*
[⚠️ Suspicious Content] msg.topic = "InfluxData";
// แยกข้อความด้วย ,
var arr = msg.payload.split(",");
if (arr.length < 5) {
    msg.payload = "ข้อมูลน้อยเกินไป";
    return msg;
}
var  timeStamp = global.get('timeStamp');
msg.payload = { 
    "SN": arr[0],
    "Temperature": arr[1],
    "Current":arr[2],
    "Relay1": arr[3],
    "Relay2": arr[4]
}
return msg;
 

 DEADBEEFFEED

 DFADBEEFFEEF

from(bucket: "cmon_bucket")
  |> range(start: -10s, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DFADBEEFFEEF")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> yield(name: "mean")



from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Current")
  |> yield(name: "mean")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> limit(n:6, offset: 0)
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> group(columns: ["host", "_measurement"], mode:"by")
  |> yield(name: "mean")




from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> limit(n:3, offset: 0)
  |> filter(fn: (r) => r["_field"] == "Current")
//   |> sleep(duration: 5s)
  |> group(columns: ["host", "_measurement"], mode:"by")
  |> yield(name: "last")


*/
 ```

```bash
from(bucket: "cmon_bucket")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> range(start: -2h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "Envavorment")
  |> filter(fn: (r) => r["_field"] == "Amp"
  or r["_field"] == "Humidity" 
  or r["_field"] == "Latitude"
  or r["_field"] == "Longitude" 
  or r["_field"] == "Temperature" 
  or r["_field"] == "Temperature2" 
  or r["_field"] == "Voltage"
  or r["_field"] == "sensors_Relay1")
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: true)
  |> limit(n:1000, offset: 0)
  |> yield(name: "last")



from(bucket: "cmon_bucket")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> range(start: -30m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
 |> count()
 |> yield(name: "count")

- bucket : bucket name
- _measurement : SN
- _field : sennser
-- |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
- timeRangeStart :date start
- timeRangeStop :date Stop
-- |> range(start: -10h, stop: now())
- start: -10h :time start
- now :time Stop

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  //|> range(start: -10h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Current")
  |> yield(name: "mean")
  |> limit(n:20, offset: 0)


from(bucket: "cmon_bucket")
  //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> range(start: -10m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Current")
  |> limit(n:2, offset: 0)


------ count
from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> count()
  |> yield(name: "count")
----------------------------- 
------ last  limit  offset
from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:2, offset: 0)
  |> yield(name: "last")

----------------------------- 

------ sort  limit  offset
from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:2, offset: 0)
  |> sort()
  |> yield(name: "sort")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:2, offset: 0)
  |> sort()
  |> yield(name: "sort")



from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:1, offset: 0)
  |> yield(name: "sum")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:1, offset: 0)
  |> yield(name: "max")

  from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> limit(n:1, offset: 0)
  |> yield(name: "min")

----------------------------- 
 

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: max, createEmpty: false)
  |> yield(name: "max")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: min, createEmpty: false)
  |> yield(name: "min")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: sum, createEmpty: false)
  |> yield(name: "sum")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> count()
  |> yield(name: "count")

 ```


```bash
from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "min")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "mean")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "sum")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "min")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "max")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
  |> limit(n:1, offset: 0)
  |> count()
  |> yield(name: "count")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "last")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
  |> limit(n:1, offset: 0)
  |> sort()
  |> yield(name: "sort")

from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "DEADBEEFFEED")
  |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Current" or r["_field"] == "Relay1" or r["_field"] == "Relay2")
//   |> aggregateWindow(every: v.windowPeriod, fn: median, createEmpty: true)
|> limit(n:1, offset: 0)
  |> yield(name: "median")



 |> http.post(url: "http://localhost:8086/", headers: {x:"a", y:"b"}, data: bytes(v: "body"))


  
       1m  now()
        from(bucket: "cmon_bucket")
          |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity")
          |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
          |> yield(name: "mean")

          // influxdb 2  from(bucket:  query limit offset  how to
          from(bucket: "your-bucket")
          |> range(start: -1h)
          |> filter(fn: (r) => r._measurement == "your_measurement")
          |> group() // optional: to remove grouping and limit across all data
          |> limit(n: 10, offset: 20)

    
    
      /*
        from(bucket: "cmon_bucket")
            |> range(start: -1h, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "Envavorment")
            |> filter(fn: (r) => r["_field"] == "Humidity")
            |> aggregateWindow(every: 5s, fn: mean, createEmpty: false)  
            
          from(bucket: "cmon_bucket")
          |> range(start: 2021-01-01T00:00:00Z, stop: 2021-01-02T00:00:00Z)
          |> filter(fn: (r) => r._measurement == "your_measurement")

          from(bucket: "my_bucket")
          |> range(start: -24h)

          from(bucket: "my_bucket")
          |> range(start: 1745539200, stop: 1745625600)

        from(bucket: "my_bucket")
          |> range(start: 2025-04-24T00:00:00Z, stop: 2025-04-25T00:00:00Z)
          |> filter(fn: (r) => r._measurement == "temperature" and r.location == "office")

          import "timezone"
          option location = timezone.location(name: "Asia/Bangkok")

          from(bucket: "your-bucket")
            |> range(start: 2025-04-25T00:00:00Z, stop: 2025-04-25T12:00:00Z)
            |> aggregateWindow(every: 1h, fn: mean)

            SELECT * FROM measurement
            WHERE time >= '2025-04-25T00:00:00Z' AND time < '2025-04-26T00:00:00Z'
            tz('Asia/Bangkok')

                        
      */

   //http://localhost:3003/v1/iot/getstartend?field=Temperature&start=-5m&stop=now()&windowPeriod=5s&mean=last
     /*
     1m  now()
      from(bucket: "cmon_bucket")
        |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
        |> filter(fn: (r) => r["_measurement"] == "Envavorment")
        |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity")
        |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
        |> yield(name: "mean")
  
    */
        //http://localhost:3003/v1/iot/getstartend?field=Temperature&start=-5m&stop=now()&windowPeriod=5s&mean=last
       /*
       1m  now()
        from(bucket: "cmon_bucket")
          |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
          |> filter(fn: (r) => r["_measurement"] == "Envavorment")
          |> filter(fn: (r) => r["_field"] == "Amp" or r["_field"] == "Humidity")
          |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
          |> yield(name: "mean")
    
      */
        /*              
            [
                {

                    "name": "Revenue",
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    "data": [
                        10,
                        45,
                        30,
                        35,
                        50,
                        55,
                        70,
                        120,
                        150,
                        160,
                        210,
                        240
                    ]
                },
                {
                    "name": "Expenses",
                     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    "data": [
                        12,
                        17,
                        75,
                        82,
                        44,
                        35,
                        52,
                        75,
                        112,
                        108,
                        56,
                        289
                    ]
                }
            ]
    */
    
          /*
             
                          
            [
                {

                    "name": "Revenue",
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    "data": [
                        26.33,
                        37.5,
                        52.33,
                        31,
                        35,
                        31,
                        46.5,
                        38.33,
                        37,
                        31,
                        37.5,
                        42.33,
                        40,
                        35.33,
                        26,
                        40,
                        27.5,
                        37,
                        45.5,
                        37,
                        40,
                        34.5,
                        28.5,
                        34,
                        45,
                        28,
                        32,
                        23,
                        40.67,
                        38.5,
                        39.67,
                        44,
                        33.33,
                        32.5,
                        40.33,
                        31.5,
                        23.33,
                        35,
                        39,
                        39,
                        42.5,
                        40,
                        27,
                        31,
                        33.5,
                        41.33,
                        47.5,
                        25.67,
                        38.5,
                        38.33,
                        28,
                        37,
                        42,
                        30,
                        23,
                        32.5,
                        41,
                        28,
                        39,
                        33.5
                    ]
                },
                {
                    "name": "Expenses",
                     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    "data": [
                        12,
                        17,
                        75,
                        82,
                        44,
                        35,
                        52,
                        75,
                        112,
                        108,
                        56,
                        289
                    ]
                }
            ]
                      */


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "room1Relay1")
  |> filter(fn: (r) => r["_field"] == "value" or(r["_field"] == "value" and r["_value"] != "0.5"))
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> yield(name: "last")


from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "room2Relay2" or r["_measurement"] == "room3Amp" or r["_measurement"] == "room3Relay1" or r["_measurement"] == "room3Relay2" or r["_measurement"] == "room4Amp" or r["_measurement"] == "room4Relay1" or r["_measurement"] == "room4Relay2" or r["_measurement"] == "room1Relay1" or r["_measurement"] == "room1Relay2" or r["_measurement"] == "room2Amp" or r["_measurement"] == "room2Relay1")
  |> filter(fn: (r) => r["_field"] == "value"  or(r["_field"] == "value" and r["_value"] != "0.5"))
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> yield(name: "last")



from(bucket: "cmon_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "room1Temp" or r["_measurement"] == "room3Temp" or r["_measurement"] == "room4Temp" or r["_measurement"] == "room2Temp")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: 10s, fn: last, createEmpty: false)
  |> yield(name: "last")


from(bucket: "cmon_bucket")
  //   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> range(start: -15m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "room1Temp" or r["_measurement"] == "room3Temp" or r["_measurement"] == "room4Temp" or r["_measurement"] == "room2Temp")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: 10s, fn: last, createEmpty: false)
  |> limit(n:200, offset: 0)
  |> yield(name: "last")



/******/
from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "room1Temp")
  |> filter(fn: (r) => r["_field"] == "value"  or(r["_field"] == "value" and r["_value"] != "0.5"))
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> limit(n:1, offset: 0)
  |> yield(name: "last")

/******/

  from(bucket: "cmon_bucket")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "room1Temp")
  |> filter(fn: (r) => r["_field"] == "value"  or(r["_field"] == "value" and r["_value"] != "0.5"))
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> limit(n:1, offset: 0)
  |> yield(name: "last")
   
/******/

   from(bucket: "cmon_bucket")
  |> range(start: -15m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "room2Temp")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: 10s, fn: last, createEmpty: false)
  |> limit(n:1, offset: 0)
  |> yield(name: "last")

from(bucket: "cmon_bucket")
  |> range(start: -15m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "room2Temp")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: 10s, fn: last, createEmpty: false)
  |> limit(n:1, offset: 0)
  |> yield(name: "last")

/******/



from(bucket: "cmon_bucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "FAN_control_TEST2")
  |> filter(fn: (r) => r["_field"] == "TimeStamp" or r["_field"] == "Temperature" or r["_field"] == "SN" or r["_field"] == "Relay2" or r["_field"] == "Relay1" or r["_field"] == "Location" or r["_field"] == "Current")
  |> yield(name: "mean")
  


cmon_org
cmon_bucket

Podium floor 8 , Podium floor 7 ,Tower floor 12 , Tower floor 11

1. room 1
DEADBEEFFEED
2. room 2
DFADBEEFFEEF
3. room 3
DEADBEEFFEAB
4. room 4
DFADBEEFFECD



http://localhost:3003/v1/iot/getsenserchart?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=room2Temp&windowPeriod=5s&limit=200&offset=0&mean=last

http://localhost:3003/v1/iot/getsenser?bucket=cmon_bucket&field=value&start=-1h&stop=now()&measurement=room1Amp&windowPeriod=5s&limit=1&offset=0&mean=last


20:22 suthat.somsap http://35.201.228.100
20:23 suthat.somsap http://35.201.228.100:1880
20:24 suthat.somsap http://35.201.228.100:8086
20:24 suthat.somsap http://35.201.228.100:3000
20:24 suthat.somsap influx  suthat/P@ssw0rd
20:25 suthat.somsap grafana  Admin/P@ssw0rd


HOST:http://192.168.1.37:8086
ORG =>cmon_org
bucket =>KIA
_measurement =>KIA

/****************/

// BAACTW02
// BAACTW03
// BAACTW04
// BAACTW05

from(bucket: "BAACTW02")
  //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> range(start: -30s, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "ActRelay1" or r["_measurement"] == "ActRelay2" or r["_measurement"] == "ContRelay1" or r["_measurement"] == "ContRelay2" or r["_measurement"] == "Fan1" or r["_measurement"] == "Fan2" or r["_measurement"] == "OverFan1" or r["_measurement"] == "OverFan2" or r["_measurement"] == "temperature")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> limit(n:1, offset: 0)
  |> yield(name: "last")

/****************/



/**
from(bucket: "BAACTW02")
  //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> range(start: -1m, stop: now())  // แสดงข้อมูล ณ เวลา ปัจจุบับ ย้อน ไป 1 นาที่
  |> filter(fn: (r) => r["_measurement"] == "ActRelay1Na" or r["_measurement"] == "ActRelay2" or r["_measurement"] == "ConRelay1" or r["_measurement"] == "ConRelay2" or r["_measurement"] == "ContRelay1" or r["_measurement"] == "Fan1" or r["_measurement"] == "Fan2" or r["_measurement"] == "OverFan1" or r["_measurement"] == "OverFan2" or r["_measurement"] == "Temp" or r["_measurement"] == "ActRelay11" or r["_measurement"] == "ActRelay1")
  |> filter(fn: (r) => r["_field"] == "value")
  //|> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> limit(n:1, offset: 0)  // จำนวนแถวที่จะแสดง  ต่อ  1  _measurement name
  |> yield(name: "last") // เรียงข้อมูลจากล่าสุด


from(bucket: "BAACTW02")
  |> range(start: -1m, stop: now())  // Last 1 minute
  |> filter(fn: (r) => 
      r["_measurement"] == "ActRelay1Na" or
      r["_measurement"] == "ActRelay2" or
      r["_measurement"] == "ConRelay1" or
      r["_measurement"] == "ConRelay2" or
      r["_measurement"] == "ContRelay1" or
      r["_measurement"] == "Fan1" or
      r["_measurement"] == "Fan2" or
      r["_measurement"] == "OverFan1" or
      r["_measurement"] == "OverFan2" or
      r["_measurement"] == "Temp" or
      r["_measurement"] == "ActRelay11" or
      r["_measurement"] == "ActRelay1"
    )
  |> filter(fn: (r) => r["_field"] == "value")
  |> limit(n:1, offset: 0)  // Show only 1 row per query
  |> yield(name: "last")

2. Use in for Cleaner Measurement Filtering
Instead of many or conditions, use contains() with an array for better readability:

text
measurementList = [
  "ActRelay1", "ActRelay2", "ConRelay1", "ConRelay2",
  "ContRelay1", "Fan1", "Fan2", "OverFan1", "OverFan2",
  "Temp", "ActRelay11", "ActRelay1"
]

from(bucket: "BAACTW02")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => contains(value: r["_measurement"], set: measurementList))
  |> filter(fn: (r) => r["_field"] == "value")
  |> limit(n:10, offset: 0)  // Show only 1 row per query
  //|> group(columns: ["_measurement"])
  //|> last()
  |> yield(name: "last")


 measurementList = ["Fan1", "Fan2", "Temp"]
from(bucket: "BAACTW02")
  |> range(start: -1m, stop: now())
  |> filter(fn: (r) => contains(value: r["_measurement"], set: measurementList))
  |> filter(fn: (r) => r["_field"] == "value")
  |> limit(n:1, offset: 0)  // Show only 1 row per query
  |> yield(name: "last") 

สรุปภาษาไทย
โค้ดนี้ดึงข้อมูลล่าสุดภายใน 1 นาที จาก measurement ที่ต้องการ

ถ้าต้องการข้อมูลล่าสุดของแต่ละ measurement ให้ใช้ group และ last

สามารถใช้ contains เพื่อให้โค้ดอ่านง่ายขึ้น

หากต้องการให้ปรับแต่งเพิ่มเติมหรือมีคำถามอื่น ๆ แจ้งได้เลยครับ! 😊
 * 
 */
 /*
    // BAACTW02
    // BAACTW03
    // BAACTW04
    // BAACTW05
    from(bucket: "BAACTW02")
      //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
      |> range(start: -30s, stop: now())
      |> filter(fn: (r) => r["_measurement"] == "ActRelay1" 
        or r["_measurement"] == "ActRelay2" 
        or r["_measurement"] == "ContRelay1" 
        or r["_measurement"] == "ContRelay2" 
        or r["_measurement"] == "Fan1" 
        or r["_measurement"] == "Fan2" 
        or r["_measurement"] == "OverFan1" 
        or r["_measurement"] == "OverFan2" 
        or r["_measurement"] == "temperature")
      |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
      |> limit(n:1, offset: 0)
      |> yield(name: "last")
  */
  /*
        
        measurementList = [
          "ActRelay1", "ActRelay2", "ContRelay1", "ContRelay2",
          "Fan1", "Fan2", "OverFan1", "OverFan2", "temperature"
        ]
        from(bucket: "BAACTW02")
          |> range(start: -30s, stop: now())
          |> filter(fn: (r) => contains(value: r["_measurement"], set: measurementList))
          |> filter(fn: (r) => r["_field"] == "value")
          |> group(columns: ["_measurement"])
          |> limit(n:1, offset: 0)
          |> yield(name: "last")


          // BAACTW02
          // BAACTW03
          // BAACTW04
          // BAACTW05
          from(bucket: "BAACTW02")
            //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
            |> range(start: -30s, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "ActRelay1" 
              or r["_measurement"] == "ActRelay2" 
              or r["_measurement"] == "ContRelay1" 
              or r["_measurement"] == "ContRelay2" 
              or r["_measurement"] == "Fan1" 
              or r["_measurement"] == "Fan2" 
              or r["_measurement"] == "OverFan1" 
              or r["_measurement"] == "OverFan2" 
              or r["_measurement"] == "temperature")
            |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
            |> limit(n:1, offset: 0)
            |> yield(name: "last")

    http://localhost:3003/v1/iot/sensers?bucket=BAACTW02&field=value&start=-5s&stop=now()&measurement=temperature&windowPeriod=15s&limit=1&offset=0&mean=last

    http://localhost:3003/v1/iot/sensercharts?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=15m&limit=200&offset=0&mean=last

    http://localhost:3003/v1/iot/senserchart?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=1m&limit=10&offset=0&mean=last

    http://localhost:3003/v1/iot/getsenserchart?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=1m&limit=10&offset=0&mean=last



 
     BAACTW02,32.6,1,1,1,1,0,0,0,1
     serialNumber=> "BAACTW01",
     Temperature=> "27.64",
     ControlRelay1=> "0",
     ActRelay1=> "0",
     Fan1=> "1",
     OverFan1=> "0",
     ControlRelay2=> "1",
     ActRelay2=> "0",
     Fan2=> "0",
     OverFan2=> "0"


{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}
{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"fan1","4":"overFan1","5":"contRelay2","6":"actRelay2","7":"fan2","8":"overFan2"}


  */

```