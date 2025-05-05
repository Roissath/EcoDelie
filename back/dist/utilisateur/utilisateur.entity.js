"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilisateur = void 0;
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../enums/role.enum");
const info_client_entity_1 = require("../info-client/info-client.entity");
const info_livreur_entity_1 = require("../info-livreur/info-livreur.entity");
const info_prestataire_entity_1 = require("../info-prestataire/info-prestataire.entity");
const info_commercant_entity_1 = require("../info-commercant/info-commercant.entity");
const admin_entity_1 = require("../admin/admin.entity");
const annonce_entity_1 = require("../annonce/annonce.entity");
const annonce_client_entity_1 = require("../annonce-client/annonce-client.entity");
const message_entity_1 = require("../message/message.entity");
const commande_entity_1 = require("../commande/commande.entity");
const paiement_entity_1 = require("../paiement/paiement.entity");
const facture_entity_1 = require("../facture/facture.entity");
const historique_entity_1 = require("../historique/historique.entity");
const abonnement_entity_1 = require("../abonnement/abonnement.entity");
const notification_entity_1 = require("../notification/notification.entity");
const contract_entity_1 = require("../contract/contract.entity");
const produit_entity_1 = require("../produit/produit.entity");
const livraison_entity_1 = require("../livraison/livraison.entity");
const colis_entity_1 = require("../colis/colis.entity");
const commentaire_produit_entity_1 = require("../commentaire-produit/commentaire-produit.entity");
const disponibilite_entity_1 = require("../disponibilite/disponibilite.entity");
const document_entity_1 = require("../document/document.entity");
let Utilisateur = class Utilisateur {
    id;
    nom;
    prenom;
    age;
    datdenaissance;
    email;
    adresse;
    mot_de_passe;
    telephone;
    login;
    langue_utilise;
    type;
    infoClient;
    infoLivreur;
    infoPrestataire;
    infoCommercant;
    documents;
    admin;
    annonces;
    annoncesClient;
    messagesEnvoyes;
    messagesRecus;
    commandes;
    commandesClient;
    paiements;
    factures;
    historiques;
    abonnements;
    notifications;
    livraisonsClient;
    livraisons;
    colisLivreur;
    produits;
    commentairesProduit;
    contrats;
    disponibilites;
};
exports.Utilisateur = Utilisateur;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", Number)
], Utilisateur.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 18 }),
    __metadata("design:type", Number)
], Utilisateur.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Utilisateur.prototype, "datdenaissance", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Utilisateur.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "mot_de_passe", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Utilisateur.prototype, "langue_utilise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role }),
    __metadata("design:type", String)
], Utilisateur.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_client_entity_1.InfoClient, (c) => c.utilisateur, { cascade: true }),
    __metadata("design:type", info_client_entity_1.InfoClient)
], Utilisateur.prototype, "infoClient", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_livreur_entity_1.InfoLivreur, (l) => l.utilisateur, { cascade: true }),
    __metadata("design:type", info_livreur_entity_1.InfoLivreur)
], Utilisateur.prototype, "infoLivreur", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_prestataire_entity_1.InfoPrestataire, (p) => p.utilisateur, { cascade: true }),
    __metadata("design:type", info_prestataire_entity_1.InfoPrestataire)
], Utilisateur.prototype, "infoPrestataire", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => info_commercant_entity_1.InfoCommercant, (c) => c.utilisateur, { cascade: true }),
    __metadata("design:type", info_commercant_entity_1.InfoCommercant)
], Utilisateur.prototype, "infoCommercant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (d) => d.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => admin_entity_1.Admin, (a) => a.utilisateur, { cascade: true }),
    __metadata("design:type", admin_entity_1.Admin)
], Utilisateur.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => annonce_entity_1.Annonce, (a) => a.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "annonces", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => annonce_client_entity_1.AnnonceClient, (a) => a.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "annoncesClient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (m) => m.expediteur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "messagesEnvoyes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (m) => m.destinataire),
    __metadata("design:type", Array)
], Utilisateur.prototype, "messagesRecus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commande_entity_1.Commande, (c) => c.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "commandes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commande_entity_1.Commande, (c) => c.client),
    __metadata("design:type", Array)
], Utilisateur.prototype, "commandesClient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paiement_entity_1.Paiement, (p) => p.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "paiements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => facture_entity_1.Facture, (f) => f.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "factures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historique_entity_1.Historique, (h) => h.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "historiques", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => abonnement_entity_1.Abonnement, (a) => a.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "abonnements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (n) => n.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => livraison_entity_1.Livraison, (l) => l.client),
    __metadata("design:type", Array)
], Utilisateur.prototype, "livraisonsClient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => livraison_entity_1.Livraison, (l) => l.livreur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "livraisons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => colis_entity_1.Colis, (c) => c.livreur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "colisLivreur", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => produit_entity_1.Produit, (p) => p.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "produits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentaire_produit_entity_1.CommentaireProduit, (c) => c.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "commentairesProduit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contract_entity_1.Contract, (c) => c.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "contrats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => disponibilite_entity_1.Disponibilite, (d) => d.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "disponibilites", void 0);
exports.Utilisateur = Utilisateur = __decorate([
    (0, typeorm_1.Entity)()
], Utilisateur);
//# sourceMappingURL=utilisateur.entity.js.map