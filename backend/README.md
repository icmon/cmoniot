2. cd backend
# docker-compose down app
# sudo chmod -R 777 /home/cmon/appcmon
# docker-compose up --build -d app 
# docker-compose down app
# docker-compose up app
# docker-compose up --build -d app  
# docker-compose up --build -d postgres  
# docker-compose down postgres
# docker-compose up --build -d redis  
# docker-compose up --build -d pgadmin  
# docker-compose up --build -d redis-commander  
# docker-compose up 
# docker-compose up postgres
# docker-compose up redis
# docker-compose up pgadmin
# docker-compose up redis-commander
# docker ps  


```bash

backendcmon  | [Nest] 30  - 08/25/2025, 11:05:04 PM   ERROR [MailerService] Transporter is ready
backendcmon  | [Nest] 30  - 08/25/2025, 11:05:04 PM   ERROR [MailerService] Transporter is ready

docker version
docker-compose version 
docker ps -a -s
-----------
sudo chmod -R 777 /home/cmon/appcmon
sudo chmod -R 777 /home/cmon/appcmon/backend
sudo chown -R 999:999 /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chown -R $(id -u):$(id -g) /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chmod -R 777 /home/cmon/appcmon/backend/docker/postgres/dbdata
-------------
sudo chmod -R 777 /home/cmon/appcmon
clear
docker compose down app
docker compose up --build app
docker compose up 
docker ps -a
-----------
# Stop the container (replace <container_id_or_name>)
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker stop c386d7d114f2
-----------
# Remove the container
docker rm my_container
-----------
docker rm c386d7d114f2
-----------
# List images to find the ID/name
docker images
-----------
# Remove the image (replace <image_id_or_name>)
docker rmi my_image:latest
docker rmi xxx
----------- 
docker kill
-----------
docker kill my_container
docker kill --signal=SIGHUP  my_container
docker kill --signal=SIGHUP my_container
docker kill --signal=HUP my_container
docker kill --signal=1 my_container
-----------
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker ps -a
-----------
docker stop 75a191f30c73
-----------
# Remove the container
docker rm my_container
-----------
docker rm 75a191f30c73
-----------
docker rmi nginx:alpine  
-----------

```
cminiotapp
icmon0955@gmail.com
ccwa ijti eouj bojk

U:icmon0955@gmail.com P:ccwaijtieoujbojk


    MailerModule.forRoot({ 
        // transport: {
        //             host: "172.29.16.52",
        //             port: 587,
        //             secure: false,
        //             auth: {
        //               user: "strux.ware",
        //               pass: 'baac@123',
        //             },
        //             tls: {
        //                 rejectUnauthorized: false
        //             }
        //           },
        //         defaults: {
        //           from: '"No Reply" <IoTcmon>',
        //         },
        

        //  zip -r postgres_db.zip  postgres
        
        transport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for port 465, false for port 587
                auth: {
                  user: 'icmon0955@gmail.com',
                  pass: 'ccwaijtieoujbojk',
                },
                tls: {
                    rejectUnauthorized: false
                } 

        },
        defaults: {
                from: '"No Reply" <cmoniots@gmail.com>',
        },
          // template: {
          //   dir: join(__dirname, 'templates'),
          //   adapter: new HandlebarsAdapter(),
          //   options: { strict: true },
          // },
     }),
  ], 
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This template serves as a boiler plate for nestjs application with authentication feature with postgres using typeorm.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
# 
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
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

  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/src/main",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "lint": "eslint ./src -c .eslintrc.json --max-warnings=0",
    "lint:fix": "eslint ./src -c .eslintrc.json --fix",
    "typeorm": "typeorm-ts-node-commonjs -d src/config/db/orm.config.ts",
    "migration:run": "npm run typeorm migration:run",
    "migration:revert": "npm run typeorm migration:revert",
    "migration:generate": "npm run typeorm migration:generate ./migrations/$npm_config_key",
    "migration:create": "typeorm migration:create ./migrations/$npm_config_key",
    "migration:show": "npm run typeorm migration:show",
    "prepare": "husky install",
    "heroku-postbuild": "npm run build --only=dev"
  },
  
- .env
API_URL=http://localhost:3003
HOST=localhost
PORT=3003
SECRET_KEY=Na@0955##
APP_SECRET=Na@0988
DATABASE_HOST=localhost
DATABASE_NAME=nest_cmon
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
DATABASE_PORT=5432 
RUN_MIGRATIONS=true
RUN_MIGRATIONS=true
MODE=DEV

{
  "userName": "kongnakornna",
  "email": "kongnakornna@gmail.com",
  "password": "Na@0955",
  "isActive": true,
  "status": "supervisor",
  "lastLogin": null
}
```
## Database
```bash
  - postgres
  - Sqllite
  - redis cache
  - InfluxDB
  - MongoDB

``

## Running the app

Before running the npm commands, please make sure you have the Node and npm versions described in package.json

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- node v v22.12.0
- npm -v  10.9.0
## Dockerfile

