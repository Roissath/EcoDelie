
import { AppDataSource } from './src/data-source';
import { Utilisateur } from './src/utilisateur/utilisateur.entity';
import { InfoClient } from './src/info-client/info-client.entity';
import { InfoCommercant } from './src/info-commercant/info-commercant.entity';
import { InfoLivreur } from './src/info-livreur/info-livreur.entity';
import { InfoPrestataire } from './src/info-prestataire/info-prestataire.entity';
import { Produit } from './src/produit/produit.entity';
import { CommentaireProduit } from './src/commentaire-produit/commentaire-produit.entity';
import { Document } from './src/document/document.entity';
import { Commande } from './src/commande/commande.entity';
import { Livraison } from './src/livraison/livraison.entity';
import { Role } from './src/enums/role.enum';

async function seed() {
  await AppDataSource.initialize();
  const utilisateurRepo = AppDataSource.getRepository(Utilisateur);
  const infoClientRepo = AppDataSource.getRepository(InfoClient);
  const infoCommercantRepo = AppDataSource.getRepository(InfoCommercant);
  const infoLivreurRepo = AppDataSource.getRepository(InfoLivreur);
  const infoPrestataireRepo = AppDataSource.getRepository(InfoPrestataire);
  const produitRepo = AppDataSource.getRepository(Produit);
  const commentaireRepo = AppDataSource.getRepository(CommentaireProduit);
  const documentRepo = AppDataSource.getRepository(Document);
  const commandeRepo = AppDataSource.getRepository(Commande);
  const livraisonRepo = AppDataSource.getRepository(Livraison);

  await AppDataSource.manager.query('SET FOREIGN_KEY_CHECKS=0');
  await livraisonRepo.clear();
  await commandeRepo.clear();
  await commentaireRepo.clear();
  await produitRepo.clear();
  await documentRepo.clear();
  await infoClientRepo.clear();
  await infoCommercantRepo.clear();
  await infoLivreurRepo.clear();
  await infoPrestataireRepo.clear();
  await utilisateurRepo.clear();
  await AppDataSource.manager.query('SET FOREIGN_KEY_CHECKS=1');

const clients: Utilisateur[] = [];
const commerçants: Utilisateur[] = [];
const livreurs: Utilisateur[] = [];
const prestataires: Utilisateur[] = [];


  for (let i = 1; i <= 2; i++) {
    const client = utilisateurRepo.create({
      nom: `Client${i}`,
      prenom: `Prenom${i}`,
      age: 25 + i,
      datdenaissance: new Date(1998, 0, i),
      email: `client${i}@mail.com`,
      adresse: '1 rue des clients',
      mot_de_passe: '123',
      telephone: `060000000${i}`,
      login: `client${i}`,
      langue_utilise: 'fr',
      type: Role.Client,
    });
    await utilisateurRepo.save(client);
    await infoClientRepo.save(infoClientRepo.create({ utilisateur: client, type_abonnement: 'premium' }));
    clients.push(client); // -> TypeScript comprend mal le type (never[] ou any[]), et pense que tu veux faire un push de tableau dans un tableau.


    const commercant = utilisateurRepo.create({
      nom: `Commercant${i}`,
      prenom: `Prenom${i}`,
      age: 30 + i,
      datdenaissance: new Date(1995, 0, i),
      email: `commercant${i}@mail.com`,
      adresse: '1 rue du marché',
      mot_de_passe: '123',
      telephone: `061000000${i}`,
      login: `commercant${i}`,
      langue_utilise: 'fr',
      type: Role.Commercant,
    });
    await utilisateurRepo.save(commercant);
    await infoCommercantRepo.save(infoCommercantRepo.create({ utilisateur: commercant, status: 'actif', adresse: 'Marché local' }));
    commerçants.push(commercant);
    

    const livreur = utilisateurRepo.create({
      nom: `Livreur${i}`,
      prenom: `Prenom${i}`,
      age: 28 + i,
      datdenaissance: new Date(1994, 0, i),
      email: `livreur${i}@mail.com`,
      adresse: '1 rue des livraisons',
      mot_de_passe: '123',
      telephone: `062000000${i}`,
      login: `livreur${i}`,
      langue_utilise: 'fr',
      type: Role.Livreur,
    });
    await utilisateurRepo.save(livreur);
    await infoLivreurRepo.save(infoLivreurRepo.create({
      utilisateur: livreur,
      type_permis: 'B',
      zones_livraison: 'Zone A',
      type_transport: 'vélo',
      moyen_paiement: 'espèces',
      statut: 'en attente'
    }));
    livreurs.push(livreur);

    const prestataire = utilisateurRepo.create({
      nom: `Prestataire${i}`,
      prenom: `Prenom${i}`,
      age: 35 + i,
      datdenaissance: new Date(1990, 0, i),
      email: `prestataire${i}@mail.com`,
      adresse: '1 rue des services',
      mot_de_passe: '123',
      telephone: `063000000${i}`,
      login: `prestataire${i}`,
      langue_utilise: 'fr',
      type: Role.Prestataire,
    });
    await utilisateurRepo.save(prestataire);
    await infoPrestataireRepo.save(infoPrestataireRepo.create({
      utilisateur: prestataire,
      types_services: 'ménage',
      status: 'actif',
      tarif_prestation: 20.0
    }));
    prestataires.push(prestataire);

    await documentRepo.save(documentRepo.create({
      type: 'CNI',
      url: 'https://example.com/doc.jpg',
      statut: 'en_attente',
      utilisateur: commercant
    }));
    await documentRepo.save(documentRepo.create({
      type: 'Permis',
      url: 'https://example.com/doc.jpg',
      statut: 'en_attente',
      utilisateur: livreur
    }));
    await documentRepo.save(documentRepo.create({
      type: 'Certificat',
      url: 'https://example.com/doc.jpg',
      statut: 'en_attente',
      utilisateur: prestataire
    }));

    const produit = await produitRepo.save(produitRepo.create({
      nom: `Produit ${i}`,
      descriptif: 'Un super produit',
      prix: 10 + i,
      stock: 5 * i,
      categorie: 'alimentaire',
      utilisateur: commercant
    }));

    await commentaireRepo.save(commentaireRepo.create({
      contenu: 'Excellent produit',
      utilisateur: client,
      produit
    }));

    const commande = await commandeRepo.save(commandeRepo.create({
      statut: 'en cours',
      date_commande: new Date(),
      prix_unitaire: 12.5,
      utilisateur: client,
      client: client
    }));

    await livraisonRepo.save(livraisonRepo.create({
      date_livraison: new Date(),
      adresse: 'chez le client',
      statut: 'préparée',
      client: client,
      livreur: livreur,
      commande,
      commandeId: commande.id
    }));
  }

  console.log('✅ Données insérées avec succès !');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
