"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const historique_service_1 = require("./historique.service");
describe('HistoriqueService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [historique_service_1.HistoriqueService],
        }).compile();
        service = module.get(historique_service_1.HistoriqueService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=historique.service.spec.js.map