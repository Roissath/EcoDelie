import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto.ts';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.register(dto);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false, // ✅ passe à true en production avec HTTPS
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
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return this.authService.me(req.user);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Déconnecté avec succès' };
  }
}
