import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InfoClientService } from '../info-client/info-client.service';
import { InfoLivreurService } from '../info-livreur/info-livreur.service';
import { InfoPrestataireService } from '../info-prestataire/info-prestataire.service';
import { InfoCommercantService } from '../info-commercant/info-commercant.service';
export declare class UtilisateurService {
    private readonly repo;
    private readonly infoClientService;
    private readonly infoLivreurService;
    private readonly infoPrestataireService;
    private readonly infoCommercantService;
    constructor(repo: Repository<Utilisateur>, infoClientService: InfoClientService, infoLivreurService: InfoLivreurService, infoPrestataireService: InfoPrestataireService, infoCommercantService: InfoCommercantService);
    findAll(): Promise<Utilisateur[]>;
    findOne(id: number): Promise<Utilisateur | null>;
    findByEmail(email: string): Promise<Utilisateur | null>;
    create(dto: CreateUtilisateurDto): Promise<Utilisateur>;
    update(id: number, dto: UpdateUtilisateurDto): Promise<Utilisateur | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByResetToken(token: string): Promise<Utilisateur | null>;
    validerProfil(id: number): Promise<Utilisateur | null>;
    rejeterProfil(id: number): Promise<Utilisateur | null>;
}
