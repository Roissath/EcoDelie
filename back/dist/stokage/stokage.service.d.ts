import { Repository } from 'typeorm';
import { Stokage } from './stokage.entity';
import { CreateStokageDto } from './dto/create-stokage.dto';
import { UpdateStokageDto } from './dto/update-stokatge.dto';
export declare class StokageService {
    private readonly repo;
    constructor(repo: Repository<Stokage>);
    findAll(): Promise<Stokage[]>;
    findOne(id: number): Promise<Stokage | null>;
    create(dto: CreateStokageDto): Promise<Stokage>;
    update(id: number, dto: UpdateStokageDto): Promise<Stokage | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
