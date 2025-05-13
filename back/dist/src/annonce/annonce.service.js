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
exports.AnnonceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const annonce_entity_1 = require("./annonce.entity");
let AnnonceService = class AnnonceService {
    annonceRepo;
    constructor(annonceRepo) {
        this.annonceRepo = annonceRepo;
    }
    create(dto) {
        const annonce = this.annonceRepo.create(dto);
        return this.annonceRepo.save(annonce);
    }
    findAll() {
        return this.annonceRepo.find({
            relations: ['utilisateur'],
        });
    }
    async findOne(id) {
        const annonce = await this.annonceRepo.findOne({
            where: { id },
            relations: ['utilisateur'],
        });
        if (!annonce)
            throw new common_1.NotFoundException('Annonce non trouvée');
        return annonce;
    }
    async update(id, dto) {
        const annonce = await this.findOne(id);
        Object.assign(annonce, dto);
        return this.annonceRepo.save(annonce);
    }
    async remove(id) {
        const annonce = await this.findOne(id);
        return this.annonceRepo.remove(annonce);
    }
    async findByType(type) {
        return this.annonceRepo.find({
            where: { type_annonce: type },
            relations: ['utilisateur'],
        });
    }
    async findPrestationWithPrestataire(id) {
        const annonce = await this.annonceRepo.findOne({
            where: { id, type_annonce: 'prestation' },
            relations: ['utilisateur'],
        });
        if (!annonce)
            throw new common_1.NotFoundException('Prestation non trouvée');
        return annonce;
    }
};
exports.AnnonceService = AnnonceService;
exports.AnnonceService = AnnonceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(annonce_entity_1.Annonce)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnnonceService);
//# sourceMappingURL=annonce.service.js.map