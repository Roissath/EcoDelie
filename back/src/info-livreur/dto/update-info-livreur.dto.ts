import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoLivreurDto } from './create-info-livreur.dto';

export class UpdateInfoLivreurDto extends PartialType(CreateInfoLivreurDto) {
  verifie?: boolean;
}
