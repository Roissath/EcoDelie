"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommercantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const info_commercant_entity_1 = require("./info-commercant.entity");
const info_commercant_service_1 = require("./info-commercant.service");
const info_commercant_controller_1 = require("./info-commercant.controller");
let InfoCommercantModule = class InfoCommercantModule {
};
exports.InfoCommercantModule = InfoCommercantModule;
exports.InfoCommercantModule = InfoCommercantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([info_commercant_entity_1.InfoCommercant])],
        providers: [info_commercant_service_1.InfoCommercantService],
        controllers: [info_commercant_controller_1.InfoCommercantController],
        exports: [info_commercant_service_1.InfoCommercantService],
    })
], InfoCommercantModule);
//# sourceMappingURL=info-commercant.module.js.map