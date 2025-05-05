import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoCommercantDto } from './create-info-commercant.dto';

export class UpdateInfoCommercantDto extends PartialType(CreateInfoCommercantDto) {
  verifie?: boolean;
}
