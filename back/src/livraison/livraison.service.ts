import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Livraison } from './livraison.entity';
import { Repository } from 'typeorm';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';

@Injectable()
export class LivraisonService {
  constructor(
    @InjectRepository(Livraison)
    private readonly repo: Repository<Livraison>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['client', 'livreur', 'commande'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['client', 'livreur', 'commande'] });
  }

  create(dto: CreateLivraisonDto) {
    const entity = this.repo.create({
      date_livraison: dto.date_livraison,
      adresse: dto.adresse,
      statut: dto.statut,
      commande: { id: dto.commandeId },
      client: { id: dto.clientId },
      livreur: dto.livreurId ? { id: dto.livreurId } : undefined,
    });
  
    return this.repo.save(entity);
  }
  
  

  async update(id: number, dto: UpdateLivraisonDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
