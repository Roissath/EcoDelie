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
exports.InfoPrestataire = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const contract_entity_1 = require("../contract/contract.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
let InfoPrestataire = class InfoPrestataire {
    id;
    types_services;
    certification;
    contractId;
    statut;
    tarif_prestation;
    bio;
    competence;
    verifie;
    utilisateur;
    contract;
    annonce;
};
exports.InfoPrestataire = InfoPrestataire;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoPrestataire.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoPrestataire.prototype, "types_services", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InfoPrestataire.prototype, "certification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], InfoPrestataire.prototype, "contractId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'en_attente' }),
    __metadata("design:type", String)
], InfoPrestataire.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], InfoPrestataire.prototype, "tarif_prestation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InfoPrestataire.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InfoPrestataire.prototype, "competence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InfoPrestataire.prototype, "verifie", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.infoPrestataire, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], InfoPrestataire.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract, (contract) => contract.prestataire, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'contractId' }),
    __metadata("design:type", contract_entity_1.Contract)
], InfoPrestataire.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => annonce_entity_1.Annonce, (annonce) => annonce.infoPrestataire, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'annonceId' }),
    __metadata("design:type", annonce_entity_1.Annonce)
], InfoPrestataire.prototype, "annonce", void 0);
exports.InfoPrestataire = InfoPrestataire = __decorate([
    (0, typeorm_1.Entity)()
], InfoPrestataire);
//# sourceMappingURL=info-prestataire.entity.js.map