// Ce fichier regroupe les types utilisés côté front pour taper proprement les appels vers le back.
//  Ces types doivent correspondre aux CreateDto côté back (sans les décorateurs de validation).

export interface CreateAbonnementDto {
    type_abonnement: string;
    date_debut: string;
    date_fin: string;
    statut: string;
    utilisateurId: number;
  }
  
  export interface CreateAdminDto {
    statut: string;
    utilisateurId: number;
  }
  
  export interface CreateAnnonceDto {
    type_annonce: string;
    titre: string;
    description: string;
    date_publication: string;
    statut: string;
    utilisateurId: number;
  }
  
  export interface CreateAnnonceClientDto {
    lieu_depart: string;
    lieu_arrivee: string;
    poids_estime: number;
    prix_livraison: number;
    colis_fragile: boolean;
    utilisateurId: number;
  }
  
  export interface LoginAuthDto {
    email: string;
    mot_de_passe: string;
  }
  
  export interface RegisterAuthDto {
    nom: string;
    prenom: string;
    age?: number;
    datdenaissance?: string;
    email: string;
    adresse: string;
    mot_de_passe: string;
    telephone: string;
    login: string;
    langue_utilise?: string;
    type: string;
  }
  
  export interface CreateColisDto {
    photo?: string;
    descriptif: string;
    dimension: string;
    prix_livraison: number;
    assurance: boolean;
    statut: string;
    entrepotId?: number;
    annonceId?: number;
    livreurId?: number;
    date_reception?: string;
    date_envoi?: string;
  }
  
  export interface CreateCommandeDto {
    statut: string;
    date_commande: string;
    prix_unitaire: number;
    utilisateurId: number;
    clientId: number;
    factureId?: number;
    produitIds: number[];
  }
  
  export interface CreateCommentaireProduitDto {
    contenu: string;
    utilisateurId: number;
    produitId: number;
  }
  
  export interface CreateContractDto {
    contact_pdf: string;
    type: string;
    utilisateurId: number;
  }
  
  export interface CreateDisponibiliteDto {
    jour: string;
    heure_debut: string;
    heure_fin: string;
    utilisateurId: number;
  }
  
  export interface CreateDocumentDto {
    type: string;
    url: string;
    statut?: string;
    commentaire?: string;
    utilisateurId: number;
  }
  
  export interface CreateEntrepotDto {
    adresse: string;
    capacite_stock: number;
    gestionnaire: string;
  }
  
  export interface CreateFactureDto {
    mois: string;
    montant_total: number;
    date_generation: string;
    statut: string;
    pdf_url: string;
    utilisateurId: number;
  }
  
  export interface CreateHistoriqueDto {
    historique_livraison?: string;
    historique_commande?: string;
    historique_prestataire?: string;
    statut: string;
    date_entree: string;
    utilisateurId: number;
  }
  
  export interface CreateInfoClientDto {
    type_abonnement?: string;
    moyen_paiement?: string;
    historique_commande?: string;
    appreciation?: string;
    descriptif_profil?: string;
    age?: number;
    utilisateurId: number;
  }
  
  export interface CreateInfoCommercantDto {
    status: string;
    adresse: string;
    appreciation?: string;
    utilisateurId: number;
    contractId?: number;
  }
  
  export interface CreateInfoLivreurDto {
    type_permis: string;
    zones_livraison: string;
    type_transport: string;
    moyen_paiement: string;
    statut: string;
    appreciation?: string;
    utilisateurId: number;
  }
  
  export interface CreateInfoPrestataireDto {
    types_services: string;
    certification?: string;
    status: string;
    tarif_prestation: number;
    bio?: string;
    competence?: string;
    utilisateurId: number;
    contractId?: number;
    annonceId?: number;
  }
  
  export interface CreateLivraisonDto {
    date_livraison: string;
    adresse: string;
    statut: string;
    commandeId: number;
    clientId: number;
    livreurId?: number;
  }
  
  export interface CreateMessageDto {
    contenu: string;
    date_envoi: string;
    lu: boolean;
    expediteurId: number;
    destinataireId: number;
  }
  
  export interface CreateNotificationDto {
    contenu: string;
    email: string;
    utilisateurId: number;
  }
  
  export interface CreatePaiementDto {
    montant: number;
    date_paiement: string;
    moyen_paiement: string;
    statut: string;
    utilisateurId: number;
    annonceId: number;
  }
  
  export interface CreateProduitDto {
    nom: string;
    descriptif: string;
    date_publication: string;
    prix: number;
    stock: number;
    categorie: string;
    image?: string;
    utilisateurId: number;
  }
  
  export interface CreateStokageDto {
    date_entree: string;
    date_sortie?: string;
    entrepotId: number;
    colisId: number;
  }
  
  export interface CreateUtilisateurDto {
    nom: string;
    prenom: string;
    age?: number;
    datdenaissance?: string;
    email: string;
    adresse: string;
    mot_de_passe: string;
    telephone: string;
    login: string;
    langue_utilise?: string;
    type: string;
  }
  