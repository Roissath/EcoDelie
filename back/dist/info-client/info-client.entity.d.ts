import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class InfoClient {
    id: number;
    type_abonnement?: string;
    moyen_paiement?: string;
    historique_commande?: string;
    appreciation?: string;
    statut?: string;
    descriptif_profil?: string;
    age?: number;
    utilisateur: Utilisateur;
}
