import { Repository } from 'typeorm';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { AnnonceClient } from 'src/annonce-client/annonce-client.entity';
export declare class StatsService {
    private utilisateurRepo;
    private annonceRepo;
    constructor(utilisateurRepo: Repository<Utilisateur>, annonceRepo: Repository<AnnonceClient>);
    countByRole(): Promise<any[]>;
    countAnnonces(): Promise<any[]>;
    topUtilisateurs(): Promise<any[]>;
    inscriptionsParMois(): Promise<any>;
}
