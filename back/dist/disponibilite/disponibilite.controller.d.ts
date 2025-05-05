import { DisponibiliteService } from './disponibilite.service';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';
export declare class DisponibiliteController {
    private readonly service;
    constructor(service: DisponibiliteService);
    create(dto: CreateDisponibiliteDto, req: any): Promise<import("./disponibilite.entity").Disponibilite>;
    findByUser(req: any): Promise<import("./disponibilite.entity").Disponibilite[]>;
    update(id: number, dto: UpdateDisponibiliteDto): Promise<import("./disponibilite.entity").Disponibilite | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
