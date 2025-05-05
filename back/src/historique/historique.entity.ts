import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Historique {
  @PrimaryGeneratedColumn({ name: 'Id_historique' })
  id!: number;

  @Column({ nullable: true })
  historique_livraison!: string;

  @Column({ nullable: true })
  historique_commande!: string;

  @Column({ nullable: true })
  historique_prestataire!: string;

  @Column()
  statut!: string;

  @Column()
  date_entree!: Date;

  @ManyToOne(() => Utilisateur, (u) => u.historiques, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
