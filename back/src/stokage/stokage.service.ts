import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stokage } from './stokage.entity';
import { CreateStokageDto } from './dto/create-stokage.dto';
import { UpdateStokageDto } from './dto/update-stokatge.dto';
@Injectable()
export class StokageService {
  constructor(
    @InjectRepository(Stokage)
    private readonly repo: Repository<Stokage>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['entrepot', 'colis'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['entrepot', 'colis'] });
  }

  create(dto: CreateStokageDto) {
    const stokage = this.repo.create({
      ...dto,
      entrepot: { id: dto.entrepotId },
      colis: { id: dto.colisId },
    });
    return this.repo.save(stokage);
  }

  async update(id: number, dto: UpdateStokageDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
  
}
