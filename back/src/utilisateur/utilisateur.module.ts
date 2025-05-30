import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { InfoClientModule } from '../info-client/info-client.module';
import { InfoLivreurModule } from '../info-livreur/info-livreur.module';
import { InfoPrestataireModule } from '../info-prestataire/info-prestataire.module';
import { InfoCommercantModule } from '../info-commercant/info-commercant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    InfoClientModule,
    InfoLivreurModule,
    InfoPrestataireModule,
    InfoCommercantModule,
  ],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
