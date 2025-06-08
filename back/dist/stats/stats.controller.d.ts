import type { StatsService } from "./stats.service";
import type { Request } from "express";
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDashboardStats(filters: any): Promise<import("./stats.service").DashboardStats | import("./stats.service").ClientStats>;
    getGlobalStats(): Promise<{
        inscriptionsParType: import("./stats.service").UtilisateurParType[];
        annoncesParType: any[];
    }>;
    getClientDashboard(req: Request): Promise<import("./stats.service").DashboardStats | import("./stats.service").ClientStats>;
    getTest(): {
        message: string;
        timestamp: Date;
        endpoints: string[];
        server: string;
        status: string;
    };
    getHealth(): {
        status: string;
        timestamp: Date;
        service: string;
        version: string;
    };
}
