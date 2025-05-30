import { Role } from 'src/enums/role.enum';
export declare class RegisterAuthDto {
    nom: string;
    prenom: string;
    age?: number;
    datdenaissance?: Date;
    email: string;
    adresse: string;
    mot_de_passe: string;
    telephone: string;
    login: string;
    langue_utilise?: string;
    type: Role;
    type_permis?: string;
    zones_livraison?: string;
    type_transport?: string;
    moyen_paiement?: string;
    types_services?: string;
    tarif_prestation?: number;
}
