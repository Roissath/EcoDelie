import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
export declare class AuthController {
    private readonly authService;
    private readonly utilisateurService;
    constructor(authService: AuthService, utilisateurService: UtilisateurService);
    register(dto: RegisterAuthDto, res: Response): Promise<any>;
    login(dto: LoginAuthDto, res: Response): Promise<any>;
    me(req: Request): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    changePassword(req: Request, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, body: {
        password: string;
        confirmPassword: string;
    }): Promise<{
        message: string;
    }>;
}
