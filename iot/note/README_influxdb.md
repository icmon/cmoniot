# Easy IoT data infrastructure setup via docker

Based on https://github.com/iothon/docker-compose-mqtt-influxdb-grafana and https://lucassardois.medium.com/handling-iot-data-with-mqtt-telegraf-influxdb-and-grafana-5a431480217

This docker compose installs and sets up:
- [Eclipse Mosquitto](https://mosquitto.org) - An open source MQTT broker to collect your data via MQTT protocol
- [InfluxDB](https://www.influxdata.com/) - The Time Series Data Platform to store your data in time series database 
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) - The open source server agent to connect Mosquitto and InfluxDB together
- [Grafana](https://grafana.com/) - The open observability platform to draw some graphs and more

# Setup process
## Install docker

 ```shell
sudo apt install docker.io
sudo apt install docker-compose 
```

 ```shell
sudo usermod -aG docker iothon
```

## Clone this repository

 ```shell
git clone https://github.com/Miceuz/docker-compose-mosquitto-influxdb-telegraf-grafana.git
```

## Run it

To download, setup and start all the services run
 ```shell
cd docker-compose-mosquitto-influxdb-telegraf-grafana
sudo docker-compose up -d
```

To check the running setvices run
 ```shell
sudo docker ps
```

To shutdown the whole thing run
```
sudo docker-compose down
 ```SHELL

## Test your setup

Post some messages into your Mosquitto so you'll be able to see some data in Grafana already: 
```
sudo docker container exec mosquitto mosquitto_pub -t 'paper_wifi/test/' -m '{"humidity":21, "temperature":21, "battery_voltage_mv":3000}'
 ```SHELL

### Grafana
Open in your browser: 
`http://<your-server-ip>:3000`

Username and pasword are admin:admin. You should see a graph of the data you have entered with the `mosquitto_pub` command.

### InfluxDB
You can poke around your InfluxDB setup here:
`http://<your-server-ip>:8086`
Username and password are user:password1234

# Configuration 
### Mosquitto 
Mosquitto is configured to allow anonymous connections and posting of messages
 ```shell
listener 1883
allow_anonymous true
```

### InfluxDB 
The configuration is fully in `docker-compose.yml`. Note the `DOCKER_INFLUXDB_INIT_ADMIN_TOKEN` - you can run a test with the one given, but you better re-generate it for your own security. This same token is repeated in several other config files, you have to update it there also. I did not find an easy way to generate it automagically in docker yet. **Change it before you go live**. You have been warned. Also change the username and password.
 ```shell
  influxdb:
    image: influxdb
    container_name: influxdb
    restart: always
    ports:
      - "8086:8086"
    networks:
      - iot
    volumes:
      - influxdb-data:/var/lib/influxdb2
      - influxdb-config:/etc/influxdb2
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=user
      - DOCKER_INFLUXDB_INIT_PASSWORD=password1234
      - DOCKER_INFLUXDB_INIT_ORG=some_org
      - DOCKER_INFLUXDB_INIT_BUCKET=some_data
      - DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w==

```

### Telegraf 
Telegraf is responsible for piping mqtt messages to influxdb. It is set up to listen for topic `paper_wifi/test`. You can alter this configuration according to your needs, check the official documentation on how to do that. Note the InfluxDB token you have to update.
 ```shell
[[inputs.mqtt_consumer]]
  servers = ["tcp://mosquitto:1883"]
  topics = [
    "paper_wifi/test/#"
  ]
  data_format = "json"

[[outputs.influxdb_v2]]
  urls = ["http://influxdb:8086"]
  token = "4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w=="
  organization = "some_org"
  bucket = "some_data"

```

### Grafana data source 
Grafana is provisioned with a default data source pointing to the InfluxDB instance installed in this same compose. The configuration file is `grafana-provisioning/datasources/automatic.yml`. Note the InfluxDB token you have to update. 
 ```shell
apiVersion: 1

datasources:
  - name: InfluxDB_v2_Flux
    type: influxdb
    access: proxy
    url: http://influxdb:8086
    jsonData:
      version: Flux
      organization: some_org
      defaultBucket: some_data
      tlsSkipVerify: true
    secureJsonData:
      token: 4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w==




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


from(bucket: "BAACTW03")                                                                                                                                                                     
  |> range(start: -8m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "temperature")
  |> filter(fn: (r) => r["_field"] == "value")                                                                                                                                               
  |> limit(n:1500, offset: 0)
  |> yield(name: "last")








1	1	1	Temperature	Cmon-2025-03-19-01-C66	1	32	30	35	30.5	36000	36000	1	35	30	Cmon-01-SP09	kongnakorn	0	°C	22	12421111	0	0	BAACTW24/DATA	BAACTW24/CONTROL	temperature	1	0	cmon_org	BAACTW24	2025-06-27 17:10:38.670032	2025-06-27 17:10:38.670032	1
1	1	1	Fan1	Cmon-2025-03-19-01-C67	1	32	30	35	30.5	36000	36000	1	35	30	Cmon-01-SP09	kongnakorn	0	°C	22	12421111	0	0	BAACTW24/DATA	BAACTW24/CONTROL	fan1	1	0	cmon_org	BAACTW26	2025-06-27 17:10:46.312453	2025-06-27 17:10:46.312453	1
1	1	1	Fan2	Cmon-2025-03-19-01-C68	1	32	30	35	30.5	36000	36000	1	35	30	Cmon-01-SP09	kongnakorn	0	°C	22	12421111	0	0	BAACTW24/DATA	BAACTW24/CONTROL	fan2	1	0	cmon_org	BAACTW24	2025-06-27 17:10:54.319645	2025-06-27 17:10:54.319645	1


from(bucket: "BAACTW02")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "temperature" or r["_measurement"] == "OverFan2" or r["_measurement"] == "OverFan1" or r["_measurement"] == "Fan2" or r["_measurement"] == "Fan1" or r["_measurement"] == "ContRelay2" or r["_measurement"] == "ContRelay1" or r["_measurement"] == "ActRelay2" or r["_measurement"] == "ActRelay1")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")


from(bucket: "AIR1")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "ActRelay1" or r["_measurement"] == "ActRelay2" or r["_measurement"] == "ActRelay3" or r["_measurement"] == "ContRelay1" or r["_measurement"] == "ContRelay2" or r["_measurement"] == "ContRelay3" or r["_measurement"] == "IO1" or r["_measurement"] == "IO2" or r["_measurement"] == "IO3" or r["_measurement"] == "temperature" or r["_measurement"] == "OverIO3" or r["_measurement"] == "OverIO2" or r["_measurement"] == "OverIO1")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")



from(bucket: "AIR2")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "temperature" 
  or r["_measurement"] == "OverIO3" or r["_measurement"] == "OverIO2" or r["_measurement"] == "OverIO1" 
  or r["_measurement"] == "IO3" or r["_measurement"] == "IO2" or r["_measurement"] == "IO1" 
  or r["_measurement"] == "ActRelay1" or r["_measurement"] == "ActRelay2" or r["_measurement"] == "ActRelay3"
  or r["_measurement"] == "ContRelay1" or r["_measurement"] == "ContRelay2" or r["_measurement"] == "ContRelay3")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")


{"timestamp":"2025-08-08 15:29:43","temperature":32.69,"contRelay1":1,"actRelay1":0,"IO1":0,"overIO1":1,"contRelay2":1,"actRelay2":1,"IO2":0,"overIO2":1,"contRelay3":0,"actRelay3":0,"IO3":1,"overIO3":0,"deviceId":"AIR1/DATA"}

{
    "bucket": "AIR1",
    "temperature": "32.04",
    "contRelay1": "1",
    "actRelay1": "1",
    "IO1": "0",
    "overIO1": "1",
    "contRelay2": "1",
    "actRelay2": "0",
    "IO2": "1",
    "overIO2": "0",
    "contRelay3": "1",
    "actRelay3": "1",
    "IO3": "0",
    "overIO3": "1"
}


// แยกข้อมูล
var parts = msg.payload.split(',');
var address = parts[0].trim();
var value = parseInt(parts[7]);
// สร้าง payload สำหรับ InfluxDB
msg.payload = value
return msg;

/**
SN:AIR02
***********
temperature 
ContRelay1
ActRelay1
IO1
OverIO1
***********
ContRelay2
ActRelay2
IO2
OverIO2
***********

/*
    AIR2/DATA
    SN:AIR02 
    temperature 
    ContRelay1
    ActRelay1
    IO1
    OverIO1 
    ContRelay2
    ActRelay2
    IO2
    OverIO2 
    humidity  
    sensor 
*/

humidity  sensor 
 */

 {
backendcmon      |       device_id: 103,
backendcmon      |       mqtt_id: 49,                                                                                                                                                                                   
backendcmon      |       setting_id: 1,
backendcmon      |       type_id: 6,
backendcmon      |       device_name: 'IO3',
backendcmon      |       sn: 'A1400068',
backendcmon      |       hardware_id: 1,
backendcmon      |       status_warning: '32',
backendcmon      |       recovery_warning: '1',
backendcmon      |       status_alert: '35',
backendcmon      |       recovery_alert: '25',
backendcmon      |       time_life: 3600,                                                                                                                                                                               
backendcmon      |       period: '35',
backendcmon      |       work_status: 1,
backendcmon      |       max: '35',                                                                                                                                                                                     
backendcmon      |       min: '25',
backendcmon      |       oid: '1',
backendcmon      |       mqtt_data_value: 'AIR2/DATA',                                                                                                                                                                  
backendcmon      |       mqtt_data_control: 'AIR2/CONTROL',
backendcmon      |       model: 'cmon',
backendcmon      |       vendor: 'cmon',                                                                                                                                                                                
backendcmon      |       comparevalue: '1',
backendcmon      |       createddate: 2025-08-08T00:27:21.663Z,
backendcmon      |       updateddate: 2025-08-08T08:25:20.000Z,                                                                                                                                                         
backendcmon      |       status: 1,
backendcmon      |       unit: '°C',
backendcmon      |       action_id: 1,
backendcmon      |       status_alert_id: 1,                                                                                                                                                                            
backendcmon      |       measurement: 'IO3',
backendcmon      |       mqtt_control_on: '5',
backendcmon      |       mqtt_control_off: '4',                                                                                                                                                                         
backendcmon      |       device_org: 'cmon_org',
backendcmon      |       device_bucket: 'AIR2',
backendcmon      |       type_name: 'Device IO Air3',                                                                                                                                                                   
backendcmon      |       location_name: 'ธกส ระบบแอร์',
backendcmon      |       configdata: '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}',                                                                                                                                                                                         
backendcmon      |       mqtt_name: 'อาคาร 1 ชั้น 2 ระบบแอร์',
backendcmon      |       mqtt_org: 'cmon_org',
backendcmon      |       mqtt_bucket: 'AIR2',
backendcmon      |       mqtt_envavorment: 'measurement',
backendcmon      |       mqtt_host: '192.168.1.59',
backendcmon      |       mqtt_port: 8086,                                                                                                                                                                               
backendcmon      |       mqtt_device_name: 'IO3',
backendcmon      |       mqtt_status_over_name: 'overIO3',                                                                                                                                                              
backendcmon      |       mqtt_status_data_name: '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}',                                                                                                                                                                              
backendcmon      |       mqtt_act_relay_name: 'actRelay3',
backendcmon      |       mqtt_control_relay_name: 'contRelay3'                                                                                                                                                          
backendcmon      |     }
backendcmon      |   ]
backendcmon      | }
backendcmon      | keycache 1feee45b2e4fd79e28973c783023a202
backendcmon      | Requesting data from topic: AIR2/DATA                                                                                                                                                                
backendcmon      | Requesting data from keycache: da3fd7f843d1377aa920ca4f437afb9c
backendcmon      | (node:31) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.
backendcmon      | keycache da3fd7f843d1377aa920ca4f437afb9c
backendcmon      | getcache resultcache null



```

### Grafana dashboard
Default Grafana dashboard is also set up in this directory: `grafana-provisioning/dashboards`

