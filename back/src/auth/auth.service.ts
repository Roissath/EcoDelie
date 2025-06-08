// import { Injectable, UnauthorizedException, ConflictException,BadRequestException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UtilisateurService } from '../utilisateur/utilisateur.service';
// import { RegisterAuthDto } from './dto/register-auth.dto.ts';
// import { LoginAuthDto } from './dto/login-auth.dto';
// import { Role } from 'src/enums/role.enum';
// import { AdminService } from 'src/admin/admin.service';
// import { InfoClientService } from 'src/info-client/info-client.service';
// import { InfoLivreurService } from 'src/info-livreur/info-livreur.service';
// import { InfoCommercantService } from 'src/info-commercant/info-commercant.service';
// import { InfoPrestataireService } from 'src/info-prestataire/info-prestataire.service';
// import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
// import { MailService } from 'src/mail/mail.service';
// import { type } from 'os';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly utilisateurService: UtilisateurService,
//     private readonly jwtService: JwtService,
//     private readonly adminService: AdminService,
//     private readonly infoClientService: InfoClientService,
//     private readonly infoLivreurService: InfoLivreurService,
//     private readonly infoCommercantService: InfoCommercantService,
//     private readonly infoPrestataireService: InfoPrestataireService,
//     private readonly mailService: MailService,
//   ) {}
  

//   async register(dto: RegisterAuthDto) {
//     const existingUser = await this.utilisateurService.findByEmail(dto.email);
//     if (existingUser) {
//       throw new ConflictException('Cet email est déjà utilisé');
//     }
  
//     const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);
  
    
//     const parsedDto = {
//   ...dto,
//   tarif_prestation: dto.tarif_prestation ? Number(dto.tarif_prestation) : undefined,
//   age: dto.age ? Number(dto.age) : undefined,
//   type: dto.type as Role,
//   mot_de_passe: hashedPassword,
// };

// const user = await this.utilisateurService.create(parsedDto);

  
// await this.mailService.sendWelcomeEmail(user.email, user.nom);
  
//     return this.buildToken(user);
//   }
  

//   async login(dto: LoginAuthDto) {
//     const user = await this.utilisateurService.findByEmail(dto.email);
//     if (!user) throw new UnauthorizedException('Email introuvable');

//     const isMatch = await bcrypt.compare(dto.mot_de_passe, user.mot_de_passe);
//     if (!isMatch) throw new UnauthorizedException('Mot de passe incorrect');

//     return this.buildToken(user);
//   }

//   async buildToken(user: any) {
//     const payload = {
//       sub: user.id,
//       email: user.email,
//       type: user.type, // <- Ce champ doit bien être là
//     };
  
//     const access_token = this.jwtService.sign(payload);
//     return { access_token, user };
//   }
  
  

//   async me(payload: any) {
//     return this.utilisateurService.findOne(payload.sub);
//   }

//   async getMe(id: number) {
//     return this.utilisateurService.findOne(id);
//   }
   

 
//   async changePassword(userPayload: any, oldPassword: string, newPassword: string) {
//     const user = await this.utilisateurService.findOne(userPayload.id);

//     if (!user) {
//       throw new UnauthorizedException('Utilisateur introuvable');
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.mot_de_passe);
//     if (!isMatch) {
//       throw new UnauthorizedException('Ancien mot de passe incorrect');
//     }

//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.mot_de_passe = hashed;

//     return this.utilisateurService.update(user.id, user);
//   }


//   async findByEmail(email: string) {
//     return this.utilisateurService.findByEmail(email);
//   }
  
//   async resetPassword(token: string, password: string, confirmPassword: string) {
//     if (password !== confirmPassword) {
//       throw new BadRequestException("Les mots de passe ne correspondent pas");
//     }
  
//     const user = await this.utilisateurService.findByResetToken(token);
//     if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
//       throw new BadRequestException("Lien invalide ou expiré");
//     }
  
