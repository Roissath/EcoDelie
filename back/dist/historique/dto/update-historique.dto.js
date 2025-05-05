"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHistoriqueDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_historique_dto_1 = require("./create-historique.dto");
class UpdateHistoriqueDto extends (0, mapped_types_1.PartialType)(create_historique_dto_1.CreateHistoriqueDto) {
}
exports.UpdateHistoriqueDto = UpdateHistoriqueDto;
//# sourceMappingURL=update-historique.dto.js.map