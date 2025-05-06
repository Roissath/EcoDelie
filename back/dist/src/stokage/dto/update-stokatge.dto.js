"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStokageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stokage_dto_1 = require("./create-stokage.dto");
class UpdateStokageDto extends (0, mapped_types_1.PartialType)(create_stokage_dto_1.CreateStokageDto) {
}
exports.UpdateStokageDto = UpdateStokageDto;
//# sourceMappingURL=update-stokatge.dto.js.map