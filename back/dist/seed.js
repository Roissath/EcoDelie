"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const { faker } = require('@faker-js/faker');
const role_enum_1 = require("./enums/role.enum");
const utilisateur_entity_1 = require("./utilisateur/utilisateur.entity");
const info_client_entity_1 = require("./info-client/info-client.entity");
const info_commercant_entity_1 = require("./info-commercant/info-commercant.entity");
const info_livreur_entity_1 = require("./info-livreur/info-livreur.entity");
const info_prestataire_entity_1 = require("./info-prestataire/info-prestataire.entity");
const produit_entity_1 = require("./produit/produit.entity");
const commentaire_produit_entity_1 = require("./commentaire-produit/commentaire-produit.entity");
const document_entity_1 = require("./document/document.entity");
const commande_entity_1 = require("./commande/commande.entity");
const livraison_entity_1 = require("./livraison/livraison.entity");
const annonce_client_entity_1 = require("./annonce-client/annonce-client.entity");
const notification_entity_1 = require("./notification/notification.entity");
const message_entity_1 = require("./message/message.entity");
const colis_entity_1 = require("./colis/colis.entity");
const stokage_entity_1 = require("./stokage/stokage.entity");
const entrepot_entity_1 = require("./entrepot/entrepot.entity");
async function seed() {
    await data_source_1.AppDataSource.initialize();
    const utilisateurRepo = data_source_1.AppDataSource.getRepository(utilisateur_entity_1.Utilisateur);
    const infoClientRepo = data_source_1.AppDataSource.getRepository(info_client_entity_1.InfoClient);
    const infoCommercantRepo = data_source_1.AppDataSource.getRepository(info_commercant_entity_1.InfoCommercant);
    const infoLivreurRepo = data_source_1.AppDataSource.getRepository(info_livreur_entity_1.InfoLivreur);
    const infoPrestataireRepo = data_source_1.AppDataSource.getRepository(info_prestataire_entity_1.InfoPrestataire);
    const produitRepo = data_source_1.AppDataSource.getRepository(produit_entity_1.Produit);
    const commentaireRepo = data_source_1.AppDataSource.getRepository(commentaire_produit_entity_1.CommentaireProduit);
    const documentRepo = data_source_1.AppDataSource.getRepository(document_entity_1.Document);
    const commandeRepo = data_source_1.AppDataSource.getRepository(commande_entity_1.Commande);
    const livraisonRepo = data_source_1.AppDataSource.getRepository(livraison_entity_1.Livraison);
    const annonceClientRepo = data_source_1.AppDataSource.getRepository(annonce_client_entity_1.AnnonceClient);
    const notificationRepo = data_source_1.AppDataSource.getRepository(notification_entity_1.Notification);
    const messageRepo = data_source_1.AppDataSource.getRepository(message_entity_1.Message);
    const colisRepo = data_source_1.AppDataSource.getRepository(colis_entity_1.Colis);
    const stokageRepo = data_source_1.AppDataSource.getRepository(stokage_entity_1.Stokage);
    const entrepotRepo = data_source_1.AppDataSource.getRepository(entrepot_entity_1.Entrepot);
    await data_source_1.AppDataSource.manager.query('SET FOREIGN_KEY_CHECKS=0');
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
    await data_source_1.AppDataSource.manager.query('SET FOREIGN_KEY_CHECKS=1');
    const utilisateurs = [];
    for (let i = 0; i < 100; i++) {
        const role = faker.helpers.arrayElement([
            role_enum_1.Role.Client,
            role_enum_1.Role.Livreur,
            role_enum_1.Role.Prestataire,
            role_enum_1.Role.Commercant,
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
        if (role === role_enum_1.Role.Client) {
            await infoClientRepo.save(infoClientRepo.create({ utilisateur: savedUser, type_abonnement: 'premium' }));
        }
        if (role === role_enum_1.Role.Commercant) {
            await infoCommercantRepo.save(infoCommercantRepo.create({
                utilisateur: savedUser,
                statut: 'actif',
                adresse: 'Marché local',
            }));
        }
        if (role === role_enum_1.Role.Livreur) {
            await infoLivreurRepo.save(infoLivreurRepo.create({
                utilisateur: savedUser,
                type_permis: 'B',
                zones_livraison: 'Zone A',
                type_transport: 'vélo',
                moyen_paiement: 'espèces',
                statut: 'en attente',
            }));
        }
        if (role === role_enum_1.Role.Prestataire) {
            await infoPrestataireRepo.save(infoPrestataireRepo.create({
                utilisateur: savedUser,
                types_services: 'ménage',
                statut: 'actif',
                tarif_prestation: 20.0,
            }));
        }
        if (role !== role_enum_1.Role.Client) {
            for (let j = 0; j < faker.datatype.number({ min: 1, max: 3 }); j++) {
                await documentRepo.save(documentRepo.create({
                    type_document: faker.helpers.arrayElement(['CNI', 'Permis', 'Justificatif', 'Certificat']),
                    url: faker.image.imageUrl(),
                    statut: faker.helpers.arrayElement(['en_attente', 'validé', 'rejeté']),
                    commentaire: faker.lorem.sentence(),
                    utilisateur: savedUser,
                }));
            }
        }
    }
    for (const u of utilisateurs.filter((u) => u.type === role_enum_1.Role.Commercant)) {
        for (let j = 0; j < faker.datatype.number({ min: 2, max: 5 }); j++) {
            await produitRepo.save(produitRepo.create({
                nom: faker.commerce.productName(),
                descriptif: faker.commerce.productDescription(),
                prix: faker.datatype.number({ min: 5, max: 150, precision: 0.01 }),
                stock: faker.datatype.number({ min: 1, max: 50 }),
                categorie: faker.helpers.arrayElement(['alimentaire', 'électronique', 'mode', 'livres']),
                image: faker.image.imageUrl(),
                utilisateur: u,
                date_publication: faker.date.recent(60),
            }));
        }
    }
    for (const u of utilisateurs.filter((u) => u.type === role_enum_1.Role.Client)) {
        for (let j = 0; j < faker.datatype.number({ min: 1, max: 3 }); j++) {
            const type_annonce = faker.helpers.arrayElement(['livraison', 'course']);
            await annonceClientRepo.save(annonceClientRepo.create({
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
            }));
        }
    }
    for (const u of utilisateurs.filter((u) => u.type === role_enum_1.Role.Client)) {
        for (let j = 0; j < faker.datatype.number({ min: 1, max: 2 }); j++) {
            const commande = await commandeRepo.save(commandeRepo.create({
                statut: faker.helpers.arrayElement(['en cours', 'livrée', 'annulée']),
                date_commande: faker.date.past(),
                prix_unitaire: faker.datatype.number({ min: 10, max: 300, precision: 0.01 }),
                utilisateur: u,
                client: u
            }));
            const livreur = faker.helpers.arrayElement(utilisateurs.filter((x) => x.type === role_enum_1.Role.Livreur));
            await livraisonRepo.save(livraisonRepo.create({
                date_livraison: faker.date.recent(),
                adresse: u.adresse,
                statut: faker.helpers.arrayElement(['préparée', 'expédiée', 'livrée']),
                commande: commande,
                client: u,
                livreur: livreur
            }));
        }
    }
    for (const u of utilisateurs.slice(0, 30)) {
        await notificationRepo.save(notificationRepo.create({
            contenu: faker.lorem.sentence(),
            email: u.email,
            utilisateur: u,
        }));
    }
    for (let i = 0; i < 40; i++) {
        const exp = faker.helpers.arrayElement(utilisateurs);
        const dest = faker.helpers.arrayElement(utilisateurs.filter((u) => u.id !== exp.id));
        await messageRepo.save(messageRepo.create({
            contenu: faker.lorem.sentence(12),
            date_envoi: faker.date.recent(),
            lu: faker.datatype.boolean(),
            expediteur: exp,
            destinataire: dest,
        }));
    }
    for (let i = 0; i < 5; i++) {
        await entrepotRepo.save(entrepotRepo.create({
            adresse: faker.address.streetAddress(),
            capacite_stock: faker.datatype.number({ min: 100, max: 300 }),
            gestionnaire: faker.name.fullName(),
        }));
    }
    console.log('✅ Données insérées avec succès !');
    process.exit(0);
}
seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map