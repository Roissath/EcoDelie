import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Annonce } from '../annonce/annonce.entity';

@Entity()
export class Paiement {
  @PrimaryGeneratedColumn({ name: 'Id_paiement' })
  id!: number;

  @Column('float')
  montant!: number;

  @Column()
  date_paiement!: Date;

  @Column()
  moyen_paiement!: string;

  @Column()
  statut!: string;

  @ManyToOne(() => Utilisateur, (u) => u.paiements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur!: Utilisateur;

  @ManyToOne(() => Annonce, (a) => a.paiements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_anonce' })
  annonce!: Annonce;
}
