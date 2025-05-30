"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const info_commercant_service_1 = require("./info-commercant.service");
describe('InfoCommercantService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [info_commercant_service_1.InfoCommercantService],
        }).compile();
        service = module.get(info_commercant_service_1.InfoCommercantService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=info-commercant.service.spec.js.map