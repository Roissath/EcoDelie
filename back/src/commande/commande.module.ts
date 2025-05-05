import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Facture } from '../facture/facture.entity';
import { Livraison } from '../livraison/livraison.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Commande,
      Utilisateur,
      Facture,
      Livraison,
    ]),
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
