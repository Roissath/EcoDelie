import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Facture } from '../facture/facture.entity';
import { Livraison } from '../livraison/livraison.entity';
export declare class Commande {
    id: number;
    statut: string;
    date_commande: Date;
    prix_unitaire: number;
    utilisateur: Utilisateur;
    client: Utilisateur;
    facture?: Facture;
    livraison: Livraison;
}
