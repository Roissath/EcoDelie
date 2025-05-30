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
exports.UtilisateurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utilisateur_entity_1 = require("./utilisateur.entity");
const info_client_service_1 = require("../info-client/info-client.service");
const info_livreur_service_1 = require("../info-livreur/info-livreur.service");
const info_prestataire_service_1 = require("../info-prestataire/info-prestataire.service");
const info_commercant_service_1 = require("../info-commercant/info-commercant.service");
const role_enum_1 = require("../enums/role.enum");
let UtilisateurService = class UtilisateurService {
    repo;
    infoClientService;
    infoLivreurService;
    infoPrestataireService;
    infoCommercantService;
    constructor(repo, infoClientService, infoLivreurService, infoPrestataireService, infoCommercantService) {
        this.repo = repo;
        this.infoClientService = infoClientService;
        this.infoLivreurService = infoLivreurService;
        this.infoPrestataireService = infoPrestataireService;
        this.infoCommercantService = infoCommercantService;
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    findByEmail(email) {
        return this.repo.findOne({ where: { email } });
    }
    async create(dto) {
        const user = this.repo.create(dto);
        await this.repo.save(user);
        switch (user.type) {
            case role_enum_1.Role.Client:
                await this.infoClientService.create({
                    utilisateurId: user.id,
                    statut: 'en_attente',
                    adresse: user.adresse,
                });
                break;
            case role_enum_1.Role.Livreur:
                await this.infoLivreurService.create({
                    utilisateurId: user.id,
                    statut: 'en_attente',
                    adresse: user.adresse,
                    type_permis: dto.type_permis,
                    zones_livraison: dto.zones_livraison,
                    type_transport: dto.type_transport,
                    moyen_paiement: dto.moyen_paiement,
                });
                break;
            case role_enum_1.Role.Prestataire:
                await this.infoPrestataireService.create({
                    utilisateurId: user.id,
                    statut: 'en_attente',
                    adresse: user.adresse,
                    types_services: dto.types_services,
                    tarif_prestation: dto.tarif_prestation,
                });
                break;
            case role_enum_1.Role.Commercant:
                await this.infoCommercantService.create({
                    utilisateurId: user.id,
                    statut: 'en_attente',
                    adresse: user.adresse,
                });
                break;
        }
        return user;
    }
    async update(id, dto) {
        await this.repo.save({ id, ...dto });
        return this.findOne(id);
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async findByResetToken(token) {
        return this.repo.findOne({ where: { resetToken: token } });
    }
    async validerProfil(id) {
        await this.repo.update(id, { statut: 'valide' });
        return this.findOne(id);
    }
    async rejeterProfil(id) {
        await this.repo.update(id, { statut: 'rejete' });
        return this.findOne(id);
    }
};
exports.UtilisateurService = UtilisateurService;
exports.UtilisateurService = UtilisateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utilisateur_entity_1.Utilisateur)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        info_client_service_1.InfoClientService,
        info_livreur_service_1.InfoLivreurService,
        info_prestataire_service_1.InfoPrestataireService,
        info_commercant_service_1.InfoCommercantService])
], UtilisateurService);
//# sourceMappingURL=utilisateur.service.js.map