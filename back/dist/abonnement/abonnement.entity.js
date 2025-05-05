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
exports.Abonnement = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
let Abonnement = class Abonnement {
    id;
    type_abonnement;
    date_debut;
    date_fin;
    statut;
    utilisateur;
};
exports.Abonnement = Abonnement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_abonement' }),
    __metadata("design:type", Number)
], Abonnement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonnement.prototype, "type_abonnement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Abonnement.prototype, "date_debut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Abonnement.prototype, "date_fin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonnement.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.abonnements, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Abonnement.prototype, "utilisateur", void 0);
exports.Abonnement = Abonnement = __decorate([
    (0, typeorm_1.Entity)()
], Abonnement);
//# sourceMappingURL=abonnement.entity.js.map