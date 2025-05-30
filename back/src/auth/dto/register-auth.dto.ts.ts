// src/auth/dto/register-auth.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDateString, IsNumber } from 'class-validator'
import { Role } from 'src/enums/role.enum'

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  nom!: string;

  @IsString()
  @IsNotEmpty()
  prenom!: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsDateString()
  datdenaissance?: Date;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  adresse!: string;

  @IsString()
  @IsNotEmpty()
  mot_de_passe!: string;

  @IsString()
  @IsNotEmpty()
  telephone!: string;

  @IsString()
  @IsNotEmpty()
  login!: string;

  @IsOptional()
  @IsString()
  langue_utilise?: string;

  @IsString()
  @IsNotEmpty()
  type!: Role;

  // Champs spécifiques pour livreur
  @IsOptional()
  type_permis?: string;
  @IsOptional()
  zones_livraison?: string;
  @IsOptional()
  type_transport?: string;
  @IsOptional()
  moyen_paiement?: string;

  // Champs spécifiques pour prestataire
  @IsOptional()
  types_services?: string;
  @IsOptional()
  tarif_prestation?: number;

  // (Si tu veux : ajoute les autres champs facultatifs pour client/commerçant)
}
