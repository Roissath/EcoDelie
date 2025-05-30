"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StokageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stokage_entity_1 = require("./stokage.entity");
const stokage_service_1 = require("./stokage.service");
const stokage_controller_1 = require("./stokage.controller");
let StokageModule = class StokageModule {
};
exports.StokageModule = StokageModule;
exports.StokageModule = StokageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stokage_entity_1.Stokage])],
        providers: [stokage_service_1.StokageService],
        controllers: [stokage_controller_1.StokageController],
        exports: [stokage_service_1.StokageService],
    })
], StokageModule);
//# sourceMappingURL=stokage.module.js.map