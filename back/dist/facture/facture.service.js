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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const facture_entity_1 = require("./facture.entity");
const fs_1 = require("fs");
const path_1 = require("path");
const pdfkit_1 = __importDefault(require("pdfkit"));
let FactureService = class FactureService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ relations: ['utilisateur', 'commandes'] });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'commandes'] });
    }
    async create(dto) {
        const fileName = `facture-${dto.utilisateurId}-${Date.now()}.pdf`;
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'factures', fileName);
        const pdfUrl = `/factures/${fileName}`;
        await this.generatePdf(dto, filePath);
        const facture = this.repo.create({
            ...dto,
            pdf_url: pdfUrl,
            utilisateur: { id: dto.utilisateurId },
        });
        return this.repo.save(facture);
    }
    async generatePdf(dto, filePath) {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default();
            const writeStream = (0, fs_1.createWriteStream)(filePath);
            doc.pipe(writeStream);
            doc.fontSize(20).text('FACTURE', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Mois : ${dto.mois}`);
            doc.text(`Montant total : ${dto.montant_total} €`);
            doc.text(`Date : ${new Date(dto.date_generation).toLocaleDateString()}`);
            doc.text(`Statut : ${dto.statut}`);
            doc.end();
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    findByClientId(id) {
        return this.repo.find({
            where: { utilisateur: { id } },
            relations: ['utilisateur', 'commandes'],
        });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async generateAndSavePdf(id) {
        const facture = await this.repo.findOne({
            where: { id },
            relations: ['utilisateur', 'commandes'],
        });
        if (!facture) {
            throw new Error('Facture introuvable');
        }
        const doc = new pdfkit_1.default();
        const fileName = `facture-${id}.pdf`;
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'factures', fileName);
        const stream = (0, fs_1.createWriteStream)(filePath);
        doc.pipe(stream);
        doc.fontSize(20).text('Facture', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Client : ${facture.utilisateur.nom} ${facture.utilisateur.prenom}`);
        doc.text(`Mois : ${facture.mois}`);
        doc.text(`Montant total : ${facture.montant_total} €`);
        doc.text(`Date : ${facture.date_generation.toLocaleDateString()}`);
        doc.text(`Statut : ${facture.statut}`);
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                console.log('📄 Facture PDF générée :', filePath);
                resolve({ message: 'Facture PDF générée', file: `/factures/${fileName}` });
            });
            stream.on('error', reject);
        });
    }
};
exports.FactureService = FactureService;
exports.FactureService = FactureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(facture_entity_1.Facture)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FactureService);
//# sourceMappingURL=facture.service.js.map