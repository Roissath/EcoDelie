import { Repository } from 'typeorm';
import { Historique } from './historique.entity';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
export declare class HistoriqueService {
    private readonly repo;
    constructor(repo: Repository<Historique>);
    findAll(): Promise<Historique[]>;
    findOne(id: number): Promise<Historique | null>;
    create(dto: CreateHistoriqueDto): Promise<Historique>;
    update(id: number, dto: UpdateHistoriqueDto): Promise<Historique | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
