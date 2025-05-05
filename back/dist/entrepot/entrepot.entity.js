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
exports.Entrepot = void 0;
const typeorm_1 = require("typeorm");
const colis_entity_1 = require("../colis/colis.entity");
const stokage_entity_1 = require("../stokage/stokage.entity");
let Entrepot = class Entrepot {
    id;
    adresse;
    capacite_stock;
    gestionnaire;
    stokages;
    colis;
};
exports.Entrepot = Entrepot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_entrepot' }),
    __metadata("design:type", Number)
], Entrepot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Entrepot.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Entrepot.prototype, "capacite_stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Entrepot.prototype, "gestionnaire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stokage_entity_1.Stokage, (s) => s.entrepot),
    __metadata("design:type", Array)
], Entrepot.prototype, "stokages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => colis_entity_1.Colis, (c) => c.entrepot),
    __metadata("design:type", Array)
], Entrepot.prototype, "colis", void 0);
exports.Entrepot = Entrepot = __decorate([
    (0, typeorm_1.Entity)()
], Entrepot);
//# sourceMappingURL=entrepot.entity.js.map