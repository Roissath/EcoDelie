import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Entrepot } from '../entrepot/entrepot.entity';
import { Colis } from '../colis/colis.entity';

@Entity()
export class Stokage {
  @PrimaryGeneratedColumn({ name: 'Id_stokage' })
  id!: number;

  @Column()
  date_entree!: Date;

  @Column({ nullable: true })
  date_sortie!: Date;

  @ManyToOne(() => Entrepot, (e) => e.stokages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entrepotId' })
  entrepot!: Entrepot;

  @ManyToOne(() => Colis, (c) => c.stokages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colisId' })
  colis!: Colis;
}
