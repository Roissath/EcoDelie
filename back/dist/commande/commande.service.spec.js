"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const commande_service_1 = require("./commande.service");
describe('CommandeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [commande_service_1.CommandeService],
        }).compile();
        service = module.get(commande_service_1.CommandeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=commande.service.spec.js.map