"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const SibApiV3Sdk = require("@sendinblue/client");
let MailService = MailService_1 = class MailService {
    sib = new SibApiV3Sdk.TransactionalEmailsApi();
    logger = new common_1.Logger(MailService_1.name);
    constructor() {
        this.sib.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY);
    }
    async sendWelcomeEmail(to, name) {
        try {
            await this.sib.sendTransacEmail({
                sender: { name: 'EcoDeli', email: 'wroissath@gmail.com' },
                to: [{ email: to }],
                subject: 'Bienvenue chez EcoDeli 🎉',
                htmlContent: `
          <div style="font-family:sans-serif;">
            <h2 style="color:#0070C0;">Bonjour ${name},</h2>
            <p>Bienvenue sur EcoDeli ! Votre compte a bien été créé.</p>
            <p>Vous pouvez maintenant profiter de nos services.</p>
            <p style="font-size:13px; color:gray;">L'équipe EcoDeli</p>
          </div>
        `,
            });
            this.logger.log(`Mail de bienvenue envoyé à ${to}`);
        }
        catch (error) {
            this.logger.error(`Échec de l'envoi du mail à ${to}`, error);
        }
    }
    async sendPasswordResetEmail(to, token) {
        try {
            const resetLink = `http://localhost:3000/reset-password/${token}`;
            await this.sib.sendTransacEmail({
                sender: { name: 'EcoDeli', email: 'wroissath@gmail.com' },
                to: [{ email: to }],
                subject: 'Réinitialisation de mot de passe',
                htmlContent: `
          <p>Bonjour,</p>
          <p>Cliquez ici pour réinitialiser votre mot de passe :</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Ce lien expire dans 1 heure.</p>
        `,
            });
            this.logger.log(`Mail de réinitialisation envoyé à ${to}`);
        }
        catch (error) {
            this.logger.error(`Échec de l'envoi de réinitialisation à ${to}`, error);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map