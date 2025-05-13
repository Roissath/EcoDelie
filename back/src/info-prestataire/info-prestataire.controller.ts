import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoPrestataireService } from './info-prestataire.service';
import { CreateInfoPrestataireDto } from './dto/create-info-prestataire.dto';
import { UpdateInfoPrestataireDto } from './dto/update-info-prestataire.dto';

@Controller('info-prestataire')
export class InfoPrestataireController {
  constructor(private readonly service: InfoPrestataireService) {}

  @Post()
  create(@Body() dto: CreateInfoPrestataireDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateInfoPrestataireDto) {
    return this.service.update(+id, dto);
  }

  @Patch(':id/valider')
  valider(@Param('id') id: string) {
    return this.service.valider(+id);
  }

  @Patch(':id/rejeter')
  rejeter(@Param('id') id: string) {
    return this.service.rejeter(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Get('utilisateur/:id')
findByUtilisateur(@Param('id') id: string) {
  return this.service.findByUtilisateurId(+id);
}

}
