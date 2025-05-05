"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaireProduitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const commentaire_produit_entity_1 = require("./commentaire-produit.entity");
const commentaire_produit_service_1 = require("./commentaire-produit.service");
const commentaire_produit_controller_1 = require("./commentaire-produit.controller");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const produit_entity_1 = require("../produit/produit.entity");
let CommentaireProduitModule = class CommentaireProduitModule {
};
exports.CommentaireProduitModule = CommentaireProduitModule;
exports.CommentaireProduitModule = CommentaireProduitModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([commentaire_produit_entity_1.CommentaireProduit, utilisateur_entity_1.Utilisateur, produit_entity_1.Produit])],
        controllers: [commentaire_produit_controller_1.CommentaireProduitController],
        providers: [commentaire_produit_service_1.CommentaireProduitService],
    })
], CommentaireProduitModule);
//# sourceMappingURL=commentaire-produit.module.js.map