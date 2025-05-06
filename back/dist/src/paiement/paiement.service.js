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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paiement_entity_1 = require("./paiement.entity");
const path_1 = require("path");
const fs_1 = require("fs");
const PDFDocument = require("pdfkit");
let PaiementService = class PaiementService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ relations: ['utilisateur', 'annonce'] });
    }
    findByUtilisateurId(utilisateurId) {
        return this.repo.find({
            where: { utilisateur: { id: utilisateurId } },
            relations: ['utilisateur', 'annonce'],
        });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'annonce'] });
    }
    create(dto) {
        const paiement = this.repo.create({
            ...dto,
            utilisateur: { id: dto.utilisateurId },
            annonce: { id: dto.annonceId },
        });
        return this.repo.save(paiement);
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async generateFacture(paiementId, res) {
        const paiement = await this.repo.findOne({
            where: { id: paiementId },
            relations: ['utilisateur', 'annonce'],
        });
        if (!paiement) {
            throw new Error('Paiement introuvable');
        }
        const doc = new PDFDocument();
        const fileName = `facture-${paiementId}.pdf`;
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'factures', fileName);
        const stream = (0, fs_1.createWriteStream)(filePath);
        doc.pipe(stream);
        doc.fontSize(20).text('Facture', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Nom du client : ${paiement.utilisateur.nom}`);
        doc.text(`Annonce : ${paiement.annonce.titre}`);
        doc.text(`Montant : ${paiement.montant} €`);
        doc.text(`Date : ${paiement.date_paiement.toLocaleDateString()}`);
        doc.text(`Statut : ${paiement.statut}`);
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                res.download(filePath);
                resolve(null);
            });
            stream.on('error', reject);
        });
    }
};
exports.PaiementService = PaiementService;
exports.PaiementService = PaiementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paiement_entity_1.Paiement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaiementService);
//# sourceMappingURL=paiement.service.js.map