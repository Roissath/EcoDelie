import { IsNotEmpty, IsEnum, IsString, IsNumber } from 'class-validator';
import { StatutAdmin } from 'src/enums/status-admin.enum';
export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  nom!: string;
  

  @IsEnum(StatutAdmin)
  status!: StatutAdmin;

  @IsString()
  mot_de_passe!: string;

  @IsString()
  @IsNotEmpty()
  statut!: string;

  @IsNumber()
  utilisateurId!: number;

}
