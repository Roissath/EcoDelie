import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Utilisateur])],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
