import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(dto: CreateNotificationDto): Promise<import("./notification.entity").Notification>;
    getMyNotifications(req: any): Promise<import("./notification.entity").Notification[]>;
    markAsRead(id: number): Promise<import("./notification.entity").Notification | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
