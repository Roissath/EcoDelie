import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email!: string;

  @IsString()
  mot_de_passe!: string;
}
