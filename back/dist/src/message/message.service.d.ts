import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageService {
    private readonly repo;
    constructor(repo: Repository<Message>);
    findAll(): Promise<Message[]>;
    findOne(id: number): Promise<Message | null>;
    create(dto: CreateMessageDto): Promise<Message>;
    update(id: number, dto: UpdateMessageDto): Promise<Message | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getConversationBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]>;
}
