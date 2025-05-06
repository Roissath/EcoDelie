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
exports.Colis = void 0;
const typeorm_1 = require("typeorm");
const entrepot_entity_1 = require("../entrepot/entrepot.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const stokage_entity_1 = require("../stokage/stokage.entity");
const commande_entity_1 = require("../commande/commande.entity");
let Colis = class Colis {
    id;
    photo;
    descriptif;
    dimension;
    prix_livraison;
    assurance;
    statut;
    entrepot;
    annonce;
    livreur;
    stokages;
    commande;
};
exports.Colis = Colis;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Colis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Colis.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Colis.prototype, "descriptif", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Colis.prototype, "dimension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Colis.prototype, "prix_livraison", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Colis.prototype, "assurance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Colis.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entrepot_entity_1.Entrepot, (entrepot) => entrepot.colis, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'entrepotId' }),
    __metadata("design:type", entrepot_entity_1.Entrepot)
], Colis.prototype, "entrepot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => annonce_entity_1.Annonce, (annonce) => annonce.colis, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'annonceId' }),
    __metadata("design:type", annonce_entity_1.Annonce)
], Colis.prototype, "annonce", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (livreur) => livreur.colisLivreur, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'livreurId' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Colis.prototype, "livreur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stokage_entity_1.Stokage, (stokage) => stokage.colis),
    __metadata("design:type", Array)
], Colis.prototype, "stokages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => commande_entity_1.Commande, (commande) => commande.colis),
    __metadata("design:type", commande_entity_1.Commande)
], Colis.prototype, "commande", void 0);
exports.Colis = Colis = __decorate([
    (0, typeorm_1.Entity)()
], Colis);
//# sourceMappingURL=colis.entity.js.map