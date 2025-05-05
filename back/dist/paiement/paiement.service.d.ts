import { Repository } from 'typeorm';
import { Paiement } from './paiement.entity';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
export declare class PaiementService {
    private readonly repo;
    constructor(repo: Repository<Paiement>);
    findAll(): Promise<Paiement[]>;
    findOne(id: number): Promise<Paiement | null>;
    create(dto: CreatePaiementDto): Promise<Paiement>;
    update(id: number, dto: UpdatePaiementDto): Promise<Paiement | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
