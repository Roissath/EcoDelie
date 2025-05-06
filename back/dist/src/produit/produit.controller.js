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
exports.ProduitController = void 0;
const common_1 = require("@nestjs/common");
const produit_service_1 = require("./produit.service");
const create_produit_dto_1 = require("./dto/create-produit.dto");
const update_produit_dto_tsupdate_produit_dto_1 = require("./dto/update-produit.dto.tsupdate-produit.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../comon/guards/roles.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
let ProduitController = class ProduitController {
    produitService;
    constructor(produitService) {
        this.produitService = produitService;
    }
    create(dto) {
        return this.produitService.create(dto);
    }
    findAllPublic() {
        return this.produitService.findAllPublic();
    }
    findByCommercant(id) {
        return this.produitService.findByCommercantId(id);
    }
    update(id, dto) {
        return this.produitService.update(id, dto);
    }
    remove(id) {
        return this.produitService.remove(id);
    }
    findOne(id) {
        return this.produitService.findOne(+id);
    }
    findByCategorie(categorie) {
        return this.produitService.findByCategorie(categorie);
    }
};
exports.ProduitController = ProduitController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('commercant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_produit_dto_1.CreateProduitDto]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)('/commercant/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('commercant'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findByCommercant", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('commercant', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_produit_dto_tsupdate_produit_dto_1.UpdateProduitDto]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('commercant', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/categorie/:categorie'),
    __param(0, (0, common_1.Param)('categorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findByCategorie", null);
exports.ProduitController = ProduitController = __decorate([
    (0, common_1.Controller)('produit'),
    __metadata("design:paramtypes", [produit_service_1.ProduitService])
], ProduitController);
//# sourceMappingURL=produit.controller.js.map