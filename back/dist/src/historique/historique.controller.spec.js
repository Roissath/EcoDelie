"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const historique_controller_1 = require("./historique.controller");
describe('HistoriqueController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [historique_controller_1.HistoriqueController],
        }).compile();
        controller = module.get(historique_controller_1.HistoriqueController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=historique.controller.spec.js.map