import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Colis } from '../colis/colis.entity';
import { Stokage } from '../stokage/stokage.entity';

@Entity()
export class Entrepot {
  @PrimaryGeneratedColumn({ name: 'Id_entrepot' })
  id!: number;

  @Column()
  adresse!: string;

  @Column()
  capacite_stock!: number;

  @Column()
  gestionnaire!: string;

  @OneToMany(() => Stokage, (s) => s.entrepot)
  stokages!: Stokage[];

  @OneToMany(() => Colis, (c) => c.entrepot)
  colis!: Colis[];
}
