import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { AnnonceClient } from '../annonce-client/annonce-client.entity';



@Entity()
export class InfoLivreur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type_permis!: string;

  @Column()
  zones_livraison?: string;

  @Column()
  type_transport!: string;

  @Column()
  moyen_paiement!: string;

  @Column({ default: 'en_attente'})
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

  @ManyToMany(() => AnnonceClient, (annonce) => annonce.livreurs)
annonces!: AnnonceClient[];

  @ManyToMany(() => InfoLivreur, (livreur) => livreur.annonces)
@JoinTable()
livreurs!: InfoLivreur[];

}
