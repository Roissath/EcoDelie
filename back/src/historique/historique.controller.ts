import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Controller('historiques')
export class HistoriqueController {
  constructor(private readonly service: HistoriqueService) {}

  @Post()
  create(@Body() dto: CreateHistoriqueDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateHistoriqueDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
