import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Abonnement } from './abonnement.entity';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/update-abonnement.dto';

@Injectable()
export class AbonnementService {
  constructor(
    @InjectRepository(Abonnement)
    private readonly repo: Repository<Abonnement>,
  ) {}

  // ✅ Créer un abonnement
  create(dto: CreateAbonnementDto) {
    const abonnement = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(abonnement);
  }

  // ✅ Voir tous les abonnements
  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  // ✅ Voir les abonnements d’un client
  findByClientId(id: number) {
    return this.repo.find({
      where: { utilisateur: { id } },
      relations: ['utilisateur'],
    });
  }

  // ✅ Mettre à jour un abonnement
  async update(id: number, dto: UpdateAbonnementDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  // ✅ Supprimer un abonnement
  remove(id: number) {
    return this.repo.delete(id);
  }
}
