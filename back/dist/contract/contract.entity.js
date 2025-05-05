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
exports.Contract = void 0;
const typeorm_1 = require("typeorm");
const info_commercant_entity_1 = require("../info-commercant/info-commercant.entity");
const info_prestataire_entity_1 = require("../info-prestataire/info-prestataire.entity");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const typeorm_2 = require("typeorm");
let Contract = class Contract {
    id;
    titre;
    description;
    date_signature;
    statut;
    commercant;
    prestataire;
    utilisateur;
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Contract.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Contract.prototype, "date_signature", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_commercant_entity_1.InfoCommercant, (commercant) => commercant.contract),
    __metadata("design:type", info_commercant_entity_1.InfoCommercant)
], Contract.prototype, "commercant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_prestataire_entity_1.InfoPrestataire, (prestataire) => prestataire.contract),
    __metadata("design:type", info_prestataire_entity_1.InfoPrestataire)
], Contract.prototype, "prestataire", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.contrats, { onDelete: 'CASCADE' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Contract.prototype, "utilisateur", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)()
], Contract);
//# sourceMappingURL=contract.entity.js.map