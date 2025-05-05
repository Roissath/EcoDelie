import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommentaireProduitService } from './commentaire-produit.service';
import { CreateCommentaireProduitDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireProduitDto } from './dto/update-commentaire-produit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('commentaire-produit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentaireProduitController {
  constructor(private readonly service: CommentaireProduitService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin', 'client')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('client')
  create(@Body() dto: CreateCommentaireProduitDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCommentaireProduitDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
