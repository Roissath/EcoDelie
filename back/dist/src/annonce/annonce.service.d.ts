import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
export declare class AnnonceService {
    private readonly repo;
    constructor(repo: Repository<Annonce>);
    findAll(): Promise<Annonce[]>;
    findOne(id: number): Promise<Annonce | null>;
    create(dto: CreateAnnonceDto): Promise<Annonce>;
    update(id: number, dto: UpdateAnnonceDto): Promise<Annonce | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
