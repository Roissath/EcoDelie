import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colis } from './colis.entity';
import { CreateColisDto } from './dto/create-colis.dto';
import { UpdateColisDto } from './dto/update-colis.dto';

@Injectable()
export class ColisService {
  constructor(
    @InjectRepository(Colis)
    private readonly repo: Repository<Colis>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['livreur', 'entrepot', 'annonce', 'stokages'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['livreur', 'entrepot', 'annonce', 'stokages'],
    });
  }

  findByClientId(id: number) {
    return this.repo.find({
      where: {
        annonce: {
          utilisateur: { id },
        },
      },
      relations: ['annonce', 'annonce.utilisateur', 'stokages'],
    });
  }

  findByLivreurId(id: number) {
    return this.repo.find({
      where: {
        livreur: { id },
      },
      relations: ['livreur', 'entrepot', 'stokages'],
    });
  }

  create(dto: CreateColisDto) {
    const entity = this.repo.create({
      ...dto,
      entrepot: dto.entrepotId ? { id: dto.entrepotId } : undefined,
      annonce: dto.annonceId ? { id: dto.annonceId } : undefined,
      livreur: dto.livreurId ? { id: dto.livreurId } : undefined,
    });
  
    return this.repo.save(entity);
  }
  

  async update(id: number, dto: UpdateColisDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
