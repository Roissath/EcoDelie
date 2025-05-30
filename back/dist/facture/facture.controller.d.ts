import { FactureService } from './facture.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
export declare class FactureController {
    private readonly factureService;
    constructor(factureService: FactureService);
    findAll(): Promise<import("./facture.entity").Facture[]>;
    findByClient(id: number): Promise<import("./facture.entity").Facture[]>;
    create(dto: CreateFactureDto): Promise<import("./facture.entity").Facture>;
    update(id: number, dto: UpdateFactureDto): Promise<import("./facture.entity").Facture | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    generatePdf(id: number): Promise<unknown>;
}
