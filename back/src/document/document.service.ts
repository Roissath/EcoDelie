import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur'] });
  }
  
  findByUser(userId: number) {
    return this.repo.find({
      where: { utilisateur: { id: userId } },
      relations: ['utilisateur'],
    });
  }
  

  create(dto: CreateDocumentDto) {
    const doc = this.repo.create(dto);
    return this.repo.save(doc);
  }

  async update(id: number, dto: UpdateDocumentDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async valider(id: number) {
    await this.repo.update(id, {
      statut: 'valide',
      commentaire: undefined, // ✅ PAS null
    });
    return this.findOne(id);
  }

  async rejeter(id: number, commentaire: string) {
    await this.repo.update(id, {
      statut: 'rejeté',
      commentaire,
    });
    return this.findOne(id);
  }
  
}
