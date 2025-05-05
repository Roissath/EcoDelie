import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Abonnement {
  @PrimaryGeneratedColumn({ name: 'Id_abonement' })
  id!: number;

  @Column()
  type_abonnement!: string;

  @Column()
  date_debut!: Date;

  @Column()
  date_fin!: Date;

  @Column()
  statut!: string;

  @ManyToOne(() => Utilisateur, (u) => u.abonnements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
