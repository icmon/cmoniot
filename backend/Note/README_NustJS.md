```bash

SELECT COUNT(1) AS "cnt" FROM "public"."sd_iot_alarm_device" "l" 
WHERE 1=1 
AND "l"."alarm_action_id"=1
AND "l"."device_id"=9
AND l.type_id=1
AND l.alarm_type=2
AND l.event=1
AND l.date="2025-07-31"

[
    1,
    9,
    1,
    2,
    1,
    "2025-07-31"
]


    SELECT version()                                                                                                                                                                                            SELECT * FROM current_schema()
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    START TRANSACTION
    SELECT * FROM current_schema()
    SELECT * FROM current_database()
    SELECT 1+1 AS result
    SELECT name FROM sqlite_master WHERE type='table' AND name='product_type';
    PRAGMA INDEX_LIST                                                                                                                                                          

    SELECT name FROM sqlite_master WHERE type='table' AND                                                                                                                          
    PRAGMA INDEX_LIST(`product`)
    SELECT version()                                                                                                                                                                                                  
    SELECT * FROM current_schema()
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    START TRANSACTION
    SELECT * FROM current_schema()
    SELECT * FROM current_database()

{"0":"BAACTW02","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}

```
```bash

{"0":"BAACTW02","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}

```

```bash
# https://bhargavacharyb.medium.com/nestjs-5-understanding-entities-and-relationships-in-nestjs-with-typeorm-an-e-commerce-example-7cd3ee3d0174
/*
# https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
# npm i date-fns-tz
const date = new Date('2014-10-25T10:46:20Z')
tzString=Asia/Bangkok
formatInTimeZone(date, tzString, 'yyyy-MM-dd HH:mm:ssXXX') // 2014-10-25 06:46:20-04:00
formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX') // 2014-10-25 06:46:20-04:00
formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX') // 2014-10-25 06:46:20-04:00
formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss zzz') // 2014-10-25 06:46:20 EST
formatInTimeZone(date, 'Europe/Paris', 'yyyy-MM-dd HH:mm:ss zzz') // 2014-10-25 12:46:20 GMT+2



"temperature":29.18,
"contRelay1":1,
"actRelay1":1,
"fan1":1,
"overFan1":1,
"contRelay2":0,
"actRelay2":0,
"fan2":0,
"overFan2":0,


27.16,
1,
0,
0,
0,
1,
0,
1,
0

var sn = "AIR1";
/********/
var tTemp = flow.get("AIRTemp");
/********/
var tContRelay1 = flow.get("AIRContRelay1");
var tContRelay2 = flow.get("AIRContRelay2");
var tContRelay3 = flow.get("AIRContRelay3");
/********/
var tActRelay1 = flow.get("AIRActRelay1");
var tActRelay2 = flow.get("AIRActRelay2");
var tActRelay3 = flow.get("AIRActRelay3");
/********/
var tIO1 = flow.get("AIRIO1");
var tIO2 = flow.get("AIRIO2");
var tIO3 = flow.get("AIRIO3");
/********/
var tOverIO1 = flow.get("AIROverIO1");
var tOverIO2 = flow.get("AIROverIO2");
var tOverIO3 = flow.get("AIROverIO3");
/********/

// msg.payload = msg.payload[0];
// return msg;
// global.set('AIR02/DATA',msg.payload);
// return msg;
// --- ส่วนที่เพิ่มเข้ามาสำหรับสร้าง Timestamp ---
const now = new Date();

// ฟังก์ชันสำหรับเติมเลข 0 ข้างหน้าตัวเลขที่น้อยกว่า 10
const pad = (num) => String(num).padStart(2, '0');

// จัดรูปแบบวันที่ YYYY-MM-DD
const datePart = [
    now.getFullYear(),
    pad(now.getMonth() + 1), // getMonth() คืนค่า 0-11 เลยต้อง +1
    pad(now.getDate())
].join('-');

// จัดรูปแบบเวลา HH:MM:SS
const timePart = [
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
].join(':');

// รวมวันที่และเวลาเข้าด้วยกัน
const timestamp = datePart + ' ' + timePart;


// --- โค้ดเดิมของคุณที่ใช้ประมวลผลข้อมูล ---
const parts = msg.payload.split(',');

const dataObject = {
    // เพิ่ม timestamp เป็น field แรก
    timestamp: timestamp,

    // field ข้อมูลเดิม
  
    temperature: parseFloat(parts[1]),
    contRelay1: parseInt(parts[2]),
    actRelay1: parseInt(parts[3]),
    IO1: parseInt(parts[4]),
    overIO1: parseInt(parts[5]),

    contRelay2: parseInt(parts[6]),
    actRelay2: parseInt(parts[7]),
    IO2: parseInt(parts[8]),
    overIO2: parseInt(parts[9]),

    contRelay3: parseInt(parts[10]),
    actRelay3: parseInt(parts[11]),
    IO3: parseInt(parts[12]),
    overIO3: parseInt(parts[13]),


    deviceId: "AIR1/DATA"
};

// กำหนด object ใหม่ให้เป็น payload
msg.payload = dataObject;

// บันทึก object ที่มี timestamp แล้วลง flow context
flow.set('AIR1_DeviceData', dataObject);
if(parts[0]!=""){
  return msg;
}



{"0":"BAACTW02","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","12":"overIO3"}


msg.payload = sn + "," + tTemp + "," + tContRelay1 + "," + tActRelay1 + "," + tIO1 + "," + tOverIO1 + "," + tContRelay2 + "," + tActRelay2 + "," + tIO2 + "," + tOverIO2 + "," + tContRelay3 + "," + tActRelay3 + "," + tIO3 + "," + tOverIO3;
/********/
return msg;
/********/






var sn = "BAACTW17";
var tTemp = flow.get("BAACTW17Temp");
var tContRelay1 = flow.get("BAACTW17ContRelay1");
var tContRelay2 = flow.get("BAACTW17ContRelay2");
var tActRelay1 = flow.get("BAACTW17ActRelay1");
var tActRelay2 = flow.get("BAACTW17ActRelay2");
var tFan1 = flow.get("BAACTW17Fan1");
var tFan2 = flow.get("BAACTW17Fan2");
var tOverFan1 = flow.get("BAACTW17OverFan1");
var tOverFan2 = flow.get("BAACTW17OverFan2");


msg.payload = sn + "," + tTemp + "," + tContRelay1 + "," + tActRelay1 + "," + tFan1 + "," + tOverFan1 + "," + tContRelay2 + "," + tActRelay2 + "," + tFan2 + "," + tOverFan2;

return msg;

{"0": "BAACTW02","1": "temperature,"2": "contRelay1,"3": "actRelay1,"4": "fan1","5": "overFan1","6": "contRelay2","7": "actRelay2","8": "fan2","9": "overFan2"}






EMAIL_FROM=noreply@cmonio.com
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_ID=cmoniots@gmail.com
EMAIL_PASS=cmoniots@0955#
EMAIL_G_HOST=smtp.gmail.com
EMAIL_G_PORT=587
EMAIL_G_ID=cmoniots@gmail.com
EMAIL_G_PASS=cmoniots@0955#
GOOGLE_CLIENT_ID=cmoniots@gmail.com
*/
$ nvm ls   
$ node -v  
- v21.1.0
$ npm -v
- 10.2.0
$ npm install  
$ npm i -g @nestjs/cli
$ npm audit fix --force
$ npm fund
$ npm install --save @nestjs/typeorm typeorm pg
### 1. Create project
```bash
nvm ls  
    22.12.0
  *  21.1.0 (Currently using 64-bit executable)
    20.14.0 
    20.0.0
    18.17.1
    18.16.0
    18.15.0
    16.16.0
    16.14.0
