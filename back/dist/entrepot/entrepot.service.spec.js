"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const entrepot_service_1 = require("./entrepot.service");
describe('EntrepotService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [entrepot_service_1.EntrepotService],
        }).compile();
        service = module.get(entrepot_service_1.EntrepotService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=entrepot.service.spec.js.map