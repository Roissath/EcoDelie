"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const utilisateur_entity_1 = require("./src/utilisateur/utilisateur.entity");
const info_client_entity_1 = require("./src/info-client/info-client.entity");
const info_commercant_entity_1 = require("./src/info-commercant/info-commercant.entity");
const info_livreur_entity_1 = require("./src/info-livreur/info-livreur.entity");
const info_prestataire_entity_1 = require("./src/info-prestataire/info-prestataire.entity");
const produit_entity_1 = require("./src/produit/produit.entity");
const commentaire_produit_entity_1 = require("./src/commentaire-produit/commentaire-produit.entity");
const document_entity_1 = require("./src/document/document.entity");
const commande_entity_1 = require("./src/commande/commande.entity");
const livraison_entity_1 = require("./src/livraison/livraison.entity");
const role_enum_1 = require("./src/enums/role.enum");
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
    const clients = [];
    const commerçants = [];
    const livreurs = [];
    const prestataires = [];
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
            type: role_enum_1.Role.Client,
        });
        await utilisateurRepo.save(client);
        await infoClientRepo.save(infoClientRepo.create({ utilisateur: client, type_abonnement: 'premium' }));
        clients.push(client);
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
            type: role_enum_1.Role.Commercant,
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
            type: role_enum_1.Role.Livreur,
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
            type: role_enum_1.Role.Prestataire,
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
//# sourceMappingURL=seed.js.map