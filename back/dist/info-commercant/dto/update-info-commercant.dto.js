"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInfoCommercantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_info_commercant_dto_1 = require("./create-info-commercant.dto");
class UpdateInfoCommercantDto extends (0, mapped_types_1.PartialType)(create_info_commercant_dto_1.CreateInfoCommercantDto) {
    verifie;
}
exports.UpdateInfoCommercantDto = UpdateInfoCommercantDto;
//# sourceMappingURL=update-info-commercant.dto.js.map