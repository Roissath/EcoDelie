import { Controller, Get, UseGuards, Req } from "@nestjs/common"
import type { StatsService, DashboardStats, ClientStats, UtilisateurParType } from "./stats.service"
import { JwtAuthGuard } from "../../auth/jwt-auth.guard"
import type { Request } from "express"

@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("dashboard")
  async getDashboardStats(filters: any): Promise<DashboardStats | ClientStats> {
    console.log("📊 Appel à /stats/dashboard avec filters :", filters)
    return this.statsService.getDashboardStats(filters)
  }

  @Get("global")
  async getGlobalStats(): Promise<{
    inscriptionsParType: UtilisateurParType[]
    annoncesParType: any[]
  }> {
    console.log("📊 Appel à /stats/global")
    return {
      inscriptionsParType: await this.statsService.countByRole({}),
      annoncesParType: await this.statsService.countAnnonces({}),
    }
  }

  @Get('dashboard/client')
  @UseGuards(JwtAuthGuard)
  async getClientDashboard(@Req() req: Request): Promise<DashboardStats | ClientStats> { // Utiliser Request type
    // req.user est peuplé par JwtAuthGuard. Assurez-vous que votre JwtStrategy retourne un objet avec `id`.
    // Si req.userer est { id: number, email: string, type: Role }, alors req.user.id est correct.
    const utilisateurId = (req.user as any)?.id;
    console.log('📊 Appel à /stats/dashboard/client pour utilisateur:', utilisateurId);
    if (!utilisateurId) {
        // Gérer le cas où l'ID utilisateur n'est pas trouvé, peut-être renvoyer une erreur ou des stats vides.
        console.error('❌ ID utilisateur non trouvé dans req.user pour /stats/dashboard/client');
        // Pour l'instant, on pourrait retourner des stats vides ou une erreur appropriée.
        // Ici, on laisse getDashboardStats gérer le cas où utilisateurId est undefined si c'est le comportement souhaité.
    }
    return this.statsService.getDashboardStats({ utilisateurId });
  }

  @Get("test")
  getTest(): { message: string; timestamp: Date; endpoints: string[] } {
    console.log("🧪 Appel à /stats/test")
    return {
      message: "Stats controller (utilisateur/stats) fonctionne !",
      timestamp: new Date(),
      endpoints: ["/stats/global", "/stats/dashboard", "/stats/dashboard/client", "/stats/test"],
    }
  }
}
