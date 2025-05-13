import { Repository } from 'typeorm';
import { InfoPrestataire } from './info-prestataire.entity';
import { CreateInfoPrestataireDto } from './dto/create-info-prestataire.dto';
import { UpdateInfoPrestataireDto } from './dto/update-info-prestataire.dto';
export declare class InfoPrestataireService {
    private readonly repo;
    constructor(repo: Repository<InfoPrestataire>);
    findAll(): Promise<InfoPrestataire[]>;
    findOne(id: number): Promise<InfoPrestataire | null>;
    create(dto: CreateInfoPrestataireDto): Promise<InfoPrestataire>;
    update(id: number, dto: UpdateInfoPrestataireDto): Promise<InfoPrestataire | null>;
    valider(id: number): Promise<void>;
    rejeter(id: number): Promise<void>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByUtilisateurId(utilisateurId: number): Promise<InfoPrestataire | null>;
}
