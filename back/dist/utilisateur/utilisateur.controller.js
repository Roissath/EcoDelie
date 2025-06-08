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
exports.UtilisateurController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let UtilisateurController = class UtilisateurController {
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
    validerProfil(id) {
        return this.service.update(id, { statut: 'valide' });
    }
    rejeterProfil(id) {
        return this.service.update(id, { statut: 'rejeté' });
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
    async uploadPhoto(id, file) {
        if (!file) {
            throw new Error("Aucun fichier fourni");
        }
        const utilisateur = await this.service.findOne(id);
        if (!utilisateur) {
            throw new Error("Utilisateur non trouvé");
        }
        const photoPath = `/uploads/${file.filename}`;
        await this.service.update(id, { photo_profil: photoPath });
        return {
            message: "Photo mise à jour avec succès",
            photo_profil: photoPath,
            photo_url: photoPath,
        };
    }
};
exports.UtilisateurController = UtilisateurController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/valider-profil'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "validerProfil", null);
__decorate([
    (0, common_1.Patch)(':id/rejeter-profil'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "rejeterProfil", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtilisateurController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/photo"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: "./public/uploads",
            filename: (req, file, cb) => {
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `user-${Date.now()}${ext}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "uploadPhoto", null);
exports.UtilisateurController = UtilisateurController = __decorate([
    (0, common_1.Controller)("utilisateurs"),
    __metadata("design:paramtypes", [Function])
], UtilisateurController);
//# sourceMappingURL=utilisateur.controller.js.map