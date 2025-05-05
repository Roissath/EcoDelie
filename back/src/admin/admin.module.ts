import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])], // obligatoire ici
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule], // facultatif sauf si tu veux l’utiliser ailleurs
})
export class AdminModule {}
