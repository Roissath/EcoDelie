import type { JwtService } from "@nestjs/jwt";
import type { UtilisateurService } from "../utilisateur/utilisateur.service";
import type { LoginAuthDto } from "./dto/login-auth.dto";
import type { RegisterAuthDto } from "./dto/register-auth.dto.ts";
import type { MailService } from "../mail/mail.service";
export declare class AuthService {
    private readonly utilisateurService;
    private readonly jwtService;
    private readonly mailService;
    constructor(utilisateurService: UtilisateurService, jwtService: JwtService, mailService: MailService);
    login(loginDto: LoginAuthDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            nom: string;
            prenom: string;
            type: import("../enums/role.enum").Role;
        };
    }>;
    register(registerDto: RegisterAuthDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            nom: string;
            prenom: string;
            type: import("../enums/role.enum").Role;
        };
    }>;
    getProfile(userId: number): Promise<{
        id: number;
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        adresse: string;
        langue_utilise: string;
        photo_profil: string;
        type: import("../enums/role.enum").Role;
        statut: string;
        age: number;
        datdenaissance: Date;
        login: string;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
