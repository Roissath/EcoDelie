import { IsNumber, IsString, IsDateString, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePaiementDto {
  @IsNumber()
  montant!: number

  @IsDateString()
  date_paiement!: Date

  @IsString()
  moyen_paiement!: string

  @IsString()
  statut!: string

  @IsNumber()
  utilisateurId!: number

  @IsNumber()
  annonceId!: number
}
