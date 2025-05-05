import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

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

  create(dto: CreateAdminDto) {
    const admin = this.repo.create({
      statut: dto.statut,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(admin);
  }

  async update(id: number, dto: UpdateAdminDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
