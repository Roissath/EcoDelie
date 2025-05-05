import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disponibilite } from './disponibilite.entity';
import { Repository } from 'typeorm';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';

@Injectable()
export class DisponibiliteService {
  constructor(
    @InjectRepository(Disponibilite)
    private readonly repo: Repository<Disponibilite>,
  ) {}

  create(dto: CreateDisponibiliteDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findByUtilisateur(id: number) {
    return this.repo.find({
      where: { utilisateur: { id } },
      order: { jour: 'ASC' },
    });
  }

  async update(id: number, dto: UpdateDisponibiliteDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
