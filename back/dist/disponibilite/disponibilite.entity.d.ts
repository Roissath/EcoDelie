import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Disponibilite {
    id: number;
    jour: string;
    heure_debut: string;
    heure_fin: string;
    utilisateur: Utilisateur;
}
