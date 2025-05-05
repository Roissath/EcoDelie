import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DisponibiliteService } from './disponibilite.service';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('disponibilite')
@UseGuards(JwtAuthGuard)
export class DisponibiliteController {
  constructor(private readonly service: DisponibiliteService) {}

  @Post()
  create(@Body() dto: CreateDisponibiliteDto, @Request() req) {
    return this.service.create({ ...dto, utilisateurId: req.user.id });
  }

  @Get('user')
  findByUser(@Request() req) {
    return this.service.findByUtilisateur(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDisponibiliteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
