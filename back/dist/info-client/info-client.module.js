"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoClientModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const info_client_entity_1 = require("./info-client.entity");
const info_client_service_1 = require("./info-client.service");
const info_client_controller_1 = require("./info-client.controller");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
let InfoClientModule = class InfoClientModule {
};
exports.InfoClientModule = InfoClientModule;
exports.InfoClientModule = InfoClientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([info_client_entity_1.InfoClient, utilisateur_entity_1.Utilisateur])],
        providers: [info_client_service_1.InfoClientService],
        controllers: [info_client_controller_1.InfoClientController],
        exports: [info_client_service_1.InfoClientService],
    })
], InfoClientModule);
//# sourceMappingURL=info-client.module.js.map