import { Test, TestingModule } from '@nestjs/testing';
import { InfoPrestataireController } from './info-prestataire.controller';

describe('InfoPrestataireController', () => {
  let controller: InfoPrestataireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoPrestataireController],
    }).compile();

    controller = module.get<InfoPrestataireController>(InfoPrestataireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
