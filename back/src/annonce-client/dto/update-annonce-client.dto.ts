import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnonceClientDto } from './create-annonce-client.dto';

export class UpdateAnnonceClientDto extends PartialType(CreateAnnonceClientDto) {}
