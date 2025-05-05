"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const annonce_service_1 = require("./annonce.service");
describe('AnnonceService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [annonce_service_1.AnnonceService],
        }).compile();
        service = module.get(annonce_service_1.AnnonceService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=annonce.service.spec.js.map