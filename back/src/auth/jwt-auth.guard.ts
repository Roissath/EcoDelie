import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//  Garde qui protège les routes avec stratégie 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
