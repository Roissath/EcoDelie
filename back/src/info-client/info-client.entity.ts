import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class InfoClient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  type_abonnement?: string;

  @Column({ nullable: true })
  moyen_paiement?: string;

  @Column({ nullable: true })
  historique_commande?: string;

  @Column({ nullable: true })
  appreciation?: string;

  @Column({ default: 'en_attente' })
statut?: string;


  @Column({ nullable: true })
  descriptif_profil?: string;

  @Column({ nullable: true })
  age?: number;

  @OneToOne(() => Utilisateur, (u) => u.infoClient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur!: Utilisateur;
  
}
