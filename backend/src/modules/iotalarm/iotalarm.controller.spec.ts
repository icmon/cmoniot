import { Test, TestingModule } from '@nestjs/testing';
import { IotalarmController } from './iotalarm.controller';
import { IotalarmService } from './iotalarm.service';

describe('IotalarmController', () => {
  let controller: IotalarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IotalarmController],
      providers: [IotalarmService],
    }).compile();

    controller = module.get<IotalarmController>(IotalarmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
