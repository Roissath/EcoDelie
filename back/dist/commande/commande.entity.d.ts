import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Facture } from '../facture/facture.entity';
import { Livraison } from '../livraison/livraison.entity';
import { Produit } from '../produit/produit.entity';
import { Colis } from '../colis/colis.entity';
export declare class Commande {
    id: number;
    statut: string;
    date_commande: Date;
    prix_unitaire: number;
    utilisateur: Utilisateur;
    client: Utilisateur;
    colis: Colis;
    facture?: Facture;
    livraison: Livraison;
    produits: Produit[];
}
