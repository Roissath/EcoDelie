import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colis } from './colis.entity';
import { ColisService } from './colis.service';
import { ColisController } from './colis.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Annonce } from '../annonce/annonce.entity';
import { Entrepot } from '../entrepot/entrepot.entity';
import { Stokage } from '../stokage/stokage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Colis,
      Utilisateur,
      Annonce,
      Entrepot,
      Stokage,
    ]),
  ],
  controllers: [ColisController],
  providers: [ColisService],
})
export class ColisModule {}
