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
exports.Annonce = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const info_prestataire_entity_1 = require("../info-prestataire/info-prestataire.entity");
const paiement_entity_1 = require("../paiement/paiement.entity");
const colis_entity_1 = require("../colis/colis.entity");
let Annonce = class Annonce {
    id;
    type_annonce;
    titre;
    description;
    date_publication;
    statut;
    utilisateur;
    infoPrestataire;
    paiements;
    colis;
};
exports.Annonce = Annonce;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_annonce' }),
    __metadata("design:type", Number)
], Annonce.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Annonce.prototype, "type_annonce", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Annonce.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Annonce.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Annonce.prototype, "date_publication", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Annonce.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.annonces, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'utilisateurId' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Annonce.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => info_prestataire_entity_1.InfoPrestataire, (info) => info.annonce),
    __metadata("design:type", Array)
], Annonce.prototype, "infoPrestataire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paiement_entity_1.Paiement, (paiement) => paiement.annonce),
    __metadata("design:type", Array)
], Annonce.prototype, "paiements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => colis_entity_1.Colis, (colis) => colis.annonce),
    __metadata("design:type", Array)
], Annonce.prototype, "colis", void 0);
exports.Annonce = Annonce = __decorate([
    (0, typeorm_1.Entity)()
], Annonce);
//# sourceMappingURL=annonce.entity.js.map