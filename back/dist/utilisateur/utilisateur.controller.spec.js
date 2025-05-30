"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const utilisateur_controller_1 = require("./utilisateur.controller");
describe('UtilisateurController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [utilisateur_controller_1.UtilisateurController],
        }).compile();
        controller = module.get(utilisateur_controller_1.UtilisateurController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=utilisateur.controller.spec.js.map