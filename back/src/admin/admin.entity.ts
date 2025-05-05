import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column()
  statut!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToOne(() => Utilisateur, (u) => u.admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur!: Utilisateur;
}
