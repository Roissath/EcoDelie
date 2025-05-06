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
exports.Stokage = void 0;
const typeorm_1 = require("typeorm");
const entrepot_entity_1 = require("../entrepot/entrepot.entity");
const colis_entity_1 = require("../colis/colis.entity");
let Stokage = class Stokage {
    id;
    date_entree;
    date_sortie;
    entrepot;
    colis;
};
exports.Stokage = Stokage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_stokage' }),
    __metadata("design:type", Number)
], Stokage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Stokage.prototype, "date_entree", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Stokage.prototype, "date_sortie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entrepot_entity_1.Entrepot, (e) => e.stokages, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'entrepotId' }),
    __metadata("design:type", entrepot_entity_1.Entrepot)
], Stokage.prototype, "entrepot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => colis_entity_1.Colis, (c) => c.stokages, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'colisId' }),
    __metadata("design:type", colis_entity_1.Colis)
], Stokage.prototype, "colis", void 0);
exports.Stokage = Stokage = __decorate([
    (0, typeorm_1.Entity)()
], Stokage);
//# sourceMappingURL=stokage.entity.js.map