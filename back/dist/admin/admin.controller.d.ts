import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    create(dto: CreateAdminDto): Promise<import("./admin.entity").Admin>;
    findAll(): Promise<import("./admin.entity").Admin[]>;
    findOne(id: number): Promise<import("./admin.entity").Admin>;
    update(id: string, dto: UpdateAdminDto): Promise<import("./admin.entity").Admin | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
