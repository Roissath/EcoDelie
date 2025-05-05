import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/comon/guards/roles.guard';
import { Roles } from 'src/comon/decorators/roles.decorator';
@Controller('notification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ✅ Créer une notification (admin uniquement)
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  // ✅ Voir ses propres notifications
  @Get()
  getMyNotifications(@Request() req) {
    const userId = req.user.id;
    return this.notificationService.findByUserId(userId);
  }

  // ✅ Marquer une notification comme lue
  @Patch(':id/lue')
  markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }

  // ✅ Supprimer une notification (admin uniquement)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.notificationService.remove(id);
  }
}
