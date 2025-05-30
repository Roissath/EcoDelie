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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const utilisateur_service_1 = require("../utilisateur/utilisateur.service");
const role_enum_1 = require("../enums/role.enum");
const admin_service_1 = require("../admin/admin.service");
const info_client_service_1 = require("../info-client/info-client.service");
const info_livreur_service_1 = require("../info-livreur/info-livreur.service");
const info_commercant_service_1 = require("../info-commercant/info-commercant.service");
const info_prestataire_service_1 = require("../info-prestataire/info-prestataire.service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    utilisateurService;
    jwtService;
    adminService;
    infoClientService;
    infoLivreurService;
    infoCommercantService;
    infoPrestataireService;
    mailService;
    constructor(utilisateurService, jwtService, adminService, infoClientService, infoLivreurService, infoCommercantService, infoPrestataireService, mailService) {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.infoClientService = infoClientService;
        this.infoLivreurService = infoLivreurService;
        this.infoCommercantService = infoCommercantService;
        this.infoPrestataireService = infoPrestataireService;
        this.mailService = mailService;
    }
    async register(dto) {
        const existingUser = await this.utilisateurService.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Cet email est déjà utilisé');
        }
        const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);
        const parsedDto = {
            ...dto,
            tarif_prestation: dto.tarif_prestation ? Number(dto.tarif_prestation) : undefined,
            age: dto.age ? Number(dto.age) : undefined,
            type: dto.type,
            mot_de_passe: hashedPassword,
        };
        const user = await this.utilisateurService.create(parsedDto);
        await this.mailService.sendWelcomeEmail(user.email, user.nom);
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
            type: user.type,
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
    async changePassword(userPayload, oldPassword, newPassword) {
        const user = await this.utilisateurService.findOne(userPayload.id);
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.mot_de_passe);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Ancien mot de passe incorrect');
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        user.mot_de_passe = hashed;
        return this.utilisateurService.update(user.id, user);
    }
    async findByEmail(email) {
        return this.utilisateurService.findByEmail(email);
    }
    async resetPassword(token, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException("Les mots de passe ne correspondent pas");
        }
        const user = await this.utilisateurService.findByResetToken(token);
        if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
            throw new common_1.BadRequestException("Lien invalide ou expiré");
        }
        user.mot_de_passe = await bcrypt.hash(password, 10);
        user.resetToken = null;
        user.resetTokenExpires = null;
        await this.utilisateurService.update(user.id, user);
        return { message: "Mot de passe mis à jour avec succès" };
    }
    async getProfilSelonRole(utilisateur) {
        const user = await this.utilisateurService.findOne(utilisateur.id);
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        switch (user.type) {
            case role_enum_1.Role.Admin: {
                const profil = await this.adminService.findByUtilisateurId(user.id);
                return profil ?? user;
            }
            case role_enum_1.Role.Client: {
                const profil = await this.infoClientService.findByUtilisateurId(user.id);
                return profil ?? user;
            }
            case role_enum_1.Role.Livreur: {
                const profil = await this.infoLivreurService.findByUtilisateurId(user.id);
                return profil ?? user;
            }
            case role_enum_1.Role.Commercant: {
                const profil = await this.infoCommercantService.findByUtilisateurId(user.id);
                return profil ?? user;
            }
            case role_enum_1.Role.Prestataire: {
                const profil = await this.infoPrestataireService.findByUtilisateurId(user.id);
                return profil ?? user;
            }
            default:
                return user;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService,
        jwt_1.JwtService,
        admin_service_1.AdminService,
        info_client_service_1.InfoClientService,
        info_livreur_service_1.InfoLivreurService,
        info_commercant_service_1.InfoCommercantService,
        info_prestataire_service_1.InfoPrestataireService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map