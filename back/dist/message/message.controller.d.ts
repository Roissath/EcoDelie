import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    create(dto: CreateMessageDto): Promise<import("./message.entity").Message>;
    findAll(): Promise<import("./message.entity").Message[]>;
    findOne(id: string): Promise<import("./message.entity").Message | null>;
    update(id: string, dto: UpdateMessageDto): Promise<import("./message.entity").Message | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
