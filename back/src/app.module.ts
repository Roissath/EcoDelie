import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { StatsModule } from './utilisateur/stats/stats.module';

import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { InfoClientModule } from './info-client/info-client.module';
import { InfoPrestataireModule } from './info-prestataire/info-prestataire.module';
import { InfoLivreurModule } from './info-livreur/info-livreur.module';
import { InfoCommercantModule } from './info-commercant/info-commercant.module';
import { ProduitModule } from './produit/produit.module';
import { CommandeModule } from './commande/commande.module';
import { FactureModule } from './facture/facture.module';
import { AnnonceModule } from './annonce/annonce.module';
import { AnnonceClientModule } from './annonce-client/annonce-client.module';
import { ColisModule } from './colis/colis.module';
import { PaiementModule } from './paiement/paiement.module';
import { DisponibiliteModule } from './disponibilite/disponibilite.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { NotificationModule } from './notification/notification.module';
import { HistoriqueModule } from './historique/historique.module';
import { MessageModule } from './message/message.module';
import { EntrepotModule } from './entrepot/entrepot.module';
import { StokageModule } from './stokage/stokage.module';
import { CommentaireProduitModule } from './commentaire-produit/commentaire-produit.module';
import { DocumentModule } from './document/document.module';
import { UtilisateurController } from './utilisateur/utilisateur.controller';
import { AdminController } from './admin/admin.controller';
import { InfoClientController } from './info-client/info-client.controller';
import { InfoLivreurController } from './info-livreur/info-livreur.controller';
import { AdminModule } from './admin/admin.module';
import { ContractModule } from './contract/contract.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecodeli',
      autoLoadEntities: true,
      synchronize: true, // Cela modifie ta base à chaque lancement
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'tonemail@gmail.com',
          pass: 'motdepasseoumotdepasseapplication',
        },
      },
      defaults: {
        from: '"EcoDeli" <tonemail@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
     MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AdminModule,
    MailerModule,
    StatsModule,
    DocumentModule,
    AuthModule, // ← ce module doit être présent
    UtilisateurModule,
    InfoClientModule,
    InfoLivreurModule,
    InfoPrestataireModule,
    InfoCommercantModule,
    ProduitModule,
    CommandeModule,
    FactureModule,
    ContractModule,
    AnnonceModule,
    AnnonceClientModule,
    ColisModule,
    PaiementModule,
    DisponibiliteModule,
    AbonnementModule,
    NotificationModule,
    HistoriqueModule,
    MessageModule,
    EntrepotModule,
    StokageModule,
    CommentaireProduitModule,
  ],
  controllers: [
    AppController,
    UtilisateurController,
    AdminController,
    InfoClientController,
    InfoLivreurController,
  ],
  providers: [AppService],
})

export class AppModule {}
