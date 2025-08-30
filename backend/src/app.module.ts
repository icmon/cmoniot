import * as dotenv from 'dotenv';
dotenv.config();
import {
  RequestMethod,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Schema, model, connect } from 'mongoose';
// import { ConfigMongodbService } from './config/config.servicemongodb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from '@src/app.service';
import appConfig from '@src/config/app.config';
import { typeOrmAsyncConfig } from '@src/config/db/db';
import { PassportModule } from '@nestjs/passport';
import { TransformInterceptor } from '@root/interceptors/transform.interceptor';
import { RouterModule, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@src/modules/auth/auth.module';
import { AuthGuard } from '@src/modules/auth/auth.guard';
import { ENV_CONSTANTS } from '@root/env.constants';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
//console.log('REDIS_HOST: '+process.env.REDIS_HOST)
import { redisStore, RedisCache } from 'cache-manager-redis-yet';
import { AppController } from '@src/app.controller';
/*******entity***********/
import { User } from '@src/modules/users/entities/user.entity';
import { AccessMenu } from '@src/modules/accessmenu/entities/accessmenu.entity';
/*******entity***********/
import { UserAuthModel } from '@src/modules/users/dto/user-auth.dto';
import { RedisModule } from '@src/modules/redis/redis.module';
import { SharedModule } from '@src/modules/shared/shared.module';
import { IotModule } from '@src/modules/iot/iot.module';
import { DashboardModule } from '@src/modules/dashboard/dashboard.module';
import { AppsModule } from '@src/modules/apps/apps.module';
import { ProjectModule } from '@src/modules/project/project.module';
import { EventsModule } from '@src/modules/events/events.module';
import { CategoriesModule } from '@src/modules/categories/categories.module';
import { UpcommingeventsModule } from '@src/modules/upcommingevents/upcommingevents.module';
import { ChatModule } from '@src/modules/chat/chat.module';
import { TodoModule } from '@src/modules/todo/todo.module';
import { TicketModule } from '@src/modules/ticket/ticket.module';
import { ApiKeyModule } from '@src/modules/api-key/api-key.module';
import { TimelineModule } from '@src/modules/timeline/timeline.module';
import { MonitoringModule } from '@src/modules/monitoring/monitoring.module';
import { MapsModule } from '@src/modules/maps/maps.module';
import { SettingsModule } from '@src/modules/settings/settings.module';
// import { LogsModule } from '@src/modules/logs/logs.module';
import { ChartModule } from '@src/modules/chart/chart.module';
import { CrmModule } from '@src/modules/crm/crm.module';
import { HardwareModule } from '@src/modules/hardware/hardware.module';
import { OrderModule } from '@src/modules/order/order.module';
import { PackageModule } from '@src/modules/package/package.module';
import { ServicesModule } from '@src/modules/services/services.module';
import { MaModule } from '@src/modules/ma/ma.module';
import { InvoiceModule } from '@src/modules/invoice/invoice.module';
import { EmployeeModule } from '@src/modules/employee/employee.module';
import { PartnerModule } from '@src/modules/partner/partner.module';
import { ManualModule } from '@src/modules/manual/manual.module';
import { TeamModule } from '@src/modules/team/team.module';
import { ReportModule } from '@src/modules/report/report.module';
import { AccountModule } from '@src/modules/account/account.module';
import { HrModule } from '@src/modules/hr/hr.module';
import { RolesModule } from '@src/modules/roles/roles.module';
import { SensorModule } from '@src/modules/sensor/sensor.module';
import { AccessmenuModule } from '@src/modules/accessmenu/accessmenu.module';
import { IotalarmModule } from '@src/modules/iotalarm/iotalarm.module';
import { CalendarModule } from '@src/modules/calendar/calendar.module';
import { GeoModule } from '@src/modules/geo/geo.module';
import { LocationModule } from '@src/modules/location/location.module';
import { SnmpModule } from '@src/modules/snmp/snmp.module';
import { AiModule } from '@src/modules/ai/ai.module';
import { TaskModule } from '@src/modules/task/task.module';
import { SyslogModule } from '@src/modules/syslog/syslog.module';
import { OsModule } from '@src/modules/os/os.module';
/******sqlite******/
import { sqliteBaseConfig } from '@src/config/db/sqlitedatabase.config';
import { sqliteBaseConfigs } from '@src/config/db/sqlitedatabases.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SqliteModule } from '@src/modules/sqlite/sqlite.module';
import { MqttModule } from '@src/modules/mqtt/mqtt.module';
/******ENV******/
const ENV = process.env.NODE_ENV;
console.log('NODE_ENV: '+ENV);
console.log('MQTT_HOST: '+process.env.MQTT_HOST);
/******ENV******/
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesModule } from './modules/schedules/schedules.module';
@Module({
  imports: [ 
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SequelizeModule.forRoot(sqliteBaseConfigs),
    // MongooseModule.forRootAsync({
    //     inject: [ConfigMongodbService],
    //     useFactory: async (ConfigMongodbService: ConfigMongodbService) => ConfigMongodbService.getMongoConfig(),
    // }),
    /*******entity***********/
    TypeOrmModule.forFeature([User, AccessMenu]),
    AuthModule,
    UserAuthModel,
    RedisModule,
    SharedModule,
    IotModule,
    DashboardModule,
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      envFilePath: [process.env.ENV_FILE, '.env.development'],
    }),
    RouterModule.register([
      {
        path: '', //auth
        module: AuthModule,
      },
      {
        path: 'cache',
        module: RedisModule,
      },
      // {
      //   path: 'shared',
      //   module: SharedModule,
      // },
    ]),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({}),
      // If you're using a ConfigService or other dependencies, inject them here
      // inject: [ConfigService],
    }),
    AppsModule,
    ProjectModule,
    EventsModule,
    CategoriesModule,
    UpcommingeventsModule,
    ChatModule,
    TodoModule,
    TicketModule,
    ApiKeyModule,
    TimelineModule,
    MonitoringModule,
    MapsModule,
    SettingsModule,
    SyslogModule,
    // LogsModule,
    ChartModule,
    CrmModule,
    HardwareModule,
    OrderModule,
    PackageModule,
    ServicesModule,
    MaModule,
    InvoiceModule,
    EmployeeModule,
    PartnerModule,
    ManualModule,
    TeamModule,
    ReportModule,
    AccountModule,
    HrModule,
    RolesModule,
    SensorModule,
    AccessmenuModule,
    IotalarmModule,
    CalendarModule,
    GeoModule,
    LocationModule,
    SnmpModule,
    AiModule,
    TaskModule,
    SqliteModule,
    MqttModule,
    ScheduleModule,
    SchedulesModule, 
    OsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    /*
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
     },
   */
  ],
  exports: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(SetImpersonatedUserMiddleware).forRoutes('*'); // Apply to all routes
//   }
// }
