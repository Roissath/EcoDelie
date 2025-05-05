"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInfoPrestataireDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_info_prestataire_dto_1 = require("./create-info-prestataire.dto");
class UpdateInfoPrestataireDto extends (0, mapped_types_1.PartialType)(create_info_prestataire_dto_1.CreateInfoPrestataireDto) {
    verifie;
}
exports.UpdateInfoPrestataireDto = UpdateInfoPrestataireDto;
//# sourceMappingURL=update-info-prestataire.dto.js.map