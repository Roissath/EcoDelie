import { CommentaireProduitService } from './commentaire-produit.service';
import { CreateCommentaireProduitDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireProduitDto } from './dto/update-commentaire-produit.dto';
export declare class CommentaireProduitController {
    private readonly service;
    constructor(service: CommentaireProduitService);
    findAll(): Promise<import("./commentaire-produit.entity").CommentaireProduit[]>;
    findOne(id: number): Promise<import("./commentaire-produit.entity").CommentaireProduit | null>;
    create(dto: CreateCommentaireProduitDto): Promise<import("./commentaire-produit.entity").CommentaireProduit>;
    update(id: number, dto: UpdateCommentaireProduitDto): Promise<import("./commentaire-produit.entity").CommentaireProduit | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
