// ------------------------ SETUP ------------------------
import { AppDataSource } from './data-source';
const { faker } = require('@faker-js/faker');

import { Role } from './enums/role.enum';
import { Utilisateur } from './utilisateur/utilisateur.entity';
import { InfoClient } from './info-client/info-client.entity';
import { InfoCommercant } from './info-commercant/info-commercant.entity';
import { InfoLivreur } from './info-livreur/info-livreur.entity';
import { InfoPrestataire } from './info-prestataire/info-prestataire.entity';
import { Produit } from './produit/produit.entity';
import { CommentaireProduit } from './commentaire-produit/commentaire-produit.entity';
import { Document } from './document/document.entity';
import { Commande } from './commande/commande.entity';
import { Livraison } from './livraison/livraison.entity';
import { AnnonceClient } from './annonce-client/annonce-client.entity';
import { Notification } from './notification/notification.entity';
import { Message } from './message/message.entity';
import { Colis } from './colis/colis.entity';
import { Stokage } from './stokage/stokage.entity';
import { Entrepot } from './entrepot/entrepot.entity';

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
  const annonceClientRepo = AppDataSource.getRepository(AnnonceClient);
  const notificationRepo = AppDataSource.getRepository(Notification);
  const messageRepo = AppDataSource.getRepository(Message);
  const colisRepo = AppDataSource.getRepository(Colis);
  const stokageRepo = AppDataSource.getRepository(Stokage);
  const entrepotRepo = AppDataSource.getRepository(Entrepot);

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

  const utilisateurs: Utilisateur[] = [];

  for (let i = 0; i < 100; i++) {
    const role = faker.helpers.arrayElement([
      Role.Client,
      Role.Livreur,
      Role.Prestataire,
      Role.Commercant,
    ]);

    const user = utilisateurRepo.create({
      nom: faker.name.lastName(),
      prenom: faker.name.firstName(),
      email: faker.internet.email(),
      telephone: faker.phone.number('06########'),
      adresse: faker.address.streetAddress(),
      type: role,
      datdenaissance: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      age: faker.datatype.number({ min: 18, max: 60 }),
      mot_de_passe: '123456',
      login: faker.internet.userName(),
      langue_utilise: 'fr',
      statut: 'actif',
    });

    const savedUser = await utilisateurRepo.save(user);
    utilisateurs.push(savedUser);

    if (role === Role.Client) {
      await infoClientRepo.save(
        infoClientRepo.create({ utilisateur: savedUser, type_abonnement: 'premium' })
      );
    }

    if (role === Role.Commercant) {
      await infoCommercantRepo.save(
        infoCommercantRepo.create({
          utilisateur: savedUser,
          statut: 'actif',
          adresse: 'Marché local',
        })
      );
    }

    if (role === Role.Livreur) {
      await infoLivreurRepo.save(
        infoLivreurRepo.create({
          utilisateur: savedUser,
          type_permis: 'B',
          zones_livraison: 'Zone A',
          type_transport: 'vélo',
          moyen_paiement: 'espèces',
          statut: 'en attente',
        })
      );
    }

    if (role === Role.Prestataire) {
      await infoPrestataireRepo.save(
        infoPrestataireRepo.create({
          utilisateur: savedUser,
          types_services: 'ménage',
          statut: 'actif',
          tarif_prestation: 20.0,
        })
      );
    }

    if (role !== Role.Client) {
      for (let j = 0; j < faker.datatype.number({ min: 1, max: 3 }); j++) {
        await documentRepo.save(
          documentRepo.create({
            type_document: faker.helpers.arrayElement(['CNI', 'Permis', 'Justificatif', 'Certificat']),
            url: faker.image.imageUrl(),
            statut: faker.helpers.arrayElement(['en_attente', 'validé', 'rejeté']),
            commentaire: faker.lorem.sentence(),
            utilisateur: savedUser,
          })
        );
      }
    }
  }

  for (const u of utilisateurs.filter((u) => u.type === Role.Commercant)) {
    for (let j = 0; j < faker.datatype.number({ min: 2, max: 5 }); j++) {
      await produitRepo.save(
        produitRepo.create({
          nom: faker.commerce.productName(),
          descriptif: faker.commerce.productDescription(),
          prix: faker.datatype.number({ min: 5, max: 150, precision: 0.01 }),
          stock: faker.datatype.number({ min: 1, max: 50 }),
          categorie: faker.helpers.arrayElement(['alimentaire', 'électronique', 'mode', 'livres']),
          image: faker.image.imageUrl(),
          utilisateur: u,
          date_publication: faker.date.recent(60),
        })
      );
    }
  }

  for (const u of utilisateurs.filter((u) => u.type === Role.Client)) {
    for (let j = 0; j < faker.datatype.number({ min: 1, max: 3 }); j++) {
      const type_annonce = faker.helpers.arrayElement(['livraison', 'course']);
      await annonceClientRepo.save(
        annonceClientRepo.create({
          type_annonce,
          lieu_depart: faker.address.city(),
          lieu_arrivee: faker.address.city(),
          poids_estime: faker.datatype.number({ min: 1, max: 10, precision: 0.1 }),
          prix_livraison: faker.datatype.number({ min: 5, max: 30, precision: 0.5 }),
          colis_fragile: faker.datatype.boolean(),
          utilisateur: u,
          magasin: type_annonce === 'course' ? faker.company.companyName() : undefined,
          liste_courses: type_annonce === 'course' ? faker.commerce.productName() : undefined,
          date_course: type_annonce === 'course' ? faker.date.soon(10) : undefined,
        })
      );
    }
  }

  for (const u of utilisateurs.filter((u) => u.type === Role.Client)) {
    for (let j = 0; j < faker.datatype.number({ min: 1, max: 2 }); j++) {
      const commande = await commandeRepo.save(
        commandeRepo.create({
          statut: faker.helpers.arrayElement(['en cours', 'livrée', 'annulée']),
          date_commande: faker.date.past(),
          prix_unitaire: faker.datatype.number({ min: 10, max: 300, precision: 0.01 }),
          utilisateur: u,
          client: u
        })
      );
      const livreur = faker.helpers.arrayElement(utilisateurs.filter((x) => x.type === Role.Livreur));
      await livraisonRepo.save(
        livraisonRepo.create({
          date_livraison: faker.date.recent(),
          adresse: u.adresse,
          statut: faker.helpers.arrayElement(['préparée', 'expédiée', 'livrée']),
          commande: commande,
          client: u,
          livreur: livreur
        })
      );
    }
  }

  for (const u of utilisateurs.slice(0, 30)) {
    await notificationRepo.save(
      notificationRepo.create({
        contenu: faker.lorem.sentence(),
        email: u.email,
        utilisateur: u,
      })
    );
  }

  for (let i = 0; i < 40; i++) {
    const exp = faker.helpers.arrayElement(utilisateurs);
    const dest = faker.helpers.arrayElement(utilisateurs.filter((u) => u.id !== exp.id));
    await messageRepo.save(
      messageRepo.create({
        contenu: faker.lorem.sentence(12), // limité pour respecter VARCHAR(255)
        date_envoi: faker.date.recent(),
        lu: faker.datatype.boolean(),
        expediteur: exp,
        destinataire: dest,
      })
    );
  }

  for (let i = 0; i < 5; i++) {
    await entrepotRepo.save(
      entrepotRepo.create({
        adresse: faker.address.streetAddress(),
        capacite_stock: faker.datatype.number({ min: 100, max: 300 }),
        gestionnaire: faker.name.fullName(),
      })
    );
  }

  console.log('✅ Données insérées avec succès !');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
