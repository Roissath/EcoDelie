import { InfoPrestataireService } from './info-prestataire.service';
import { CreateInfoPrestataireDto } from './dto/create-info-prestataire.dto';
import { UpdateInfoPrestataireDto } from './dto/update-info-prestataire.dto';
export declare class InfoPrestataireController {
    private readonly service;
    constructor(service: InfoPrestataireService);
    create(dto: CreateInfoPrestataireDto): Promise<import("./info-prestataire.entity").InfoPrestataire>;
    findAll(): Promise<import("./info-prestataire.entity").InfoPrestataire[]>;
    findOne(id: string): Promise<import("./info-prestataire.entity").InfoPrestataire | null>;
    update(id: string, dto: UpdateInfoPrestataireDto): Promise<import("./info-prestataire.entity").InfoPrestataire | null>;
    valider(id: string): Promise<void>;
    rejeter(id: string): Promise<void>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
