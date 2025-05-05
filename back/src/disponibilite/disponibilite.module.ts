import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disponibilite } from './disponibilite.entity';
import { DisponibiliteService } from './disponibilite.service';
import { DisponibiliteController } from './disponibilite.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disponibilite, Utilisateur])],
  providers: [DisponibiliteService],
  controllers: [DisponibiliteController],
  exports: [DisponibiliteService],
})
export class DisponibiliteModule {}
