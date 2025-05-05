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
exports.InfoLivreur = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
let InfoLivreur = class InfoLivreur {
    id;
    type_permis;
    zones_livraison;
    type_transport;
    moyen_paiement;
    statut;
    appreciation;
    verifie;
    utilisateur;
};
exports.InfoLivreur = InfoLivreur;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoLivreur.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoLivreur.prototype, "type_permis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoLivreur.prototype, "zones_livraison", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoLivreur.prototype, "type_transport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoLivreur.prototype, "moyen_paiement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoLivreur.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InfoLivreur.prototype, "appreciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InfoLivreur.prototype, "verifie", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.infoLivreur, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], InfoLivreur.prototype, "utilisateur", void 0);
exports.InfoLivreur = InfoLivreur = __decorate([
    (0, typeorm_1.Entity)()
], InfoLivreur);
//# sourceMappingURL=info-livreur.entity.js.map