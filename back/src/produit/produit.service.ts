import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './produit.entity';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto.tsupdate-produit.dto';
import { MoreThan } from 'typeorm';


@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly repo: Repository<Produit>,
  ) {}

  //  Créer un produit
  create(dto: CreateProduitDto) {
    const produit = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(produit);
  }

  //  Voir tous les produits publics (pour les clients)
  findAllPublic() {
    return this.repo.find({
      where: {
        stock: MoreThan(0),
      },
      relations: ['utilisateur', 'commentaires'],//pour afficher le vendeur 
    });
  }

  //  Produits d’un commerçant
  findByCommercantId(id: number) {
    return this.repo.find({
      where: {
        utilisateur: { id },
      },
      relations: ['commentaires'],
    });
  }

  // Modifier un produit
  async update(id: number, dto: UpdateProduitDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  //  Supprimer un produit
  remove(id: number) {
    return this.repo.delete(id);
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['utilisateur'],
    });
  }
  
  async findByCategorie(categorie: string) {
    return this.repo.find({
      where: { categorie },
      relations: ['utilisateur'],
    });
  }
  
}
