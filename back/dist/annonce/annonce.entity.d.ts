import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { InfoPrestataire } from '../info-prestataire/info-prestataire.entity';
import { Paiement } from 'src/paiement/paiement.entity';
import { Colis } from '../colis/colis.entity';
export declare class Annonce {
    id: number;
    type_annonce: string;
    titre: string;
    description: string;
    date_publication: Date;
    statut: string;
    utilisateur: Utilisateur;
    infoPrestataire: InfoPrestataire[];
    paiements: Paiement[];
    colis: Colis[];
}
