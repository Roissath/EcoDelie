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
exports.CommentaireProduit = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const produit_entity_1 = require("../produit/produit.entity");
let CommentaireProduit = class CommentaireProduit {
    id;
    contenu;
    createdAt;
    utilisateur;
    produit;
};
exports.CommentaireProduit = CommentaireProduit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentaireProduit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentaireProduit.prototype, "contenu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentaireProduit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.commentairesProduit, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'utilisateurId' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], CommentaireProduit.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produit_entity_1.Produit, (p) => p.commentaires, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'produitId' }),
    __metadata("design:type", produit_entity_1.Produit)
], CommentaireProduit.prototype, "produit", void 0);
exports.CommentaireProduit = CommentaireProduit = __decorate([
    (0, typeorm_1.Entity)()
], CommentaireProduit);
//# sourceMappingURL=commentaire-produit.entity.js.map