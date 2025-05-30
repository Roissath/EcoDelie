export declare class CreateCommandeDto {
    statut: string;
    date_commande: Date;
    prix_unitaire: number;
    utilisateurId: number;
    clientId: number;
    factureId?: number;
    client: {
        id: number;
    };
    produitIds: number[];
    utilisateur: {
        id: number;
    };
    colisId?: number;
}
