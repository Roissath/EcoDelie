import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private readonly repo: Repository<Commande>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['utilisateur', 'client', 'facture', 'livraison'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['utilisateur', 'client', 'facture', 'livraison'],
    });
  }

  getByClientId(id: number) {
    return this.repo.find({
      where: { client: { id } },
      relations: ['client'],
    });
  }

  getByLivreurId(id: number) {
    return this.repo.find({
      where: { utilisateur: { id } },
      relations: ['utilisateur'],
    });
  }

  create(dto: CreateCommandeDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      client: { id: dto.clientId },
      facture: dto.factureId ? { id: dto.factureId } : undefined,
    });
    return this.repo.save(entity);
  }
  

  async update(id: number, dto: UpdateCommandeDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
