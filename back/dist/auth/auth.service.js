"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    utilisateurService;
    jwtService;
    mailService;
    constructor(utilisateurService, jwtService, mailService) {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async login(loginDto) {
        const user = await this.utilisateurService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException("Email ou mot de passe incorrect");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.mot_de_passe);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Email ou mot de passe incorrect");
        }
        const payload = { email: user.email, sub: user.id, type: user.type };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                type: user.type,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.utilisateurService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException("Un utilisateur avec cet email existe déjà");
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.utilisateurService.create({
            ...registerDto,
            mot_de_passe: hashedPassword,
        });
        return {
            message: "Utilisateur créé avec succès",
            user: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                type: user.type,
            },
        };
    }
    async getProfile(userId) {
        const user = await this.utilisateurService.findOne(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("Utilisateur non trouvé");
        }
        return {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            adresse: user.adresse,
            langue_utilise: user.langue_utilise,
            photo_profil: user.photo_profil,
            type: user.type,
            statut: user.statut,
            age: user.age,
            datdenaissance: user.datdenaissance,
            login: user.login,
        };
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.utilisateurService.findOne(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("Utilisateur non trouvé");
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.mot_de_passe);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException("Mot de passe actuel incorrect");
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.utilisateurService.update(userId, { mot_de_passe: hashedNewPassword });
        return { message: "Mot de passe modifié avec succès" };
    }
    async forgotPassword(email) {
        const user = await this.utilisateurService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException("Aucun utilisateur trouvé avec cet email");
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpires = new Date(Date.now() + 3600000);
        await this.utilisateurService.update(user.id, {
            resetToken,
            resetTokenExpires,
        });
        await this.mailService.sendResetPasswordEmail(user.email, resetToken);
        return { message: "Email de réinitialisation envoyé" };
    }
    async resetPassword(token, newPassword) {
        const user = await this.utilisateurService.findByResetToken(token);
        if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
            throw new common_1.BadRequestException("Token invalide ou expiré");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.utilisateurService.update(user.id, {
            mot_de_passe: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        });
        return { message: "Mot de passe réinitialisé avec succès" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function, Function, Function])
], AuthService);
//# sourceMappingURL=auth.service.js.map