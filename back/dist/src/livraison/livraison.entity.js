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
exports.Livraison = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const commande_entity_1 = require("../commande/commande.entity");
let Livraison = class Livraison {
    id;
    date_livraison;
    adresse;
    statut;
    client;
    livreur;
    commande;
    commandeId;
};
exports.Livraison = Livraison;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Livraison.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Livraison.prototype, "date_livraison", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Livraison.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Livraison.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.livraisonsClient, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Livraison.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.livraisons, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'livreurId' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Livraison.prototype, "livreur", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => commande_entity_1.Commande, (commande) => commande.livraison, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'commandeId' }),
    __metadata("design:type", commande_entity_1.Commande)
], Livraison.prototype, "commande", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Livraison.prototype, "commandeId", void 0);
exports.Livraison = Livraison = __decorate([
    (0, typeorm_1.Entity)()
], Livraison);
//# sourceMappingURL=livraison.entity.js.map