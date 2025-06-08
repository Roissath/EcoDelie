import type { Repository } from "typeorm";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { AnnonceClient } from "../annonce-client/annonce-client.entity";
import { Produit } from "../produit/produit.entity";
import { Livraison } from "../livraison/livraison.entity";
import { Colis } from "../colis/colis.entity";
import { Stokage } from "../stokage/stokage.entity";
import { Message } from "../message/message.entity";
import { Notification } from "../notification/notification.entity";
import { Document } from "../document/document.entity";
import { Commande } from "../commande/commande.entity";
import { Annonce } from "../annonce/annonce.entity";
export interface UtilisateurParType {
    type: string;
    total: number;
}
export interface TopUtilisateur {
    nom: string;
    prenom: string;
    nbConnexions: number;
}
export interface TimelineInscription {
    mois: string;
    total: number;
}
export interface DashboardStats {
    error?: boolean;
    message?: string;
    utilisateursParType: UtilisateurParType[];
    totalAnnonces: number;
    totalPrestataires: number;
    totalProduits: number;
    totalLivraisons: number;
    totalColis: number;
    totalStokages: number;
    totalNotifications: number;
    totalDocuments: number;
    totalCommandes: number;
    topUtilisateurs: TopUtilisateur[];
    timelineInscriptions: TimelineInscription[];
}
export interface ClientStats {
    annoncesActives: number;
    commandesEnCours: number;
    livraisonsEnAttente: number;
    totalDepense: number;
    recentActivities: any[];
}
export declare class StatsService {
    private readonly utilisateurRepo;
    private readonly annonceClientRepo;
    private readonly produitRepo;
    private readonly livraisonRepo;
    private readonly colisRepo;
    private readonly stokageRepo;
    private readonly messageRepo;
    private readonly notificationRepo;
    private readonly documentRepo;
    private readonly commandeRepo;
    private readonly annonceRepo;
    constructor(utilisateurRepo: Repository<Utilisateur>, annonceClientRepo: Repository<AnnonceClient>, produitRepo: Repository<Produit>, livraisonRepo: Repository<Livraison>, colisRepo: Repository<Colis>, stokageRepo: Repository<Stokage>, messageRepo: Repository<Message>, notificationRepo: Repository<Notification>, documentRepo: Repository<Document>, commandeRepo: Repository<Commande>, annonceRepo: Repository<Annonce>);
    getDashboardStats(filters?: any): Promise<DashboardStats | ClientStats>;
    private getClientSpecificStats;
    private getGlobalAdminStats;
    countByRole(): Promise<UtilisateurParType[]>;
    countAnnonces(): Promise<any[]>;
}
