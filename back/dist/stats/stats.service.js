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
const typeorm_2 = require("typeorm");
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
    constructor(utilisateurRepo, annonceClientRepo, produitRepo, livraisonRepo, colisRepo, stokageRepo, messageRepo, notificationRepo, documentRepo, commandeRepo) {
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
    }
    async getDashboardStats(filters) {
        console.log('📊 Traitement des stats pour :', filters);
        const utilisateursParType = await this.utilisateurRepo
            .createQueryBuilder('u')
            .select('u.type', 'type')
            .addSelect('COUNT(*)', 'total')
            .groupBy('u.type')
            .getRawMany();
        const totalAnnonces = await this.annonceClientRepo.count();
        const totalPrestataires = await this.utilisateurRepo.count({ where: { type: role_enum_1.Role.Prestataire } });
        const totalProduits = await this.produitRepo.count();
        const totalLivraisons = await this.livraisonRepo.count();
        const totalColis = await this.colisRepo.count();
        const totalStokages = await this.stokageRepo.count();
        const totalNotifications = await this.notificationRepo.count();
        const totalDocuments = await this.documentRepo.count();
        const totalCommandes = await this.commandeRepo.count();
        const topUtilisateurs = await this.utilisateurRepo.query(`
      SELECT u.nom, u.prenom, COUNT(m.id) AS nbConnexions
      FROM utilisateur u
      JOIN message m ON u.id = m.id_expediteur
      GROUP BY u.id
      ORDER BY nbConnexions DESC
      LIMIT 5
    `);
        const timelineInscriptions = await this.utilisateurRepo.query(`
      SELECT DATE_FORMAT(u.createdAt, '%Y-%m') AS mois, COUNT(*) AS total
      FROM utilisateur u
      GROUP BY mois
      ORDER BY mois ASC
    `);
        return {
            utilisateursParType,
            totalAnnonces,
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
    }
    async countByRole() {
        return this.utilisateurRepo
            .createQueryBuilder('u')
            .select('u.type', 'type')
            .addSelect('COUNT(*)', 'total')
            .groupBy('u.type')
            .getRawMany();
    }
    async countAnnonces() {
        return this.annonceClientRepo
            .createQueryBuilder('a')
            .select('a.type_annonce', 'type')
            .addSelect('COUNT(*)', 'total')
            .groupBy('a.type_annonce')
            .getRawMany();
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map