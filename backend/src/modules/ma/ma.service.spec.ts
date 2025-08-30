import { Test, TestingModule } from '@nestjs/testing';
import { MaService } from './ma.service';

describe('MaService', () => {
  let service: MaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaService],
    }).compile();

    service = module.get<MaService>(MaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
