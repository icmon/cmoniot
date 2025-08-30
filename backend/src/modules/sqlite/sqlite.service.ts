import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateSqliteDto } from '@src/modules/sqlite/dto/create-sqlite.dto';
import { UpdateSqliteDto } from '@src/modules/sqlite/dto/update-sqlite.dto';
import { CreateTypeDto } from '@src/modules/sqlite/dto/createtype.dto';
import { Product } from '@src/modules/sqlite/entities/product.entity';
import { ProductType } from '@src/modules/sqlite/entities/productype.entity';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
@Injectable()
export class SqliteService {
  private readonly logger = new Logger(SqliteService.name);
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductType)
    private ProductTypeModel: typeof ProductType,
  ) {}

  async createProduct(createProductDto: CreateSqliteDto) {
    const rs = await this.productRepository.create(createProductDto as any);
    return rs;
  }

  async createType(Dto: CreateTypeDto) {
    const rs = await this.ProductTypeModel.create(Dto as any);
    return rs;
  }

  async getCheckDataType(dto: any) {
    const type_name: string = dto.type_name || '';
    const type_id: string = dto.type_id || '';
    const where: any = {};
    if (type_name) {
      where.type_name = type_name;
    }
    if (type_id) {
      where.type_id = type_id;
    }
    let count: any = await this.ProductTypeModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);
    return count;
  }

  async getCheckDataTypeId(dto: any) {
    const type_name: string = dto.type_name || '';
    const type_id: string = dto.type_id || '';
    const where: any = {};
    if (type_id) {
      where.type_id = type_id;
    }
    let count: any = await this.ProductTypeModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);
    return count;
  }

  async getCheckDataProductId(dto: any) {
    const type_name: string = dto.type_name || '';
    const id: string = dto.id || '';
    const where: any = {};
    if (id) {
      where.id = id;
    }
    let count: any = await this.productModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);
    return count;
  }

  // Update Product
  async updateDataProduct(dto) {
    console.log(`updateDataProduct dto=>`);
    console.info(dto);
    const id = dto.id;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const type_id = dto.type_id;
    if (!type_id) {
      //throw new BadRequestException('type_id is required');
    }
    // เตรียม input สำหรับ update
    const input: any = {};
    if (dto.type_id) {
      input.type_id = dto.type_id;
    }
    if (dto.title) {
      input.title = dto.title;
    }
    if (dto.description) {
      input.description = dto.description;
    }
    if (dto.price) {
      input.price = dto.price;
    }
    input.updatedAt = new Date();

    // ตรวจสอบว่ามี type_id นี้หรือไม่
    const where = { id: id };
    let count: any = await this.productModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);

    // อัปเดตข้อมูล
    console.log(`getCheckData input=>`);
    console.info(input);
    const [affectedRows] = await this.productModel.update(input, { where });

    // ดึงข้อมูลที่อัปเดตกลับไปแสดง
    const updated = await this.productModel.findOne({ where });
    return updated;
  }

  // Update Type
  async updateDataType(dto) {
    console.log(`updateDataType dto=>`);
    console.info(dto);
    const type_id = dto.type_id;
    if (!type_id) {
      throw new BadRequestException('type_id is required');
    }
    // เตรียม input สำหรับ update
    const input: any = {};
    if (dto.type_name) {
      input.type_name = dto.type_name;
    }
    if (dto.description) {
      input.description = dto.description;
    }
    input.updatedAt = new Date();

    // ตรวจสอบว่ามี type_id นี้หรือไม่
    const where = { type_id: type_id };
    let count: any = await this.ProductTypeModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);

    // อัปเดตข้อมูล
    console.log(`getCheckData input=>`);
    console.info(input);
    const [affectedRows] = await this.ProductTypeModel.update(input, { where }); // where.type_id = type_id;

    // ดึงข้อมูลที่อัปเดตกลับไปแสดง
    const updated = await this.ProductTypeModel.findOne({ where });
    return updated;
  }

  // Delete Product
  async deleteProduct(id: number) {
    console.log(`id=>`);
    console.info(id);
    if (!id) {
      throw new BadRequestException('type_id is required');
    }

    // ตรวจสอบว่ามี type_id นี้หรือไม่
    const where = { id };
    const existing = await this.productModel.findOne({ where });
    if (!existing) {
      throw new NotFoundException('Product type not found');
    }

    // ลบข้อมูล
    await this.productModel.destroy({ where });

    // return ข้อมูลที่ถูกลบ (หรือจะ return { deleted: true } ก็ได้)
    return existing;
  }
  // Delete type
  async deletetype(type_id: number) {
    console.log(`type_id=>`);
    console.info(type_id);
    if (!type_id) {
      throw new BadRequestException('type_id is required');
    }

    // ตรวจสอบว่ามี type_id นี้หรือไม่
    const where = { type_id };
    const existing = await this.ProductTypeModel.findOne({ where });
    if (!existing) {
      throw new NotFoundException('Product type not found');
    }

    // ลบข้อมูล
    await this.ProductTypeModel.destroy({ where });

    // return ข้อมูลที่ถูกลบ (หรือจะ return { deleted: true } ก็ได้)
    return existing;
  }

  async getDataType(dto: any) {
    const idx: string = dto.idx || '';
    const keyword: string = dto.keyword || '';
    const sort: string = dto.sort;
    const page: number = dto.page || 1;
    const pageSize: number = dto.pageSize || 10;
    const isCount: number = dto.isCount || 0;
    const where: any = {};
    if (idx) {
      where.type_id = idx;
    }
    if (keyword) {
      where.type_name = { [Op.like]: `%${keyword}%` };
    }
    if (isCount == 1) {
      return await this.ProductTypeModel.count({ where });
    } else {
      return await this.ProductTypeModel.findAll({
        where,
        order: [['type_id', sort]],
        limit: pageSize,
        offset: pageSize * (page - 1),
      });
    }
  }

  async findAll() {
    const rs = await this.productRepository.findAll();
    return rs;
  }

  async getCheckData(dto: any) {
    const idx: string = dto.idx || '';
    const keyword: string = dto.keyword || '';
    const where: any = {};
    if (idx) {
      where.id = idx;
    }
    if (keyword) {
      where.title = keyword;
    }
    let count: any = this.productModel.count({ where });
    console.log(`getCheckData count=>`);
    console.info(count);
    return count;
  }

  async getData(dto: any) {
    const idx: string = dto.idx || '';
    const keyword: string = dto.keyword || '';
    const price: string = dto.price || '';
    const sort: string = dto.sort;
    const page: number = dto.page || 1;
    const pageSize: number = dto.pageSize || 10;
    const isCount: number = dto.isCount || 0;

    const where: any = {};
    if (idx) {
      where.id = idx;
    }
    if (keyword) {
      where.title = { [Op.like]: `%${keyword}%` };
    }
    if (price) {
      where.price = price;
    }

    if (isCount == 1) {
      return await this.productModel.count({ where });
    } else {
      return await this.productModel.findAll({
        where,
        order: [['id', sort]],
        limit: pageSize,
        offset: pageSize * (page - 1),
      });
    }
  }

  async getDataJoin(dto: any) {
    const idx: string = dto.idx || '';
    const keyword: string = dto.keyword || '';
    const price: string = dto.price || '';
    const sort: string = dto.sort;
    const page: number = dto.page || 1;
    const pageSize: number = dto.pageSize || 10;
    const isCount: number = dto.isCount || 0;
    /*
            SELECT  p.*,t.type_name
            FROM product AS p
            INNER JOIN product_type AS t ON p.type_id = t.type_id
            WHERE 1=1 and p.id= 1
        */
    const include = [
      {
        model: ProductType,
        attributes: ['type_name'], // เอาเฉพาะ type_name
        required: true, // INNER JOIN
      },
    ];

    const where: any = {};
    if (idx) {
      where.id = idx;
    }
    if (keyword) {
      where.title = { [Op.like]: `%${keyword}%` };
    }
    if (price) {
      where.price = price;
    }

    if (isCount == 1) {
      return await this.productModel.count({ where, include });
    } else {
      return await this.productModel.findAll({
        where,
        include,
        order: [['id', sort]],
        limit: pageSize,
        offset: pageSize * (page - 1),
      });
    }
  }

  async findOne(id: number) {
    //return `This action returns a #${id} sqlite`;
    try {
      const user = await this.productRepository.findOne({
        where: {
          id,
        },
      });
      //console.log('getUser=>');console.info(user);
      return user;
    } catch (err) {
      this.logger.error(`Error ${JSON.stringify(err)}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: err.message,
        },
      });
    }
  }
}
