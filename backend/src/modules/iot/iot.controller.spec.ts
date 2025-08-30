import { Test, TestingModule } from '@nestjs/testing';
import { IotController } from '@src/modules/iot/iot.controller';
import { IotService } from '@src/modules/iot/iot.service';

describe('IotController', () => {
  let controller: IotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IotController],
      providers: [IotService],
    }).compile();

    controller = module.get<IotController>(IotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
