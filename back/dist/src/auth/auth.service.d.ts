import { JwtService } from '@nestjs/jwt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private readonly utilisateurService;
    private readonly jwtService;
    constructor(utilisateurService: UtilisateurService, jwtService: JwtService);
    register(dto: RegisterAuthDto): Promise<{
        access_token: string;
        user: any;
    }>;
    login(dto: LoginAuthDto): Promise<{
        access_token: string;
        user: any;
    }>;
    buildToken(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    me(payload: any): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    getMe(id: number): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    changePassword(userPayload: any, oldPassword: string, newPassword: string): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    findByEmail(email: string): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    resetPassword(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
