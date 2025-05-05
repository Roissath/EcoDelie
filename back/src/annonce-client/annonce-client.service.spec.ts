import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceClientService } from './annonce-client.service';

describe('AnnonceClientService', () => {
  let service: AnnonceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnonceClientService],
    }).compile();

    service = module.get<AnnonceClientService>(AnnonceClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
