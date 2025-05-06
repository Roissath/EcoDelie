import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
  IsNumber,
} from 'class-validator';

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
  type!: string; // ex : client, admin...
}
