"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const contract_controller_1 = require("./contract.controller");
describe('ContractController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [contract_controller_1.ContractController],
        }).compile();
        controller = module.get(contract_controller_1.ContractController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=contract.controller.spec.js.map