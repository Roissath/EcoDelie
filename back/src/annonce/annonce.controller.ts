import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';

@Controller('annonces')
export class AnnonceController {
  constructor(private readonly service: AnnonceService) {}

  @Post()
  create(@Body() dto: CreateAnnonceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnnonceDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  // 🔍 Ajouter une route pour trouver par type
  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.service.findByType(type);
  }

  // 🔍 Ajouter une route pour retrouver une prestation avec prestataire (pour le chat)
  @Get('client/prestations/:id')
  findClientPrestation(@Param('id') id: string) {
    return this.service.findPrestationWithPrestataire(+id);
  }
}
