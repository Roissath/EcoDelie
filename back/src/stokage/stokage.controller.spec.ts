import { Test, TestingModule } from '@nestjs/testing';
import { StokageController } from './stokage.controller';

describe('StokageController', () => {
  let controller: StokageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StokageController],
    }).compile();

    controller = module.get<StokageController>(StokageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
