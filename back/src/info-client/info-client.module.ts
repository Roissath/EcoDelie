import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoClient } from './info-client.entity';
import { InfoClientService } from './info-client.service';
import { InfoClientController } from './info-client.controller';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoClient, Utilisateur])],
  providers: [InfoClientService],
  controllers: [InfoClientController],
  exports: [InfoClientService],
})
export class InfoClientModule {}
