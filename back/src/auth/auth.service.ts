import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Role } from 'src/enums/role.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);
    const user = await this.utilisateurService.create({
      ...dto,
      type: dto.type as Role,
      mot_de_passe: hashedPassword,
    });
    return this.buildToken(user);
  }

  async login(dto: LoginAuthDto) {
    const user = await this.utilisateurService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Email introuvable');

    const isMatch = await bcrypt.compare(dto.mot_de_passe, user.mot_de_passe);
    if (!isMatch) throw new UnauthorizedException('Mot de passe incorrect');

    return this.buildToken(user);
  }

  async buildToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.type,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token, user };
  }

  async me(payload: any) {
    return this.utilisateurService.findOne(payload.sub);
  }

  async getMe(id: number) {
    return this.utilisateurService.findOne(id);
  }
}
