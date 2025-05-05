import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrepotService } from './entrepot.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';

@Controller('entrepots')
export class EntrepotController {
  constructor(private readonly service: EntrepotService) {}

  @Post()
  create(@Body() dto: CreateEntrepotDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateEntrepotDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