```bash
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3004

CMD ["npm", "run", "start:prod"]

```
## docker-compose.yml
```bash
version: '3'
services:
  nestjs-app:
    build: .
    ports:
      - "3004:3000"
    environment:
      - NODE_ENV=production


```

## Test

```bash
# unit tests
$ npm run test:e2e

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
 
$  npm run lint
$  npm run format


```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Deployment

This application is also deployed on [vercel](https://nestjs-jwt-auth-postgres-type-jmeslp9d4.vercel.app/api)

## Stay in touch

- Author - [Bilal ur Rehman](https://github.com/BilalurRehman-27)
- LinkedIn - [BilalurRehman](https://www.linkedin.com/in/bilal-ur-rehman/)

## License

Nest is [MIT licensed](LICENSE).

# http://localhost:3003

```bash

UPDATE "public"."user" SET "isActive" = '1',email='kongnakornna@gmail.com' WHERE "id" = 'a114a71f-8dca-4004-b468-59797cb34d53'

{{base_url}}/v1/users/me

npm i @nestjs/mongoose argon2  cache-manager-redis-yet mongoose redis reflect-metadata @nestjs/cache-manager cache-manager -S
npm i cache-manager-redis-store -S    
npm i util axios redis ioredis ioredis-timeout moment -S
npm i --save @nestjs/event-emitter
npm install --save swagger-jsdoc@latest swagger-ui-express@latest

npm install --save  @nestjs-modules/mailer
npm install --save @nestjs-modules/mailer nodemailer
npm install --save-dev @types/nodemailer
npm install --save @nestjs-modules/mailer @nestjs/cache-manager @nestjs/common @nestjs/config @nestjs/core @nestjs/event-emitter @nestjs/jwt @nestjs/mapped-types @nestjs/mongoose @nestjs/passport @nestjs/platform-express @nestjs/swagger @nestjs/typeorm 
npm audit fix
npm i --save @influxdata/influxdb-client
npm i --save @influxdata/influxdb-client-apis
npm install --save @nestjs/common @nestjs/core @nestjs/platform-express @influxdata/influxdb-client


- Node-Red

 
node-red-node-random
node-red-contrib-influxdb
node-red-dashboard
node-red-contrib-mdashboard

 
http://192.168.1.37:1880/ui/
http://172.25.99.60:1881/ui/
IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62
-----------------

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_ID=cmoniots@gmail.com
EMAIL_PASS=cmoniots@0955#

EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_ID=kongnakornjantakun@outlook.com
EMAIL_PASS=Pumipat@0955

 
export INFLUX_URL=https://cloud2.influxdata.com
export INFLUX_TOKEN=API_TOKEN
export INFLUX_ORG=ORG_ID
export INFLUX_BUCKET=BUCKET_NAME

# https://typeorm.io/
# http://172.25.99.60:8086/

IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62

# pm2
pm2 start npm --name cmonapi -- start --port 3004
pm2 list
pm2 start npm run start:dev --name cmonapidev
 
pm2 start "npm run dev" --name "nextjs server"

and whenever I need to check logs i do

pm2 logs "nexjs server"

if i update files sometimes it automatically propagates when i use git but sometimes it does not so you can do

pm2 restart cmonapidev server

or

pm2 stop cmonapidev server

pm2 start cmonapidev server


pm2 logs cmonapidev

pm2 delete cmonapidev


With NPM
$ npm install pm2 -g
With Bun
$ bun install pm2 -g
To list all running applications:

$ pm2 list
Managing apps is straightforward:

$ pm2 stop     <app_name|namespace|id|'all'|json_conf>
$ pm2 restart  <app_name|namespace|id|'all'|json_conf>
$ pm2 delete   <app_name|namespace|id|'all'|json_conf>
To have more details on a specific application:

$ pm2 describe <id|app_name>

To monitor logs, custom metrics, application information:

$ pm2 monit
Starting a Node.js application in cluster mode that will leverage all CPUs available:

$ pm2 start api.js -i <processes>
Zero Downtime Reload

Hot Reload allows to update an application without any downtime:

$ pm2 reload all

More informations about how PM2 make clustering easy

Container Support
With the drop-in replacement command for node, called pm2-runtime, run your Node.js application in a hardened production environment. Using it is seamless:

RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]
Read More about the dedicated integration

Host monitoring speedbar
PM2 allows to monitor your host/server vitals with a monitoring speedbar.

To enable host monitoring:

$ pm2 set pm2:sysmonit true
$ pm2 update
o consult logs just type the command:

$ pm2 logs
Standard, Raw, JSON and formated output are available.

Examples:
nestjs docker   Dockerfile docker-compose  nustjs ไม่ใช่ nextjs

$ pm2 logs APP-NAME       # Display APP-NAME logs
$ pm2 logs --json         # JSON output
$ pm2 logs --format       # Formated output

$ pm2 flush               # Flush all logs
$ pm2 reloadLogs          # Reload all logs
To enable log rotation install the following module

$ pm2 install pm2-logrotate

pm2 start <ชื่อไฟล์ entry point>.js
pm2 start dist/src/main.js
pm2 delete dist/src/main.js
pm2 delete cmonapidev



yarn global add pm2

# Stop services only
docker-compose stop

# Stop and remove containers, networks..
docker-compose down 
docker-compose down --rmi cmonapis-nestjs-app


# Down and remove volumes
docker-compose down --volumes 

# Down and remove images
docker-compose down --rmi <all|local> 

docker compose sqlite nestjs nodejs 22.12 +github

search: nodejs version v22 +NustJS +docker compose+ sqlite3 +gihhub


# AI  ollama run deepseek-r1:7b


  if (dto.public_notification) {
      DataUpdate.public_notification = dto.public_notification;
  }

  if (dto.sms_notification) {
      DataUpdate.sms_notification = dto.sms_notification;
  }

 if (dto.email_notification) {
      DataUpdate.email_notification = dto.email_notification;
  }


'u.public_notification AS public_notification',
'u.sms_notification AS sms_notification',
'u.email_notification AS email_notification',


public_notification:Profile.public_notification, 
sms_notification:Profile.sms_notification, 
email_notification:Profile.email_notification, 

IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62
API_URL=http://127.0.0.1:3003
HOST=http://127.0.0.1


 
SELECT 
  "d"."device_id" AS device_id, 
  "d"."mqtt_id" AS mqtt_id, 
  "d"."setting_id" AS setting_id, 
  "sad"."alarm_action_id" AS alarm_action_id, 
  "d"."type_id" AS type_id, 
  "d"."device_name" AS device_name, 
  "d"."hardware_id" AS hardware_id, 
  "d"."status_warning" AS status_warning, 
  "d"."recovery_warning" AS recovery_warning, 
  "d"."status_alert" AS status_alert, 
  "d"."recovery_alert" AS recovery_alert, 
  "d"."time_life" AS time_life, 
  "d"."period" AS period, 
  "d"."work_status" AS work_status, 
  "d"."mqtt_data_value" AS mqtt_data_value, 
  "d"."mqtt_data_control" AS mqtt_data_control, 
  "d"."model" AS model, 
  "d"."vendor" AS vendor, 
  "d"."comparevalue" AS comparevalue, 
  "d"."createddate" AS createddate, 
  "d"."updateddate" AS updateddate, 
  "d"."status" AS status, 
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
  "d"."mqtt_device_name" AS mqtt_device_name, 
  "d"."mqtt_status_over_name" AS mqtt_status_over_name, 
  "d"."mqtt_status_data_name" AS mqtt_status_data_name, 
  "d"."mqtt_act_relay_name" AS mqtt_act_relay_name, 
  "d"."mqtt_control_relay_name" AS mqtt_control_relay_name, 
  "alarm"."alarm_action_id" AS alarm_action_id, 
  "alarm"."action_name" AS action_name, 
  "alarm"."status_warning" AS status_warning, 
  "alarm"."recovery_warning" AS recovery_warning, 
  "alarm"."status_alert" AS status_alert, 
  "alarm"."recovery_alert" AS recovery_alert, 
  "alarm"."email_alarm" AS email_alarm, 
  "alarm"."line_alarm" AS line_alarm, 
  "alarm"."telegram_alarm" AS telegram_alarm, 
  "alarm"."sms_alarm" AS sms_alarm, 
  "alarm"."nonc_alarm" AS nonc_alarm, 
  "alarm"."time_life" AS time_life, 
  "alarm"."event" AS event, 
  "alarm"."status" AS status 
FROM 
  "public"."sd_iot_device" "d" 
  INNER JOIN "public"."sd_iot_alarm_device" "sad" ON "sad"."device_id" = "d"."device_id" 
  INNER JOIN "public"."sd_iot_device_alarm_action" "alarm" ON "alarm"."alarm_action_id" = "sad"."alarm_action_id" 
  INNER JOIN "public"."sd_iot_setting" "st" ON "st"."setting_id" = "d"."setting_id" 
  INNER JOIN "public"."sd_iot_device_type" "t" ON "t"."type_id" = "d"."type_id" 
  INNER JOIN "public"."sd_iot_mqtt" "mq" ON "mq"."mqtt_id" = "d"."mqtt_id" 
  INNER JOIN "public"."sd_iot_location" "l" ON "l"."location_id" = "mq"."location_id" 
WHERE 
  1 = 1 
  AND "d"."status" = 1 
  AND "mq"."status" = 1 
  AND "alarm"."status" = 1 
  AND "sad"."alarm_action_id" = 1
  AND "d"."device_id" = 8
ORDER BY 
  "mq"."sort" ASC, 
  "d"."device_id" ASC 
  
  
  -- PARAMETERS: [1,1,8]


SELECT 
  COUNT(1) AS "cnt" 
FROM 
  "public"."sd_alarm_process_log" "l" 
WHERE 
  1 = 1 
  AND "l"."alarm_action_id" = 1
  AND "l"."device_id" = 8
  AND "l"."type_id" = 1
  AND "l"."date" = '2025-08-24'


``` 