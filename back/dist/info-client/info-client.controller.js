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
exports.InfoClientController = void 0;
const common_1 = require("@nestjs/common");
const info_client_service_1 = require("./info-client.service");
const create_info_client_dto_1 = require("./dto/create-info-client.dto");
const update_info_client_dto_1 = require("./dto/update-info-client.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
const roles_guard_1 = require("../comon/guards/roles.guard");
let InfoClientController = class InfoClientController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, req) {
        return this.service.create({ ...dto, utilisateurId: req.user.id });
    }
    find(req) {
        return this.service.findByUtilisateur(req.user.id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.InfoClientController = InfoClientController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_info_client_dto_1.CreateInfoClientDto, Object]),
    __metadata("design:returntype", void 0)
], InfoClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoClientController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_info_client_dto_1.UpdateInfoClientDto]),
    __metadata("design:returntype", void 0)
], InfoClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InfoClientController.prototype, "remove", null);
exports.InfoClientController = InfoClientController = __decorate([
    (0, common_1.Controller)('info-client'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('client'),
    __metadata("design:paramtypes", [info_client_service_1.InfoClientService])
], InfoClientController);
//# sourceMappingURL=info-client.controller.js.map