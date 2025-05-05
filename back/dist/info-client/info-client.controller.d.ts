import { InfoClientService } from './info-client.service';
import { CreateInfoClientDto } from './dto/create-info-client.dto';
import { UpdateInfoClientDto } from './dto/update-info-client.dto';
export declare class InfoClientController {
    private readonly service;
    constructor(service: InfoClientService);
    create(dto: CreateInfoClientDto, req: any): Promise<import("./info-client.entity").InfoClient>;
    find(req: any): Promise<import("./info-client.entity").InfoClient | null>;
    update(id: number, dto: UpdateInfoClientDto): Promise<import("./info-client.entity").InfoClient | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
