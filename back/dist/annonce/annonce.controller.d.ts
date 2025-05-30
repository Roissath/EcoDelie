import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
export declare class AnnonceController {
    private readonly service;
    constructor(service: AnnonceService);
    create(dto: CreateAnnonceDto): Promise<import("./annonce.entity").Annonce>;
    findAll(): Promise<import("./annonce.entity").Annonce[]>;
    findOne(id: string): Promise<import("./annonce.entity").Annonce>;
    update(id: string, dto: UpdateAnnonceDto): Promise<import("./annonce.entity").Annonce>;
    remove(id: string): Promise<import("./annonce.entity").Annonce>;
    findByType(type: string): Promise<import("./annonce.entity").Annonce[]>;
    findClientPrestation(id: string): Promise<import("./annonce.entity").Annonce>;
    findPublicPrestations(): Promise<import("./annonce.entity").Annonce[]>;
}
