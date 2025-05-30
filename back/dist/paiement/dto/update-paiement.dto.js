"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaiementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_paiement_dto_1 = require("./create-paiement.dto");
class UpdatePaiementDto extends (0, mapped_types_1.PartialType)(create_paiement_dto_1.CreatePaiementDto) {
}
exports.UpdatePaiementDto = UpdatePaiementDto;
//# sourceMappingURL=update-paiement.dto.js.map