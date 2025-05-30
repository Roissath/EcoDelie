import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paiement } from './paiement.entity';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Response } from 'express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private readonly repo: Repository<Paiement>,
  ) {}

  findAll() {
      return this.repo.find({
        relations: ['utilisateur', 'annonce'],
        order: { date_paiement: 'DESC' },
      });
    
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
      reference: 'PAY-' + Math.floor(Math.random() * 1000000), // génère une référence unique
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
  
    if (!paiement) throw new Error('Paiement introuvable');
  
    const doc = new PDFDocument();
    const fileName = `facture-${paiementId}.pdf`;
    const filePath = join(__dirname, '..', '..', 'public', 'factures', fileName);
    const stream = createWriteStream(filePath);
  
    doc.pipe(stream);
  
    //  Contenu
    doc.fontSize(20).text('Facture', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Client : ${paiement.utilisateur.nom} ${paiement.utilisateur.prenom}`);
    doc.text(`Montant : ${paiement.montant} €`);
    doc.text(`Date : ${paiement.date_paiement.toLocaleDateString()}`);
    doc.text(`Mode de paiement : ${paiement.moyen_paiement}`);
    doc.text(`Statut : ${paiement.statut}`);
    doc.end();
  
    return new Promise((resolve, reject) => {
      stream.on('finish', () => res.download(filePath));
      stream.on('error', reject);
    });
  }
  
  
}
