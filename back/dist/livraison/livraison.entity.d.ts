import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';
export declare class Livraison {
    id: number;
    date_livraison: Date;
    adresse: string;
    statut: string;
    client: Utilisateur;
    livreur?: Utilisateur;
    commande: Commande;
    commandeId: number;
}
