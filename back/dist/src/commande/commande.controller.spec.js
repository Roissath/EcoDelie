"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const commande_controller_1 = require("./commande.controller");
describe('CommandeController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [commande_controller_1.CommandeController],
        }).compile();
        controller = module.get(commande_controller_1.CommandeController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=commande.controller.spec.js.map