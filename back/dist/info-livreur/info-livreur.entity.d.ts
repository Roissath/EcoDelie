import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class InfoLivreur {
    id: number;
    type_permis: string;
    zones_livraison: string;
    type_transport: string;
    moyen_paiement: string;
    statut: string;
    appreciation: string;
    verifie: boolean;
    utilisateur: Utilisateur;
}
