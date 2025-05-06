import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Produit } from '../produit/produit.entity';
export declare class CommentaireProduit {
    id: number;
    contenu: string;
    createdAt: Date;
    utilisateur: Utilisateur;
    produit: Produit;
}
