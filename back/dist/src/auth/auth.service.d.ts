import { JwtService } from '@nestjs/jwt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AdminService } from 'src/admin/admin.service';
import { InfoClientService } from 'src/info-client/info-client.service';
import { InfoLivreurService } from 'src/info-livreur/info-livreur.service';
import { InfoCommercantService } from 'src/info-commercant/info-commercant.service';
import { InfoPrestataireService } from 'src/info-prestataire/info-prestataire.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private readonly utilisateurService;
    private readonly jwtService;
    private readonly adminService;
    private readonly infoClientService;
    private readonly infoLivreurService;
    private readonly infoCommercantService;
    private readonly infoPrestataireService;
    private readonly mailService;
    constructor(utilisateurService: UtilisateurService, jwtService: JwtService, adminService: AdminService, infoClientService: InfoClientService, infoLivreurService: InfoLivreurService, infoCommercantService: InfoCommercantService, infoPrestataireService: InfoPrestataireService, mailService: MailService);
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
    me(payload: any): Promise<Utilisateur | null>;
    getMe(id: number): Promise<Utilisateur | null>;
    changePassword(userPayload: any, oldPassword: string, newPassword: string): Promise<Utilisateur | null>;
    findByEmail(email: string): Promise<Utilisateur | null>;
    resetPassword(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
    getProfilSelonRole(utilisateur: Utilisateur): Promise<import("../admin/admin.entity").Admin | Utilisateur | import("../info-client/info-client.entity").InfoClient | import("../info-livreur/info-livreur.entity").InfoLivreur | import("../info-prestataire/info-prestataire.entity").InfoPrestataire | import("../info-commercant/info-commercant.entity").InfoCommercant>;
}