//     user.mot_de_passe = await bcrypt.hash(password, 10);
//     user.resetToken = null;
//     user.resetTokenExpires = null;
  
//     await this.utilisateurService.update(user.id, user);
//     return { message: "Mot de passe mis à jour avec succès" };
//   }  

//   async getProfilSelonRole(utilisateur: Utilisateur) {
//   const user = await this.utilisateurService.findOne(utilisateur.id);
//   if (!user) {
//     throw new UnauthorizedException('Utilisateur introuvable');
//   }

//   switch (user.type) {
//     case Role.Admin: {
//       const profil = await this.adminService.findByUtilisateurId(user.id);
//       return { ...user, profil }; // merge les deux
//     }
//     case Role.Client: {
//       const profil = await this.infoClientService.findByUtilisateurId(user.id);
//       return { ...user, profil };
//     }
//     case Role.Livreur: {
//       const profil = await this.infoLivreurService.findByUtilisateurId(user.id);
//       return { ...user, profil };
//     }
//     case Role.Commercant: {
//       const profil = await this.infoCommercantService.findByUtilisateurId(user.id);
//       return { ...user, profil };
//     }
//     case Role.Prestataire: {
//       const profil = await this.infoPrestataireService.findByUtilisateurId(user.id);
//       return { ...user, profil };
//     }
//     default:
//       return user;
//   }
// }

  
  
  
// }
import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { UtilisateurService } from "../utilisateur/utilisateur.service"
import type { LoginAuthDto } from "./dto/login-auth.dto"
import type { RegisterAuthDto } from "./dto/register-auth.dto.ts"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import type { MailService } from "../mail/mail.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(loginDto: LoginAuthDto) {
    const user = await this.utilisateurService.findByEmail(loginDto.email)
    if (!user) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.mot_de_passe)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    const payload = { email: user.email, sub: user.id, type: user.type }
    const token = this.jwtService.sign(payload)

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        type: user.type,
      },
    }
  }

  async register(registerDto: RegisterAuthDto) {
    const existingUser = await this.utilisateurService.findByEmail(registerDto.email)
    if (existingUser) {
      throw new BadRequestException("Un utilisateur avec cet email existe déjà")
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const user = await this.utilisateurService.create({
      ...registerDto,
      mot_de_passe: hashedPassword,
    })

    return {
      message: "Utilisateur créé avec succès",
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        type: user.type,
      },
    }
  }

  async getProfile(userId: number) {
    const user = await this.utilisateurService.findOne(userId)
    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé")
    }

    // Retourner toutes les informations nécessaires
    return {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      adresse: user.adresse,
      langue_utilise: user.langue_utilise,
      photo_profil: user.photo_profil,
      type: user.type,
      statut: user.statut,
      age: user.age,
      datdenaissance: user.datdenaissance,
      login: user.login,
    }
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.utilisateurService.findOne(userId)
    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé")
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.mot_de_passe)
    if (!isCurrentPasswordValid) {
      throw new BadRequestException("Mot de passe actuel incorrect")
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.utilisateurService.update(userId, { mot_de_passe: hashedNewPassword })

    return { message: "Mot de passe modifié avec succès" }
  }

  async forgotPassword(email: string) {
    const user = await this.utilisateurService.findByEmail(email)
    if (!user) {
      throw new BadRequestException("Aucun utilisateur trouvé avec cet email")
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpires = new Date(Date.now() + 3600000) // 1 heure

    await this.utilisateurService.update(user.id, {
      resetToken,
      resetTokenExpires,
    })

    await this.mailService.sendResetPasswordEmail(user.email, resetToken)

    return { message: "Email de réinitialisation envoyé" }
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.utilisateurService.findByResetToken(token)
    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new BadRequestException("Token invalide ou expiré")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await this.utilisateurService.update(user.id, {
      mot_de_passe: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    })

    return { message: "Mot de passe réinitialisé avec succès" }
  }
}
