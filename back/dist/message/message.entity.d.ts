import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Message {
    id: number;
    contenu: string;
    date_envoi: Date;
    lu: boolean;
    expediteur: Utilisateur;
    destinataire: Utilisateur;
}
