"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const info_prestataire_controller_1 = require("./info-prestataire.controller");
describe('InfoPrestataireController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [info_prestataire_controller_1.InfoPrestataireController],
        }).compile();
        controller = module.get(info_prestataire_controller_1.InfoPrestataireController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=info-prestataire.controller.spec.js.map