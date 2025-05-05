import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoCommercantService } from './info-commercant.service';
import { CreateInfoCommercantDto } from './dto/create-info-commercant.dto';
import { UpdateInfoCommercantDto } from './dto/update-info-commercant.dto';

@Controller('info-commercant')
export class InfoCommercantController {
  constructor(private readonly service: InfoCommercantService) {}

  @Post()
  create(@Body() dto: CreateInfoCommercantDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateInfoCommercantDto) {
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
}
