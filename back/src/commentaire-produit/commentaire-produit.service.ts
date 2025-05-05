import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentaireProduit } from './commentaire-produit.entity';
import { Repository } from 'typeorm';
import { CreateCommentaireProduitDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireProduitDto } from './dto/update-commentaire-produit.dto';

@Injectable()
export class CommentaireProduitService {
  constructor(
    @InjectRepository(CommentaireProduit)
    private readonly repo: Repository<CommentaireProduit>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'produit'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'produit'] });
  }

  create(dto: CreateCommentaireProduitDto) {
    const commentaire = this.repo.create({
      contenu: dto.contenu,
      utilisateur: { id: dto.utilisateurId },
      produit: { id: dto.produitId },
    });

    return this.repo.save(commentaire);
  }

  async update(id: number, dto: UpdateCommentaireProduitDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
