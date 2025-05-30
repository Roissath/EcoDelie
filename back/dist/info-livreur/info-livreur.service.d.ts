import { Repository } from 'typeorm';
import { InfoLivreur } from './info-livreur.entity';
import { CreateInfoLivreurDto } from './dto/create-info-livreur.dto';
import { UpdateInfoLivreurDto } from './dto/update-info-livreur.dto';
export declare class InfoLivreurService {
    private readonly repo;
    constructor(repo: Repository<InfoLivreur>);
    findAll(): Promise<InfoLivreur[]>;
    findOne(id: number): Promise<InfoLivreur | null>;
    create(dto: CreateInfoLivreurDto): Promise<InfoLivreur>;
    update(id: number, dto: UpdateInfoLivreurDto): Promise<InfoLivreur | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    valider(id: number): Promise<void>;
    rejeter(id: number): Promise<void>;
    findByUtilisateurId(utilisateurId: number): Promise<InfoLivreur | null>;
    updateByUtilisateurId(utilisateurId: number, dto: UpdateInfoLivreurDto): Promise<InfoLivreur | null>;
}
