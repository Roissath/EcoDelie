// colis.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Entrepot } from '../entrepot/entrepot.entity';
import { Annonce } from '../annonce/annonce.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Stokage } from '../stokage/stokage.entity';
import { Commande } from 'src/commande/commande.entity';


@Entity()
export class Colis {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  photo?: string;

  @Column()
  descriptif!: string;

  @Column()
  dimension!: string;

  @Column({ type: 'float' })
  prix_livraison!: number;

  @Column({ default: false })
  assurance!: boolean;

  @Column()
  statut!: string;

  @ManyToOne(() => Entrepot, (entrepot) => entrepot.colis, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'entrepotId' })
  entrepot?: Entrepot;

  @ManyToOne(() => Annonce, (annonce) => annonce.colis, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'annonceId' })
  annonce?: Annonce;

  @ManyToOne(() => Utilisateur, (livreur) => livreur.colisLivreur, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'livreurId' })
  livreur?: Utilisateur;

  @OneToMany(() => Stokage, (stokage) => stokage.colis)
  stokages!: Stokage[];

@OneToOne(() => Commande, (commande) => commande.colis)
commande!: Commande;

}
