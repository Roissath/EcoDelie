"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrepotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entrepot_entity_1 = require("./entrepot.entity");
const entrepot_service_1 = require("./entrepot.service");
const entrepot_controller_1 = require("./entrepot.controller");
let EntrepotModule = class EntrepotModule {
};
exports.EntrepotModule = EntrepotModule;
exports.EntrepotModule = EntrepotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entrepot_entity_1.Entrepot])],
        providers: [entrepot_service_1.EntrepotService],
        controllers: [entrepot_controller_1.EntrepotController],
        exports: [entrepot_service_1.EntrepotService],
    })
], EntrepotModule);
//# sourceMappingURL=entrepot.module.js.map