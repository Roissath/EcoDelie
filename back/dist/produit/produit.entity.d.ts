import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { CommentaireProduit } from '../commentaire-produit/commentaire-produit.entity';
export declare class Produit {
    id: number;
    nom: string;
    descriptif: string;
    date_publication: Date;
    prix: number;
    stock: number;
    categorie: string;
    utilisateur: Utilisateur;
    commentaires: CommentaireProduit[];
}
