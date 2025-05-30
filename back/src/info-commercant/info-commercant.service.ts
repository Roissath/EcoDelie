import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfoCommercant } from './info-commercant.entity';
import { CreateInfoCommercantDto } from './dto/create-info-commercant.dto';
import { UpdateInfoCommercantDto } from './dto/update-info-commercant.dto';

@Injectable()
export class InfoCommercantService {
  constructor(
    @InjectRepository(InfoCommercant)
    private readonly repo: Repository<InfoCommercant>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'contract'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  create(dto: CreateInfoCommercantDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      contract: dto.contractId ? { id: dto.contractId } : undefined,
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateInfoCommercantDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async valider(id: number) {
    await this.repo.update(id, { verifie: true });
  }

  async rejeter(id: number) {
    await this.repo.update(id, { verifie: false, statut: 'refusé' });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async findByUtilisateurId(utilisateurId: number) {
    return this.repo.findOne({
      where: { utilisateur: { id: utilisateurId } },
      relations: ['utilisateur'],
    });
  }
  
}
