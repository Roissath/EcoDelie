import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceClientController } from './annonce-client.controller';

describe('AnnonceClientController', () => {
  let controller: AnnonceClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnonceClientController],
    }).compile();

    controller = module.get<AnnonceClientController>(AnnonceClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
