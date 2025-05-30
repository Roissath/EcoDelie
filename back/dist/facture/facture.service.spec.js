"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const facture_service_1 = require("./facture.service");
describe('FactureService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [facture_service_1.FactureService],
        }).compile();
        service = module.get(facture_service_1.FactureService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=facture.service.spec.js.map