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
exports.Paiement = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
let Paiement = class Paiement {
    id;
    montant;
    date_paiement;
    moyen_paiement;
    statut;
    reference;
    utilisateur;
    annonce;
};
exports.Paiement = Paiement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_paiement' }),
    __metadata("design:type", Number)
], Paiement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Paiement.prototype, "montant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Paiement.prototype, "date_paiement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paiement.prototype, "moyen_paiement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paiement.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paiement.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.paiements, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Paiement.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => annonce_entity_1.Annonce, (a) => a.paiements, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_anonce' }),
    __metadata("design:type", annonce_entity_1.Annonce)
], Paiement.prototype, "annonce", void 0);
exports.Paiement = Paiement = __decorate([
    (0, typeorm_1.Entity)()
], Paiement);
//# sourceMappingURL=paiement.entity.js.map