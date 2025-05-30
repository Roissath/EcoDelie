import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request,Response } from 'express';

@Controller('paiements')
export class PaiementController {
  constructor(private readonly service: PaiementService) {}
  @Get(':id/facture/public') 
  generateFacturePublic(@Param('id') id: string, @Res() res: Response) {
    return this.service.generateFacture(+id, res);
  }
  @Post()
  create(@Body() dto: CreatePaiementDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdatePaiementDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMyPaiements(@Req() req: Request) {
    return this.service.findByUtilisateurId(req.user['id']);
  }

  @Get(':id/facture')
@UseGuards(JwtAuthGuard)
generateFacture(@Param('id') id: string, @Res() res: Response) {
  return this.service.generateFacture(+id, res);
}


}
