import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Historique {
    id: number;
    historique_livraison: string;
    historique_commande: string;
    historique_prestataire: string;
    statut: string;
    date_entree: Date;
    utilisateur: Utilisateur;
}
