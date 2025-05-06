"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInfoClientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_info_client_dto_1 = require("./create-info-client.dto");
class UpdateInfoClientDto extends (0, mapped_types_1.PartialType)(create_info_client_dto_1.CreateInfoClientDto) {
}
exports.UpdateInfoClientDto = UpdateInfoClientDto;
//# sourceMappingURL=update-info-client.dto.js.map