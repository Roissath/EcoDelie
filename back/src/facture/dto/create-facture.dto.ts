import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateFactureDto {
  @IsString()
  @IsNotEmpty()
  mois!: string;

  @IsNumber()
  montant_total!: number;

  @IsDateString()
  date_generation!: Date;

  @IsString()
  @IsNotEmpty()
  statut!: string;

  @IsString()
  @IsNotEmpty()
  pdf_url!: string;

  @IsNumber()
  utilisateurId!: number;
}
