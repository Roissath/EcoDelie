import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfoPrestataire } from './info-prestataire.entity';
import { CreateInfoPrestataireDto } from './dto/create-info-prestataire.dto';
import { UpdateInfoPrestataireDto } from './dto/update-info-prestataire.dto';

@Injectable()
export class InfoPrestataireService {
  constructor(
    @InjectRepository(InfoPrestataire)
    private readonly repo: Repository<InfoPrestataire>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'contract', 'annonce'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  create(dto: CreateInfoPrestataireDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      contract: dto.contractId ? { id: dto.contractId } : undefined,
      annonce: dto.annonceId ? { id: dto.annonceId } : undefined,
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateInfoPrestataireDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async valider(id: number) {
    await this.repo.update(id, { verifie: true });
  }

  async rejeter(id: number) {
    await this.repo.update(id, { verifie: false, status: 'refusé' });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
 
  async findByUtilisateurId(utilisateurId: number) {
    return this.repo.findOne({
      where: {
        utilisateur: { id: utilisateurId },
      },
      relations: ['utilisateur', 'annonce', 'contract'],
    });
  }
  

}
