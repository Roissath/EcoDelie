import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/update-abonnement.dto';
export declare class AbonnementController {
    private readonly abonnementService;
    constructor(abonnementService: AbonnementService);
    create(dto: CreateAbonnementDto): Promise<import("./abonnement.entity").Abonnement>;
    findAll(): Promise<import("./abonnement.entity").Abonnement[]>;
    findByClient(id: number): Promise<import("./abonnement.entity").Abonnement[]>;
    update(id: number, dto: UpdateAbonnementDto): Promise<import("./abonnement.entity").Abonnement | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
