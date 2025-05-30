"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("./utilisateur/utilisateur.entity");
const document_entity_1 = require("./document/document.entity");
const admin_entity_1 = require("./admin/admin.entity");
const info_client_entity_1 = require("./info-client/info-client.entity");
const info_prestataire_entity_1 = require("./info-prestataire/info-prestataire.entity");
const info_livreur_entity_1 = require("./info-livreur/info-livreur.entity");
const info_commercant_entity_1 = require("./info-commercant/info-commercant.entity");
const produit_entity_1 = require("./produit/produit.entity");
const commande_entity_1 = require("./commande/commande.entity");
const facture_entity_1 = require("./facture/facture.entity");
const contract_entity_1 = require("./contract/contract.entity");
const annonce_entity_1 = require("./annonce/annonce.entity");
const annonce_client_entity_1 = require("./annonce-client/annonce-client.entity");
const colis_entity_1 = require("./colis/colis.entity");
const paiement_entity_1 = require("./paiement/paiement.entity");
const disponibilite_entity_1 = require("./disponibilite/disponibilite.entity");
const abonnement_entity_1 = require("./abonnement/abonnement.entity");
const notification_entity_1 = require("./notification/notification.entity");
const historique_entity_1 = require("./historique/historique.entity");
const message_entity_1 = require("./message/message.entity");
const entrepot_entity_1 = require("./entrepot/entrepot.entity");
const stokage_entity_1 = require("./stokage/stokage.entity");
const commentaire_produit_entity_1 = require("./commentaire-produit/commentaire-produit.entity");
const livraison_entity_1 = require("./livraison/livraison.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'ecodeli',
    entities: [
        utilisateur_entity_1.Utilisateur,
        document_entity_1.Document,
        admin_entity_1.Admin,
        info_client_entity_1.InfoClient,
        info_prestataire_entity_1.InfoPrestataire,
        info_livreur_entity_1.InfoLivreur,
        info_commercant_entity_1.InfoCommercant,
        produit_entity_1.Produit,
        commande_entity_1.Commande,
        facture_entity_1.Facture,
        livraison_entity_1.Livraison,
        contract_entity_1.Contract,
        annonce_entity_1.Annonce,
        annonce_client_entity_1.AnnonceClient,
        colis_entity_1.Colis,
        paiement_entity_1.Paiement,
        disponibilite_entity_1.Disponibilite,
        abonnement_entity_1.Abonnement,
        notification_entity_1.Notification,
        historique_entity_1.Historique,
        message_entity_1.Message,
        entrepot_entity_1.Entrepot,
        stokage_entity_1.Stokage,
        commentaire_produit_entity_1.CommentaireProduit,
    ],
    migrations: ['src/migration/*.ts'],
    synchronize: true,
    logging: true,
});
//# sourceMappingURL=data-source.js.map