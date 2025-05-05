import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Commande } from '../commande/commande.entity';

@Entity()
export class Facture {
  @PrimaryGeneratedColumn({ name: 'Id_facture' })
  id!: number;

  @Column()
  mois!: string;

  @Column('float')
  montant_total!: number;

  @Column()
  date_generation!: Date;

  @Column()
  statut!: string;

  @Column()
  pdf_url!: string;

  @ManyToOne(() => Utilisateur, (u) => u.factures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur!: Utilisateur;

  @OneToMany(() => Commande, (c) => c.facture)
  commandes!: Commande[];
}
