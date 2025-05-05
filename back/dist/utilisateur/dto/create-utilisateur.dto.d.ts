import { Role } from '../../enums/role.enum';
export declare class CreateUtilisateurDto {
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
}
