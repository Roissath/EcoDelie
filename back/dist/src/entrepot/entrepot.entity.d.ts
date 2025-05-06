import { Colis } from '../colis/colis.entity';
import { Stokage } from '../stokage/stokage.entity';
export declare class Entrepot {
    id: number;
    adresse: string;
    capacite_stock: number;
    gestionnaire: string;
    stokages: Stokage[];
    colis: Colis[];
}
