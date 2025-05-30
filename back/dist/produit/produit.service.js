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
exports.ProduitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produit_entity_1 = require("./produit.entity");
const typeorm_3 = require("typeorm");
let ProduitService = class ProduitService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const produit = this.repo.create({
            ...dto,
            utilisateur: { id: dto.utilisateurId },
        });
        return this.repo.save(produit);
    }
    findAllPublic() {
        return this.repo.find({
            where: {
                stock: (0, typeorm_3.MoreThan)(0),
            },
            relations: ['utilisateur', 'commentaires'],
        });
    }
    findByCommercantId(id) {
        return this.repo.find({
            where: {
                utilisateur: { id },
            },
            relations: ['commentaires'],
        });
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.repo.findOne({ where: { id } });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['utilisateur'],
        });
    }
    async findByCategorie(categorie) {
        return this.repo.find({
            where: { categorie },
            relations: ['utilisateur'],
        });
    }
    async findFullById(id) {
        const produit = await this.repo.findOne({
            where: { id },
            relations: ['utilisateur', 'commentaires'],
        });
        if (!produit)
            return null;
        const similaires = await this.repo.find({
            where: { categorie: produit.categorie },
            relations: ['utilisateur'],
            take: 6,
        });
        return {
            produit,
            commentaires: produit.commentaires,
            similaires: similaires.filter(p => p.id !== produit.id),
        };
    }
};
exports.ProduitService = ProduitService;
exports.ProduitService = ProduitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produit_entity_1.Produit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProduitService);
//# sourceMappingURL=produit.service.js.map