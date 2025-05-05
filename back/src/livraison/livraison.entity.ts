import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';

@Entity()
export class Livraison {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  date_livraison!: Date;

  @Column()
  adresse!: string;

  @Column()
  statut!: string;

  @ManyToOne(() => Utilisateur, (u) => u.livraisonsClient, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'clientId' })
  client!: Utilisateur;

  @ManyToOne(() => Utilisateur, (u) => u.livraisons, { onDelete: 'SET NULL', nullable: true })
@JoinColumn({ name: 'livreurId' })
livreur?: Utilisateur;


  @OneToOne(() => Commande, (commande) => commande.livraison, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commandeId' })
  commande!: Commande;

  @Column()
  commandeId!: number;
}
