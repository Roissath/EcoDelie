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
import { FactureService } from './facture.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('facture')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FactureController {
  constructor(private readonly factureService: FactureService) {}

  // ✅ Admin : voir toutes les factures
  @Get('admin')
  @Roles('admin')
  findAll() {
    return this.factureService.findAll();
  }

  // ✅ Client : voir ses factures
  @Get('client/:id')
  @Roles('client')
  findByClient(@Param('id') id: number) {
    return this.factureService.findByClientId(id);
  }

  // ✅ Créer une facture
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateFactureDto) {
    return this.factureService.create(dto);
  }

  // ✅ Modifier une facture
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: UpdateFactureDto) {
    return this.factureService.update(id, dto);
  }

  // ✅ Supprimer une facture
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.factureService.remove(id);
  }
}
