import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Contract } from '../contract/contract.entity';
import { Annonce } from '../annonce/annonce.entity';

@Entity()
export class InfoPrestataire {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  types_services!: string;

  @Column({ nullable: true })
  certification!: string;

  @Column({ nullable: true })
  contractId!: number;
  @Column({ default: 'en_attente' })
statut?: string;


  @Column('float')
  tarif_prestation!: number;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true })
  competence!: string;

  @Column({ default: false })
  verifie!: boolean;

  @OneToOne(() => Utilisateur, (utilisateur) => utilisateur.infoPrestataire, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;

  @ManyToOne(() => Contract, (contract) => contract.prestataire, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contractId' })
  contract!: Contract;
  
  

  @ManyToOne(() => Annonce, (annonce) => annonce.infoPrestataire, { nullable: true })
  @JoinColumn({ name: 'annonceId' })
  annonce!: Annonce;
}
