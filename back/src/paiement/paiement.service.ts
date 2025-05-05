import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paiement } from './paiement.entity';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private readonly repo: Repository<Paiement>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'annonce'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'annonce'] });
  }

  create(dto: CreatePaiementDto) {
    const paiement = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      annonce: { id: dto.annonceId },
    });
    return this.repo.save(paiement);
  }

  async update(id: number, dto: UpdatePaiementDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
