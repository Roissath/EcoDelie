import { InfoCommercant } from '../info-commercant/info-commercant.entity';
import { InfoPrestataire } from '../info-prestataire/info-prestataire.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Contract {
    id: number;
    titre: string;
    description: string;
    date_signature: Date;
    statut: string;
    commercant: InfoCommercant;
    prestataire: InfoPrestataire;
    utilisateur: Utilisateur;
}
