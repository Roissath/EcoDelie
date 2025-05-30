import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnnonceClientDto {
  @IsString()
  @IsNotEmpty()
  lieu_depart!: string;

  @IsString()
  @IsNotEmpty()
  lieu_arrivee!: string;

  @IsNumber()
  @IsNotEmpty()
  poids_estime!: number;

  @IsNumber()
  @IsNotEmpty()
  prix_livraison!: number;

  @IsBoolean()
  @IsNotEmpty()
  colis_fragile!: boolean;

  @IsEnum(['livraison', 'course'])
  @IsNotEmpty()
  type_annonce!: 'livraison' | 'course';

  @IsOptional()
  @IsString()
  magasin?: string;

  @IsOptional()
  @IsString()
  liste_courses?: string;

  @IsOptional()
  @IsDateString()
  date_course?: Date;

  @IsNumber()
  @IsNotEmpty()
  utilisateurId!: number;
}
