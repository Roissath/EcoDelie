"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stats_controller_1 = require("./stats.controller");
const stats_service_1 = require("./stats.service");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const annonce_client_entity_1 = require("../annonce-client/annonce-client.entity");
const produit_entity_1 = require("../produit/produit.entity");
const livraison_entity_1 = require("../livraison/livraison.entity");
const colis_entity_1 = require("../colis/colis.entity");
const stokage_entity_1 = require("../stokage/stokage.entity");
const message_entity_1 = require("../message/message.entity");
const notification_entity_1 = require("../notification/notification.entity");
const document_entity_1 = require("../document/document.entity");
const commande_entity_1 = require("../commande/commande.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
let StatsModule = class StatsModule {
};
exports.StatsModule = StatsModule;
exports.StatsModule = StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                utilisateur_entity_1.Utilisateur,
                annonce_client_entity_1.AnnonceClient,
                annonce_entity_1.Annonce,
                produit_entity_1.Produit,
                livraison_entity_1.Livraison,
                colis_entity_1.Colis,
                stokage_entity_1.Stokage,
                message_entity_1.Message,
                notification_entity_1.Notification,
                document_entity_1.Document,
                commande_entity_1.Commande,
            ]),
        ],
        controllers: [stats_controller_1.StatsController],
        providers: [stats_service_1.StatsService],
        exports: [stats_service_1.StatsService],
    })
], StatsModule);
//# sourceMappingURL=stats.module.js.map