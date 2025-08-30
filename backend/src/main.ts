import helmet from 'helmet';
import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import 'dotenv/config';
require('dotenv').config();
var API_VERSION = '1';
var IP=`172.25.99.60`;
var NETMASK=`255.255.255.240`;
var GETWAY=`172.25.99.62`;
var MQTT_HOST_IP = `${process.env.MQTT_HOST_IP}` || "localhost";
var MQTT_PORT = `${process.env.MQTT_PORT}` || "1883";
var MQTT_HOST = `${process.env.MQTT_HOST}` || "mqtt://172.25.99.60:1883" || "mqtt://127.0.0.1:1883" || "mqtt://localhost:1883";
const MQTT_CLIENT_ID =  `${process.env.MQTT_CLIENT_ID}`;
var MQTT_TOPIC = "BAACTW02/DATA";
var MQTT_ADDR = MQTT_HOST;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Use URI versioning
   * Routes will be in form
   * v1: http://0.0.0.0:3003/v1/users
   * v2: http://0.0.0.0:3003/v2/users
   */
  //app.setGlobalPrefix('cmon-api');
  app.enableVersioning({
    type: VersioningType.URI, //{{base_url}}/v1/auth/reset
    defaultVersion: API_VERSION, //v1
  });
  const corsOptions =
    !process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGINS === '*'
      ? '*'
      : process.env.ALLOWED_ORIGINS.split(',');
  //  const corsOptions: import('@nestjs/common/interfaces/external/cors-options.interface').CorsOptions = {
  //     credentials: true,
  //     origin: 'http://localhost:4200',
  //     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  //     preflightContinue: false,
  //     optionsSuccessStatus: 200,
  //     allowedHeaders: 'Content-Type'
  //   };
  app.enableCors({ corsOptions });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(json({ limit: 'Infinity' }));
  /** Add Swagger. Can be accessed on process.env.API_URL/api e.g 0.0.0.0:3004/api
   * N.B The Add Server builds the default BASE_API when generating client types
   */
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_HOST, // URL of your running MQTT broker
    },
  });
  const host = process.env.HOST;
  const port = process.env.PORT;
  const hosts = host+':'+port;
  console.log('hosts=>'+hosts);
  const config = new DocumentBuilder()
    .setTitle('CmonIoT Auth Api Swagger Service')
    .setDescription('CmonIoT API')
    .setVersion('1.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'default',
    )
    .addTag('auth', 'signinuser') //  auth/signinuser   ใช้สำหรับจัดกลุ่ม Endpoint
    .addTag('users', 'me') //  me Endpoints สำหรับจัดการผู้ใช้
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )  
    .addServer(`${host}:${port}`, 'Local Development Server') 
    .addServer(`http://localhost:${port}`, 'Local Development Server')
    .addServer(`http://127.0.0.1:${port}`, 'Local Development Server')
    .addServer(`http://0.0.0.0:${process.env.APP_PORT}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/document', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'CmonIoT Swagger Documentation', 
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  const configService = app.get<ConfigService>(ConfigService);
  app.use(helmet());
  await app.listen(configService.get<number>('app.port'), () => {

    console.log('IP=>'+IP);
    console.log('NETMASK=>'+NETMASK);
    console.log('GETWAY=>'+GETWAY);
    console.log('MQTT_HOST_IP=>'+MQTT_HOST_IP);
    console.log('MQTT_PORT=>'+MQTT_PORT);
    console.log('MQTT_HOST=>'+MQTT_HOST);
    console.log('MQTT_CLIENT_ID=>'+MQTT_CLIENT_ID); 
    console.log('MQTT_TOPIC=>'+MQTT_TOPIC); 
    console.log('MQTT_ADDR=>'+MQTT_ADDR); 
    console.log('-----process.env)------');
    console.info(process.env); 
    console.log('-----process.env)------');
    // console.log('app=>');
    // console.info(app);
    // console.log('config=>');
    // console.info(config);
    // console.log('document=>');
    // console.info(document);
    console.log(
      `CmonIoT Nest app is listening on port ${configService.get<number>(
        'app.host',
      )} : ${configService.get<number>('app.port')}`,
    );
  });
}
bootstrap();