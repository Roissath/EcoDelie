"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const facture_controller_1 = require("./facture.controller");
describe('FactureController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [facture_controller_1.FactureController],
        }).compile();
        controller = module.get(facture_controller_1.FactureController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=facture.controller.spec.js.map