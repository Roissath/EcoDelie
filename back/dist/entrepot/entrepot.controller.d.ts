import { EntrepotService } from './entrepot.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
export declare class EntrepotController {
    private readonly service;
    constructor(service: EntrepotService);
    create(dto: CreateEntrepotDto): Promise<import("./entrepot.entity").Entrepot>;
    findAll(): Promise<import("./entrepot.entity").Entrepot[]>;
    findOne(id: string): Promise<import("./entrepot.entity").Entrepot | null>;
    update(id: string, dto: UpdateEntrepotDto): Promise<import("./entrepot.entity").Entrepot | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
