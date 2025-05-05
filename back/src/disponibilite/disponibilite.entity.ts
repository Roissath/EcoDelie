import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Disponibilite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jour!: string; // exemple : "lundi", "mardi", "dimanche"

  @Column({ type: 'time' })
  heure_debut!: string; // exemple : "08:00"

  @Column({ type: 'time' })
  heure_fin!: string; // exemple : "18:00"

  @ManyToOne(() => Utilisateur, (u) => u.disponibilites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
