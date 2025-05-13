import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class InfoLivreur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type_permis!: string;

  @Column()
  zones_livraison!: string;

  @Column()
  type_transport!: string;

  @Column()
  moyen_paiement!: string;

  @Column()
  statut!: string; // "en attente", "validé", "refusé"

  @Column({ nullable: true })
  appreciation!: string;

  @Column({ default: false })
  verifie!: boolean; // validé par l'admin après réception des documents
  
  @Column({ nullable: true })
photo?: string;

@Column({ nullable: true })
regions_livraison?: string;

@Column({ nullable: true })
villes_livraison?: string;


  @OneToOne(() => Utilisateur, (utilisateur) => utilisateur.infoLivreur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
