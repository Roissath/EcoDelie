import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { MailService } from 'src/mail/mail.service';
export declare class AuthController {
    private readonly authService;
    private readonly utilisateurService;
    private readonly mailService;
    constructor(authService: AuthService, utilisateurService: UtilisateurService, mailService: MailService);
    register(dto: RegisterAuthDto, res: Response): Promise<any>;
    login(dto: LoginAuthDto, res: Response): Promise<{
        message: string;
        user: any;
    }>;
    getMe(req: Request): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | import("../admin/admin.entity").Admin | import("../info-client/info-client.entity").InfoClient | import("../info-prestataire/info-prestataire.entity").InfoPrestataire | import("../info-livreur/info-livreur.entity").InfoLivreur | import("../info-commercant/info-commercant.entity").InfoCommercant>;
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
    resetPassword(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
