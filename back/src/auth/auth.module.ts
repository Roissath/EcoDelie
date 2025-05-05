// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { UtilisateurModule } from '../utilisateur/utilisateur.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Utilisateur } from '../utilisateur/utilisateur.entity'; // ✅ nécessaire

// @Module({
//   imports: [
//     UtilisateurModule,
//     TypeOrmModule.forFeature([Utilisateur]), // ✅ injecte le repo
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'dev-secret',
//       signOptions: { expiresIn: '7d' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, JwtAuthGuard],
//   exports: [AuthService],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { UtilisateurController } from 'src/utilisateur/utilisateur.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])], // ✅ injecte le repo
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
  exports: [UtilisateurService, TypeOrmModule], // ✅ permet à d'autres modules d'y accéder
})
export class UtilisateurModule {}
