import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';

@Injectable()
export class AnnonceService {
  constructor(
    @InjectRepository(Annonce)
    private readonly annonceRepo: Repository<Annonce>,
  ) {}

  create(dto: CreateAnnonceDto) {
    const annonce = this.annonceRepo.create(dto);
    return this.annonceRepo.save(annonce);
  }

  findAll() {
    return this.annonceRepo.find({
      relations: ['utilisateur'], // ou 'auteur' si ton champ est nommé autrement
    });
  }

  async findOne(id: number) {
    const annonce = await this.annonceRepo.findOne({
      where: { id },
      relations: ['utilisateur'],
    });
    if (!annonce) throw new NotFoundException('Annonce non trouvée');
    return annonce;
  }

  async update(id: number, dto: UpdateAnnonceDto) {
    const annonce = await this.findOne(id);
    Object.assign(annonce, dto);
    return this.annonceRepo.save(annonce);
  }

  async remove(id: number) {
    const annonce = await this.findOne(id);
    return this.annonceRepo.remove(annonce);
  }

  async findByType(type: string) {
    return this.annonceRepo.find({
      where: { type_annonce: type }, 
      relations: ['utilisateur'],
    });
  }
  
  async findPrestationWithPrestataire(id: number) {
    const annonce = await this.annonceRepo.findOne({
      where: { id, type_annonce: 'prestation' }, 
      relations: ['utilisateur'],
    });
    if (!annonce) throw new NotFoundException('Prestation non trouvée');
    return annonce;
  }
  
  
}
