"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const annonce_controller_1 = require("./annonce.controller");
describe('AnnonceController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [annonce_controller_1.AnnonceController],
        }).compile();
        controller = module.get(annonce_controller_1.AnnonceController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=annonce.controller.spec.js.map