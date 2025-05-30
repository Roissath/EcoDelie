import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentController {
    private readonly service;
    constructor(service: DocumentService);
    create(dto: CreateDocumentDto): Promise<import("./document.entity").Document>;
    findAll(): Promise<import("./document.entity").Document[]>;
    findOne(id: number): Promise<import("./document.entity").Document | null>;
    findByUser(id: number): Promise<import("./document.entity").Document[]>;
    update(id: number, dto: UpdateDocumentDto): Promise<import("./document.entity").Document | null>;
    valider(id: number): Promise<import("./document.entity").Document | null>;
    rejeter(id: number, commentaire: string): Promise<import("./document.entity").Document | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    uploadMultipleDocuments(files: Express.Multer.File[], utilisateurId: number, type_document: string): Promise<import("./document.entity").Document[]>;
}
