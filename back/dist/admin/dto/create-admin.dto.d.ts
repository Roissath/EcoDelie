import { StatutAdmin } from 'src/enums/status-admin.enum';
export declare class CreateAdminDto {
    nom: string;
    status: StatutAdmin;
    mot_de_passe: string;
    statut: string;
    utilisateurId: number;
}
