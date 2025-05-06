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
exports.Facture = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const commande_entity_1 = require("../commande/commande.entity");
let Facture = class Facture {
    id;
    mois;
    montant_total;
    date_generation;
    statut;
    pdf_url;
    utilisateur;
    commandes;
};
exports.Facture = Facture;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_facture' }),
    __metadata("design:type", Number)
], Facture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Facture.prototype, "mois", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Facture.prototype, "montant_total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Facture.prototype, "date_generation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Facture.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Facture.prototype, "pdf_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.factures, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Facture.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commande_entity_1.Commande, (c) => c.facture),
    __metadata("design:type", Array)
], Facture.prototype, "commandes", void 0);
exports.Facture = Facture = __decorate([
    (0, typeorm_1.Entity)()
], Facture);
//# sourceMappingURL=facture.entity.js.map