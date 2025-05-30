import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UploadedFile,
    InternalServerErrorException,
    UploadedFiles,
    UseGuards,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';

  import { DocumentService } from './document.service';
  import { CreateDocumentDto } from './dto/create-document.dto';
  import { UpdateDocumentDto } from './dto/update-document.dto';
  import { RolesGuard } from 'src/comon/guards/roles.guard';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Roles } from 'src/comon/decorators/roles.decorator';
  import { UseInterceptors } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';


  @Controller('document')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class DocumentController {
    constructor(private readonly service: DocumentService) {}
  
    @Post()
    @Roles('client', 'livreur', 'prestataire', 'commercant')
    create(@Body() dto: CreateDocumentDto) {
      return this.service.create(dto);
    }
  
    // @Get()
    // @Roles('admin')
    // findAll() {
    //   return this.service.findAll();
    // }

    @Get()
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
@UseGuards(JwtAuthGuard) 
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

    @Post('upload')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    },
  }),
}))
@Post('upload')
@UseInterceptors(FilesInterceptor('files', 10, { // jusqu’à 10 fichiers
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    },
  }),
}))
async uploadMultipleDocuments(
  @UploadedFiles() files: Express.Multer.File[],
  @Body('utilisateurId') utilisateurId: number,
  @Body('type_document') type_document: string
) {
  if (!type_document) throw new Error('type_document requis');
  if (!files || files.length === 0) throw new Error('Aucun fichier reçu');

  const savedDocs = await Promise.all(
    files.map(file =>
      this.service.create({
        utilisateurId: +utilisateurId,
        type_document,
        url: file.filename,
        statut: 'en_attente',
      }),
    )
  );

  return savedDocs;
}
  }
  