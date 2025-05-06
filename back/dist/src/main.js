"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const facturesDir = (0, path_1.join)(__dirname, '..', 'public', 'factures');
    if (!(0, fs_1.existsSync)(facturesDir)) {
        (0, fs_1.mkdirSync)(facturesDir, { recursive: true });
        console.log(' Dossier public/factures créé automatiquement');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
        prefix: '/',
    });
    await app.listen(3001);
    console.log('✅ Serveur NestJS démarré sur http://localhost:3001');
}
bootstrap();
//# sourceMappingURL=main.js.map