"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnonceClientModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const annonce_client_entity_1 = require("./annonce-client.entity");
const annonce_client_service_1 = require("./annonce-client.service");
const annonce_client_controller_1 = require("./annonce-client.controller");
let AnnonceClientModule = class AnnonceClientModule {
};
exports.AnnonceClientModule = AnnonceClientModule;
exports.AnnonceClientModule = AnnonceClientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([annonce_client_entity_1.AnnonceClient])],
        providers: [annonce_client_service_1.AnnonceClientService],
        controllers: [annonce_client_controller_1.AnnonceClientController],
        exports: [annonce_client_service_1.AnnonceClientService],
    })
], AnnonceClientModule);
//# sourceMappingURL=annonce-client.module.js.map