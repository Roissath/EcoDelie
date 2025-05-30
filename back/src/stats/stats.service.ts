import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { AnnonceClient } from '../annonce-client/annonce-client.entity';
import { Produit } from '../produit/produit.entity';
import { Livraison } from '../livraison/livraison.entity';
import { Colis } from '../colis/colis.entity';
import { Stokage } from '../stokage/stokage.entity';
import { Message } from '../message/message.entity';
import { Notification } from '../notification/notification.entity';
import { Document } from '../document/document.entity';
import { Commande } from '../commande/commande.entity';
import { Role } from '../enums/role.enum';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Utilisateur) private utilisateurRepo: Repository<Utilisateur>,
    @InjectRepository(AnnonceClient) private annonceClientRepo: Repository<AnnonceClient>,
    @InjectRepository(Produit) private produitRepo: Repository<Produit>,
    @InjectRepository(Livraison) private livraisonRepo: Repository<Livraison>,
    @InjectRepository(Colis) private colisRepo: Repository<Colis>,
    @InjectRepository(Stokage) private stokageRepo: Repository<Stokage>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
    @InjectRepository(Document) private documentRepo: Repository<Document>,
    @InjectRepository(Commande) private commandeRepo: Repository<Commande>,
  ) {}

  async getDashboardStats(filters: any) {
      console.log('📊 Traitement des stats pour :', filters); // 👈 debug

    const utilisateursParType = await this.utilisateurRepo
      .createQueryBuilder('u')
      .select('u.type', 'type')
      .addSelect('COUNT(*)', 'total')
      .groupBy('u.type')
      .getRawMany();

    const totalAnnonces = await this.annonceClientRepo.count();
    const totalPrestataires = await this.utilisateurRepo.count({ where: { type: Role.Prestataire } });
    const totalProduits = await this.produitRepo.count();
    const totalLivraisons = await this.livraisonRepo.count();
    const totalColis = await this.colisRepo.count();
    const totalStokages = await this.stokageRepo.count();
    const totalNotifications = await this.notificationRepo.count();
    const totalDocuments = await this.documentRepo.count();
    const totalCommandes = await this.commandeRepo.count();

    const topUtilisateurs = await this.utilisateurRepo.query(`
      SELECT u.nom, u.prenom, COUNT(m.id) AS nbConnexions
      FROM utilisateur u
      JOIN message m ON u.id = m.id_expediteur
      GROUP BY u.id
      ORDER BY nbConnexions DESC
      LIMIT 5
    `);

    const timelineInscriptions = await this.utilisateurRepo.query(`
      SELECT DATE_FORMAT(u.createdAt, '%Y-%m') AS mois, COUNT(*) AS total
      FROM utilisateur u
      GROUP BY mois
      ORDER BY mois ASC
    `);

    return {
      utilisateursParType,
      totalAnnonces,
      totalPrestataires,
      totalProduits,
      totalLivraisons,
      totalColis,
      totalStokages,
      totalNotifications,
      totalDocuments,
      totalCommandes,
      topUtilisateurs,
      timelineInscriptions,
    };
  }

  async countByRole() {
    return this.utilisateurRepo
      .createQueryBuilder('u')
      .select('u.type', 'type')
      .addSelect('COUNT(*)', 'total')
      .groupBy('u.type')
      .getRawMany();
  }

  async countAnnonces() {
    return this.annonceClientRepo
      .createQueryBuilder('a')
      .select('a.type_annonce', 'type')
      .addSelect('COUNT(*)', 'total')
      .groupBy('a.type_annonce')
      .getRawMany();
  }
}
