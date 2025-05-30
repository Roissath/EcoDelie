import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Admin {
    id: number;
    nom: string;
    statut: string;
    mot_de_passe: string;
    createdAt: Date;
    utilisateur: Utilisateur;
}
