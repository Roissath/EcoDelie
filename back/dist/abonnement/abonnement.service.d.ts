import { Repository } from 'typeorm';
import { Abonnement } from './abonnement.entity';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/update-abonnement.dto';
export declare class AbonnementService {
    private readonly repo;
    constructor(repo: Repository<Abonnement>);
    create(dto: CreateAbonnementDto): Promise<Abonnement>;
    findAll(): Promise<Abonnement[]>;
    findByClientId(id: number): Promise<Abonnement[]>;
    update(id: number, dto: UpdateAbonnementDto): Promise<Abonnement | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
