import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facture } from './facture.entity';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { writeFileSync, createWriteStream } from 'fs';
import { join } from 'path';
import PDFDocument from 'pdfkit';

@Injectable()
export class FactureService {
  constructor(
    @InjectRepository(Facture)
    private readonly repo: Repository<Facture>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'commandes'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'commandes'] });
  }

  async create(dto: CreateFactureDto) {
    // Générer le nom du fichier PDF
    const fileName = `facture-${dto.utilisateurId}-${Date.now()}.pdf`;
    const filePath = join(__dirname, '..', '..', 'public', 'factures', fileName);
    const pdfUrl = `/factures/${fileName}`;

    // 1. Génère le PDF
    await this.generatePdf(dto, filePath);

    // 2. Crée l’entité avec le chemin du PDF
    const facture = this.repo.create({
      ...dto,
      pdf_url: pdfUrl,
      utilisateur: { id: dto.utilisateurId },
    });

    return this.repo.save(facture);
  }

  async generatePdf(dto: CreateFactureDto, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const writeStream = createWriteStream(filePath);

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

  async update(id: number, dto: UpdateFactureDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  findByClientId(id: number) {
    return this.repo.find({
      where: { utilisateur: { id } },
      relations: ['utilisateur', 'commandes'],
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }


  async generateAndSavePdf(id: number) {
    const facture = await this.repo.findOne({
      where: { id },
      relations: ['utilisateur', 'commandes'],
    });
  
    if (!facture) {
      throw new Error('Facture introuvable');
    }
  
    const doc = new PDFDocument();
    const fileName = `facture-${id}.pdf`;
    const filePath = join(__dirname, '..', '..', 'public', 'factures', fileName);
    const stream = createWriteStream(filePath);
  
    doc.pipe(stream);
  
    // 🧾 Contenu du PDF
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
}
