import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { AnnonceClient } from '../annonce-client/annonce-client.entity';
export declare class InfoLivreur {
    id: number;
    type_permis: string;
    zones_livraison?: string;
    type_transport: string;
    moyen_paiement: string;
    statut: string;
    appreciation: string;
    verifie: boolean;
    photo?: string;
    regions_livraison?: string;
    villes_livraison?: string;
    utilisateur: Utilisateur;
    annonces: AnnonceClient[];
    livreurs: InfoLivreur[];
}
