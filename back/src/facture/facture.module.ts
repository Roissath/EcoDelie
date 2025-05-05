import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facture } from './facture.entity';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facture, Utilisateur, Commande])],
  providers: [FactureService],
  controllers: [FactureController],
  exports: [FactureService],
})
export class FactureModule {}
