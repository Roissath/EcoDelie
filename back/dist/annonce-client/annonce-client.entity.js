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
exports.AnnonceClient = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
const info_livreur_entity_1 = require("../info-livreur/info-livreur.entity");
let AnnonceClient = class AnnonceClient {
    id;
    lieu_depart;
    lieu_arrivee;
    poids_estime;
    prix_livraison;
    colis_fragile;
    type_annonce;
    magasin;
    liste_courses;
    date_course;
    datePublication;
    datePriseEnCharge;
    dateLivraison;
    livreurs;
    utilisateur;
};
exports.AnnonceClient = AnnonceClient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnnonceClient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AnnonceClient.prototype, "lieu_depart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AnnonceClient.prototype, "lieu_arrivee", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], AnnonceClient.prototype, "poids_estime", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], AnnonceClient.prototype, "prix_livraison", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], AnnonceClient.prototype, "colis_fragile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AnnonceClient.prototype, "type_annonce", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AnnonceClient.prototype, "magasin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], AnnonceClient.prototype, "liste_courses", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AnnonceClient.prototype, "date_course", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AnnonceClient.prototype, "datePublication", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AnnonceClient.prototype, "datePriseEnCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AnnonceClient.prototype, "dateLivraison", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => info_livreur_entity_1.InfoLivreur, (livreur) => livreur.annonces),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AnnonceClient.prototype, "livreurs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.annoncesClient, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], AnnonceClient.prototype, "utilisateur", void 0);
exports.AnnonceClient = AnnonceClient = __decorate([
    (0, typeorm_1.Entity)()
], AnnonceClient);
//# sourceMappingURL=annonce-client.entity.js.map