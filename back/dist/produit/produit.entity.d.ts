import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { CommentaireProduit } from '../commentaire-produit/commentaire-produit.entity';
import { Commande } from '../commande/commande.entity';
export declare class Produit {
    id: number;
    nom: string;
    descriptif: string;
    image?: string;
    date_publication: Date;
    prix: number;
    stock: number;
    categorie: string;
    utilisateur: Utilisateur;
    commentaires: CommentaireProduit[];
    commandes: Commande[];
}
