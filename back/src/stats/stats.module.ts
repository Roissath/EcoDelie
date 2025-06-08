import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"

// Toutes les entités nécessaires
import { Utilisateur } from "../utilisateur/utilisateur.entity"
import { AnnonceClient } from "../annonce-client/annonce-client.entity"
import { Produit } from "../produit/produit.entity"
import { Livraison } from "../livraison/livraison.entity"
import { Colis } from "../colis/colis.entity"
import { Stokage } from "../stokage/stokage.entity"
import { Message } from "../message/message.entity"
import { Notification } from "../notification/notification.entity"
import { Document } from "../document/document.entity"
import { Commande } from "../commande/commande.entity"
import { Annonce } from "../annonce/annonce.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Utilisateur,
      AnnonceClient,
      Annonce,
      Produit,
      Livraison,
      Colis,
      Stokage,
      Message,
      Notification,
      Document,
      Commande,
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
