import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnonceClient } from './annonce-client.entity';
import { CreateAnnonceClientDto } from './dto/create-annonce-client.dto';
import { UpdateAnnonceClientDto } from './dto/update-annonce-client.dto';

@Injectable()
export class AnnonceClientService {
  constructor(
    @InjectRepository(AnnonceClient)
    private readonly repo: Repository<AnnonceClient>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: [
        'utilisateur',
        'livreurs',
        'livreurs.utilisateur',
      ],
      order: { datePublication: 'DESC' }, // tri facultatif
    });
  }

  findOne(id: number)
   {
    if (!id || isNaN(id)) throw new Error('ID invalide');
    return this.repo.findOne({
      where: { id },
      relations: [
        'utilisateur',
        'livreurs',
        'livreurs.utilisateur',
      ],
    })
  }
  

  create(dto: CreateAnnonceClientDto) {
    const annonce = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      datePublication: new Date(),
    });
    return this.repo.save(annonce);
  }

  async update(id: number, dto: UpdateAnnonceClientDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  
}
