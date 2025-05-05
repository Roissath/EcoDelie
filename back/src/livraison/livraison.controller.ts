import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LivraisonService } from './livraison.service';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('livraison')
@UseGuards(JwtAuthGuard)
export class LivraisonController {
  constructor(private readonly service: LivraisonService) {}

  @Post()
  create(@Body() dto: CreateLivraisonDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateLivraisonDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
