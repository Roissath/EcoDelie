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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
let Notification = class Notification {
    id;
    contenu;
    email;
    lu;
    date_lecture;
    utilisateur;
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id_notification' }),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "contenu", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "lu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "date_lecture", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (u) => u.notifications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_utilisateur' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Notification.prototype, "utilisateur", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)()
], Notification);
//# sourceMappingURL=notification.entity.js.map