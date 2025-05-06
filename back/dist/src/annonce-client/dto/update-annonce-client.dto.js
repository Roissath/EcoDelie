"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnnonceClientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_annonce_client_dto_1 = require("./create-annonce-client.dto");
class UpdateAnnonceClientDto extends (0, mapped_types_1.PartialType)(create_annonce_client_dto_1.CreateAnnonceClientDto) {
}
exports.UpdateAnnonceClientDto = UpdateAnnonceClientDto;
//# sourceMappingURL=update-annonce-client.dto.js.map