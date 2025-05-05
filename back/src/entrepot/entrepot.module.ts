import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrepot } from './entrepot.entity';
import { EntrepotService } from './entrepot.service';
import { EntrepotController } from './entrepot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entrepot])],
  providers: [EntrepotService],
  controllers: [EntrepotController],
  exports: [EntrepotService],
})
export class EntrepotModule {}
