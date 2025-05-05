"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLivraisonDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_livraison_dto_1 = require("./create-livraison.dto");
class UpdateLivraisonDto extends (0, mapped_types_1.PartialType)(create_livraison_dto_1.CreateLivraisonDto) {
}
exports.UpdateLivraisonDto = UpdateLivraisonDto;
//# sourceMappingURL=update-livraison.dto.js.map