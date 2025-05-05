"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const colis_entity_1 = require("./colis.entity");
const colis_service_1 = require("./colis.service");
const colis_controller_1 = require("./colis.controller");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
const entrepot_entity_1 = require("../entrepot/entrepot.entity");
const stokage_entity_1 = require("../stokage/stokage.entity");
let ColisModule = class ColisModule {
};
exports.ColisModule = ColisModule;
exports.ColisModule = ColisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                colis_entity_1.Colis,
                utilisateur_entity_1.Utilisateur,
                annonce_entity_1.Annonce,
                entrepot_entity_1.Entrepot,
                stokage_entity_1.Stokage,
            ]),
        ],
        controllers: [colis_controller_1.ColisController],
        providers: [colis_service_1.ColisService],
    })
], ColisModule);
//# sourceMappingURL=colis.module.js.map