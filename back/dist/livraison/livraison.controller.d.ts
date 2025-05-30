import { LivraisonService } from './livraison.service';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
export declare class LivraisonController {
    private readonly service;
    constructor(service: LivraisonService);
    create(dto: CreateLivraisonDto): Promise<import("./livraison.entity").Livraison>;
    findForClient(req: any): Promise<import("./livraison.entity").Livraison[]>;
    findAll(): Promise<import("./livraison.entity").Livraison[]>;
    findOne(id: number): Promise<import("./livraison.entity").Livraison | null>;
    update(id: number, dto: UpdateLivraisonDto): Promise<import("./livraison.entity").Livraison | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
