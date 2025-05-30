import { Repository } from 'typeorm';
import { Colis } from './colis.entity';
import { CreateColisDto } from './dto/create-colis.dto';
import { UpdateColisDto } from './dto/update-colis.dto';
export declare class ColisService {
    private readonly repo;
    constructor(repo: Repository<Colis>);
    findAll(): Promise<Colis[]>;
    findOne(id: number): Promise<Colis | null>;
    findByClientId(id: number): Promise<Colis[]>;
    findByLivreurId(id: number): Promise<Colis[]>;
    create(dto: CreateColisDto): Promise<Colis>;
    update(id: number, dto: UpdateColisDto): Promise<Colis | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
