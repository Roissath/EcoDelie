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
  import { DocumentService } from './document.service';
  import { CreateDocumentDto } from './dto/create-document.dto';
  import { UpdateDocumentDto } from './dto/update-document.dto';
  import { RolesGuard } from 'src/comon/guards/roles.guard';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Roles } from 'src/comon/decorators/roles.decorator';
  
  @Controller('document')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class DocumentController {
    constructor(private readonly service: DocumentService) {}
  
    @Post()
    @Roles('client', 'livreur', 'prestataire', 'commercant')
    create(@Body() dto: CreateDocumentDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @Roles('admin')
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.service.findOne(id);
    }
  
    @Get('user/:id')
    findByUser(@Param('id') id: number) {
      return this.service.findByUser(id);
    }
  
    @Patch(':id')
    @Roles('admin')
    update(@Param('id') id: number, @Body() dto: UpdateDocumentDto) {
      return this.service.update(id, dto);
    }
  
    @Patch(':id/valider')
    @Roles('admin')
    valider(@Param('id') id: number) {
      return this.service.valider(id);
    }
  
    @Patch(':id/rejeter')
    @Roles('admin')
    rejeter(@Param('id') id: number, @Body('commentaire') commentaire: string) {
      return this.service.rejeter(id, commentaire);
    }
  
    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id: number) {
      return this.service.remove(id);
    }
  }
  