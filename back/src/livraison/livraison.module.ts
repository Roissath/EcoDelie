import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livraison } from './livraison.entity';
import { LivraisonService } from './livraison.service';
import { LivraisonController } from './livraison.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livraison, Utilisateur, Commande])],
  providers: [LivraisonService],
  controllers: [LivraisonController],
  exports: [LivraisonService],
})
export class LivraisonModule {}
