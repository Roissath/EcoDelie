import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoClientDto } from './create-info-client.dto';

export class UpdateInfoClientDto extends PartialType(CreateInfoClientDto) {}
