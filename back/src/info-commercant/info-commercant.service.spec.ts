import { Test, TestingModule } from '@nestjs/testing';
import { InfoCommercantService } from './info-commercant.service';

describe('InfoCommercantService', () => {
  let service: InfoCommercantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoCommercantService],
    }).compile();

    service = module.get<InfoCommercantService>(InfoCommercantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
