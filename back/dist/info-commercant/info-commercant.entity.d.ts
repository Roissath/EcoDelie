import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Contract } from '../contract/contract.entity';
export declare class InfoCommercant {
    id: number;
    status: string;
    adresse: string;
    appreciation: string;
    verifie: boolean;
    utilisateur: Utilisateur;
    contract: Contract;
}
