import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly repo;
    constructor(repo: Repository<Notification>);
    create(dto: CreateNotificationDto): Promise<Notification>;
    findByUserId(userId: number): Promise<Notification[]>;
    markAsRead(id: number): Promise<Notification | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
