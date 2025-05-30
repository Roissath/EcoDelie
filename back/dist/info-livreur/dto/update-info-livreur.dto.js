"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInfoLivreurDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_info_livreur_dto_1 = require("./create-info-livreur.dto");
class UpdateInfoLivreurDto extends (0, mapped_types_1.PartialType)(create_info_livreur_dto_1.CreateInfoLivreurDto) {
    verifie;
}
exports.UpdateInfoLivreurDto = UpdateInfoLivreurDto;
//# sourceMappingURL=update-info-livreur.dto.js.map