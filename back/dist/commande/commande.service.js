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
exports.CommandeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const commande_entity_1 = require("./commande.entity");
let CommandeService = class CommandeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['utilisateur', 'client', 'facture', 'livraison'],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['utilisateur', 'client', 'facture', 'livraison'],
        });
    }
    getByClientId(id) {
        return this.repo.find({
            where: { client: { id } },
            relations: ['client'],
        });
    }
    getByLivreurId(id) {
        return this.repo.find({
            where: { utilisateur: { id } },
            relations: ['utilisateur'],
        });
    }
    create(dto) {
        const entity = this.repo.create({
            ...dto,
            utilisateur: { id: dto.utilisateurId },
            client: { id: dto.clientId },
            facture: dto.factureId ? { id: dto.factureId } : undefined,
        });
        return this.repo.save(entity);
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.CommandeService = CommandeService;
exports.CommandeService = CommandeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(commande_entity_1.Commande)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommandeService);
//# sourceMappingURL=commande.service.js.map