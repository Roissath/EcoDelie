"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stokage_service_1 = require("./stokage.service");
describe('StokageService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [stokage_service_1.StokageService],
        }).compile();
        service = module.get(stokage_service_1.StokageService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=stokage.service.spec.js.map