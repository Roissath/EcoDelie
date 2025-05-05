import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnonceClientService } from './annonce-client.service';
import { CreateAnnonceClientDto } from './dto/create-annonce-client.dto';
import { UpdateAnnonceClientDto } from './dto/update-annonce-client.dto';

@Controller('annonces-client')
export class AnnonceClientController {
  constructor(private readonly service: AnnonceClientService) {}

  @Post()
  create(@Body() dto: CreateAnnonceClientDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateAnnonceClientDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
