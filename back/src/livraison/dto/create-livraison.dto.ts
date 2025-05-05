import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsNumber,
    IsOptional,
  } from 'class-validator';
  
  export class CreateLivraisonDto {
    @IsDateString()
    @IsNotEmpty()
    date_livraison!: Date;
  
    @IsString()
    @IsNotEmpty()
    adresse!: string;
  
    @IsString()
    @IsNotEmpty()
    statut!: string;
  
    @IsNumber()
    @IsNotEmpty()
    commandeId!: number;
  
    @IsNumber()
    @IsNotEmpty()
    clientId!: number;
  
    @IsOptional()
    @IsNumber()
    livreurId?: number;
  }
  