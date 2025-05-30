import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Param } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
      private readonly utilisateurService: UtilisateurService,
      private readonly mailService: MailService,){}

  @Post('register')
  async register(
    @Body() dto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.register(dto);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false, //  passe à true en production avec HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });
    return user;
  }

  @Post('login')
async login(
  @Body() dto: LoginAuthDto,
  @Res({ passthrough: true }) res: Response,
) {
  const { access_token, user } = await this.authService.login(dto);

  res.cookie('jwt', access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    message: 'Connexion réussie',
    user, // ← assure-toi que ceci est bien "admin"
  };
}


@Get('me')
@UseGuards(JwtAuthGuard)
async getMe(@Req() req: Request) {
  console.log("USER JWT PAYLOAD :", req['user']) // ← vérifie ici dans le terminal
  const utilisateur = req['user'];
  return this.authService.getProfilSelonRole(utilisateur);
}


  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Déconnecté avec succès' };
  }
  @Patch('change-password')
@UseGuards(JwtAuthGuard)
async changePassword(
  @Req() req: Request,
  @Body() body: { oldPassword: string; newPassword: string },
) {
  return this.authService.changePassword(req.user, body.oldPassword, body.newPassword);
}

@Post('forgot-password')
async forgotPassword(@Body('email') email: string) {
  const user = await this.utilisateurService.findByEmail(email);
  if (!user) return { message: 'Si cet email existe, un lien a été envoyé.' };

  const token = randomUUID(); // nécessite `import { randomUUID } from 'crypto';`
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1h

  user.resetToken = token;
  user.resetTokenExpires = expires;
  await this.utilisateurService.update(user.id, user);

  const resetLink = `http://localhost:3000/reset-password/${token}`;
await this.mailService.sendPasswordResetEmail(user.email, token);

  return { message: 'Si cet email existe, un lien a été envoyé.' };
}


@Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    return this.authService.resetPassword(token, password, confirmPassword);
  }

}
