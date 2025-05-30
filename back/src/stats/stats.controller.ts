import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  async getDashboardStats(@Query() filters: any) {
      console.log('Appel à /stats/dashboard avec filters :', filters);
    return this.statsService.getDashboardStats(filters);
  }

  @Get('global')
  async getGlobalStats() {
    return {
      inscriptionsParType: await this.statsService.countByRole(),
      annoncesParType: await this.statsService.countAnnonces(),
    };
  }
}
