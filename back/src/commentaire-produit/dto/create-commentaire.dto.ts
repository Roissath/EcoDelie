import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentaireProduitDto {
  @IsString()
  @IsNotEmpty()
  contenu!: string;

  @IsNumber()
  utilisateurId!: number;

  @IsNumber()
  produitId!: number;
}
