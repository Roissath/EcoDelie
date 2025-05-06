"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriqueModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historique_entity_1 = require("./historique.entity");
const historique_service_1 = require("./historique.service");
const historique_controller_1 = require("./historique.controller");
let HistoriqueModule = class HistoriqueModule {
};
exports.HistoriqueModule = HistoriqueModule;
exports.HistoriqueModule = HistoriqueModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([historique_entity_1.Historique])],
        providers: [historique_service_1.HistoriqueService],
        controllers: [historique_controller_1.HistoriqueController],
        exports: [historique_service_1.HistoriqueService],
    })
], HistoriqueModule);
//# sourceMappingURL=historique.module.js.map