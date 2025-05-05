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
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto.tsupdate-produit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  // ✅ Création d’un produit (commerçant uniquement)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('commercant')
  create(@Body() dto: CreateProduitDto) {
    return this.produitService.create(dto);
  }

  // ✅ Tous les produits publics (accessible à tous)
  @Get('/public')
  findAllPublic() {
    return this.produitService.findAllPublic();
  }

  // ✅ Produits d’un commerçant
  @Get('/commercant/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('commercant')
  findByCommercant(@Param('id') id: number) {
    return this.produitService.findByCommercantId(id);
  }

  // ✅ Mise à jour d’un produit
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('commercant', 'admin')
  update(@Param('id') id: number, @Body() dto: UpdateProduitDto) {
    return this.produitService.update(id, dto);
  }

  // ✅ Suppression d’un produit
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('commercant', 'admin')
  remove(@Param('id') id: number) {
    return this.produitService.remove(id);
  }
}
