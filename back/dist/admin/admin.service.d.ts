import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private readonly repo;
    constructor(repo: Repository<Admin>);
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin | null>;
    create(dto: CreateAdminDto): Promise<Admin>;
    update(id: number, dto: UpdateAdminDto): Promise<Admin | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
