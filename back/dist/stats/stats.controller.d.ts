import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDashboardStats(filters: any): Promise<{
        utilisateursParType: any[];
        totalAnnonces: number;
        totalPrestataires: number;
        totalProduits: number;
        totalLivraisons: number;
        totalColis: number;
        totalStokages: number;
        totalNotifications: number;
        totalDocuments: number;
        totalCommandes: number;
        topUtilisateurs: any;
        timelineInscriptions: any;
    }>;
    getGlobalStats(): Promise<{
        inscriptionsParType: any[];
        annoncesParType: any[];
    }>;
}
