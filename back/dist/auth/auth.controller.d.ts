import type { AuthService } from "./auth.service";
import type { LoginAuthDto } from "./dto/login-auth.dto";
import type { RegisterAuthDto } from "./dto/register-auth.dto.ts";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    changePassword(req: any, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
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
}
