import { Test, TestingModule } from '@nestjs/testing';
import { MaController } from './ma.controller';
import { MaService } from './ma.service';

describe('MaController', () => {
  let controller: MaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaController],
      providers: [MaService],
    }).compile();

    controller = module.get<MaController>(MaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
