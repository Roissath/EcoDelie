"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const info_commercant_controller_1 = require("./info-commercant.controller");
describe('InfoCommercantController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [info_commercant_controller_1.InfoCommercantController],
        }).compile();
        controller = module.get(info_commercant_controller_1.InfoCommercantController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=info-commercant.controller.spec.js.map