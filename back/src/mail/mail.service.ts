import { Injectable, Logger } from '@nestjs/common';
import * as SibApiV3Sdk from '@sendinblue/client';

@Injectable()
export class MailService {
  private readonly sib = new SibApiV3Sdk.TransactionalEmailsApi();
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.sib.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.SENDINBLUE_API_KEY!,
    );
  }

  async sendWelcomeEmail(to: string, name: string) {
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
    } catch (error) {
      this.logger.error(`Échec de l'envoi du mail à ${to}`, error);
    }
  }

  async sendPasswordResetEmail(to: string, token: string) {
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
    } catch (error) {
      this.logger.error(`Échec de l'envoi de réinitialisation à ${to}`, error);
    }
  }
}
