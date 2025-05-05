import { Test, TestingModule } from '@nestjs/testing';
import { StokageService } from './stokage.service';

describe('StokageService', () => {
  let service: StokageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StokageService],
    }).compile();

    service = module.get<StokageService>(StokageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
