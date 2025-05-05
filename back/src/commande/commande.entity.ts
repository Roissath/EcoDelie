import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Facture } from '../facture/facture.entity';
import { Livraison } from '../livraison/livraison.entity';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn({ name: 'Id_commande' })
  id!: number;

  @Column()
  statut!: string;

  @Column()
  date_commande!: Date;

  @Column('float')
  prix_unitaire!: number;

  @ManyToOne(() => Utilisateur, (u) => u.commandes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;

  @ManyToOne(() => Utilisateur, (u) => u.commandesClient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_client' })
  client!: Utilisateur;

  @ManyToOne(() => Facture, (f) => f.commandes, { nullable: true })
@JoinColumn({ name: 'factureId' })
facture?: Facture;


  @OneToOne(() => Livraison, (l) => l.commande)
  livraison!: Livraison;
}
