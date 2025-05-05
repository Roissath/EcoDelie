export class CreateAbonnementDto {
  type_abonnement!: string;
  date_debut!: Date;
  date_fin!: Date;
  statut!: string;
  utilisateurId!: number; // ID du client concerné
}
