import { Utilisateur } from '../utilisateur/utilisateur.entity';
export declare class Document {
    id: number;
    type_document: string;
    url: string;
    statut: string;
    commentaire?: string;
    date_upload: Date;
    utilisateur: Utilisateur;
    utilisateurId: number;
}
