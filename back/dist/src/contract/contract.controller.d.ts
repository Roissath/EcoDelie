import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contrat.dto';
export declare class ContractController {
    private readonly service;
    constructor(service: ContractService);
    create(dto: CreateContractDto): Promise<import("./contract.entity").Contract>;
    findAll(): Promise<import("./contract.entity").Contract[]>;
    findOne(id: string): Promise<import("./contract.entity").Contract | null>;
    update(id: string, dto: UpdateContractDto): Promise<import("./contract.entity").Contract | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
