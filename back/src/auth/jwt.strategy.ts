import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type } from 'os';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //  Lecture du token depuis les cookies HTTP-only
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.jwt || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key', //  remplace en prod par process.env
    });
  }

  //  Ce que tu retrouves dans req.user
  async validate(payload: any) {
    const { sub, email, type } = payload
    if (!type) {
      console.warn(' JWT sans type !', payload)
    }
    return { id: sub, email, type }
  }
  
  
}
