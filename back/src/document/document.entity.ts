import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { Utilisateur } from '../utilisateur/utilisateur.entity';
  
  @Entity()
  export class Document {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    type_document!: string;
  
    @Column()
    url!: string;
  
    @Column({ default: 'en_attente' })
    statut!: string; // 'en_attente' | 'valide' | 'rejete'
  
    @Column({ nullable: true, type: 'text' })
    commentaire?: string;
    
  
    @CreateDateColumn()
    date_upload!: Date;
  
    @ManyToOne(() => Utilisateur, (u) => u.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'utilisateurId' })
    utilisateur!: Utilisateur;
  
    @Column()
    utilisateurId!: number;
  }
