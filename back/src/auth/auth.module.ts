import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { InfoClientModule } from '../info-client/info-client.module';
import { InfoPrestataireModule } from 'src/info-prestataire/info-prestataire.module';
import { InfoLivreurModule } from 'src/info-livreur/info-livreur.module';
import { InfoCommercantModule } from 'src/info-commercant/info-commercant.module';
import { MailModule } from 'src/mail/mail.module';
@Module({
  imports: [

    PassportModule,
    JwtModule.register({
      secret: 'super-secret-key', // 🔐 à remplacer par une variable d'environnement dans .env
      signOptions: { expiresIn: '7d' },
    }),
    UtilisateurModule,
    AdminModule,
    InfoClientModule, 
    InfoLivreurModule,
    InfoCommercantModule,
    InfoPrestataireModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
