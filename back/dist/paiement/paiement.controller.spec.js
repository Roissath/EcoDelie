"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const paiement_controller_1 = require("./paiement.controller");
describe('PaiementController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [paiement_controller_1.PaiementController],
        }).compile();
        controller = module.get(paiement_controller_1.PaiementController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=paiement.controller.spec.js.map