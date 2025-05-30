import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
export declare class UtilisateurController {
    private readonly service;
    constructor(service: UtilisateurService);
    create(dto: CreateUtilisateurDto): Promise<import("./utilisateur.entity").Utilisateur>;
    findAll(): Promise<import("./utilisateur.entity").Utilisateur[]>;
    findOne(id: string): Promise<import("./utilisateur.entity").Utilisateur | null>;
    update(id: string, dto: UpdateUtilisateurDto): Promise<import("./utilisateur.entity").Utilisateur | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    validerProfil(id: number): Promise<import("./utilisateur.entity").Utilisateur | null>;
    rejeterProfil(id: number): Promise<import("./utilisateur.entity").Utilisateur | null>;
}
