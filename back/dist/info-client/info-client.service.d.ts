import { InfoClient } from './info-client.entity';
import { Repository } from 'typeorm';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';
export declare class InfoClientService {
    private readonly repo;
    constructor(repo: Repository<InfoClient>);
    create(dto: CreateInfoClientDto): Promise<InfoClient>;
    findAll(): Promise<InfoClient[]>;
    findByUtilisateur(id: number): Promise<InfoClient | null>;
    update(id: number, dto: UpdateInfoClientDto): Promise<InfoClient | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByUtilisateurId(utilisateurId: number): Promise<InfoClient | null>;
}
