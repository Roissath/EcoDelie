import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoClient } from './info-client.entity';
import { Repository } from 'typeorm';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';

@Injectable()
export class InfoClientService {
  constructor(
    @InjectRepository(InfoClient)
    private readonly repo: Repository<InfoClient>,
  ) {}

  create(dto: CreateInfoClientDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findByUtilisateur(id: number) {
    return this.repo.findOne({
      where: { utilisateur: { id } },
      relations: ['utilisateur'],
    });
  }

  async update(id: number, dto: UpdateInfoClientDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
