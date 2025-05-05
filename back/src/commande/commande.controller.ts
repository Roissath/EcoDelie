import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('commande')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  @Roles('client')
  create(@Body() dto: CreateCommandeDto) {
    return this.commandeService.create(dto);
  }

  @Get('client/:id')
  @Roles('client')
  getCommandesClient(@Param('id') id: number) {
    return this.commandeService.getByClientId(id);
  }

  @Get('livreur/:id')
  @Roles('livreur')
  getCommandesLivreur(@Param('id') id: number) {
    return this.commandeService.getByLivreurId(id);
  }

  @Get('admin')
  @Roles('admin')
  getAllCommandes() {
    return this.commandeService.findAll();
  }

  @Patch(':id')
  @Roles('admin', 'client')
  updateCommande(
    @Param('id') id: number,
    @Body() dto: UpdateCommandeDto,
  ) {
    return this.commandeService.update(id, dto);
  }
}
