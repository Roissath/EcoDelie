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
exports.ColisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const colis_entity_1 = require("./colis.entity");
let ColisService = class ColisService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['livreur', 'entrepot', 'annonce', 'stokages'],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['livreur', 'entrepot', 'annonce', 'stokages'],
        });
    }
    findByClientId(id) {
        return this.repo.find({
            where: {
                annonce: {
                    utilisateur: { id },
                },
            },
            relations: ['annonce', 'annonce.utilisateur', 'stokages'],
        });
    }
    findByLivreurId(id) {
        return this.repo.find({
            where: {
                livreur: { id },
            },
            relations: ['livreur', 'entrepot', 'stokages'],
        });
    }
    create(dto) {
        const entity = this.repo.create({
            ...dto,
            entrepot: dto.entrepotId ? { id: dto.entrepotId } : undefined,
            annonce: dto.annonceId ? { id: dto.annonceId } : undefined,
            livreur: dto.livreurId ? { id: dto.livreurId } : undefined,
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
exports.ColisService = ColisService;
exports.ColisService = ColisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(colis_entity_1.Colis)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColisService);
//# sourceMappingURL=colis.service.js.map