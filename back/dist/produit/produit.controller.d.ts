import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto.tsupdate-produit.dto';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(dto: CreateProduitDto): Promise<import("./produit.entity").Produit>;
    findAllPublic(): Promise<import("./produit.entity").Produit[]>;
    findByCommercant(id: number): Promise<import("./produit.entity").Produit[]>;
    update(id: number, dto: UpdateProduitDto): Promise<import("./produit.entity").Produit | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
