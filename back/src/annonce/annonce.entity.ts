import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { Utilisateur } from '../utilisateur/utilisateur.entity';
  import { InfoPrestataire } from '../info-prestataire/info-prestataire.entity';
  import { Paiement } from 'src/paiement/paiement.entity';
  import { Colis } from '../colis/colis.entity';
  
  @Entity()
  export class Annonce {
    @PrimaryGeneratedColumn({ name: 'Id_annonce' })
    id!: number;
  
    @Column()
    type_annonce!: string;
  
    @Column()
    titre!: string;
  
    @Column()
    description!: string;
  
    @Column({ type: 'datetime' })
    date_publication!: Date;
  
    @Column()
    statut!: string;
  
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.annonces, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'utilisateurId' })
    utilisateur!: Utilisateur;
  
    @OneToMany(() => InfoPrestataire, (info) => info.annonce)
    infoPrestataire!: InfoPrestataire[];
  
    @OneToMany(() => Paiement, (paiement) => paiement.annonce)
    paiements!: Paiement[];
  
    @OneToMany(() => Colis, (colis) => colis.annonce)
    colis!: Colis[];
  }
  