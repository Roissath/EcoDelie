import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoPrestataire } from './info-prestataire.entity';
import { InfoPrestataireService } from './info-prestataire.service';
import { InfoPrestataireController } from './info-prestataire.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoPrestataire])],
  providers: [InfoPrestataireService],
  controllers: [InfoPrestataireController],
  exports: [InfoPrestataireService],
})
export class InfoPrestataireModule {}
