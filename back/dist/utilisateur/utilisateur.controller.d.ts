import type { UtilisateurService } from "./utilisateur.service";
import type { CreateUtilisateurDto } from "./dto/create-utilisateur.dto";
import type { UpdateUtilisateurDto } from "./dto/update-utilisateur.dto";
export declare class UtilisateurController {
    private readonly service;
    constructor(service: UtilisateurService);
    create(dto: CreateUtilisateurDto): Promise<import("./utilisateur.entity").Utilisateur>;
    findAll(): Promise<import("./utilisateur.entity").Utilisateur[]>;
    findOne(id: string): Promise<import("./utilisateur.entity").Utilisateur | null>;
    validerProfil(id: number): Promise<import("./utilisateur.entity").Utilisateur | null>;
    rejeterProfil(id: number): Promise<import("./utilisateur.entity").Utilisateur | null>;
    update(id: number, dto: UpdateUtilisateurDto): Promise<import("./utilisateur.entity").Utilisateur | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    uploadPhoto(id: number, file: Express.Multer.File): Promise<{
        message: string;
        photo_profil: string;
        photo_url: string;
    }>;
}
