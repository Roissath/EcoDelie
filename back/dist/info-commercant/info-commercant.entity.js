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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommercant = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const contract_entity_1 = require("../contract/contract.entity");
let InfoCommercant = class InfoCommercant {
    id;
    status;
    adresse;
    appreciation;
    verifie;
    utilisateur;
    contract;
};
exports.InfoCommercant = InfoCommercant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoCommercant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoCommercant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoCommercant.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InfoCommercant.prototype, "appreciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InfoCommercant.prototype, "verifie", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.infoCommercant, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], InfoCommercant.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract, (contract) => contract.commercant, { nullable: true }),
    __metadata("design:type", contract_entity_1.Contract)
], InfoCommercant.prototype, "contract", void 0);
exports.InfoCommercant = InfoCommercant = __decorate([
    (0, typeorm_1.Entity)()
], InfoCommercant);
//# sourceMappingURL=info-commercant.entity.js.map