import { AnnonceClientService } from './annonce-client.service';
import { CreateAnnonceClientDto } from './dto/create-annonce-client.dto';
import { UpdateAnnonceClientDto } from './dto/update-annonce-client.dto';
export declare class AnnonceClientController {
    private readonly service;
    constructor(service: AnnonceClientService);
    create(dto: CreateAnnonceClientDto): Promise<import("./annonce-client.entity").AnnonceClient>;
    findAll(): Promise<import("./annonce-client.entity").AnnonceClient[]>;
    findOne(id: string): Promise<import("./annonce-client.entity").AnnonceClient | null>;
    update(id: string, dto: UpdateAnnonceClientDto): Promise<import("./annonce-client.entity").AnnonceClient | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
