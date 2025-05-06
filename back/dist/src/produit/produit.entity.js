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
exports.Produit = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const commentaire_produit_entity_1 = require("../commentaire-produit/commentaire-produit.entity");
const commande_entity_1 = require("../commande/commande.entity");
let Produit = class Produit {
    id;
    nom;
    descriptif;
    image;
    date_publication;
    prix;
    stock;
    categorie;
    utilisateur;
    commentaires;
    commandes;
};
exports.Produit = Produit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produit.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produit.prototype, "descriptif", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produit.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Produit.prototype, "date_publication", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Produit.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Produit.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produit.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.produits),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Produit.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentaire_produit_entity_1.CommentaireProduit, (c) => c.produit, { cascade: true }),
    __metadata("design:type", Array)
], Produit.prototype, "commentaires", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => commande_entity_1.Commande, (commande) => commande.produits),
    __metadata("design:type", Array)
], Produit.prototype, "commandes", void 0);
exports.Produit = Produit = __decorate([
    (0, typeorm_1.Entity)()
], Produit);
//# sourceMappingURL=produit.entity.js.map