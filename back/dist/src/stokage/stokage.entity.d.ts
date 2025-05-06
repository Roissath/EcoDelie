import { Entrepot } from '../entrepot/entrepot.entity';
import { Colis } from '../colis/colis.entity';
export declare class Stokage {
    id: number;
    date_entree: Date;
    date_sortie: Date;
    entrepot: Entrepot;
    colis: Colis;
}
