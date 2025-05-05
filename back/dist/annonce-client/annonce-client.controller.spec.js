"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const annonce_client_controller_1 = require("./annonce-client.controller");
describe('AnnonceClientController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [annonce_client_controller_1.AnnonceClientController],
        }).compile();
        controller = module.get(annonce_client_controller_1.AnnonceClientController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=annonce-client.controller.spec.js.map