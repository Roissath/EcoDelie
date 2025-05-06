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
exports.ColisController = void 0;
const common_1 = require("@nestjs/common");
const colis_service_1 = require("./colis.service");
const create_colis_dto_1 = require("./dto/create-colis.dto");
const update_colis_dto_1 = require("./dto/update-colis.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../comon/guards/roles.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
let ColisController = class ColisController {
    colisService;
    constructor(colisService) {
        this.colisService = colisService;
    }
    create(dto) {
        return this.colisService.create(dto);
    }
    getColisClient(id) {
        return this.colisService.findByClientId(id);
    }
    getColisLivreur(id) {
        return this.colisService.findByLivreurId(id);
    }
    getAll() {
        return this.colisService.findAll();
    }
    update(id, dto) {
        return this.colisService.update(id, dto);
    }
};
exports.ColisController = ColisController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_colis_dto_1.CreateColisDto]),
    __metadata("design:returntype", void 0)
], ColisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColisController.prototype, "getColisClient", null);
__decorate([
    (0, common_1.Get)('livreur/:id'),
    (0, roles_decorator_1.Roles)('livreur'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColisController.prototype, "getColisLivreur", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColisController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_colis_dto_1.UpdateColisDto]),
    __metadata("design:returntype", void 0)
], ColisController.prototype, "update", null);
exports.ColisController = ColisController = __decorate([
    (0, common_1.Controller)('colis'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [colis_service_1.ColisService])
], ColisController);
//# sourceMappingURL=colis.controller.js.map