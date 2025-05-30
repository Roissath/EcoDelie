import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Annonce } from '../annonce/annonce.entity';
export declare class Paiement {
    id: number;
    montant: number;
    date_paiement: Date;
    moyen_paiement: string;
    statut: string;
    reference: string;
    utilisateur: Utilisateur;
    annonce: Annonce;
}
