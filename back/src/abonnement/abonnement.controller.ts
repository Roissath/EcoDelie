import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/update-abonnement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('abonnement')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AbonnementController {
  constructor(private readonly abonnementService: AbonnementService) {}

  // ✅ Créer un abonnement (admin)
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateAbonnementDto) {
    return this.abonnementService.create(dto);
  }

  // ✅ Voir tous les abonnements (admin)
  @Get('admin')
  @Roles('admin')
  findAll() {
    return this.abonnementService.findAll();
  }

  // ✅ Voir ses abonnements (client)
  @Get('client/:id')
  @Roles('client')
  findByClient(@Param('id') id: number) {
    return this.abonnementService.findByClientId(id);
  }

  // ✅ Modifier un abonnement
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: UpdateAbonnementDto) {
    return this.abonnementService.update(id, dto);
  }

  // ✅ Supprimer un abonnement
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.abonnementService.remove(id);
  }
}
