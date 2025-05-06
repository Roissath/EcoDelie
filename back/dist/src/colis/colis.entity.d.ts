import { Entrepot } from '../entrepot/entrepot.entity';
import { Annonce } from '../annonce/annonce.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Stokage } from '../stokage/stokage.entity';
import { Commande } from 'src/commande/commande.entity';
export declare class Colis {
    id: number;
    photo?: string;
    descriptif: string;
    dimension: string;
    prix_livraison: number;
    assurance: boolean;
    statut: string;
    entrepot?: Entrepot;
    annonce?: Annonce;
    livreur?: Utilisateur;
    stokages: Stokage[];
    commande: Commande;
}
