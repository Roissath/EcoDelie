"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const platform_express_1 = require("@nestjs/platform-express");
const stats_module_1 = require("./stats/stats.module");
const utilisateur_module_1 = require("./utilisateur/utilisateur.module");
const info_client_module_1 = require("./info-client/info-client.module");
const info_prestataire_module_1 = require("./info-prestataire/info-prestataire.module");
const info_livreur_module_1 = require("./info-livreur/info-livreur.module");
const info_commercant_module_1 = require("./info-commercant/info-commercant.module");
const produit_module_1 = require("./produit/produit.module");
const commande_module_1 = require("./commande/commande.module");
const facture_module_1 = require("./facture/facture.module");
const annonce_module_1 = require("./annonce/annonce.module");
const annonce_client_module_1 = require("./annonce-client/annonce-client.module");
const colis_module_1 = require("./colis/colis.module");
const paiement_module_1 = require("./paiement/paiement.module");
const disponibilite_module_1 = require("./disponibilite/disponibilite.module");
const abonnement_module_1 = require("./abonnement/abonnement.module");
const notification_module_1 = require("./notification/notification.module");
const historique_module_1 = require("./historique/historique.module");
const message_module_1 = require("./message/message.module");
const entrepot_module_1 = require("./entrepot/entrepot.module");
const stokage_module_1 = require("./stokage/stokage.module");
const commentaire_produit_module_1 = require("./commentaire-produit/commentaire-produit.module");
const document_module_1 = require("./document/document.module");
const utilisateur_controller_1 = require("./utilisateur/utilisateur.controller");
const admin_controller_1 = require("./admin/admin.controller");
const info_client_controller_1 = require("./info-client/info-client.controller");
const info_livreur_controller_1 = require("./info-livreur/info-livreur.controller");
const admin_module_1 = require("./admin/admin.module");
const contract_module_1 = require("./contract/contract.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'ecodeli',
                autoLoadEntities: true,
                synchronize: true,
            }),
            mailer_1.MailerModule.forRoot({
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
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            admin_module_1.AdminModule,
            mailer_1.MailerModule,
            stats_module_1.StatsModule,
            document_module_1.DocumentModule,
            auth_module_1.AuthModule,
            utilisateur_module_1.UtilisateurModule,
            info_client_module_1.InfoClientModule,
            info_livreur_module_1.InfoLivreurModule,
            info_prestataire_module_1.InfoPrestataireModule,
            info_commercant_module_1.InfoCommercantModule,
            produit_module_1.ProduitModule,
            commande_module_1.CommandeModule,
            facture_module_1.FactureModule,
            contract_module_1.ContractModule,
            annonce_module_1.AnnonceModule,
            annonce_client_module_1.AnnonceClientModule,
            colis_module_1.ColisModule,
            paiement_module_1.PaiementModule,
            disponibilite_module_1.DisponibiliteModule,
            abonnement_module_1.AbonnementModule,
            notification_module_1.NotificationModule,
            historique_module_1.HistoriqueModule,
            message_module_1.MessageModule,
            entrepot_module_1.EntrepotModule,
            stokage_module_1.StokageModule,
            commentaire_produit_module_1.CommentaireProduitModule,
        ],
        controllers: [
            app_controller_1.AppController,
            utilisateur_controller_1.UtilisateurController,
            admin_controller_1.AdminController,
            info_client_controller_1.InfoClientController,
            info_livreur_controller_1.InfoLivreurController,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map