import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnonceClient } from './annonce-client.entity';
import { AnnonceClientService } from './annonce-client.service';
import { AnnonceClientController } from './annonce-client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnnonceClient])],
  providers: [AnnonceClientService],
  controllers: [AnnonceClientController],
  exports: [AnnonceClientService],
})
export class AnnonceClientModule {}
