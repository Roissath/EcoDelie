import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfoLivreur } from './info-livreur.entity';
import { CreateInfoLivreurDto } from './dto/create-info-livreur.dto';
import { UpdateInfoLivreurDto } from './dto/update-info-livreur.dto';

@Injectable()
export class InfoLivreurService {
  constructor(
    @InjectRepository(InfoLivreur)
    private readonly repo: Repository<InfoLivreur>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  create(dto: CreateInfoLivreurDto) {
    const info = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(info);
  }

  async update(id: number, dto: UpdateInfoLivreurDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async valider(id: number) {
    await this.repo.update(id, { verifie: true });
  }

  async rejeter(id: number) {
    await this.repo.update(id, { verifie: false, statut: 'rejeté' });
  }
}
