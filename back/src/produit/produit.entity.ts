import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { CommentaireProduit } from '../commentaire-produit/commentaire-produit.entity';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column()
  descriptif!: string;

  @CreateDateColumn()
  date_publication!: Date;

  @Column('float')
  prix!: number;

  @Column()
  stock!: number;

  @Column()
  categorie!: string;

  // 🔁 Un commerçant peut publier plusieurs produits
  @ManyToOne(() => Utilisateur, (u) => u.produits)
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;

  // 🔁 Un produit peut avoir plusieurs commentaires
  @OneToMany(() => CommentaireProduit, (c) => c.produit, { cascade: true })
  commentaires!: CommentaireProduit[];
}
