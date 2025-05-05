import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StokageService } from './stokage.service';
import { CreateStokageDto } from './dto/create-stokage.dto';
import { UpdateStokageDto } from './dto/update-stokatge.dto';

@Controller('stokage')
export class StokageController {
  constructor(private readonly service: StokageService) {}

  @Post()
  create(@Body() dto: CreateStokageDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateStokageDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
