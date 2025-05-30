import { Repository } from 'typeorm';
import { AnnonceClient } from './annonce-client.entity';
import { CreateAnnonceClientDto } from './dto/create-annonce-client.dto';
import { UpdateAnnonceClientDto } from './dto/update-annonce-client.dto';
export declare class AnnonceClientService {
    private readonly repo;
    constructor(repo: Repository<AnnonceClient>);
    findAll(): Promise<AnnonceClient[]>;
    findOne(id: number): Promise<AnnonceClient | null>;
    create(dto: CreateAnnonceClientDto): Promise<AnnonceClient>;
    update(id: number, dto: UpdateAnnonceClientDto): Promise<AnnonceClient | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
