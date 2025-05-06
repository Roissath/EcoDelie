"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const abonnement_service_1 = require("./abonnement.service");
describe('AbonnementService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [abonnement_service_1.AbonnementService],
        }).compile();
        service = module.get(abonnement_service_1.AbonnementService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=abonnement.service.spec.js.map