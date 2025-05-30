import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Request, Response } from 'express';
export declare class PaiementController {
    private readonly service;
    constructor(service: PaiementService);
    generateFacturePublic(id: string, res: Response): Promise<unknown>;
    create(dto: CreatePaiementDto): Promise<import("./paiement.entity").Paiement>;
    findAll(): Promise<import("./paiement.entity").Paiement[]>;
    findOne(id: string): Promise<import("./paiement.entity").Paiement | null>;
    update(id: string, dto: UpdatePaiementDto): Promise<import("./paiement.entity").Paiement | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    findMyPaiements(req: Request): Promise<import("./paiement.entity").Paiement[]>;
    generateFacture(id: string, res: Response): Promise<unknown>;
}
