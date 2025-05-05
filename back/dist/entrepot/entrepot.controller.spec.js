"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const entrepot_controller_1 = require("./entrepot.controller");
describe('EntrepotController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [entrepot_controller_1.EntrepotController],
        }).compile();
        controller = module.get(entrepot_controller_1.EntrepotController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=entrepot.controller.spec.js.map