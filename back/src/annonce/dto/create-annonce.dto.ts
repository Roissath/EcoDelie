export class CreateAnnonceDto {
  type_annonce!: string;
  titre!: string;
  description!: string;
  date_publication!: Date;
  statut!: string;
  utilisateurId!: number;
}
