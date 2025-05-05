import { IsString, IsNumber } from 'class-validator';

export class CreateContractDto {
  @IsString()
  contact_pdf!: string;

  @IsString()
  type!: string;

  @IsNumber()
  utilisateurId!: number;
}
