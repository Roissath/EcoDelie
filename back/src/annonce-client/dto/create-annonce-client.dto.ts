export class CreateAnnonceClientDto {
  lieu_depart!: string;
  lieu_arrivee!: string;
  poids_estime!: number;
  prix_livraison!: number;
  colis_fragile!: boolean;
  type_annonce!: 'livraison' | 'course';
  magasin?: string;
  liste_courses?: string;
  date_course?: Date;
  utilisateurId!: number;
}
