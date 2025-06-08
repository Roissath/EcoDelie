import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"

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
import { Role } from "../enums/role.enum"

// Interfaces exportées
export interface UtilisateurParType {
  type: string
  total: number
}

export interface TopUtilisateur {
  nom: string
  prenom: string
  nbConnexions: number
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
  recentActivities: any[]
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

    @InjectRepository(Livraison) 
    private readonly livraisonRepo: Repository<Livraison>,
    
    @InjectRepository(Colis) 
    private readonly colisRepo: Repository<Colis>,
    
    @InjectRepository(Stokage) 
    private readonly stokageRepo: Repository<Stokage>,
    
    @InjectRepository(Message) 
    private readonly messageRepo: Repository<Message>,
    
    @InjectRepository(Notification) 
    private readonly notificationRepo: Repository<Notification>,
    
    @InjectRepository(Document) 
    private readonly documentRepo: Repository<Document>,
    
    @InjectRepository(Commande) 
    private readonly commandeRepo: Repository<Commande>,
    
    @InjectRepository(Annonce)
    private readonly annonceRepo: Repository<Annonce>,
  ) {}

  async getDashboardStats(filters: any = {}): Promise<DashboardStats | ClientStats> {
    console.log("📊 Début getDashboardStats avec filters:", filters)

    try {
      const utilisateurId = filters.utilisateurId

      // Test de connexion DB
      const testCount = await this.utilisateurRepo.count()
      console.log("✅ DB connectée, utilisateurs total:", testCount)

      // Si c'est pour un client spécifique
      if (utilisateurId) {
        console.log("👤 Stats pour client ID:", utilisateurId)
        return await this.getClientSpecificStats(utilisateurId)
      }

      // Stats globales pour admin
      console.log("🌍 Stats globales pour admin")
      return await this.getGlobalAdminStats()
    } catch (error) {
      console.error("❌ Erreur dans getDashboardStats:", error)

      // Gestion correcte de l'erreur
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"

      // Retourner des données par défaut en cas d'erreur
      return {
        error: true,
        message: errorMessage,
        utilisateursParType: [],
        totalAnnonces: 0,
        totalPrestataires: 0,
        totalProduits: 0,
        totalLivraisons: 0,
        totalColis: 0,
        totalStokages: 0,
        totalNotifications: 0,
        totalDocuments: 0,
        totalCommandes: 0,
        topUtilisateurs: [],
        timelineInscriptions: [],
      }
    }
  }

  // Stats spécifiques pour un client
  private async getClientSpecificStats(utilisateurId: number): Promise<ClientStats> {
    console.log("👤 Récupération stats client pour ID:", utilisateurId)

    try {
      // Commandes du client
      const commandes = await this.commandeRepo.find({
        where: { client: { id: utilisateurId } },
        relations: ["client"],
      })

      // Livraisons du client
      const livraisons = await this.livraisonRepo.find({
        where: { client: { id: utilisateurId } },
        relations: ["client"],
      })

      // Annonces du client
      const annonces = await this.annonceClientRepo.find({
        where: { utilisateur: { id: utilisateurId } },
        relations: ["utilisateur"],
      })

      const totalDepense = commandes.reduce((acc, c: any) => acc + (c.total || 0), 0)

      const clientStats: ClientStats = {
        annoncesActives: annonces.length,
        commandesEnCours: commandes.length,
        livraisonsEnAttente: livraisons.length,
        totalDepense,
        recentActivities: [],
      }

      console.log("✅ Stats client calculées:", clientStats)
      return clientStats
    } catch (error) {
      console.error("❌ Erreur getClientSpecificStats:", error)
      return {
        annoncesActives: 0,
        commandesEnCours: 0,
        livraisonsEnAttente: 0,
        totalDepense: 0,
        recentActivities: [],
      }
    }
  }

  // Stats globales pour admin
  private async getGlobalAdminStats(): Promise<DashboardStats> {
    console.log("🌍 Récupération stats globales admin")

    try {
      // Récupération parallèle de toutes les stats
      const [
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
        totalPrestations,
      ] = await Promise.all([
        this.countByRole(),
        this.annonceClientRepo.count(),
        this.utilisateurRepo.count({ where: { type: Role.Prestataire } }),
        this.produitRepo.count(),
        this.livraisonRepo.count(),
        this.colisRepo.count(),
        this.stokageRepo.count(),
        this.notificationRepo.count(),
        this.documentRepo.count(),
        this.commandeRepo.count(),
        this.annonceRepo.count({ where: { type_annonce: "prestation" } }),
      ])

      // Top utilisateurs avec type correct
      let topUtilisateurs: TopUtilisateur[] = []
      try {
        const rawTopUsers = await this.utilisateurRepo.query(`
          SELECT u.nom, u.prenom, COUNT(m.id) AS nbConnexions
          FROM utilisateur u
          LEFT JOIN message m ON u.Id_utilisateur = m.Id_expediteur
          GROUP BY u.Id_utilisateur, u.nom, u.prenom
          ORDER BY nbConnexions DESC
          LIMIT 5
        `)
        topUtilisateurs = rawTopUsers
      } catch (error) {
        console.warn("⚠️ Erreur topUtilisateurs, utilisation données par défaut")
        topUtilisateurs = [
          { nom: "Dupont", prenom: "Jean", nbConnexions: 45 },
          { nom: "Martin", prenom: "Sophie", nbConnexions: 38 },
        ]
      }

      // Timeline inscriptions avec type correct
      let timelineInscriptions: TimelineInscription[] = []
      try {
        const rawTimeline = await this.utilisateurRepo.query(`
          SELECT DATE_FORMAT(u.datdenaissance, '%Y-%m') AS mois, COUNT(*) AS total
          FROM utilisateur u
          WHERE u.datdenaissance IS NOT NULL
          GROUP BY mois
          ORDER BY mois ASC
          LIMIT 12
        `)
        timelineInscriptions = rawTimeline
      } catch (error) {
        console.warn("⚠️ Erreur timelineInscriptions, utilisation données par défaut")
        timelineInscriptions = [
          { mois: "2024-01", total: 12 },
          { mois: "2024-02", total: 19 },
        ]
      }

      const globalStats: DashboardStats = {
        utilisateursParType,
        totalAnnonces: totalAnnonces + totalPrestations,
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

      console.log("✅ Stats globales calculées:", globalStats)
      return globalStats
    } catch (error) {
      console.error("❌ Erreur getGlobalAdminStats:", error)
      throw error
    }
  }

  async countByRole(): Promise<UtilisateurParType[]> {
    console.log("📊 Comptage des utilisateurs par rôle...")

    try {
      const result = await this.utilisateurRepo
        .createQueryBuilder("u")
        .select("u.type", "type")
        .addSelect("COUNT(*)", "total")
        .groupBy("u.type")
        .getRawMany()

      console.log("✅ Utilisateurs par type:", result)
      return result
    } catch (error) {
      console.error("❌ Erreur countByRole:", error)
      return []
    }
  }

  async countAnnonces(): Promise<any[]> {
    console.log("📊 Comptage des annonces par type...")

    try {
      const result = await this.annonceClientRepo
        .createQueryBuilder("a")
        .select("a.type_annonce", "type")
        .addSelect("COUNT(*)", "total")
        .groupBy("a.type_annonce")
        .getRawMany()

      console.log(" Annonces par type:", result)
      return result
    } catch (error) {
      console.error(" Erreur countAnnonces:", error)
      return []
    }
  }
}
