"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const abonnement_controller_1 = require("./abonnement.controller");
describe('AbonnementController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [abonnement_controller_1.AbonnementController],
        }).compile();
        controller = module.get(abonnement_controller_1.AbonnementController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=abonnement.controller.spec.js.map