import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"

import { Utilisateur } from "../utilisateur.entity"
import { AnnonceClient } from "../../annonce-client/annonce-client.entity"
import { Produit } from "../../produit/produit.entity"
import { Livraison } from "../../livraison/livraison.entity"
import { Colis } from "../../colis/colis.entity"
import { Stokage } from "../../stokage/stokage.entity"
import { Message } from "../../message/message.entity"
import { Notification } from "../../notification/notification.entity"
import { Document } from "../../document/document.entity"
import { Commande } from "../../commande/commande.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Utilisateur,
      AnnonceClient,
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
