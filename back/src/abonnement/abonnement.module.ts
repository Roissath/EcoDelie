import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './abonnement.entity';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abonnement, Utilisateur])],
  controllers: [AbonnementController],
  providers: [AbonnementService],
})
export class AbonnementModule {}
