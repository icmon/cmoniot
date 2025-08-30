
```bash
# https://bhargavacharyb.medium.com/nestjs-5-understanding-entities-and-relationships-in-nestjs-with-typeorm-an-e-commerce-example-7cd3ee3d0174
/*
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
 # Successfully copied 84.5kB to docker.postgres:/tmp/backup_20250614.sqlcls
-  

-  docker exec -t <ชื่อคอนเทนเนอร์> pg_dump -U <ชื่อผู้ใช้> <ชื่อฐานข้อมูล> > backup.sql
-  docker exec -t my-postgres-container pg_dump -U postgres webapp_db > backup.sql

-  docker exec -t docker.postgres pg_dump -U postgres nest_cmon > backup_20250614.sql

-  นำเข้าข้อมูล: ใช้คำสั่ง docker exec เพื่อรัน psql และนำเข้าข้อมูลจากไฟล์ backup.sql.

-  bash
-  docker exec -i <ชื่อคอนเทนเนอร์> psql -U <ชื่อผู้ใช้> -d <ชื่อฐานข้อมูล> < backup.sql
-  docker exec -i docker.postgres psql -U postgres -d nest_cmon < backup.sql

-  cat backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon


-  docker exec -it docker.postgres psql -U postgres
-  DROP DATABASE nest_cmon;
-  CREATE DATABASE nest_cmon; 
-  \q
-  Get-Content backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon

---------- #####-  ####

-  Get-Content backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon


--  docker exec -t docker.postgres pg_dump -U postgres nest_cmon > backup2.sql    

icmon
icmon0955@gmail.com
Cmon@0955@#@#

```

