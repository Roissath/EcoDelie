import { CommentaireProduit } from './commentaire-produit.entity';
import { Repository } from 'typeorm';
import { CreateCommentaireProduitDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireProduitDto } from './dto/update-commentaire-produit.dto';
export declare class CommentaireProduitService {
    private readonly repo;
    constructor(repo: Repository<CommentaireProduit>);
    findAll(): Promise<CommentaireProduit[]>;
    findOne(id: number): Promise<CommentaireProduit | null>;
    create(dto: CreateCommentaireProduitDto): Promise<CommentaireProduit>;
    update(id: number, dto: UpdateCommentaireProduitDto): Promise<CommentaireProduit | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
