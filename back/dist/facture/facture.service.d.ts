import { Repository } from 'typeorm';
import { Facture } from './facture.entity';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
export declare class FactureService {
    private readonly repo;
    constructor(repo: Repository<Facture>);
    findAll(): Promise<Facture[]>;
    findOne(id: number): Promise<Facture | null>;
    create(dto: CreateFactureDto): Promise<Facture>;
    generatePdf(dto: CreateFactureDto, filePath: string): Promise<void>;
    update(id: number, dto: UpdateFactureDto): Promise<Facture | null>;
    findByClientId(id: number): Promise<Facture[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    generateAndSavePdf(id: number): Promise<unknown>;
}
