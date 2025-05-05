import { Test, TestingModule } from '@nestjs/testing';
import { InfoCommercantController } from './info-commercant.controller';

describe('InfoCommercantController', () => {
  let controller: InfoCommercantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoCommercantController],
    }).compile();

    controller = module.get<InfoCommercantController>(InfoCommercantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
