"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoLivreurController = void 0;
const common_1 = require("@nestjs/common");
const info_livreur_service_1 = require("./info-livreur.service");
const create_info_livreur_dto_1 = require("./dto/create-info-livreur.dto");
const update_info_livreur_dto_1 = require("./dto/update-info-livreur.dto");
let InfoLivreurController = class InfoLivreurController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(+id);
    }
    update(id, dto) {
        return this.service.update(+id, dto);
    }
    valider(id) {
        return this.service.valider(+id);
    }
    rejeter(id) {
        return this.service.rejeter(+id);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.InfoLivreurController = InfoLivreurController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_info_livreur_dto_1.CreateInfoLivreurDto]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_info_livreur_dto_1.UpdateInfoLivreurDto]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/valider'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "valider", null);
__decorate([
    (0, common_1.Patch)(':id/rejeter'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "rejeter", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoLivreurController.prototype, "remove", null);
exports.InfoLivreurController = InfoLivreurController = __decorate([
    (0, common_1.Controller)('info-livreur'),
    __metadata("design:paramtypes", [info_livreur_service_1.InfoLivreurService])
], InfoLivreurController);
//# sourceMappingURL=info-livreur.controller.js.map