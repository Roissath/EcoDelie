"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const produit_controller_1 = require("./produit.controller");
describe('ProduitController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [produit_controller_1.ProduitController],
        }).compile();
        controller = module.get(produit_controller_1.ProduitController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=produit.controller.spec.js.map