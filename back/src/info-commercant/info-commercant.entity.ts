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

@Entity()
export class InfoCommercant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  statut!: string;

  @Column()
  adresse!: string;

  @Column({ nullable: true })
  appreciation!: string;

  @Column({ default: false })
  verifie!: boolean;

  @OneToOne(() => Utilisateur, (u) => u.infoCommercant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
  @ManyToOne(() => Contract, (contract) => contract.commercant, { nullable: true })
  contract!: Contract;

}
