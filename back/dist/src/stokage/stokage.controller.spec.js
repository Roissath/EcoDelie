"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stokage_controller_1 = require("./stokage.controller");
describe('StokageController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [stokage_controller_1.StokageController],
        }).compile();
        controller = module.get(stokage_controller_1.StokageController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=stokage.controller.spec.js.map