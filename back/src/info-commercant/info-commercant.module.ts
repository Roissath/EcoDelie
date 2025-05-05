import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoCommercant } from './info-commercant.entity';
import { InfoCommercantService } from './info-commercant.service';
import { InfoCommercantController } from './info-commercant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoCommercant])],
  providers: [InfoCommercantService],
  controllers: [InfoCommercantController],
  exports: [InfoCommercantService],
})
export class InfoCommercantModule {}
