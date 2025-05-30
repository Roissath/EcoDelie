import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common';
import { InfoLivreurService } from './info-livreur.service';
import { CreateInfoLivreurDto } from './dto/create-info-livreur.dto';
import { UpdateInfoLivreurDto } from './dto/update-info-livreur.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('info-livreur')
export class InfoLivreurController {
  constructor(private readonly service: InfoLivreurService) {}

  @Post()
  create(@Body() dto: CreateInfoLivreurDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateInfoLivreurDto) {
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

  // ✅ Récupérer les infos du livreur connecté
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyInfo(@Req() req: Request) {
    const user = req.user as any;
    return this.service.findByUtilisateurId(user.id);
  }

  // ✅ Modifier les infos du livreur connecté
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMyInfo(@Req() req: Request, @Body() dto: UpdateInfoLivreurDto) {
    const user = req.user as any;
    return this.service.updateByUtilisateurId(user.id, dto);
  }
}
