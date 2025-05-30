"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoPrestataireModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const info_prestataire_entity_1 = require("./info-prestataire.entity");
const info_prestataire_service_1 = require("./info-prestataire.service");
const info_prestataire_controller_1 = require("./info-prestataire.controller");
let InfoPrestataireModule = class InfoPrestataireModule {
};
exports.InfoPrestataireModule = InfoPrestataireModule;
exports.InfoPrestataireModule = InfoPrestataireModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([info_prestataire_entity_1.InfoPrestataire])],
        providers: [info_prestataire_service_1.InfoPrestataireService],
        controllers: [info_prestataire_controller_1.InfoPrestataireController],
        exports: [info_prestataire_service_1.InfoPrestataireService],
    })
], InfoPrestataireModule);
//# sourceMappingURL=info-prestataire.module.js.map