"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const colis_service_1 = require("./colis.service");
describe('ColisService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [colis_service_1.ColisService],
        }).compile();
        service = module.get(colis_service_1.ColisService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=colis.service.spec.js.map