"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColisDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_colis_dto_1 = require("./create-colis.dto");
class UpdateColisDto extends (0, mapped_types_1.PartialType)(create_colis_dto_1.CreateColisDto) {
}
exports.UpdateColisDto = UpdateColisDto;
//# sourceMappingURL=update-colis.dto.js.map