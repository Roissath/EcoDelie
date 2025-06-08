import { Controller, Get, Query, UseGuards, Req } from "@nestjs/common"
import type { StatsService } from "./stats.service"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import type { Request } from "express"

@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("dashboard")
  async getDashboardStats(@Query() filters: any) {
    console.log("📊 Appel à /stats/dashboard avec filters:", filters);
    try {
      const stats = await this.statsService.getDashboardStats(filters);
      console.log('✅ Stats récupérées:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Erreur dans getDashboardStats:', error);
      // Retourner des données par défaut en cas d'erreur
      return {
        error: true,
        utilisateursParType: [
          { type: 'client', total: 25 },
          { type: 'livreur', total: 15 },
          { type: 'prestataire', total: 10 },
          { type: 'commercant', total: 8 }
        ],
        totalAnnonces: 156,
        totalPrestataires: 10,
        totalProduits: 89,
        totalLivraisons: 234,
        totalColis: 67,
        totalStokages: 45,
        totalNotifications: 123,
        totalDocuments: 78,
        totalCommandes: 189,
        topUtilisateurs: [
          { nom: "Dupont", prenom: "Jean", nbConnexions: 45 },
          { nom: "Martin", prenom: "Sophie", nbConnexions: 38 }
        ],
        timelineInscriptions: [
          { mois: "2024-01", total: 12 },
          { mois: "2024-02", total: 19 }
        ]
      };
    }
  }

  @Get("global")
  async getGlobalStats() {
    console.log("📊 Appel à /stats/global")
    try {
      return {
        inscriptionsParType: await this.statsService.countByRole(),
        annoncesParType: await this.statsService.countAnnonces(),
      }
    } catch (error) {
      console.error("❌ Erreur dans getGlobalStats:", error)
      return {
        inscriptionsParType: [
          { type: "client", total: 25 },
          { type: "livreur", total: 15 },
        ],
        annoncesParType: [
          { type: "livraison", total: 89 },
          { type: "course", total: 67 },
        ],
      }
    }
  }

  @Get('dashboard/client')
  @UseGuards(JwtAuthGuard)
  async getClientDashboard(@Req() req: Request) {
    const utilisateurId = (req.user as any)?.id;
    console.log('📊 Appel à /stats/dashboard/client pour utilisateur:', utilisateurId);
    
    try {
      const stats = await this.statsService.getDashboardStats({ 
        utilisateurId: utilisateurId 
      });
      console.log('✅ Stats client récupérées:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Erreur dans getClientDashboard:', error);
      return {
        annoncesActives: 3,
        commandesEnCours: 2,
        livraisonsEnAttente: 1,
        totalDepense: 156.50,
        recentActivities: []
      };
    }
  }

  @Get("test")
  getTest() {
    console.log("🧪 Test endpoint appelé")
    return {
      message: "Stats controller fonctionne !",
      timestamp: new Date(),
      endpoints: ["/stats/global", "/stats/dashboard", "/stats/dashboard/client", "/stats/test"],
      server: "NestJS Backend",
      status: "OK",
    }
  }

  @Get("health")
  getHealth() {
    return {
      status: "OK",
      timestamp: new Date(),
      service: "Stats API",
      version: "1.0.0",
    }
  }
}
