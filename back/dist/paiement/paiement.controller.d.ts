import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
export declare class PaiementController {
    private readonly service;
    constructor(service: PaiementService);
    create(dto: CreatePaiementDto): Promise<import("./paiement.entity").Paiement>;
    findAll(): Promise<import("./paiement.entity").Paiement[]>;
    findOne(id: string): Promise<import("./paiement.entity").Paiement | null>;
    update(id: string, dto: UpdatePaiementDto): Promise<import("./paiement.entity").Paiement | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
