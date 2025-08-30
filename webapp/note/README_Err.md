# Cmon Fomntend

Simple, lightweight and useful **LAMP & LEMP** stacks to use on Docker via Docker Compose. With **PostgreSQL, MongoDB, Redis, RabbitMQ, PhpMyAdmin, PGAdmin and Mongo-Express.** You can generate your environment in whatever way you desire.

| Service | Container Name   | Default Ports | Version | Description |
|---------------|------------------|---------------|---------------|----------------------------------|
| Apache Server | demet-apache | 80 / 443  | 2.4:alpine | Apache Web Server |
| Nginx Server  | demet-nginx  | 80 / 443  | stable:alpine | Nginx Web Server |
| PHP | demet-php  | 9000 | 8.1 - 8.2 - 8.3 | PHP-FPM Versions (Default: 8.3) |
| MySQL   | demet-mysql  | 3306 | 8.0 | MySQL 8.0 |
| MariaDb   | demet-mysql  | 3306 | 10.6 | MariaDb 10.6 |
| PhpMyAdmin | demet-phpmyadmin | 8080 | latest  | MySQL Web UI   |
| PostgreSQL | demet-pgsql  | 5432 | 12.0 | PostgreSQL 12.0. |
| PGAdmin | demet-pgadmin | 8081 | 8  | PostgreSQL Web UI (dpage/pgadmin4)   |
| MongoDB | demet-mongodb | 27017   | 7  | NoSQL database   |
| Mongo-Express | demet-mongoadmin | 8082 | latest  | MongoDB Web UI   |
| Redis   | demet-redis  | 6379 | 7.2 | Redis Database   |
| RabbitMQ  | demet-rabbitmq   | 5672 / 15672  | 3-management-alpine  | RabbitMQ Message Queue |

You can change the image versions of the containers via `.env` file.

Default docker-compose file includes **PHP 8.3, Apache, MariaDB and PhpMyAdmin** containers.

Also, host names of all services are demet-`<HOST>`. For example, host name of `demet-mysql` container is `mysql`.

You can change the prefix of the container names in `.env` file by changing the `DEMET_PREFIX` value. For example; if you change the prefix as `local`, your container names will be `local-php`, `local-mysql`, etc...

## usage
Clone this repo by using following command:
```bash
git clone https://github.com/izniburak/demet.git && cd demet
```
Now, you must create **.env file** to specify port configuration for the containers you selected. In order to generate **.env file**, you can run following command simply:
```bash
make init
```
Great! **.env** and **docker-compose.yml** files have been generated.
If you want to change default ports or configuration,
you can edit **.env** file.

Then, configure and generate your docker-compose.yml file as you want.

**NOTE:** If you want to use default stack (PHP & Apache & MariaDB) skip the following step.
```bash
make generate
```

Now, You're ready to build the containers you selected.
In order to build the containers, you can use following command:
```bash
make build
```
If everything is okay, you can start to use **Demet!**
Let's go to http://localhost .

If you want to enter to PHP container, you can use this command simply instead of `docker exec` command:
```bash
make webserver
```

That's all! Happy coding!

## Notes
- Your project files must be in `./public/` directory.

- You can change `php.ini` settings by editting files in `./docker/php<VERSION>/conf/` directory.

- If you need new extension for PHP, you can update `./docker/php<VERSION>/Dockerfile` file and add a new extension you want.

- You can find configuration files of Webserver which you used in `./docker/apache/` or `./docker/nginx/` directory.

- You can find configuration files of other containers in `./docker/` directory as well.

- **Composer, XDebug and OPCache** are included for PHP. You can use these directly.

- If you want to enter to spesific container, you can use this command:
```bash
make run c=<container-name>
```

- You can check the List of the containers for your setup:
```bash
make ps
```

- You can use following commands simply in order to `up` or `down` docker-compose instead of `docker-compose up|down`.

for UP your containers
```bash
make up
```
for DOWN your containers:
```bash
make down
```

- If you need to restart all container, you can use this command:
```bash
make restart
```

- You can access to container logs from `./logs/` directory.

- You can use following command to clean & delete your **docker-compose** and **.env** files
```
$ make clean
```

- If you have any spesific problem, you can open a new issue on the Github. Because, some version of the docker images couldn't be work correctly depends on the your OS or system arch. For example; to use MySQL 8.x version on Arm based processors, you might need to add `platform: linux/arm64` config in section of the MySQL service at the `docker-compose.yml` file. Because, sometimes it can throw an error when try to use it directly.
**In summary**, you can try to solve the image/container issues, you can research the solution about them, and maybe you can add the issue with the solutions or open a new PR to fix them.


*I try to keep up-to-date the this tool. Please make sure the new changes before update your local clone via `git pull`. Because some changes might cause some conficts.*


