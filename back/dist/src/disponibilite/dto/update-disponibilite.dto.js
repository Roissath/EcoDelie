"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisponibiliteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_disponibilite_dto_1 = require("./create-disponibilite.dto");
class UpdateDisponibiliteDto extends (0, mapped_types_1.PartialType)(create_disponibilite_dto_1.CreateDisponibiliteDto) {
}
exports.UpdateDisponibiliteDto = UpdateDisponibiliteDto;
//# sourceMappingURL=update-disponibilite.dto.js.map