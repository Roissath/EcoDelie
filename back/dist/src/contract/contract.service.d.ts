import { Contract } from './contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contrat.dto';
export declare class ContractService {
    private readonly repo;
    constructor(repo: Repository<Contract>);
    findAll(): Promise<Contract[]>;
    findOne(id: number): Promise<Contract | null>;
    create(dto: CreateContractDto): Promise<Contract>;
    update(id: number, dto: UpdateContractDto): Promise<Contract | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
