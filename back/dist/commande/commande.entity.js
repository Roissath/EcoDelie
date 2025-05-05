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
exports.Commande = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const facture_entity_1 = require("../facture/facture.entity");
const livraison_entity_1 = require("../livraison/livraison.entity");
let Commande = class Commande {
    id;
    statut;
    date_commande;
    prix_unitaire;
    utilisateur;
    client;
    facture;
    livraison;
};
exports.Commande = Commande;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_commande' }),
    __metadata("design:type", Number)
], Commande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Commande.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Commande.prototype, "date_commande", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Commande.prototype, "prix_unitaire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.commandes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Commande.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.commandesClient, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_client' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Commande.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facture_entity_1.Facture, (f) => f.commandes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'factureId' }),
    __metadata("design:type", facture_entity_1.Facture)
], Commande.prototype, "facture", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => livraison_entity_1.Livraison, (l) => l.commande),
    __metadata("design:type", livraison_entity_1.Livraison)
], Commande.prototype, "livraison", void 0);
exports.Commande = Commande = __decorate([
    (0, typeorm_1.Entity)()
], Commande);
//# sourceMappingURL=commande.entity.js.map