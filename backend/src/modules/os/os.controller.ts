import {
  Controller,
  Res,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
  Req,
  Injectable,
  Headers,
  DefaultValuePipe,
  ParseIntPipe,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  PipeTransform,
  ArgumentMetadata,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { Express, Request, Response, NextFunction } from 'express';
import { OsService } from '@src/modules/os/os.service';
import { CreateODto } from '@src/modules/os/dto/create-o.dto';
import { UpdateODto } from '@src/modules/os/dto/update-o.dto';
import * as os from 'os';
import * as osu from 'node-os-utils';
import checkDiskSpace from 'check-disk-space';
@Controller('os')
export class OsController {
  constructor(private readonly osService: OsService) {}

  @Get()
  async getMemoryInfoss(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
            try {
              const totalMemory = os.totalmem();
              const freeMemory = os.freemem();
              const cpuUsage = await osu.cpu.usage();
              const path = os.platform() === 'win32' ? 'C:' : '/';
              const usedMemory = totalMemory - freeMemory;
              const usedMemoryPercentage = (usedMemory / totalMemory) * 100;
              const memoryUsage = process.memoryUsage();
              const { heapUsed, heapTotal } = memoryUsage;
              const heapUsagePercentage = (heapUsed / heapTotal) * 100;
              // Function to format bytes to MB for readability
              const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);
              const diskSpace = await checkDiskSpace(path);
              const total = diskSpace.size;
              const free = diskSpace.free;
              const used = total - free;
              const usedPercentage = (used / total) * 100;
              // Function to convert bytes to a readable format (GB)
              const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

              var Rs:any= {
                    platform: os.platform(),
                    type: os.type(),
                    release: os.release(),
                    version: os.version(),
                    architecture: os.arch(),
                    hostname: os.hostname(),
                    uptime: os.uptime(),
                    userInfo: os.userInfo(),
                    cpuUsage:cpuUsage,
                    cpuUsage_percen: `${cpuUsage}%`,
                    totalMemory: `${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
                    usedMemory: `${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
                    freeMemory: `${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
                    usedMemoryPercentage: `${usedMemoryPercentage.toFixed(2)}%`,
                    heapUsed: `${toMB(heapUsed)} MB`,
                    heapTotal: `${toMB(heapTotal)} MB`,
                    heapUsagePercentage: `${heapUsagePercentage.toFixed(2)}%`,
                    diskPath: diskSpace.diskPath,
                    disktotal: `${toGB(total)} GB`,
                    diskfree: `${toGB(free)} GB`,
                    diskused: `${toGB(used)} GB`,
                    diskusedPercentage: `${usedPercentage.toFixed(2)}%`,
                  }; 
              res.status(200).json({
                      statusCode: 200,
                      code: 200,
                      payload: { 
                        data: Rs,
                      },
                      message: 'memory.',
                      message_th: 'memory.',
                    });
    } catch (error) {
          return { error: 'Failed to retrieve disk space information.' };
    }

  }

  @Get('memory')
  async getMemoryInfo(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    var Rs:any= {
          totalMemory,
          freeMemory,
          usedMemory: totalMemory - freeMemory,
          freeMemoryPercentage: (freeMemory / totalMemory) * 100,
        }; 
    res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: { 
              data: Rs,
            },
            message: 'memory.',
            message_th: 'memory.',
          });

  }

  @Get('cpuusage')
  async getCpuUsage(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    const cpu = osu.cpu;
    const usage = await cpu.usage();
     var Rs:any= { usage: `${usage}%` };
     res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: { 
              data: Rs,
            },
            message: 'cpu usage.',
            message_th: 'cpu usage.',
          });
  }

  @Get('memoryinfo')
  async getMemoryInfos(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    const mem = osu.mem;
    const info = await mem.info();
    var Rs:any= info;
    res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: { 
              data: Rs,
            },
            message: 'memory info.',
            message_th: 'memory info.',
    });
  }

  @Get('diskspace')
  async getDiskSpace(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    // On Linux/macOS, you might use a path like '/'
    // On Windows, you might use a path like 'C:'
    const path = process.platform === 'win32' ? 'C:' : '/';
    const diskSpace = await checkDiskSpace(path);
    var Rs:any= diskSpace;
    res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: { 
              data: Rs,
            },
            message: 'diskspace.',
            message_th: 'diskspace.',
    });
  }

  @Get('appcpuusage')
  async getAppCpuUsage(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    const usage = process.cpuUsage();
    // The result is in microseconds, so we convert it
    const cpuUsage = (usage.user + usage.system) / 1000000; // in seconds
    var rt:any= { cpuUsage: `${cpuUsage}s` };
    var Rs:any= rt;
    res.status(200).json({
            statusCode: 200,
            code: 200,
            payload: { 
              data: Rs,
            },
            message: 'app cpu usage.',
            message_th: 'app cpu usage.',
    });
  }

  @Get('appmemoryusage')
  async getAppMemoryUsage(@Res() res: Response,
        @Query() query: any,
        @Headers() headers: any,
        @Param() params: any,
        @Req() req: any,) {
    const usage = process.memoryUsage();
   var rss:any= {
      rss: `${(usage.rss / 1024 / 1024).toFixed(2)} MB`, // Resident Set Size
      heapTotal: `${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(usage.external / 1024 / 1024).toFixed(2)} MB`, 
    };
     res.status(200).json({
                  statusCode: 200,
                  code: 200,
                  payload: { 
                    data: rss,
                  },
                  message: 'app memory usage.',
                  message_th: 'app memory usage.',
     });
  }
}