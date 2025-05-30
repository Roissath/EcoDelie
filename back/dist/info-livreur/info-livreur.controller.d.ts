import { InfoLivreurService } from './info-livreur.service';
import { CreateInfoLivreurDto } from './dto/create-info-livreur.dto';
import { UpdateInfoLivreurDto } from './dto/update-info-livreur.dto';
import { Request } from 'express';
export declare class InfoLivreurController {
    private readonly service;
    constructor(service: InfoLivreurService);
    create(dto: CreateInfoLivreurDto): Promise<import("./info-livreur.entity").InfoLivreur>;
    findAll(): Promise<import("./info-livreur.entity").InfoLivreur[]>;
    findOne(id: string): Promise<import("./info-livreur.entity").InfoLivreur | null>;
    update(id: string, dto: UpdateInfoLivreurDto): Promise<import("./info-livreur.entity").InfoLivreur | null>;
    valider(id: string): Promise<void>;
    rejeter(id: string): Promise<void>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getMyInfo(req: Request): Promise<import("./info-livreur.entity").InfoLivreur | null>;
    updateMyInfo(req: Request, dto: UpdateInfoLivreurDto): Promise<import("./info-livreur.entity").InfoLivreur | null>;
}
