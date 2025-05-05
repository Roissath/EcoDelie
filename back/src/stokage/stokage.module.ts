import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stokage } from './stokage.entity';
import { StokageService } from './stokage.service';
import { StokageController } from './stokage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stokage])],
  providers: [StokageService],
  controllers: [StokageController],
  exports: [StokageService],
})
export class StokageModule {}
