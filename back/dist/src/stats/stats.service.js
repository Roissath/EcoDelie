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
let StatsService = class StatsService {
    utilisateurRepo;
    annonceRepo;
    constructor(utilisateurRepo, annonceRepo) {
        this.utilisateurRepo = utilisateurRepo;
        this.annonceRepo = annonceRepo;
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
        return this.annonceRepo
            .createQueryBuilder('a')
            .select('a.type_annonce', 'type')
            .addSelect('COUNT(*)', 'total')
            .groupBy('a.type_annonce')
            .getRawMany();
    }
    async topUtilisateurs() {
        return this.utilisateurRepo
            .createQueryBuilder('u')
            .leftJoin('u.annonces', 'a')
            .select(['u.id', 'u.nom', 'u.prenom'])
            .addSelect('COUNT(a.id)', 'nbAnnonces')
            .groupBy('u.id')
            .orderBy('nbAnnonces', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async inscriptionsParMois() {
        return this.utilisateurRepo.query(`
    SELECT 
      DATE_FORMAT(datdenaissance, '%Y-%m') AS mois, 
      COUNT(*) AS total
    FROM utilisateur
    GROUP BY mois
    ORDER BY mois ASC;
  `);
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utilisateur_entity_1.Utilisateur)),
    __param(1, (0, typeorm_1.InjectRepository)(annonce_client_entity_1.AnnonceClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map