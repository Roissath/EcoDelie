"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const utilisateur_service_1 = require("./utilisateur.service");
describe('UtilisateurService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [utilisateur_service_1.UtilisateurService],
        }).compile();
        service = module.get(utilisateur_service_1.UtilisateurService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=utilisateur.service.spec.js.map