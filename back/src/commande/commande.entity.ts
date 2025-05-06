import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Facture } from '../facture/facture.entity';
import { Livraison } from '../livraison/livraison.entity';
import { Produit } from '../produit/produit.entity';
import { Colis } from 'src/colis/colis.entity';
@Entity()
export class Commande {
  @PrimaryGeneratedColumn({ name: 'Id_commande' })
  id!: number;

  @Column()
  statut!: string;

  @Column()
  date_commande!: Date;
  

  @Column('float')
  prix_unitaire!: number;

  @ManyToOne(() => Utilisateur, (u) => u.commandes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_utilisateur' })
  utilisateur!: Utilisateur;

  @ManyToOne(() => Utilisateur, (u) => u.commandesClient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Id_client' })
  client!: Utilisateur;

  @OneToOne(() => Colis, (colis) => colis.commande)
  @JoinColumn()
  colis!: Colis;


  @ManyToOne(() => Facture, (f) => f.commandes, { nullable: true })
  @JoinColumn({ name: 'factureId' })
facture?: Facture;


  @OneToOne(() => Livraison, (l) => l.commande)
  livraison!: Livraison;

@ManyToMany(() => Produit, (produit) => produit.commandes, { cascade: true })
@JoinTable({
  name: 'commande_produits',
  joinColumn: { name: 'commande_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'produit_id', referencedColumnName: 'id' },
})
produits!: Produit[];

}
