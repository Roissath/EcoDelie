import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getGlobalStats(): Promise<{
        inscriptionsParType: any[];
        annoncesParType: any[];
    }>;
}
