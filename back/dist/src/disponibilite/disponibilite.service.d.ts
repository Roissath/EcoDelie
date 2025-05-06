import { Disponibilite } from './disponibilite.entity';
import { Repository } from 'typeorm';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';
export declare class DisponibiliteService {
    private readonly repo;
    constructor(repo: Repository<Disponibilite>);
    create(dto: CreateDisponibiliteDto): Promise<Disponibilite>;
    findAll(): Promise<Disponibilite[]>;
    findByUtilisateur(id: number): Promise<Disponibilite[]>;
    update(id: number, dto: UpdateDisponibiliteDto): Promise<Disponibilite | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
