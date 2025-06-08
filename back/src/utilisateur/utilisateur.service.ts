import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InfoClientService } from '../info-client/info-client.service';
import { InfoLivreurService } from '../info-livreur/info-livreur.service';
import { InfoPrestataireService } from '../info-prestataire/info-prestataire.service';
import { InfoCommercantService } from '../info-commercant/info-commercant.service';
import { Role } from '../enums/role.enum';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly repo: Repository<Utilisateur>,

    private readonly infoClientService: InfoClientService,
    private readonly infoLivreurService: InfoLivreurService,
    private readonly infoPrestataireService: InfoPrestataireService,
    private readonly infoCommercantService: InfoCommercantService,
  ) {}

  findAll() {
    return this.repo.find();
  }


  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
findOne(id: number) {
  return this.repo.findOne({
    where: { id },
    relations: ['infoClient', 'infoLivreur', 'infoPrestataire', 'infoCommercant'],
  });
}

async create(dto: CreateUtilisateurDto) {
  const user = this.repo.create(dto);
  await this.repo.save(user);

  switch (user.type) {
    case Role.Client:
      await this.infoClientService.create({
        utilisateurId: user.id,
        statut: 'en_attente',
        adresse: user.adresse,
      });
      break;
    case Role.Livreur:
      await this.infoLivreurService.create({
        utilisateurId: user.id,
        statut: 'en_attente',
        adresse: user.adresse,
        type_permis: dto.type_permis,
        zones_livraison: dto.zones_livraison,
        type_transport: dto.type_transport,
        moyen_paiement: dto.moyen_paiement,
      });
      break;
    case Role.Prestataire:
      await this.infoPrestataireService.create({
        utilisateurId: user.id,
        statut: 'en_attente',
        adresse: user.adresse,
        types_services: dto.types_services,
        tarif_prestation: dto.tarif_prestation,
      });
      break;
    case Role.Commercant:
      await this.infoCommercantService.create({
        utilisateurId: user.id,
        statut: 'en_attente',
        adresse: user.adresse,
      });
      break;
  }

  return user;
}

  async update(id: number, dto: UpdateUtilisateurDto) {
    await this.repo.save({ id, ...dto });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async findByResetToken(token: string) {
    return this.repo.findOne({ where: { resetToken: token } });
  }

  async validerProfil(id: number) {
    await this.repo.update(id, { statut: 'valide' });
    return this.findOne(id);
  }

  async rejeterProfil(id: number) {
    await this.repo.update(id, { statut: 'rejete' });
    return this.findOne(id);
  }
}
