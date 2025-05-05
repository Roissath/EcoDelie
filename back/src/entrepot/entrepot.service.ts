import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrepot } from './entrepot.entity';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';

@Injectable()
export class EntrepotService {
  constructor(
    @InjectRepository(Entrepot)
    private readonly repo: Repository<Entrepot>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['stokages', 'colis'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['stokages', 'colis'] });
  }

  create(dto: CreateEntrepotDto) {
    const entrepot = this.repo.create(dto);
    return this.repo.save(entrepot);
  }

  async update(id: number, dto: UpdateEntrepotDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
