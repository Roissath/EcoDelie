import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Produit } from '../produit/produit.entity';

@Entity()
export class CommentaireProduit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  contenu!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Utilisateur, (u) => u.commentairesProduit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur!: Utilisateur;

  @ManyToOne(() => Produit, (p) => p.commentaires, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'produitId' })
  produit!: Produit;
}
