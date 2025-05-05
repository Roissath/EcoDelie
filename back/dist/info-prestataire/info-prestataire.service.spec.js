"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const info_prestataire_service_1 = require("./info-prestataire.service");
describe('InfoPrestataireService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [info_prestataire_service_1.InfoPrestataireService],
        }).compile();
        service = module.get(info_prestataire_service_1.InfoPrestataireService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=info-prestataire.service.spec.js.map