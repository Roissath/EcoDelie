"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const colis_controller_1 = require("./colis.controller");
describe('ColisController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [colis_controller_1.ColisController],
        }).compile();
        controller = module.get(colis_controller_1.ColisController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=colis.controller.spec.js.map