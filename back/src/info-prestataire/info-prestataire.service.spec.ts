import { Test, TestingModule } from '@nestjs/testing';
import { InfoPrestataireService } from './info-prestataire.service';

describe('InfoPrestataireService', () => {
  let service: InfoPrestataireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoPrestataireService],
    }).compile();

    service = module.get<InfoPrestataireService>(InfoPrestataireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
