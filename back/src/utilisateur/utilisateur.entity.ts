import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { Role } from '../enums/role.enum';
  import { InfoClient } from '../info-client/info-client.entity';
  import { InfoLivreur } from '../info-livreur/info-livreur.entity';
  import { InfoPrestataire } from '../info-prestataire/info-prestataire.entity';
  import { InfoCommercant } from '../info-commercant/info-commercant.entity';
  import { Admin } from '../admin/admin.entity';
  import { Annonce } from '../annonce/annonce.entity';
  import { AnnonceClient } from '../annonce-client/annonce-client.entity';
  import { Message } from '../message/message.entity';
  import { Commande } from '../commande/commande.entity';
  import { Paiement } from '../paiement/paiement.entity';
  import { Facture } from '../facture/facture.entity';
  import { Historique } from '../historique/historique.entity';
  import { Abonnement } from '../abonnement/abonnement.entity';
  import { Notification } from '../notification/notification.entity';
  import { Contract } from '../contract/contract.entity';
  import { Produit } from '../produit/produit.entity';
  import { Livraison } from '../livraison/livraison.entity';
  import { Colis } from '../colis/colis.entity';
  import { CommentaireProduit } from '../commentaire-produit/commentaire-produit.entity';
  import { Disponibilite } from '../disponibilite/disponibilite.entity';
  import { Document } from '../document/document.entity';
  

  @Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn({ name: 'Id_utilisateur' })
  id!: number;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column({ default: 18 })
  age!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  datdenaissance!: Date;

  @Column({ unique: true })
  email!: string;

  @Column()
  adresse!: string;

  @Column()
  mot_de_passe!: string;

  @Column()
  telephone!: string;

  @Column()
  login!: string;

  @Column({ default: 'en_attente' }) // ou "en_cours"
statut!: string; // 'en_attente' | 'valide' | 'rejete'


  @Column({ nullable: true })
  langue_utilise!: string;

  @Column({ type: 'enum', enum: Role })
  type!: Role;


  @Column({ type: 'varchar', nullable: true })
resetToken?: string | null;

@Column({ type: 'timestamp', nullable: true })
resetTokenExpires?: Date | null;
@Column({ nullable: true })
photo_profil!: string;



  // Relations

  @OneToOne(() => InfoClient, (c) => c.utilisateur, { cascade: true })
  infoClient!: InfoClient;

  @OneToOne(() => InfoLivreur, (l) => l.utilisateur, { cascade: true })
  infoLivreur!: InfoLivreur;

  @OneToOne(() => InfoPrestataire, (p) => p.utilisateur, { cascade: true })
  infoPrestataire!: InfoPrestataire;

  @OneToOne(() => InfoCommercant, (c) => c.utilisateur, { cascade: true })
  infoCommercant!: InfoCommercant;

  @OneToMany(() => Document, (d) => d.utilisateur)
  documents!: Document[];

  @OneToOne(() => Admin, (a) => a.utilisateur, { cascade: true })
  admin!: Admin;

  @OneToMany(() => Annonce, (a) => a.utilisateur)
  annonces!: Annonce[];

  @OneToMany(() => AnnonceClient, (a) => a.utilisateur)
  annoncesClient!: AnnonceClient[];

  @OneToMany(() => Message, (m) => m.expediteur)
  messagesEnvoyes!: Message[];

  @OneToMany(() => Message, (m) => m.destinataire)
  messagesRecus!: Message[];

  @OneToMany(() => Commande, (c) => c.utilisateur)
  commandes!: Commande[];

  @OneToMany(() => Commande, (c) => c.client)
  commandesClient!: Commande[];

  @OneToMany(() => Paiement, (p) => p.utilisateur)
  paiements!: Paiement[];

  @OneToMany(() => Facture, (f) => f.utilisateur)
  factures!: Facture[];

  @OneToMany(() => Historique, (h) => h.utilisateur)
  historiques!: Historique[];

  @OneToMany(() => Abonnement, (a) => a.utilisateur)
  abonnements!: Abonnement[];

  @OneToMany(() => Notification, (n) => n.utilisateur)
  notifications!: Notification[];

  @OneToMany(() => Livraison, (l) => l.client)
  livraisonsClient!: Livraison[];

  @OneToMany(() => Livraison, (l) => l.livreur)
  livraisons!: Livraison[];

  @OneToMany(() => Colis, (c) => c.livreur)
  colisLivreur!: Colis[];

  @OneToMany(() => Produit, (p) => p.utilisateur)
  produits!: Produit[];

  @OneToMany(() => CommentaireProduit, (c) => c.utilisateur)
  commentairesProduit!: CommentaireProduit[];

  @OneToMany(() => Contract, (c) => c.utilisateur)
  contrats!: Contract[];

  @OneToMany(() => Disponibilite, (d) => d.utilisateur)
  disponibilites!: Disponibilite[];
  
}