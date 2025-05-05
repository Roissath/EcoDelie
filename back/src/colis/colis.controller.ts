import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ColisService } from './colis.service';
import { CreateColisDto } from './dto/create-colis.dto';
import { UpdateColisDto } from './dto/update-colis.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('colis')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ColisController {
  constructor(private readonly colisService: ColisService) {}

  // 📦 Création d’un colis (client uniquement)
  @Post()
  @Roles('client')
  create(@Body() dto: CreateColisDto) {
    return this.colisService.create(dto);
  }

  // 📦 Voir ses colis (client)
  @Get('client/:id')
  @Roles('client')
  getColisClient(@Param('id') id: number) {
    return this.colisService.findByClientId(id);
  }

  // 📦 Voir ses colis à livrer (livreur)
  @Get('livreur/:id')
  @Roles('livreur')
  getColisLivreur(@Param('id') id: number) {
    return this.colisService.findByLivreurId(id);
  }

  // 📦 Voir tous les colis (admin)
  @Get('admin')
  @Roles('admin')
  getAll() {
    return this.colisService.findAll();
  }

  // 📦 Mettre à jour un colis (admin ou client)
  @Patch(':id')
  @Roles('admin', 'client')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateColisDto,
  ) {
    return this.colisService.update(id, dto);
  }
}
