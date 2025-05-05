"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const produit_service_1 = require("./produit.service");
describe('ProduitService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [produit_service_1.ProduitService],
        }).compile();
        service = module.get(produit_service_1.ProduitService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=produit.service.spec.js.map