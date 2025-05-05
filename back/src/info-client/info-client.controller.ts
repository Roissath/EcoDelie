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
import { InfoClientService } from './info-client.service';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';
import { RolesGuard } from 'src/comon/guards/roles.guard';

@Controller('info-client')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('client')
export class InfoClientController {
  constructor(private readonly service: InfoClientService) {}

  @Post()
  create(@Body() dto: CreateInfoClientDto, @Request() req) {
    return this.service.create({ ...dto, utilisateurId: req.user.id });
  }

  @Get()
  find(@Request() req) {
    return this.service.findByUtilisateur(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateInfoClientDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
