export class CreatePaiementDto {
  montant!: number;
  date_paiement!: Date;
  moyen_paiement!: string;
  statut!: string;
  utilisateurId!: number;
  annonceId!: number;
}
