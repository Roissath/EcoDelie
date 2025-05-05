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
exports.AbonnementController = void 0;
const common_1 = require("@nestjs/common");
const abonnement_service_1 = require("./abonnement.service");
const create_abonnement_dto_1 = require("./dto/create-abonnement.dto");
const update_abonnement_dto_1 = require("./dto/update-abonnement.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../comon/guards/roles.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
let AbonnementController = class AbonnementController {
    abonnementService;
    constructor(abonnementService) {
        this.abonnementService = abonnementService;
    }
    create(dto) {
        return this.abonnementService.create(dto);
    }
    findAll() {
        return this.abonnementService.findAll();
    }
    findByClient(id) {
        return this.abonnementService.findByClientId(id);
    }
    update(id, dto) {
        return this.abonnementService.update(id, dto);
    }
    remove(id) {
        return this.abonnementService.remove(id);
    }
};
exports.AbonnementController = AbonnementController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_abonnement_dto_1.CreateAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbonnementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AbonnementController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_abonnement_dto_1.UpdateAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AbonnementController.prototype, "remove", null);
exports.AbonnementController = AbonnementController = __decorate([
    (0, common_1.Controller)('abonnement'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [abonnement_service_1.AbonnementService])
], AbonnementController);
//# sourceMappingURL=abonnement.controller.js.map