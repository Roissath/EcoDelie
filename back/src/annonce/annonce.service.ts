import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';

@Injectable()
export class AnnonceService {
  constructor(
    @InjectRepository(Annonce)
    private readonly repo: Repository<Annonce>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'paiements', 'colis', 'infoPrestataire'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'paiements', 'colis', 'infoPrestataire'] });
  }

  create(dto: CreateAnnonceDto) {
    const annonce = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(annonce);
  }

  async update(id: number, dto: UpdateAnnonceDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
