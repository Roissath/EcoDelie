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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let StatsController = class StatsController {
    statsService;
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getDashboardStats(filters) {
        console.log("📊 Appel à /stats/dashboard avec filters:", filters);
        try {
            const stats = await this.statsService.getDashboardStats(filters);
            console.log('✅ Stats récupérées:', stats);
            return stats;
        }
        catch (error) {
            console.error('❌ Erreur dans getDashboardStats:', error);
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
    async getGlobalStats() {
        console.log("📊 Appel à /stats/global");
        try {
            return {
                inscriptionsParType: await this.statsService.countByRole(),
                annoncesParType: await this.statsService.countAnnonces(),
            };
        }
        catch (error) {
            console.error("❌ Erreur dans getGlobalStats:", error);
            return {
                inscriptionsParType: [
                    { type: "client", total: 25 },
                    { type: "livreur", total: 15 },
                ],
                annoncesParType: [
                    { type: "livraison", total: 89 },
                    { type: "course", total: 67 },
                ],
            };
        }
    }
    async getClientDashboard(req) {
        const utilisateurId = req.user?.id;
        console.log('📊 Appel à /stats/dashboard/client pour utilisateur:', utilisateurId);
        try {
            const stats = await this.statsService.getDashboardStats({
                utilisateurId: utilisateurId
            });
            console.log('✅ Stats client récupérées:', stats);
            return stats;
        }
        catch (error) {
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
    getTest() {
        console.log("🧪 Test endpoint appelé");
        return {
            message: "Stats controller fonctionne !",
            timestamp: new Date(),
            endpoints: ["/stats/global", "/stats/dashboard", "/stats/dashboard/client", "/stats/test"],
            server: "NestJS Backend",
            status: "OK",
        };
    }
    getHealth() {
        return {
            status: "OK",
            timestamp: new Date(),
            service: "Stats API",
            version: "1.0.0",
        };
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, common_1.Query)()),
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
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getTest", null);
__decorate([
    (0, common_1.Get)("health"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getHealth", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)("stats"),
    __metadata("design:paramtypes", [Function])
], StatsController);
//# sourceMappingURL=stats.controller.js.map