"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const annonce_client_service_1 = require("./annonce-client.service");
describe('AnnonceClientService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [annonce_client_service_1.AnnonceClientService],
        }).compile();
        service = module.get(annonce_client_service_1.AnnonceClientService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=annonce-client.service.spec.js.map