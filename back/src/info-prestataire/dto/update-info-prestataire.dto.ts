import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoPrestataireDto } from './create-info-prestataire.dto';

export class UpdateInfoPrestataireDto extends PartialType(CreateInfoPrestataireDto) {
  verifie?: boolean;
}
