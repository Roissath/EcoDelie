import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaireProduit } from './commentaire-produit.entity';
import { CommentaireProduitService } from './commentaire-produit.service';
import { CommentaireProduitController } from './commentaire-produit.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Produit } from '../produit/produit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentaireProduit, Utilisateur, Produit])],
  controllers: [CommentaireProduitController],
  providers: [CommentaireProduitService],
})
export class CommentaireProduitModule {}