nvm use 20.14.0  
npm i -g @nestjs/cli
nest new tasks-api
npm run start:dev


npx husky-init && npm install


npm i @nestjs/schedule -S

import { ScheduleModule } from '@nestjs/schedule';
nest g resource modules/schedule


npm i @nestjs/websockets @nestjs/platform-socket.io -S

```
### 2. Overview and delete files
### 3. Create module
# https://docs.nestjs.com/recipes/crud-generator
```bash
nest g mo tasks
nest g s tasks/services/tasks
nest g s tasks/services/tasks --flat
nest g co tasks/controllers/tasks --flat

--  modules
 
nest g mo modules/redis/redis
nest g s modules/redis
nest g co modules/redis 

nest g s modules/redis --flat
nest g co modules/redis --flat

nest g mo modules/shared
nest g s modules/shared 
nest g co modules/shared 


nest g resource modules/sduser 
nest g resource modules/iot 
nest g resource modules/apps  
nest g resource modules/project  
nest g resource modules/events  
nest g resource modules/categories  
nest g resource modules/upcommingevents  
nest g resource modules/chat  
nest g resource modules/mail  
nest g resource modules/todo  
nest g resource modules/ticket  
nest g resource modules/api-key  
nest g resource modules/timeline
nest g resource modules/monitoring
nest g resource modules/maps
nest g resource modules/settings
nest g resource modules/logs
nest g resource modules/chart
nest g resource modules/hardware
nest g resource modules/order
nest g resource modules/package
nest g resource modules/services
nest g resource modules/invoice
nest g resource modules/employee
nest g resource modules/partner
nest g resource modules/manual
nest g resource modules/team
nest g resource modules/report
nest g resource modules/account
nest g resource modules/hr
nest g resource modules/roles
nest g resource modules/sensor
nest g resource modules/accessmenu
nest g resource modules/iotalarm
nest g resource modules/calendar
nest g resource modules/geo
nest g resource modules/location
nest g resource modules/snmp
nest g resource modules/ai
nest g resource modules/task

