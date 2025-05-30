"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const contract_service_1 = require("./contract.service");
describe('ContractService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [contract_service_1.ContractService],
        }).compile();
        service = module.get(contract_service_1.ContractService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=contract.service.spec.js.map