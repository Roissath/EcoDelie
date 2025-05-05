export class CreateInfoClientDto {
  type_abonnement?: string;
  moyen_paiement?: string;
  historique_commande?: string;
  appreciation?: string;
  descriptif_profil?: string;
  age?: number;
  utilisateurId!: number;
}
