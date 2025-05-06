import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paiement } from './paiement.entity';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Response } from 'express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private readonly repo: Repository<Paiement>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['utilisateur', 'annonce'] });
  }

  findByUtilisateurId(utilisateurId: number) {
    return this.repo.find({
      where: { utilisateur: { id: utilisateurId } },
      relations: ['utilisateur', 'annonce'],
    });
  }
  

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['utilisateur', 'annonce'] });
  }

  create(dto: CreatePaiementDto) {
    const paiement = this.repo.create({
      ...dto,
      utilisateur: { id: dto.utilisateurId },
      annonce: { id: dto.annonceId },
    });
    return this.repo.save(paiement);
  }

  async update(id: number, dto: UpdatePaiementDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
  
  async generateFacture(paiementId: number, res: Response) {
    const paiement = await this.repo.findOne({
      where: { id: paiementId },
      relations: ['utilisateur', 'annonce'],
    });
  
    if (!paiement) {
      throw new Error('Paiement introuvable');
    }
  
    const doc = new PDFDocument();
    const fileName = `facture-${paiementId}.pdf`;
    const filePath = join(__dirname, '..', '..', 'public', 'factures', fileName);
    const stream = createWriteStream(filePath);
  
    doc.pipe(stream);
  
    // 🧾 Contenu de la facture
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
  
}
