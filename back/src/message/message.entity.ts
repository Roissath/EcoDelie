import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ name: 'Id_message' })
  id!: number;

  @Column()
  contenu!: string;

  @Column()
  date_envoi!: Date;

  @Column()
  lu!: boolean;

  @ManyToOne(() => Utilisateur, (u) => u.messagesEnvoyes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_expediteur' })
  expediteur!: Utilisateur;

  @ManyToOne(() => Utilisateur, (u) => u.messagesRecus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_destination' })
  destinataire!: Utilisateur;
}
