import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ name: 'Id_notification' })
  id!: number;

  @Column()
  contenu!: string;

  @Column()
  email!: string;

  @Column({ default: false })
  lu!: boolean;


  @Column({ type: 'timestamp', nullable: true })
  date_lecture?: Date;
  


  @ManyToOne(() => Utilisateur, (u) => u.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;
}
