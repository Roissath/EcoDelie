import type { StatsService, DashboardStats, ClientStats, UtilisateurParType } from "./stats.service";
import type { Request } from "express";
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDashboardStats(filters: any): Promise<DashboardStats | ClientStats>;
    getGlobalStats(): Promise<{
        inscriptionsParType: UtilisateurParType[];
        annoncesParType: any[];
    }>;
    getClientDashboard(req: Request): Promise<DashboardStats | ClientStats>;
    getTest(): {
        message: string;
        timestamp: Date;
        endpoints: string[];
    };
}
