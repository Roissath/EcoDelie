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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const utilisateur_service_1 = require("../utilisateur/utilisateur.service");
let AuthService = class AuthService {
    utilisateurService;
    jwtService;
    constructor(utilisateurService, jwtService) {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);
        const user = await this.utilisateurService.create({
            ...dto,
            type: dto.type,
            mot_de_passe: hashedPassword,
        });
        return this.buildToken(user);
    }
    async login(dto) {
        const user = await this.utilisateurService.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Email introuvable');
        const isMatch = await bcrypt.compare(dto.mot_de_passe, user.mot_de_passe);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Mot de passe incorrect');
        return this.buildToken(user);
    }
    async buildToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.type,
        };
        const access_token = this.jwtService.sign(payload);
        return { access_token, user };
    }
    async me(payload) {
        return this.utilisateurService.findOne(payload.sub);
    }
    async getMe(id) {
        return this.utilisateurService.findOne(id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map