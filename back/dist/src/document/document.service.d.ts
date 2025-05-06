import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentService {
    private readonly repo;
    constructor(repo: Repository<Document>);
    findAll(): Promise<Document[]>;
    findOne(id: number): Promise<Document | null>;
    findByUser(userId: number): Promise<Document[]>;
    create(dto: CreateDocumentDto): Promise<Document>;
    update(id: number, dto: UpdateDocumentDto): Promise<Document | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    valider(id: number): Promise<Document | null>;
    rejeter(id: number, commentaire: string): Promise<Document | null>;
}
