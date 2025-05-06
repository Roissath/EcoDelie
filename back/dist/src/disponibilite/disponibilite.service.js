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
exports.DisponibiliteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disponibilite_entity_1 = require("./disponibilite.entity");
const typeorm_2 = require("typeorm");
let DisponibiliteService = class DisponibiliteService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const entity = this.repo.create({
            ...dto,
            utilisateur: { id: dto.utilisateurId },
        });
        return this.repo.save(entity);
    }
    findAll() {
        return this.repo.find({ relations: ['utilisateur'] });
    }
    findByUtilisateur(id) {
        return this.repo.find({
            where: { utilisateur: { id } },
            order: { jour: 'ASC' },
        });
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.repo.findOne({ where: { id } });
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.DisponibiliteService = DisponibiliteService;
exports.DisponibiliteService = DisponibiliteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disponibilite_entity_1.Disponibilite)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DisponibiliteService);
//# sourceMappingURL=disponibilite.service.js.map