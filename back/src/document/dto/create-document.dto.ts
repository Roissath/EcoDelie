import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsOptional()
  statut?: string;

  @IsString()
  @IsOptional()
  commentaire?: string;

  @IsNumber()
  utilisateurId!: number;
}
