import { Repository } from 'typeorm';
import { InfoCommercant } from './info-commercant.entity';
import { CreateInfoCommercantDto } from './dto/create-info-commercant.dto';
import { UpdateInfoCommercantDto } from './dto/update-info-commercant.dto';
export declare class InfoCommercantService {
    private readonly repo;
    constructor(repo: Repository<InfoCommercant>);
    findAll(): Promise<InfoCommercant[]>;
    findOne(id: number): Promise<InfoCommercant | null>;
    create(dto: CreateInfoCommercantDto): Promise<InfoCommercant>;
    update(id: number, dto: UpdateInfoCommercantDto): Promise<InfoCommercant | null>;
    valider(id: number): Promise<void>;
    rejeter(id: number): Promise<void>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
