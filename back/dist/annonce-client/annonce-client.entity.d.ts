import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { InfoLivreur } from '../info-livreur/info-livreur.entity';
export declare class AnnonceClient {
    id: number;
    lieu_depart: string;
    lieu_arrivee: string;
    poids_estime: number;
    prix_livraison: number;
    colis_fragile: boolean;
    type_annonce: 'livraison' | 'course';
    magasin?: string;
    liste_courses?: string;
    date_course?: Date;
    datePublication: Date;
    datePriseEnCharge?: Date;
    dateLivraison?: Date;
    livreurs: InfoLivreur[];
    utilisateur: Utilisateur;
}
