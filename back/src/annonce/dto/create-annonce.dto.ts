import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateAnnonceDto {
  @IsString()
  @IsNotEmpty()
  type_annonce!: string;

  @IsString()
  @IsNotEmpty()
  titre!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  date_publication!: Date;

  @IsString()
  @IsNotEmpty()
  statut!: string;

  @IsNumber()
  utilisateurId!: number;
}
