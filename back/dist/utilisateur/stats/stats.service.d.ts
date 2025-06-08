import type { Repository } from "typeorm";
import { Utilisateur } from "../../utilisateur/utilisateur.entity";
import { AnnonceClient } from "../../annonce-client/annonce-client.entity";
import { Produit } from "../../produit/produit.entity";
import { Livraison } from "../../livraison/livraison.entity";
import { Colis } from "../../colis/colis.entity";
import { Stokage } from "../../stokage/stokage.entity";
import { Message } from "../../message/message.entity";
import { Notification } from "../../notification/notification.entity";
import { Document } from "../../document/document.entity";
import { Commande } from "../../commande/commande.entity";
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
    private livraisonRepo;
    private colisRepo;
    private stokageRepo;
    private messageRepo;
    private notificationRepo;
    private documentRepo;
    private commandeRepo;
    constructor(utilisateurRepo: Repository<Utilisateur>, annonceClientRepo: Repository<AnnonceClient>, produitRepo: Repository<Produit>, livraisonRepo: Repository<Livraison>, colisRepo: Repository<Colis>, stokageRepo: Repository<Stokage>, messageRepo: Repository<Message>, notificationRepo: Repository<Notification>, documentRepo: Repository<Document>, commandeRepo: Repository<Commande>);
    getDashboardStats(filters: any): Promise<{
        annoncesActives: number;
        commandesEnCours: number;
        livraisonsEnAttente: number;
        totalDepense: number;
        recentActivities: never[];
        utilisateursParType?: undefined;
        totalAnnonces?: undefined;
        totalPrestataires?: undefined;
        totalProduits?: undefined;
        totalLivraisons?: undefined;
        totalColis?: undefined;
        totalStokages?: undefined;
        totalNotifications?: undefined;
        totalDocuments?: undefined;
        totalCommandes?: undefined;
        topUtilisateurs?: undefined;
        timelineInscriptions?: undefined;
    } | {
        utilisateursParType: any[];
        totalAnnonces: number;
        totalPrestataires: number;
        totalProduits: number;
        totalLivraisons: number;
        totalColis: number;
        totalStokages: number;
        totalNotifications: number;
        totalDocuments: number;
        totalCommandes: number;
        topUtilisateurs: any;
        timelineInscriptions: any;
        annoncesActives?: undefined;
        commandesEnCours?: undefined;
        livraisonsEnAttente?: undefined;
        totalDepense?: undefined;
        recentActivities?: undefined;
    }>;
    countByRole(filters: any): Promise<any[]>;
    countAnnonces(filters: any): Promise<any[]>;
}
