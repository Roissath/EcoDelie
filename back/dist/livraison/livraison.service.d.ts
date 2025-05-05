import { Livraison } from './livraison.entity';
import { Repository } from 'typeorm';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
export declare class LivraisonService {
    private readonly repo;
    constructor(repo: Repository<Livraison>);
    findAll(): Promise<Livraison[]>;
    findOne(id: number): Promise<Livraison | null>;
    create(dto: CreateLivraisonDto): Promise<Livraison>;
    update(id: number, dto: UpdateLivraisonDto): Promise<Livraison | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
