import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Abonnement {
    id: number;
    type_abonnement: string;
    date_debut: Date;
    date_fin: Date;
    statut: string;
    utilisateur: Utilisateur;
}
