import { Injectable, UnauthorizedException, ConflictException,BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Role } from 'src/enums/role.enum';
import { AdminService } from 'src/admin/admin.service';
import { InfoClientService } from 'src/info-client/info-client.service';
import { InfoLivreurService } from 'src/info-livreur/info-livreur.service';
import { InfoCommercantService } from 'src/info-commercant/info-commercant.service';
import { InfoPrestataireService } from 'src/info-prestataire/info-prestataire.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { MailService } from 'src/mail/mail.service';
import { type } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly infoClientService: InfoClientService,
    private readonly infoLivreurService: InfoLivreurService,
    private readonly infoCommercantService: InfoCommercantService,
    private readonly infoPrestataireService: InfoPrestataireService,
    private readonly mailService: MailService,
  ) {}
  

  async register(dto: RegisterAuthDto) {
    const existingUser = await this.utilisateurService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }
  
    const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);
  
    
    const parsedDto = {
  ...dto,
  tarif_prestation: dto.tarif_prestation ? Number(dto.tarif_prestation) : undefined,
  age: dto.age ? Number(dto.age) : undefined,
  type: dto.type as Role,
  mot_de_passe: hashedPassword,
};

const user = await this.utilisateurService.create(parsedDto);

  
await this.mailService.sendWelcomeEmail(user.email, user.nom);
  
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
      type: user.type, // <- Ce champ doit bien être là
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
   

 
  async changePassword(userPayload: any, oldPassword: string, newPassword: string) {
    const user = await this.utilisateurService.findOne(userPayload.id);

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.mot_de_passe);
    if (!isMatch) {
      throw new UnauthorizedException('Ancien mot de passe incorrect');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.mot_de_passe = hashed;

    return this.utilisateurService.update(user.id, user);
  }


  async findByEmail(email: string) {
    return this.utilisateurService.findByEmail(email);
  }
  
  async resetPassword(token: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new BadRequestException("Les mots de passe ne correspondent pas");
    }
  
    const user = await this.utilisateurService.findByResetToken(token);
    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new BadRequestException("Lien invalide ou expiré");
    }
  
    user.mot_de_passe = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
  
    await this.utilisateurService.update(user.id, user);
    return { message: "Mot de passe mis à jour avec succès" };
  }  

  async getProfilSelonRole(utilisateur: Utilisateur) {
  const user = await this.utilisateurService.findOne(utilisateur.id);
  if (!user) {
    throw new UnauthorizedException('Utilisateur introuvable');
  }

  switch (user.type) {
    case Role.Admin: {
      const profil = await this.adminService.findByUtilisateurId(user.id);
      return profil ?? user;
    }
    case Role.Client: {
      const profil = await this.infoClientService.findByUtilisateurId(user.id);
      return profil ?? user;
    }
    case Role.Livreur: {
      const profil = await this.infoLivreurService.findByUtilisateurId(user.id);
      return profil ?? user;
    }
    case Role.Commercant: {
      const profil = await this.infoCommercantService.findByUtilisateurId(user.id);
      return profil ?? user;
    }
    case Role.Prestataire: {
      const profil = await this.infoPrestataireService.findByUtilisateurId(user.id);
      return profil ?? user;
    }
    default:
      return user;
  }
}

  
  
  
  
}
