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
exports.CommandeController = void 0;
const common_1 = require("@nestjs/common");
const commande_service_1 = require("./commande.service");
const create_commande_dto_1 = require("./dto/create-commande.dto");
const update_commande_dto_1 = require("./dto/update-commande.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../comon/guards/roles.guard");
const roles_decorator_1 = require("../comon/decorators/roles.decorator");
let CommandeController = class CommandeController {
    commandeService;
    constructor(commandeService) {
        this.commandeService = commandeService;
    }
    create(dto) {
        return this.commandeService.create(dto);
    }
    getCommandesClient(id) {
        return this.commandeService.getByClientId(id);
    }
    getCommandesLivreur(id) {
        return this.commandeService.getByLivreurId(id);
    }
    getAllCommandes() {
        return this.commandeService.findAll();
    }
    updateCommande(id, dto) {
        return this.commandeService.update(id, dto);
    }
};
exports.CommandeController = CommandeController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commande_dto_1.CreateCommandeDto]),
    __metadata("design:returntype", void 0)
], CommandeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    (0, roles_decorator_1.Roles)('client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommandeController.prototype, "getCommandesClient", null);
__decorate([
    (0, common_1.Get)('livreur/:id'),
    (0, roles_decorator_1.Roles)('livreur'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommandeController.prototype, "getCommandesLivreur", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommandeController.prototype, "getAllCommandes", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_commande_dto_1.UpdateCommandeDto]),
    __metadata("design:returntype", void 0)
], CommandeController.prototype, "updateCommande", null);
exports.CommandeController = CommandeController = __decorate([
    (0, common_1.Controller)('commande'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [commande_service_1.CommandeService])
], CommandeController);
//# sourceMappingURL=commande.controller.js.map