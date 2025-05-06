import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
export declare class CommandeController {
    private readonly commandeService;
    constructor(commandeService: CommandeService);
    create(dto: CreateCommandeDto): Promise<import("./commande.entity").Commande>;
    getCommandesClient(id: number): Promise<import("./commande.entity").Commande[]>;
    getByClient(id: number): Promise<import("./commande.entity").Commande[]>;
    getCommandesLivreur(id: number): Promise<import("./commande.entity").Commande[]>;
    getAllCommandes(): Promise<import("./commande.entity").Commande[]>;
    findByClient(req: any): Promise<import("./commande.entity").Commande[]>;
    updateCommande(id: number, dto: UpdateCommandeDto): Promise<import("./commande.entity").Commande | null>;
}
