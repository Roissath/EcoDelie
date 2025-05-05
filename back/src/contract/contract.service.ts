import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contrat.dto';
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly repo: Repository<Contract>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['utilisateur', 'prestataires', 'commercants'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['utilisateur', 'prestataires', 'commercants'],
    });
  }

  create(dto: CreateContractDto) {
    const entity = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateContractDto) {
    const data: any = { ...dto };
if (dto.utilisateurId) {
  data.utilisateur = { id: dto.utilisateurId };
  delete data.utilisateurId;
}
await this.repo.update(id, data);

    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
