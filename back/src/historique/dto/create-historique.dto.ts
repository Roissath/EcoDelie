export class CreateHistoriqueDto {
  historique_livraison?: string;
  historique_commande?: string;
  historique_prestataire?: string;
  statut!: string;
  date_entree!: Date;
  utilisateurId!: number;
}
