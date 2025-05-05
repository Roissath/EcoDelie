import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historique } from './historique.entity';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private readonly repo: Repository<Historique>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  create(dto: CreateHistoriqueDto) {
    const historique = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(historique);
  }

  async update(id: number, dto: UpdateHistoriqueDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
