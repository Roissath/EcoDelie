"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const commande_entity_1 = require("./commande.entity");
const commande_service_1 = require("./commande.service");
const commande_controller_1 = require("./commande.controller");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const facture_entity_1 = require("../facture/facture.entity");
const livraison_entity_1 = require("../livraison/livraison.entity");
let CommandeModule = class CommandeModule {
};
exports.CommandeModule = CommandeModule;
exports.CommandeModule = CommandeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                commande_entity_1.Commande,
                utilisateur_entity_1.Utilisateur,
                facture_entity_1.Facture,
                livraison_entity_1.Livraison,
            ]),
        ],
        controllers: [commande_controller_1.CommandeController],
        providers: [commande_service_1.CommandeService],
    })
], CommandeModule);
//# sourceMappingURL=commande.module.js.map