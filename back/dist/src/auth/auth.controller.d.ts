import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterAuthDto, res: Response): Promise<any>;
    login(dto: LoginAuthDto, res: Response): Promise<any>;
    me(req: Request): Promise<import("../utilisateur/utilisateur.entity").Utilisateur | null>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
