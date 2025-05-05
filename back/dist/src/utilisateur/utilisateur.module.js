"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utilisateur_entity_1 = require("./utilisateur.entity");
const utilisateur_service_1 = require("./utilisateur.service");
const utilisateur_controller_1 = require("./utilisateur.controller");
let UtilisateurModule = class UtilisateurModule {
};
exports.UtilisateurModule = UtilisateurModule;
exports.UtilisateurModule = UtilisateurModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([utilisateur_entity_1.Utilisateur])],
        providers: [utilisateur_service_1.UtilisateurService],
        controllers: [utilisateur_controller_1.UtilisateurController],
        exports: [utilisateur_service_1.UtilisateurService],
    })
], UtilisateurModule);
//# sourceMappingURL=utilisateur.module.js.map