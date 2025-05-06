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
exports.ContractService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const contract_entity_1 = require("./contract.entity");
const typeorm_2 = require("typeorm");
let ContractService = class ContractService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['utilisateur', 'prestataires', 'commercants'],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['utilisateur', 'prestataires', 'commercants'],
        });
    }
    create(dto) {
        const entity = this.repo.create({
            ...dto,
            utilisateur: { id: dto.utilisateurId },
        });
        return this.repo.save(entity);
    }
    async update(id, dto) {
        const data = { ...dto };
        if (dto.utilisateurId) {
            data.utilisateur = { id: dto.utilisateurId };
            delete data.utilisateurId;
        }
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContractService);
//# sourceMappingURL=contract.service.js.map