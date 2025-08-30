import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Res,
  ValidationPipe,
  UnprocessableEntityException,
  UseGuards,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
  Req,
  Injectable,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthUserRequired,
  auth,
  AuthTokenRequired,
} from '@src/modules/auth/auth.decorator';
import { SqliteService } from '@src/modules/sqlite/sqlite.service';
import { CreateSqliteDto } from '@src/modules/sqlite/dto/create-sqlite.dto';
import { UpdateSqliteDto } from '@src/modules/sqlite/dto/update-sqlite.dto';
import { CreateTypeDto } from '@src/modules/sqlite/dto/createtype.dto';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as format from '@src/helpers/format.helper';
import { AuthGuard } from '@src/modules/auth/auth.guard';
import { AuthGuardUser } from '@src/modules/auth/auth.guarduser';
@Controller('sqlite')
export class SqliteController {
  constructor(private readonly sqliteService: SqliteService) {}

  @Post('/createproduct')
  @AuthUserRequired()
  async createproduct(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    @Body() createSqliteDto: CreateSqliteDto,
  ) {
    let dto: any = {};
    dto.keyword = createSqliteDto.title;
    console.log(`createSqliteDto =>`);
    console.info(createSqliteDto);
    console.log(`dto=>`);
    console.info(dto);
    let count: any = await this.sqliteService.getCheckData(dto);
    const rowData: any = Number(count);
    console.log(`rowData=>`);
    console.info(rowData);
    if (rowData > 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: dto.keyword + ' Duplicate data ',
        satatus: 0,
        payload: count,
      });
      return;
    }
    let rs: any = this.sqliteService.createProduct(createSqliteDto);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'Create data successful..',
      satatus: 0,
      payload: rs,
    });
    return;
  }

  @Post('/createtype')
  @AuthUserRequired()
  async createtype(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    @Body() Dtos: CreateTypeDto,
  ) {
    let dto: any = {};
    dto.type_name = Dtos.type_name;
    console.log(`createSqliteDto =>`);
    console.info(Dtos);
    console.log(`dto=>`);
    console.info(dto);
    let count: any = await this.sqliteService.getCheckDataType(Dtos);
    const rowData: any = Number(count);
    console.log(`rowData=>`);
    console.info(rowData);
    if (rowData > 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: dto.keyword + ' Duplicate data ',
        satatus: 0,
        payload: count,
      });
      return;
    }
    let rs: any = await this.sqliteService.createType(Dtos);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'Create type successful..',
      satatus: 0,
      payload: rs,
    });
    return;
  }

  @Post('/updateproduct')
  @AuthUserRequired()
  async updateProduct(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    @Body() Dtos: any,
  ) {
    var id = Dtos.id;
    if (!id) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: ' Not id found..',
        message_th: ' ไม่ พบ id .',
      });
      return;
    }
    let dto: any = {};
    dto.id = Dtos.id;
    dto.type_id = Dtos.type_id;
    dto.title = Dtos.title;
    dto.description = Dtos.description;
    dto.price = Dtos.price;
    console.log(`updatetype Dtos=>`);
    console.info(Dtos);
    console.log(`updatetype dto=>`);
    console.info(dto);
    let count: any = await this.sqliteService.getCheckDataProductId(dto);
    const rowData: any = Number(count);
    console.log(`rowData=>`);
    console.info(rowData);
    if (rowData == 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: ' type_id is null ',
        satatus: 0,
        payload: count,
      });
      return;
    }
    let rs: any = await this.sqliteService.updateDataProduct(dto);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'Update type successful..',
      satatus: 1,
      payload: rs,
    });
    return;
  }

  @Post('/updatetype')
  @AuthUserRequired()
  async updatetype(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
    @Body() Dtos: any,
  ) {
    let dto: any = {};
    dto.type_id = Dtos.type_id;
    dto.type_name = Dtos.type_name;
    dto.description = Dtos.description;
    console.log(`updatetype Dtos=>`);
    console.info(Dtos);
    console.log(`updatetype dto=>`);
    console.info(dto);
    let count: any = await this.sqliteService.getCheckDataTypeId(dto);
    const rowData: any = Number(count);
    console.log(`rowData=>`);
    console.info(rowData);
    if (rowData == 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: ' type_id is null ',
        satatus: 0,
        payload: count,
      });
      return;
    }
    let rs: any = await this.sqliteService.updateDataType(dto);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'Update type successful..',
      satatus: 1,
      payload: rs,
    });
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  @AuthUserRequired()
  @Get('/deleteproduct')
  async deleteProduct(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    var id: number = Number(query.id);
    if (!id) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: ' Not id found..',
        message_th: ' ไม่ พบ id .',
      });
      return;
    }
    let rowResultData: any = await this.sqliteService.deleteProduct(id);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'OK',
      satatus: 1,
      payload: rowResultData,
    });
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  @AuthUserRequired()
  @Get('/deleteproducttype')
  async deletDataType(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    var type_id: number = Number(query.type_id);
    if (!type_id) {
      res.status(200).json({
        statusCode: 403,
        code: 403,
        message: ' Not type_id found..',
        message_th: ' ไม่ พบ type_id .',
      });
      return;
    }
    let rowResultData: any = await this.sqliteService.deletetype(type_id);
    res.status(200).json({
      statuscode: 200,
      code: 200,
      message: 'OK',
      satatus: 1,
      payload: rowResultData,
    });
    return;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  @AuthUserRequired()
  @Get('/producttype')
  async getDataType(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    const page: number = Number(query.page) || 1;
    const pageSize: number = Number(query.pageSize) || 100;
    const id: number = Number(query.id);
    var status: string = query.status;
    let keyword: string = query.keyword;
    var sort: string = query.sort;
    let filter: any = {};
    filter.idx = id;
    filter.keyword = keyword || '';
    filter.sort = sort;
    filter.isCount = 1;
    filter.page = page;
    filter.pageSize = pageSize;
    let rowResultData: any = await this.sqliteService.getDataType(filter);
    const rowData: any = Number(rowResultData);
    const totalPages: number = Math.round(rowData / pageSize) || 1;
    let filter2: any = {};
    filter2.idx = id;
    filter2.keyword = keyword || '';
    filter2.sort = sort;
    filter2.status = status;
    filter2.isCount = 0;
    filter2.page = page;
    filter2.pageSize = pageSize;
    let ResultData: any = await this.sqliteService.getDataType(filter2);

    let tempData = [];
    let tempDataoid = [];
    let tempData2 = [];
    for (const [key, va] of Object.entries(ResultData)) {
      // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
      const id: string = ResultData[key].id || null;
      const dataRs: any = {
        type_id: ResultData[key].type_id,
        type_name: ResultData[key].type_name,
        description: ResultData[key].description,
        createddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].createdAt, process.env.tzString),
        ),
        updateddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].updatedAt, process.env.tzString),
        ),
      };
      tempDataoid.push(id);
      tempData.push(va);
      tempData2.push(dataRs);
    }
    if (rowData == 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        payload: null,
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        page: page,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        total: rowData,
        filter: filter2,
        rowResultData: rowResultData,
        payload: tempData2,
      });
      return;
    }
  }

  @Get()
  @AuthUserRequired()
  findAll() {
    let Resalte: any = this.sqliteService.findAll();
    return Resalte;
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  @AuthUserRequired()
  @Get('/product')
  async getGetone(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    const page: number = Number(query.page) || 1;
    const pageSize: number = Number(query.pageSize) || 6;
    const id: number = Number(query.id);
    var status: string = query.status;
    let price: string = query.price;
    let keyword: string = query.keyword;
    var sort: string = query.sort || 'DESC';
    let filter: any = {};
    filter.idx = id;
    filter.keyword = keyword || '';
    filter.sort = sort;
    filter.price = price || '';
    filter.status = status;
    filter.isCount = 1;
    filter.page = page;
    filter.pageSize = pageSize;
    let rowResultData: any = await this.sqliteService.getData(filter);
    const rowData: any = Number(rowResultData);
    const totalPages: number = Math.round(rowData / pageSize) || 1;
    let filter2: any = {};
    filter2.idx = id;
    filter2.price = price || '';
    filter2.keyword = keyword || '';
    filter2.sort = sort;
    filter2.status = status;
    filter2.isCount = 0;
    filter2.page = page;
    filter2.pageSize = pageSize;
    let ResultData: any = await this.sqliteService.getData(filter2);

    let tempData = [];
    let tempDataoid = [];
    let tempData2 = [];
    for (const [key, va] of Object.entries(ResultData)) {
      // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
      const id: string = ResultData[key].id || null;
      const dataRs: any = {
        pid: ResultData[key].id,
        type_id: ResultData[key].type_id,
        title: ResultData[key].title,
        description: ResultData[key].description,
        price: ResultData[key].price,
        createddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].createdAt, process.env.tzString),
        ),
        updateddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].updatedAt, process.env.tzString),
        ),
      };
      tempDataoid.push(id);
      tempData.push(va);
      tempData2.push(dataRs);
    }
    if (rowData == 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        payload: null,
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        page: page,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        total: rowData,
        filter: filter2,
        rowResultData: rowResultData,
        payload: tempData2,
      });
      return;
    }
  }

  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  @AuthUserRequired()
  @Get('/productjoin')
  async productJoin(
    @Res() res: Response,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ) {
    // console.log("req.headers=>");console.info(req.headers);
    let idx = req.headers.id;
    // console.log('idx=>'+idx);
    let secretkey: any = req.headers.secretkey;
    // if(secretkey!=process.env.SECRET_KEY){
    //     res.status(200).json({
    //       statusCode: 403,code:403,
    //       message: 'Forbidden! KEY is not valid ..',
    //       message_th: 'KEY นี้ไม่มีในระบบ.'
    //     });
    //   return
    // }
    const page: number = Number(query.page) || 1;
    const pageSize: number = Number(query.pageSize) || 10;
    const id: number = Number(query.id);
    var status: string = query.status;
    let price: string = query.price;
    let keyword: string = query.keyword;
    var sort: string = query.sort;
    let filter: any = {};
    filter.idx = id;
    filter.keyword = keyword || '';
    filter.sort = sort;
    filter.price = price || '';
    filter.status = status;
    filter.isCount = 1;
    filter.page = page;
    filter.pageSize = pageSize;
    let rowResultData: any = await this.sqliteService.getDataJoin(filter);
    const rowData: any = Number(rowResultData);
    const totalPages: number = Math.round(rowData / pageSize) || 1;
    let filter2: any = {};
    filter2.idx = id;
    filter2.sort = sort;
    filter2.price = price || '';
    filter2.keyword = keyword || '';
    filter2.status = status;
    filter2.isCount = 0;
    filter2.page = page;
    filter2.pageSize = pageSize;
    let ResultData: any = await this.sqliteService.getDataJoin(filter2);
    let tempData = [];
    let tempDataoid = [];
    let tempData2 = [];
    for (const [key, va] of Object.entries(ResultData)) {
      // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
      const id: string = ResultData[key].id || null;
      const dataRs: any = {
        id: ResultData[key].id,
        type_id: ResultData[key].type_id,
        title: ResultData[key].title,
        type_name: ResultData[key].productType.type_name,
        description: ResultData[key].description,
        price: ResultData[key].price,
        createddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].createdAt, process.env.tzString),
        ),
        updateddate: format.timeConvertermas(
          format.convertTZ(ResultData[key].updatedAt, process.env.tzString),
        ),
      };
      tempDataoid.push(id);
      tempData.push(va);
      tempData2.push(dataRs);
    }
    if (rowData == 0) {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 0,
        payload: null,
      });
      return;
    } else {
      res.status(200).json({
        statuscode: 200,
        code: 200,
        message: 'OK',
        satatus: 1,
        page: page,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        total: rowData,
        filter: filter2,
        rowResultData: rowResultData,
        payload: tempData2,
      });
      return;
    }
  }
}
