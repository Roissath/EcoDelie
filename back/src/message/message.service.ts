import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['expediteur', 'destinataire'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['expediteur', 'destinataire'] });
  }

  create(dto: CreateMessageDto) {
    const message = this.repo.create({
      ...dto,
      expediteur: { id: dto.expediteurId },
      destinataire: { id: dto.destinataireId },
    });
    return this.repo.save(message);
  }

  async update(id: number, dto: UpdateMessageDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
