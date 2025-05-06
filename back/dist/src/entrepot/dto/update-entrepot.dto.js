"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntrepotDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_entrepot_dto_1 = require("./create-entrepot.dto");
class UpdateEntrepotDto extends (0, mapped_types_1.PartialType)(create_entrepot_dto_1.CreateEntrepotDto) {
}
exports.UpdateEntrepotDto = UpdateEntrepotDto;
//# sourceMappingURL=update-entrepot.dto.js.map