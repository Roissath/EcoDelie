import { Repository } from 'typeorm';
import { Entrepot } from './entrepot.entity';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
export declare class EntrepotService {
    private readonly repo;
    constructor(repo: Repository<Entrepot>);
    findAll(): Promise<Entrepot[]>;
    findOne(id: number): Promise<Entrepot | null>;
    create(dto: CreateEntrepotDto): Promise<Entrepot>;
    update(id: number, dto: UpdateEntrepotDto): Promise<Entrepot | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
