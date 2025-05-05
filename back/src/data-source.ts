// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Utilisateur } from './utilisateur/utilisateur.entity';
import { Document } from './document/document.entity';
import { Admin } from './admin/admin.entity';
import { InfoClient } from './info-client/info-client.entity';
import { InfoPrestataire } from './info-prestataire/info-prestataire.entity';
import { InfoLivreur } from './info-livreur/info-livreur.entity';
import { InfoCommercant } from './info-commercant/info-commercant.entity';
import { Produit } from './produit/produit.entity';
import { Commande } from './commande/commande.entity';
import { Facture } from './facture/facture.entity';
import { Contract } from './contract/contract.entity';
import { Annonce } from './annonce/annonce.entity';
import { AnnonceClient } from './annonce-client/annonce-client.entity';
import { Colis } from './colis/colis.entity';
import { Paiement } from './paiement/paiement.entity';
import { Disponibilite } from './disponibilite/disponibilite.entity';
import { Abonnement } from './abonnement/abonnement.entity';
import { Notification } from './notification/notification.entity';
import { Historique } from './historique/historique.entity';
import { Message } from './message/message.entity';
import { Entrepot } from './entrepot/entrepot.entity';
import { Stokage } from './stokage/stokage.entity';
import { CommentaireProduit } from './commentaire-produit/commentaire-produit.entity';
import { Livraison } from './livraison/livraison.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ecodeli',
  entities: [
    Utilisateur,
    Document,
    Admin,
    InfoClient,
    InfoPrestataire,
    InfoLivreur,
    InfoCommercant,
    Produit,
    Commande,
    Facture,
    Livraison,
    Contract,
    Annonce,
    AnnonceClient,
    Colis,
    Paiement,
    Disponibilite,
    Abonnement,
    Notification,
    Historique,
    Message,
    Entrepot,
    Stokage,
    CommentaireProduit,
  ],
  migrations: ['src/migration/*.ts'],
  synchronize: true,
  logging: true,
});
