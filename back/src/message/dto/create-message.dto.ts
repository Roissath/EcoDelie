export class CreateMessageDto {
  contenu!: string;
  date_envoi!: Date;
  lu!: boolean;
  expediteurId!: number;
  destinataireId!: number;
}
