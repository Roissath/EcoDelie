import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  // ✅ Créer une notification
  create(dto: CreateNotificationDto) {
    const notification = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
    });
    return this.repo.save(notification);
  }

  // ✅ Voir les notifications d’un utilisateur
  findByUserId(userId: number) {
    return this.repo.find({
      where: { utilisateur: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  // ✅ Marquer comme lue
  async markAsRead(id: number) {
    await this.repo.update(id, { lu: true });
    return this.repo.findOne({ where: { id } });
  }

  // ✅ Supprimer une notification
  remove(id: number) {
    return this.repo.delete(id);
  }
}
