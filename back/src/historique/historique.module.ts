import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historique } from './historique.entity';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Historique])],
  providers: [HistoriqueService],
  controllers: [HistoriqueController],
  exports: [HistoriqueService],
})
export class HistoriqueModule {}
