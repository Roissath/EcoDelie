import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
export declare class AnnonceService {
    private readonly annonceRepo;
    constructor(annonceRepo: Repository<Annonce>);
    create(dto: CreateAnnonceDto): Promise<Annonce>;
    findAll(): Promise<Annonce[]>;
    findOne(id: number): Promise<Annonce>;
    update(id: number, dto: UpdateAnnonceDto): Promise<Annonce>;
    remove(id: number): Promise<Annonce>;
    findByType(type: string): Promise<Annonce[]>;
    findPrestationWithPrestataire(id: number): Promise<Annonce>;
    findAllPublicPrestations(): Promise<Annonce[]>;
}