# php codeigniter 3 load หน้า ช้าแก้อย่างไรได้บ้าง
 ```shell
How can I implement async requests in CodeIgniter 3 using PHP?

 public function call_api_with_token($url,$token){ 
  $ch = curl_init($url);
  $headers = [
  'Content-Type: application/json',
  'Authorization: Bearer ' . $token
  ];
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTPS, if needed
  $response = curl_exec($ch);
  curl_close($ch);
  $data = json_decode($response, true);
  //echo '<pre> data=>'; print_r($data); echo '</pre>';  
  return $data;
 }

 เพิ่มรูปแบบ ให้มี php codeigniter 3  async cache 
How does setting output cache to 30 seconds affect user experience in CI3

 $this->output->cache(1); 
 $this->output->delete_cache();

 public function index()
 {
  // 1. Load the Caching Driver
  $this->load->driver('cache', ['adapter' => 'file']);

  // 2. Define a unique key for this piece of content
  $cache_key = 'welcome_page_content';

  // 3. Try to get the content from the cache
  if ( ! $page_content = $this->cache->get($cache_key))
  {
  // If it's not in the cache, generate it now
  log_message('debug', 'Generating content, not found in cache.');
  
  // This can be the result of a database query, an API call,
  // or a rendered view fragment.
  $data_to_view['timestamp'] = date('Y-m-d H:i:s');
  $page_content = $this->load->view('content_fragment', $data_to_view, TRUE);

  // 4. Save the newly generated content to the cache for 30 seconds
  $this->cache->save($cache_key, $page_content, 30);
  }

  // 5. Load the main view and display the content
  $this->load->view('main_template', ['page_content' => $page_content]);
 }


  /********Api**********/
  /********Device**********/ 
  /********Email**********/
  /********Host**********/ 
  /********Influxdb**********/ 
  /********Line**********/ 
  /********Nodered**********/  
  /********Schedule**********/
  /********Sms**********/  
  /********Token**********/   

  /********ApiDto**********/
  /********DeviceDto**********/ 
  /********EmailDto**********/
  /********HostDto**********/ 
  /********InfluxdbDto**********/ 
  /******************/ 
  /********NoderedDto**********/  
  /********SchedulDto**********/
  /********SmsDto**********/  
  /********TokenDto**********/   

import { UpdateSettingDto } from './dto/update-setting.dto';

 import { ApiDto } from '@src/modules/settings/dto/create_api.dto';
 import { DeviceDto } from '@src/modules/settings/dto/create_device.dto';
 import { EmailDto } from '@src/modules/settings/dto/create_email.dto';
 import { HostDto } from '@src/modules/settings/dto/create_host.dto';
 import { InfluxdbDto } from '@src/modules/settings/dto/create_influxdb.dto';
 import { LineDto } from '@src/modules/settings/dto/create_line.dto';
import { NoderedDto } from '@src/modules/settings/dto/create_modered.dto';
import { SchedulDto } from '@src/modules/settings/dto/create_schedule.dto';
import { SmsDto } from '@src/modules/settings/dto/create_sms.dto';
import { TokenDto } from '@src/modules/settings/dto/create_token.dto';



  @HttpCode(201)
  @Post('createline')
  async create_line(
 @Res() res: Response,
 //@Body() dto: any,
 @Body(new ValidationPipe()) DataDto: LineDto,
 @Query() query: any,
 @Headers() headers: any,
 @Param() params: any,
 @Req() req: any,
  ): Promise<string> { 
 if (!DataDto) {
  res.status(200).json({
  statusCode: 200,
  code: 422,
  payload: null,
  message: 'Data is null.',
  message_th: 'ไม่พบข้อมูล.',
  });
  return;
 }   
 const Rs: any = await this.settingsService.get_name_create_line(DataDto.influxdb_name);
 if (Rs) {
  console.log('influxdb_name=>' + DataDto.influxdb_name); 
  res.status(200).json({
 statusCode: 200,
 code: 422,
 payload: {  influxdb_name: DataDto.influxdb_name },
 message: 'The influxdb_name  duplicate this data cannot create.',
 message_th: 'ข้อมูล influxdb_name '+DataDto.influxdb_name+' ซ้ำไม่สามารถเพิ่มได้.',
  });
  return;
  //throw new UnprocessableEntityException();
 }   
 await this.settingsService.create_line(DataDto); 
  res.status(200).json({
  statusCode: 200,
  code: 200,
  payload: DataDto,
  message: 'Create Data successfully..',
  message_th: 'เพิ่มข้อมูลสำเร็จ..',
  });
  return;
  }


system
Na@0955@#

 ```

 A PHP Error was encountered
Severity: Warning

Message: Undefined array key "code"

Filename: MX/Loader.php(365) : eval()'d code

Line Number: 12

