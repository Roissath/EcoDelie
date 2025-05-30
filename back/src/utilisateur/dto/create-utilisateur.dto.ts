import { Role } from '../../enums/role.enum';

export class CreateUtilisateurDto {
  // Champs Utilisateur
  nom!: string;
  prenom!: string;
  age?: number;
  datdenaissance?: Date;
  email!: string;
  adresse!: string;
  mot_de_passe!: string;
  telephone!: string;
  login!: string;
  langue_utilise?: string;
  type!: Role;
  statut?: string;

  // Champs InfoLivreur
  type_permis?: string;
  zones_livraison?: string;
  type_transport?: string;
  moyen_paiement?: string;
  regions_livraison?: string;
  villes_livraison?: string;
  photo?: string;

  // Champs InfoPrestataire
  types_services?: string;
  certification?: string;
  tarif_prestation?: number;
  bio?: string;
  competence?: string;
  annonceId?: number;
  contractId?: number;

  // Champs communs (optionnels mais partagés)
  appreciation?: string;
  type_abonnement?: string;
  historique_commande?: string;
  descriptif_profil?: string;
}
