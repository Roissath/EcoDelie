import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  providers: [ProduitService],
  controllers: [ProduitController],
  exports: [ProduitService],
})
export class ProduitModule {}
