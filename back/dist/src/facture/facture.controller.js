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
exports.FactureController = void 0;
const common_1 = require("@nestjs/common");
const facture_service_1 = require("./facture.service");
const create_facture_dto_1 = require("./dto/create-facture.dto");
const update_facture_dto_1 = require("./dto/update-facture.dto");
const roles_guard_1 = require("../comon/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
let FactureController = class FactureController {
    factureService;
    constructor(factureService) {
        this.factureService = factureService;
    }
    findAll() {
        return this.factureService.findAll();
    }
    findByClient(id) {
        return this.factureService.findByClientId(id);
    }
    create(dto) {
        return this.factureService.create(dto);
    }
    update(id, dto) {
        return this.factureService.update(id, dto);
    }
    remove(id) {
        return this.factureService.remove(id);
    }
    generatePdf(id) {
        return this.factureService.generateAndSavePdf(+id);
    }
};
exports.FactureController = FactureController;
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facture_dto_1.CreateFactureDto]),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_facture_dto_1.UpdateFactureDto]),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('generate-pdf/:id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FactureController.prototype, "generatePdf", null);
exports.FactureController = FactureController = __decorate([
    (0, common_1.Controller)('facture'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [facture_service_1.FactureService])
], FactureController);
//# sourceMappingURL=facture.controller.js.map