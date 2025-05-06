import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
export declare class UtilisateurService {
    private readonly repo;
    constructor(repo: Repository<Utilisateur>);
    findAll(): Promise<Utilisateur[]>;
    findOne(id: number): Promise<Utilisateur | null>;
    findByEmail(email: string): Promise<Utilisateur | null>;
    create(dto: CreateUtilisateurDto): Promise<Utilisateur>;
    update(id: number, dto: UpdateUtilisateurDto): Promise<Utilisateur | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByResetToken(token: string): Promise<Utilisateur | null>;
}
