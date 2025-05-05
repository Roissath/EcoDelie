"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const paiement_service_1 = require("./paiement.service");
describe('PaiementService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [paiement_service_1.PaiementService],
        }).compile();
        service = module.get(paiement_service_1.PaiementService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=paiement.service.spec.js.map