import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiement } from './paiement.entity';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paiement])],
  providers: [PaiementService],
  controllers: [PaiementController],
  exports: [PaiementService],
})
export class PaiementModule {}
