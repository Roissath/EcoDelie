"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAbonnementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_abonnement_dto_1 = require("./create-abonnement.dto");
class UpdateAbonnementDto extends (0, mapped_types_1.PartialType)(create_abonnement_dto_1.CreateAbonnementDto) {
}
exports.UpdateAbonnementDto = UpdateAbonnementDto;
//# sourceMappingURL=update-abonnement.dto.js.map