nest g resource modules/sqlite


-


 nest g resource modules/dashboard
 nest g resource modules/nest g resource modules/updateProfile
 nest g resource modules/forgetPassword
 nest g resource modules/otpValidate
 nest g resource modules/listdata
 nest g resource modules/usertype-list
 nest g resource modules/usertype-create
 nest g resource modules/usertype-edit
 nest g resource modules/usertype-remove
 nest g resource modules/role
 nest g resource modules/role-create
 nest g resource modules/role-edit
 nest g resource modules/useraccess
 nest g resource modules/useraccess-create
 nest g resource modules/useraccess-edit
 nest g resource modules/useraccess-remove
 nest g resource modules/useraccess-satatus
 nest g resource modules/userlog
 nest g resource modules/userlog-add
 nest g resource modules/eventlog
 nest g resource modules/eventlog-add
 nest g resource modules/task-list
 nest g resource modules/task-status
 nest g resource modules/task-create
 nest g resource modules/task-edit
 nest g resource modules/task-delete
 nest g resource modules/taskcategory-list
 nest g resource modules/taskcategory-status
 nest g resource modules/taskcategory-create
 nest g resource modules/taskcategory-edit
 nest g resource modules/taskcategory-delete

 nest g resource modules/mail

 nest g resource modules/mqtt

- Entity
1. Module
2. Provider  => products.service.ts
3. Controller
   products.controller.ts  
   create-product.dto.ts
. Schema และ Entity
. schema และ entity

? What transport layer do you use? GraphQL (code first)
> ? Would you like to generate CRUD entry points? Yes
> CREATE src/users/users.module.ts (224 bytes)
> CREATE src/users/users.resolver.spec.ts (525 bytes)
> CREATE src/users/users.resolver.ts (1109 bytes)
> CREATE src/users/users.service.spec.ts (453 bytes)
> CREATE src/users/users.service.ts (625 bytes)
> CREATE src/users/dto/create-user.input.ts (195 bytes)
> CREATE src/users/dto/update-user.input.ts (281 bytes)
> CREATE src/users/entities/user.entity.ts (187 bytes)
> UPDATE src/app.module.ts (312 bytes)

  PS C:\devapp\cmon_postgres_redis_iot> nest g resource modules/iot 
  ✔ What transport layer do you use? REST API
  ✔ Would you like to generate CRUD entry points? Yes
  CREATE src/modules/iot/iot.controller.ts (862 bytes)
  CREATE src/modules/iot/iot.controller.spec.ts (546 bytes)
  CREATE src/modules/iot/iot.module.ts (233 bytes)
  CREATE src/modules/iot/iot.service.ts (593 bytes)
  CREATE src/modules/iot/iot.service.spec.ts (439 bytes)
  CREATE src/modules/iot/dto/create-iot.dto.ts (29 bytes)
  CREATE src/modules/iot/dto/update-iot.dto.ts (160 bytes)
  CREATE src/modules/iot/entities/iot.entity.ts (20 bytes)
  UPDATE src/app.module.ts (2743 bytes)
  PS C:\devapp\cmon_postgres_redis_iot> 


  nest g resource modules/dashboard 
  ? What transport layer do you use? (Use arrow keys)
  ❯ REST API
    GraphQL (code first)
    GraphQL (schema first)
    Microservice (non-HTTP)
    WebSockets

✔ What transport layer do you use? REST API
? Would you like to generate CRUD entry points? (Y/n)


nest g mo modules/shared/mail
nest g s modules/shared/mail
nest g co modules/shared/mail


  npm run start:dev
```
### 4. Check endpoint and create CRUD
```ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('api/tasks')
export class TasksControllerController {

  @Get()
  findAll() {
    return [1,2,3];
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return true;
  }

}
```
### 5. Intall DB (Docker)
```yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=nico
      - POSTGRES_PASSWORD=postgres
    ports:
      - '5432:5432'
    volumes:
      - ./postgres_data:/var/lib/postgresql
