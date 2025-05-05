import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { InfoCommercant } from '../info-commercant/info-commercant.entity';
import { InfoPrestataire } from '../info-prestataire/info-prestataire.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { ManyToOne } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'date' })
  date_signature!: Date;

  @Column()
  statut!: string; // exemple : "actif", "terminé", "suspendu"

  @OneToOne(() => InfoCommercant, (commercant) => commercant.contract)
  commercant!: InfoCommercant;

  @OneToOne(() => InfoPrestataire, (prestataire) => prestataire.contract)
  prestataire!: InfoPrestataire;
  
  @ManyToOne(() => Utilisateur, (u) => u.contrats
  , { onDelete: 'CASCADE' })
  utilisateur!: Utilisateur;
}
