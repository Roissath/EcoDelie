import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facture } from './facture.entity';
import { Repository } from 'typeorm';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';

@Injectable()
export class FactureService {
  constructor(
    @InjectRepository(Facture)
    private readonly repo: Repository<Facture>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'commandes'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'commandes'] });
  }

  create(dto: CreateFactureDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateFactureDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  findByClientId(id: number) {
    return this.repo.find({
      where: { utilisateur: { id } },
      relations: ['utilisateur', 'commandes'],
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
