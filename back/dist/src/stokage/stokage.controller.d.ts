import { StokageService } from './stokage.service';
import { CreateStokageDto } from './dto/create-stokage.dto';
import { UpdateStokageDto } from './dto/update-stokatge.dto';
export declare class StokageController {
    private readonly service;
    constructor(service: StokageService);
    create(dto: CreateStokageDto): Promise<import("./stokage.entity").Stokage>;
    findAll(): Promise<import("./stokage.entity").Stokage[]>;
    findOne(id: string): Promise<import("./stokage.entity").Stokage | null>;
    update(id: string, dto: UpdateStokageDto): Promise<import("./stokage.entity").Stokage | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
