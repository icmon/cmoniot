import { Test, TestingModule } from '@nestjs/testing';
import { SqliteController } from '@src/modules/sqlite/sqlite.controller';
import { SqliteService } from '@src/modules/sqlite/sqlite.service';

describe('SqliteController', () => {
  let controller: SqliteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqliteController],
      providers: [SqliteService],
    }).compile();

    controller = module.get<SqliteController>(SqliteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
