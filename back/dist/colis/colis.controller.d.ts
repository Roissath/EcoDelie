import { ColisService } from './colis.service';
import { CreateColisDto } from './dto/create-colis.dto';
import { UpdateColisDto } from './dto/update-colis.dto';
export declare class ColisController {
    private readonly colisService;
    constructor(colisService: ColisService);
    create(dto: CreateColisDto): Promise<import("./colis.entity").Colis>;
    getColisClient(id: number): Promise<import("./colis.entity").Colis[]>;
    getColisLivreur(id: number): Promise<import("./colis.entity").Colis[]>;
    getAll(): Promise<import("./colis.entity").Colis[]>;
    update(id: number, dto: UpdateColisDto): Promise<import("./colis.entity").Colis | null>;
}
