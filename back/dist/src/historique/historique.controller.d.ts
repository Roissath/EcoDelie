import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
export declare class HistoriqueController {
    private readonly service;
    constructor(service: HistoriqueService);
    create(dto: CreateHistoriqueDto): Promise<import("./historique.entity").Historique>;
    findAll(): Promise<import("./historique.entity").Historique[]>;
    findOne(id: string): Promise<import("./historique.entity").Historique | null>;
    update(id: string, dto: UpdateHistoriqueDto): Promise<import("./historique.entity").Historique | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
