export class CreateProduitDto {
  nom!: string;
  descriptif!: string;
  date_publication!: Date;
  prix!: number;
  stock!: number;
  categorie!: string;
  utilisateurId!: number; // id du commerçant
}
