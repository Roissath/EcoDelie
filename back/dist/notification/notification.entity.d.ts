import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Notification {
    id: number;
    contenu: string;
    email: string;
    lu: boolean;
    date_lecture?: Date;
    utilisateur: Utilisateur;
}
