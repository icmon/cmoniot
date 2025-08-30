import { Test, TestingModule } from '@nestjs/testing';
import { IotalarmService } from './iotalarm.service';

describe('IotalarmService', () => {
  let service: IotalarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IotalarmService],
    }).compile();

    service = module.get<IotalarmService>(IotalarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
