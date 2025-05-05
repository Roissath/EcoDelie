import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentaireProduitDto } from './create-commentaire.dto';
export class UpdateCommentaireProduitDto extends PartialType(CreateCommentaireProduitDto) {}
