import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoLivreur } from './info-livreur.entity';
import { InfoLivreurService } from './info-livreur.service';
import { InfoLivreurController } from './info-livreur.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoLivreur])],
  providers: [InfoLivreurService],
  controllers: [InfoLivreurController],
  exports: [InfoLivreurService],
})
export class InfoLivreurModule {}
