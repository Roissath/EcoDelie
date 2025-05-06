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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_auth_dto_ts_1 = require("./dto/register-auth.dto.ts");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const utilisateur_service_1 = require("../utilisateur/utilisateur.service");
const crypto_1 = require("crypto");
const common_2 = require("@nestjs/common");
let AuthController = class AuthController {
    authService;
    utilisateurService;
    constructor(authService, utilisateurService) {
        this.authService = authService;
        this.utilisateurService = utilisateurService;
    }
    async register(dto, res) {
        const { access_token, user } = await this.authService.register(dto);
        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return user;
    }
    async login(dto, res) {
        const { access_token, user } = await this.authService.login(dto);
        res.cookie('jwt', access_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return user;
    }
    async me(req) {
        return this.authService.me(req.user);
    }
    async logout(res) {
        res.clearCookie('jwt');
        return { message: 'Déconnecté avec succès' };
    }
    async changePassword(req, body) {
        return this.authService.changePassword(req.user, body.oldPassword, body.newPassword);
    }
    async forgotPassword(email) {
        const user = await this.utilisateurService.findByEmail(email);
        if (!user)
            return { message: 'Si cet email existe, un lien a été envoyé.' };
        const token = (0, crypto_1.randomUUID)();
        const expires = new Date(Date.now() + 1000 * 60 * 60);
        user.resetToken = token;
        user.resetTokenExpires = expires;
        await this.utilisateurService.update(user.id, user);
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        console.log('Lien de réinitialisation :', resetLink);
        return { message: 'Si cet email existe, un lien a été envoyé.' };
    }
    async resetPassword(token, body) {
        return this.authService.resetPassword(token, body.password, body.confirmPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_auth_dto_ts_1.RegisterAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password/:token'),
    __param(0, (0, common_2.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        utilisateur_service_1.UtilisateurService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map