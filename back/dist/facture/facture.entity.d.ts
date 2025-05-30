import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';
export declare class Facture {
    id: number;
    mois: string;
    montant_total: number;
    date_generation: Date;
    statut: string;
    pdf_url: string;
    utilisateur: Utilisateur;
    commandes: Commande[];
}
