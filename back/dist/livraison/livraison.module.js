"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivraisonModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const livraison_entity_1 = require("./livraison.entity");
const livraison_service_1 = require("./livraison.service");
const livraison_controller_1 = require("./livraison.controller");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const commande_entity_1 = require("../commande/commande.entity");
let LivraisonModule = class LivraisonModule {
};
exports.LivraisonModule = LivraisonModule;
exports.LivraisonModule = LivraisonModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([livraison_entity_1.Livraison, utilisateur_entity_1.Utilisateur, commande_entity_1.Commande])],
        providers: [livraison_service_1.LivraisonService],
        controllers: [livraison_controller_1.LivraisonController],
        exports: [livraison_service_1.LivraisonService],
    })
], LivraisonModule);
//# sourceMappingURL=livraison.module.js.map