import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class AnnonceClient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lieu_depart!: string;

  @Column()
  lieu_arrivee!: string;

  @Column('float')
  poids_estime!: number;

  @Column('float')
  prix_livraison!: number;

  @Column()
  colis_fragile!: boolean;
  @Column()
type_annonce!: 'livraison' | 'course';

@Column({ nullable: true })
magasin?: string;

@Column({ nullable: true, type: 'text' })
liste_courses?: string;

@Column({ nullable: true })
date_course?: Date;


  @ManyToOne(() => Utilisateur, (u) => u.annoncesClient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
