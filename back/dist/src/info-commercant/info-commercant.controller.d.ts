import { InfoCommercantService } from './info-commercant.service';
import { CreateInfoCommercantDto } from './dto/create-info-commercant.dto';
import { UpdateInfoCommercantDto } from './dto/update-info-commercant.dto';
export declare class InfoCommercantController {
    private readonly service;
    constructor(service: InfoCommercantService);
    create(dto: CreateInfoCommercantDto): Promise<import("./info-commercant.entity").InfoCommercant>;
    findAll(): Promise<import("./info-commercant.entity").InfoCommercant[]>;
    findOne(id: string): Promise<import("./info-commercant.entity").InfoCommercant | null>;
    update(id: string, dto: UpdateInfoCommercantDto): Promise<import("./info-commercant.entity").InfoCommercant | null>;
    valider(id: string): Promise<void>;
    rejeter(id: string): Promise<void>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
