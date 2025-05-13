import { Repository } from 'typeorm';
import { Produit } from './produit.entity';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto.tsupdate-produit.dto';
export declare class ProduitService {
    private readonly repo;
    constructor(repo: Repository<Produit>);
    create(dto: CreateProduitDto): Promise<Produit>;
    findAllPublic(): Promise<Produit[]>;
    findByCommercantId(id: number): Promise<Produit[]>;
    update(id: number, dto: UpdateProduitDto): Promise<Produit | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findOne(id: number): Promise<Produit | null>;
    findByCategorie(categorie: string): Promise<Produit[]>;
    findFullById(id: number): Promise<{
        produit: Produit;
        commentaires: import("../commentaire-produit/commentaire-produit.entity").CommentaireProduit[];
        similaires: Produit[];
    } | null>;
}
