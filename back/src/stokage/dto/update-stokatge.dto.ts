import { PartialType } from '@nestjs/mapped-types';
import { CreateStokageDto } from './create-stokage.dto';

export class UpdateStokageDto extends PartialType(CreateStokageDto) {}
