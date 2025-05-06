import { Repository } from 'typeorm';
import { Commande } from './commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
export declare class CommandeService {
    private readonly repo;
    constructor(repo: Repository<Commande>);
    findAll(): Promise<Commande[]>;
    findOne(id: number): Promise<Commande | null>;
    getByClientId(id: number): Promise<Commande[]>;
    getByLivreurId(id: number): Promise<Commande[]>;
    create(dto: CreateCommandeDto): Promise<Commande>;
    update(id: number, dto: UpdateCommandeDto): Promise<Commande | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByClientId(id: number): Promise<Commande[]>;
}
