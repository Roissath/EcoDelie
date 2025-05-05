export class CreateColisDto {
  photo?: string;
  descriptif!: string;
  dimension!: string;
  prix_livraison!: number;
  assurance!: boolean;
  statut!: string;
  entrepotId?: number;
  annonceId?: number;
  livreurId?: number;
}