Backtrace:

File: /var/www/html/application/third_party/MX/Loader.php(365) : eval()'d code
Line: 12
Function: _error_handler

File: /var/www/html/application/third_party/MX/Loader.php
Line: 365
Function: eval

File: /var/www/html/application/third_party/MX/Loader.php
Line: 310
Function: _ci_load

File: /var/www/html/application/third_party/MX/Loader.php(365) : eval()'d code
Line: 38
Function: view

File: /var/www/html/application/third_party/MX/Loader.php
Line: 365
Function: eval

File: /var/www/html/application/third_party/MX/Loader.php
Line: 310
Function: _ci_load

File: /var/www/html/application/third_party/MX/Loader.php(365) : eval()'d code
Line: 11
Function: view

File: /var/www/html/application/third_party/MX/Loader.php
Line: 365
Function: eval

File: /var/www/html/application/third_party/MX/Loader.php
Line: 310
Function: _ci_load

File: /var/www/html/application/third_party/MX/Loader.php(365) : eval()'d code
Line: 57
Function: view

File: /var/www/html/application/third_party/MX/Loader.php
Line: 365
Function: eval

File: /var/www/html/application/third_party/MX/Loader.php
Line: 310
Function: _ci_load

File: /var/www/html/application/modules/dashboard/controllers/Dashboard.php
Line: 19
Function: view

File: /var/www/html/index.php
Line: 315
Function: require_once

Error: Could not retrieve initial data from API.


# #########################
SELECT COUNT(DISTINCT "d"."device_id") AS "cnt" 
FROM   "public"."sd_iot_device" "d"
 LEFT JOIN "public"."sd_iot_setting" "st"
  ON "st"."setting_id" = "d"."setting_id"
 LEFT JOIN "public"."sd_iot_device_type" "t"
  ON "t"."type_id" = "d"."type_id"
 LEFT JOIN "public"."sd_iot_mqtt" "mq"
  ON "mq"."mqtt_id" = "d"."mqtt_id"
 LEFT JOIN "public"."sd_iot_location" "l"
  ON "l"."location_id" = "d"."location_id"
WHERE  1 = 1
 AND "d"."status" = '1'
 AND "mq"."status" = '1'
 AND "d"."bucket" = 'AIR1'
# #########################
SELECT "d"."device_id" AS device_id,
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
 "d"."period"  AS period,
 "d"."work_status" AS work_status,
 "d"."max" AS max,
 "d"."min" AS min,
 "d"."oid" AS oid,
 "d"."mqtt_data_value"   AS mqtt_data_value,
 "d"."mqtt_data_control" AS mqtt_data_control,
 "d"."model" AS model,
 "d"."vendor" AS vendor,
 "d"."comparevalue" AS comparevalue,
 "d"."createddate" AS createddate,
 "d"."updateddate" AS updateddate,
 "d"."status" AS status,
 "d"."unit"  AS unit,
 "d"."action_id" AS action_id,
 "d"."status_alert_id"  AS status_alert_id,
 "d"."measurement" AS measurement,
 "d"."mqtt_control_on"   AS mqtt_control_on,
 "d"."mqtt_control_off"  AS mqtt_control_off,
 "d"."org" AS device_org,
 "d"."bucket" AS device_bucket,
 "t"."type_name" AS type_name,
 "l"."location_name"  AS location_name,
 "l"."configdata" AS configdata,
 "mq"."mqtt_name" AS mqtt_name,
 "mq"."org"  AS mqtt_org,
 "mq"."bucket" AS mqtt_bucket,
 "mq"."envavorment" AS mqtt_envavorment,
 "mq"."host" AS mqtt_host,
 "mq"."port" AS mqtt_port,
 "d"."mqtt_device_name"  AS mqtt_device_name,
 "d"."mqtt_status_over_name"   AS mqtt_status_over_name,
 "d"."mqtt_status_data_name"   AS mqtt_status_data_name,
 "d"."mqtt_act_relay_name" AS mqtt_act_relay_name,
 "d"."mqtt_control_relay_name" AS mqtt_control_relay_name
FROM   "public"."sd_iot_device" "d"
 LEFT JOIN "public"."sd_iot_setting" "st"
  ON "st"."setting_id" = "d"."setting_id"
 LEFT JOIN "public"."sd_iot_device_type" "t"
  ON "t"."type_id" = "d"."type_id"
 LEFT JOIN "public"."sd_iot_mqtt" "mq"
  ON "mq"."mqtt_id" = "d"."mqtt_id"
 LEFT JOIN "public"."sd_iot_location" "l"
  ON "l"."location_id" = "d"."location_id"
WHERE  1 = 1
 AND "d"."status" = '1'
 AND "mq"."status" = '1'
 AND "d"."bucket" = 'AIR1'
# #########################