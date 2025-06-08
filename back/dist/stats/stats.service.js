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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const annonce_client_entity_1 = require("../annonce-client/annonce-client.entity");
const produit_entity_1 = require("../produit/produit.entity");
const livraison_entity_1 = require("../livraison/livraison.entity");
const colis_entity_1 = require("../colis/colis.entity");
const stokage_entity_1 = require("../stokage/stokage.entity");
const message_entity_1 = require("../message/message.entity");
const notification_entity_1 = require("../notification/notification.entity");
const document_entity_1 = require("../document/document.entity");
const commande_entity_1 = require("../commande/commande.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
const role_enum_1 = require("../enums/role.enum");
let StatsService = class StatsService {
    utilisateurRepo;
    annonceClientRepo;
    produitRepo;
    livraisonRepo;
    colisRepo;
    stokageRepo;
    messageRepo;
    notificationRepo;
    documentRepo;
    commandeRepo;
    annonceRepo;
    constructor(utilisateurRepo, annonceClientRepo, produitRepo, livraisonRepo, colisRepo, stokageRepo, messageRepo, notificationRepo, documentRepo, commandeRepo, annonceRepo) {
        this.utilisateurRepo = utilisateurRepo;
        this.annonceClientRepo = annonceClientRepo;
        this.produitRepo = produitRepo;
        this.livraisonRepo = livraisonRepo;
        this.colisRepo = colisRepo;
        this.stokageRepo = stokageRepo;
        this.messageRepo = messageRepo;
        this.notificationRepo = notificationRepo;
        this.documentRepo = documentRepo;
        this.commandeRepo = commandeRepo;
        this.annonceRepo = annonceRepo;
    }
    async getDashboardStats(filters = {}) {
        console.log("📊 Début getDashboardStats avec filters:", filters);
        try {
            const utilisateurId = filters.utilisateurId;
            const testCount = await this.utilisateurRepo.count();
            console.log("✅ DB connectée, utilisateurs total:", testCount);
            if (utilisateurId) {
                console.log("👤 Stats pour client ID:", utilisateurId);
                return await this.getClientSpecificStats(utilisateurId);
            }
            console.log("🌍 Stats globales pour admin");
            return await this.getGlobalAdminStats();
        }
        catch (error) {
            console.error("❌ Erreur dans getDashboardStats:", error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
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
            };
        }
    }
    async getClientSpecificStats(utilisateurId) {
        console.log("👤 Récupération stats client pour ID:", utilisateurId);
        try {
            const commandes = await this.commandeRepo.find({
                where: { client: { id: utilisateurId } },
                relations: ["client"],
            });
            const livraisons = await this.livraisonRepo.find({
                where: { client: { id: utilisateurId } },
                relations: ["client"],
            });
            const annonces = await this.annonceClientRepo.find({
                where: { utilisateur: { id: utilisateurId } },
                relations: ["utilisateur"],
            });
            const totalDepense = commandes.reduce((acc, c) => acc + (c.total || 0), 0);
            const clientStats = {
                annoncesActives: annonces.length,
                commandesEnCours: commandes.length,
                livraisonsEnAttente: livraisons.length,
                totalDepense,
                recentActivities: [],
            };
            console.log("✅ Stats client calculées:", clientStats);
            return clientStats;
        }
        catch (error) {
            console.error("❌ Erreur getClientSpecificStats:", error);
            return {
                annoncesActives: 0,
                commandesEnCours: 0,
                livraisonsEnAttente: 0,
                totalDepense: 0,
                recentActivities: [],
            };
        }
    }
    async getGlobalAdminStats() {
        console.log("🌍 Récupération stats globales admin");
        try {
            const [utilisateursParType, totalAnnonces, totalPrestataires, totalProduits, totalLivraisons, totalColis, totalStokages, totalNotifications, totalDocuments, totalCommandes, totalPrestations,] = await Promise.all([
                this.countByRole(),
                this.annonceClientRepo.count(),
                this.utilisateurRepo.count({ where: { type: role_enum_1.Role.Prestataire } }),
                this.produitRepo.count(),
                this.livraisonRepo.count(),
                this.colisRepo.count(),
                this.stokageRepo.count(),
                this.notificationRepo.count(),
                this.documentRepo.count(),
                this.commandeRepo.count(),
                this.annonceRepo.count({ where: { type_annonce: "prestation" } }),
            ]);
            let topUtilisateurs = [];
            try {
                const rawTopUsers = await this.utilisateurRepo.query(`
          SELECT u.nom, u.prenom, COUNT(m.id) AS nbConnexions
          FROM utilisateur u
          LEFT JOIN message m ON u.Id_utilisateur = m.Id_expediteur
          GROUP BY u.Id_utilisateur, u.nom, u.prenom
          ORDER BY nbConnexions DESC
          LIMIT 5
        `);
                topUtilisateurs = rawTopUsers;
            }
            catch (error) {
                console.warn("⚠️ Erreur topUtilisateurs, utilisation données par défaut");
                topUtilisateurs = [
                    { nom: "Dupont", prenom: "Jean", nbConnexions: 45 },
                    { nom: "Martin", prenom: "Sophie", nbConnexions: 38 },
                ];
            }
            let timelineInscriptions = [];
            try {
                const rawTimeline = await this.utilisateurRepo.query(`
          SELECT DATE_FORMAT(u.datdenaissance, '%Y-%m') AS mois, COUNT(*) AS total
          FROM utilisateur u
          WHERE u.datdenaissance IS NOT NULL
          GROUP BY mois
          ORDER BY mois ASC
          LIMIT 12
        `);
                timelineInscriptions = rawTimeline;
            }
            catch (error) {
                console.warn("⚠️ Erreur timelineInscriptions, utilisation données par défaut");
                timelineInscriptions = [
                    { mois: "2024-01", total: 12 },
                    { mois: "2024-02", total: 19 },
                ];
            }
            const globalStats = {
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
            };
            console.log("✅ Stats globales calculées:", globalStats);
            return globalStats;
        }
        catch (error) {
            console.error("❌ Erreur getGlobalAdminStats:", error);
            throw error;
        }
    }
    async countByRole() {
        console.log("📊 Comptage des utilisateurs par rôle...");
        try {
            const result = await this.utilisateurRepo
                .createQueryBuilder("u")
                .select("u.type", "type")
                .addSelect("COUNT(*)", "total")
                .groupBy("u.type")
                .getRawMany();
            console.log("✅ Utilisateurs par type:", result);
            return result;
        }
        catch (error) {
            console.error("❌ Erreur countByRole:", error);
            return [];
        }
    }
    async countAnnonces() {
        console.log("📊 Comptage des annonces par type...");
        try {
            const result = await this.annonceClientRepo
                .createQueryBuilder("a")
                .select("a.type_annonce", "type")
                .addSelect("COUNT(*)", "total")
                .groupBy("a.type_annonce")
                .getRawMany();
            console.log(" Annonces par type:", result);
            return result;
        }
        catch (error) {
            console.error(" Erreur countAnnonces:", error);
            return [];
        }
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utilisateur_entity_1.Utilisateur)),
    __param(1, (0, typeorm_1.InjectRepository)(annonce_client_entity_1.AnnonceClient)),
    __param(2, (0, typeorm_1.InjectRepository)(produit_entity_1.Produit)),
    __param(3, (0, typeorm_1.InjectRepository)(livraison_entity_1.Livraison)),
    __param(4, (0, typeorm_1.InjectRepository)(colis_entity_1.Colis)),
    __param(5, (0, typeorm_1.InjectRepository)(stokage_entity_1.Stokage)),
    __param(6, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(7, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(8, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(9, (0, typeorm_1.InjectRepository)(commande_entity_1.Commande)),
    __param(10, (0, typeorm_1.InjectRepository)(annonce_entity_1.Annonce)),
    __metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function, Function, Function, Function, Function, Function])
], StatsService);
//# sourceMappingURL=stats.service.js.map