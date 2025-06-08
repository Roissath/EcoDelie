"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let StatsController = class StatsController {
    statsService;
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getDashboardStats(filters) {
        console.log("📊 Appel à /stats/dashboard avec filters :", filters);
        return this.statsService.getDashboardStats(filters);
    }
    async getGlobalStats() {
        console.log("📊 Appel à /stats/global");
        return {
            inscriptionsParType: await this.statsService.countByRole({}),
            annoncesParType: await this.statsService.countAnnonces({}),
        };
    }
    async getClientDashboard(req) {
        const utilisateurId = req.user?.id;
        console.log('📊 Appel à /stats/dashboard/client pour utilisateur:', utilisateurId);
        if (!utilisateurId) {
            console.error('❌ ID utilisateur non trouvé dans req.user pour /stats/dashboard/client');
        }
        return this.statsService.getDashboardStats({ utilisateurId });
    }
    getTest() {
        console.log("🧪 Appel à /stats/test");
        return {
            message: "Stats controller (utilisateur/stats) fonctionne !",
            timestamp: new Date(),
            endpoints: ["/stats/global", "/stats/dashboard", "/stats/dashboard/client", "/stats/test"],
        };
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)("dashboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)("global"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getGlobalStats", null);
__decorate([
    (0, common_1.Get)('dashboard/client'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getClientDashboard", null);
__decorate([
    (0, common_1.Get)("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], StatsController.prototype, "getTest", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)("stats"),
    __metadata("design:paramtypes", [Function])
], StatsController);
//# sourceMappingURL=stats.controller.js.map