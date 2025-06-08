// import { Controller, Get, Req,Post, Body, Patch,UseGuards, Param, Delete,ParseIntPipe, UploadedFile, UseInterceptors
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { UtilisateurService } from './utilisateur.service';
// import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
// import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
// import * as fs from 'fs';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// @Controller('utilisateurs')
// export class UtilisateurController {
//   constructor(private readonly service: UtilisateurService) {}

//   @Post()
//   create(@Body() dto: CreateUtilisateurDto) {
//     return this.service.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(+id);
//   }

  
//   @Patch(':id/valider-profil')
//   validerProfil(@Param('id') id: number) {
//     return this.service.update(id, { statut: 'valide' });
//   }

//   @Patch(':id/rejeter-profil')
//   rejeterProfil(@Param('id') id: number) {
//     return this.service.update(id, { statut: 'rejeté' });
//   }

//   @Get('me')
// @UseGuards(JwtAuthGuard)
// async getProfile(@Req() req) {
//   return this.service.findOne(req.user.id); // tu dois renvoyer les infos complètes
// }



//   @Patch(':id')
// update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUtilisateurDto) {
//   return this.service.update(id, dto);
// }

// @Delete(':id')
// remove(@Param('id', ParseIntPipe) id: number) {
//   return this.service.remove(id);
// }
// @Patch(':id/photo')
// @UseInterceptors(FileInterceptor('file', {
//   storage: diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//       const ext = extname(file.originalname);
//       const filename = `user-${Date.now()}${ext}`;
//       cb(null, filename);
//     }
//   })
// }))
// async uploadPhoto(
//   @Param('id', ParseIntPipe) id: number,
//   @UploadedFile() file: Express.Multer.File
// ) {
//   const utilisateur = await this.service.findOne(id);
//   if (!utilisateur) throw new Error('Utilisateur non trouvé');

//   utilisateur.photo_profil = `/uploads/${file.filename}`;
//   return this.service.update(id, utilisateur);
// }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname } from "path"
import type { UtilisateurService } from "./utilisateur.service"
import type { CreateUtilisateurDto } from "./dto/create-utilisateur.dto"
import type { UpdateUtilisateurDto } from "./dto/update-utilisateur.dto"

@Controller("utilisateurs")
export class UtilisateurController {
  constructor(private readonly service: UtilisateurService) {}

  @Post()
  create(@Body() dto: CreateUtilisateurDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id/valider-profil')
  validerProfil(@Param('id') id: number) {
    return this.service.update(id, { statut: 'valide' });
  }

  @Patch(':id/rejeter-profil')
  rejeterProfil(@Param('id') id: number) {
    return this.service.update(id, { statut: 'rejeté' });
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUtilisateurDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // Route corrigée pour l'upload de photo
  @Post(":id/photo")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
          const ext = extname(file.originalname)
          const filename = `user-${Date.now()}${ext}`
          cb(null, filename)
        },
      }),
    }),
  )
  async uploadPhoto(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error("Aucun fichier fourni")
    }

    const utilisateur = await this.service.findOne(id)
    if (!utilisateur) {
      throw new Error("Utilisateur non trouvé")
    }

    const photoPath = `/uploads/${file.filename}`
    await this.service.update(id, { photo_profil: photoPath })

    return {
      message: "Photo mise à jour avec succès",
      photo_profil: photoPath,
      photo_url: photoPath, // Pour compatibilité
    }
  }
}
