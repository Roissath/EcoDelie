import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"

import { Utilisateur } from "../../utilisateur/utilisateur.entity"
import { AnnonceClient } from "../../annonce-client/annonce-client.entity"
import { Produit } from "../../produit/produit.entity"
import { Livraison } from "../../livraison/livraison.entity"
import { Colis } from "../../colis/colis.entity"
import { Stokage } from "../../stokage/stokage.entity"
import { Message } from "../../message/message.entity"
import { Notification } from "../../notification/notification.entity"
import { Document } from "../../document/document.entity"
import { Commande } from "../../commande/commande.entity"
import { Role } from "../../enums/role.enum"

// Au début du fichier utilisateur/stats/stats.service.ts, ajoutez 'export' aux interfaces si ce n'est pas déjà fait.
export interface UtilisateurParType {
  type: string
  total: number
}

export interface TopUtilisateur {
  nom: string
  prenom: string
  nbConnexions: number // Assurez-vous que ce nom correspond à ce que votre requête SQL retourne
}

export interface TimelineInscription {
  mois: string
  total: number
}

export interface DashboardStats {
  error?: boolean
  message?: string
  utilisateursParType: UtilisateurParType[]
  totalAnnonces: number
  totalPrestataires: number
  totalProduits: number
  totalLivraisons: number
  totalColis: number
  totalStokages: number
  totalNotifications: number
  totalDocuments: number
  totalCommandes: number
  topUtilisateurs: TopUtilisateur[]
  timelineInscriptions: TimelineInscription[]
}

export interface ClientStats {
  annoncesActives: number
  commandesEnCours: number
  livraisonsEnAttente: number
  totalDepense: number
  recentActivities: any[] // Peut être typé plus précisément
}

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,
    @InjectRepository(AnnonceClient)
    private readonly annonceClientRepo: Repository<AnnonceClient>,
    @InjectRepository(Produit)
    private readonly produitRepo: Repository<Produit>,
    @InjectRepository(Livraison) private livraisonRepo: Repository<Livraison>,
    @InjectRepository(Colis) private colisRepo: Repository<Colis>,
    @InjectRepository(Stokage) private stokageRepo: Repository<Stokage>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
    @InjectRepository(Document) private documentRepo: Repository<Document>,
    @InjectRepository(Commande) private commandeRepo: Repository<Commande>,
  ) {}

  public async getDashboardStats(filters: any) {
    console.log("📊 Traitement des stats pour :", filters)

    const utilisateurId = filters.utilisateurId

    // Cas client connecté : renvoyer ses stats uniquement
    if (utilisateurId) {
      console.log(`👤 Récupération des stats pour le client ID: ${utilisateurId}`)

      const commandes = await this.commandeRepo.find({
        where: { client: { id: utilisateurId } }, // Corrigé: filtrer par l'ID du client lié à la commande
        relations: ["client"], // S'assurer que la relation 'client' est correcte et utile
      })

      const livraisons = await this.livraisonRepo.find({
        where: { client: { id: utilisateurId } },
        relations: ["client"],
      })

      const annonces = await this.annonceClientRepo.find({
        where: { utilisateur: { id: utilisateurId } }, // AnnonceClient.utilisateur est le créateur
        relations: ["utilisateur"],
      })

      const totalDepense = commandes.reduce((acc, c) => acc + (c.total || 0), 0)

      console.log(
        `📦 Commandes client: ${commandes.length}, 🚚 Livraisons client: ${livraisons.length}, 📢 Annonces client: ${annonces.length}, 💰 Dépense totale: ${totalDepense}`,
      )

      return {
        annoncesActives: annonces.length,
        commandesEnCours: commandes.length,
        livraisonsEnAttente: livraisons.length,
        totalDepense,
        recentActivities: [], // à implémenter si tu veux suivre activité client
      }
    }

    // Cas admin ou sans filtre : stats globales
    const utilisateursParType = await this.utilisateurRepo
      .createQueryBuilder("u")
      .select("u.type", "type")
      .addSelect("COUNT(*)", "total")
      .groupBy("u.type")
      .getRawMany()

    const totalAnnonces = await this.annonceClientRepo.count()
    const totalPrestataires = await this.utilisateurRepo.count({ where: { type: Role.Prestataire } })
    const totalProduits = await this.produitRepo.count()
    const totalLivraisons = await this.livraisonRepo.count()
    const totalColis = await this.colisRepo.count()
    const totalStokages = await this.stokageRepo.count()
    const totalNotifications = await this.notificationRepo.count()
    const totalDocuments = await this.documentRepo.count()
    const totalCommandes = await this.commandeRepo.count()

    const topUtilisateurs = await this.utilisateurRepo.query(`
    SELECT u.nom, u.prenom, COUNT(m.id) AS nbConnexions
    FROM utilisateur u
    JOIN message m ON u.id = m.id_expediteur
    GROUP BY u.id
    ORDER BY nbConnexions DESC
    LIMIT 5
  `)

    const timelineInscriptions = await this.utilisateurRepo.query(`
    SELECT DATE_FORMAT(u.createdAt, '%Y-%m') AS mois, COUNT(*) AS total
    FROM utilisateur u
    GROUP BY mois
    ORDER BY mois ASC
  `)

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
    }
  }

  public async countByRole(filters: any) {
    return this.utilisateurRepo
      .createQueryBuilder("u")
      .select("u.type", "type")
      .addSelect("COUNT(*)", "total")
      .groupBy("u.type")
      .getRawMany()
  }

  public async countAnnonces(filters: any) {
    return this.annonceClientRepo
      .createQueryBuilder("a")
      .select("a.type_annonce", "type")
      .addSelect("COUNT(*)", "total")
      .groupBy("a.type_annonce")
      .getRawMany()
  }
}
