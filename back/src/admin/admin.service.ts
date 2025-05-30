import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly repo: Repository<Admin>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  async findByUtilisateurId(utilisateurId: number) {
    return this.repo.findOne({ where: { utilisateur: { id: utilisateurId } }, relations: ['utilisateur'] });
  }

  async create(dto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(dto.mot_de_passe, 10);

    const admin = this.repo.create({
      nom: dto.nom,
      statut: dto.statut,
      mot_de_passe: hashedPassword,
      utilisateur: { id: dto.utilisateurId },
    });

    return this.repo.save(admin);
  }

  async update(id: number, dto: UpdateAdminDto) {
    if (dto.mot_de_passe) {
      dto.mot_de_passe = await bcrypt.hash(dto.mot_de_passe, 10);
    }
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  
}