```
https://dev.to/andrewallison/docker-and-windows-1cb0

### 6. Add .gitignore /postgres_data
```bash
docker-compose up -d postgres
docker-compose exec postgres bash
psql -h localhost -d my_db -U nico
\d+
\q
```
### 7. Intall TypeOrm
```bash
npm install --save @nestjs/typeorm typeorm pg
```
### 8. App Module
```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nico',
  password: 'postgres',
  database: 'my_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  retryDelay: 3000,
  retryAttempts: 10
}),
```
### 9. Task Entity
```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;
}
```
### 10. Tasks Module
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
```
### 11 Service
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepo.find();
  }

  findOne(id: number) {
    return this.tasksRepo.findOne(id);
  }

  create(body: any) {
    const newTask = new Task();
    newTask.name = body.name;
    // const newTask = this.tasksRepo.create(body);
    return this.tasksRepo.save(newTask);
  }

  async update(id: number, body: any) {
    const task = await this.tasksRepo.findOne(id);
    this.tasksRepo.merge(task, body);
    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    await this.tasksRepo.delete(id);
    return true;
  }
}
```
### 12 Controller
```ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { TasksService } from './../services/tasks.service';

@Controller('api/tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService
  ) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }

}
```
### 13 Migrations
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "nico",
  "password": "postgres",
  "database": "my_db",
  "entities": ["src/**/*.entity.ts"],
  "synchronize": false,
  "migrationsTableName": "migrations",
  "migrations": ["src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```
### 14 Create mpm scripts
```json
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
"migrations:generate": "npm run typeorm -- migration:generate -n",
"migrations:run": "npm run typeorm -- migration:run",
"migrations:drop": "npm run typeorm -- schema:drop",
"migrations:show": "npm run typeorm -- migration:show"
```
```bash
npm run migrations:generate -- init
npm run migrations:run
```
### 15. Set entity
```ts
@CreateDateColumn({
  name: 'creation_at',
  type: 'timestamptz',
  default: () => 'CURRENT_TIMESTAMP',
})
creationAt: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
updatedAt: Date;
```
```bash
npm run migrations:generate -- change-tasks
npm run migrations:run
```
# https://medium.com/@pornmongkonp/จับ-husky-มาทำ-pre-commit-git-hooks-ให้-angular-กันนนนน-d18542019671


{
  "userName": "kongnakornna",
  "email": "kongnakornna@gmail.com",
  "password": "Na@0955@#",
  "isActive": true,
  "status": "enduser"
}

#  How to Comment in VS Code - The VSCode Comment Shortcut
```bash
  - On Windows, the shortcut is: CTRL + /
  - On Mac, the shortcut is: Command + /

  - Windows: Ctrl + /
  - Mac: Command + /
  # //
  - Windows: Shift + Alt + A
  - Mac: Shift + Option + A
  # /*  eee */

  #Comment out code (editor.action.addCommentLine):
  - Windows: Ctrl + K
  - Windows: Ctrl + K + C
  - Mac: Command + K + C

 #Un-comment code (editor.action.removeCommentLine):

  - Windows: Ctrl + K + U
  - Mac: Command + K + U


export declare enum HttpStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLYHINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    CONTENT_DIFFERENT = 210,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    UNRECOVERABLE_ERROR = 456,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508
}



     const token = req.headers.authorization.replace('Bearer ', '').trim();
     //console.log("token=>"+token) 
     let jsonString:any = this.jwtService.decode(token) as { id: string };
     //console.info("jsonString=>"+jsonString) 
     let idx = jsonString.id  
     await this.authService.checkRefreshToken(idx);
     
     var decoded: any = {};
     var decoded: any = this.jwtService.decode(token);
     var iat = decoded.iat * 1000;
     var exp = decoded.exp * 1000;
     var d1 = new Date(iat);
     var d2 = new Date(exp);
     var EXPIRE_TIME= Number(exp-iat);
     var TokenDate: any = { 
           //signin: iat,
           //expires: exp,  
           //EXPIRE_TIME: EXPIRE_TIME,  
           EXPIRE_TOKEN: process.env.EXPIRE_TOKEN,
           signin_date: format.timeConvertermas(d1),
           expires_date: format.timeConvertermas(d2),
           token:jwt,
     };




CREATE entity typeorm Nustjs


nest modules account typeorm crud and database postgres



npm install nestjs-paginate



```
#  TypeOrmModule
```bash

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'postgresConnection',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_pg_user',
      password: 'your_pg_pass',
      database: 'your_pg_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'sqliteConnection',
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}


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


*/

