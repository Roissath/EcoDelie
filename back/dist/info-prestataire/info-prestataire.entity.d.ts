import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Contract } from '../contract/contract.entity';
import { Annonce } from '../annonce/annonce.entity';
export declare class InfoPrestataire {
    id: number;
    types_services: string;
    certification: string;
    contractId: number;
    status: string;
    tarif_prestation: number;
    bio: string;
    competence: string;
    verifie: boolean;
    utilisateur: Utilisateur;
    contract: Contract;
    annonce: Annonce;
}
