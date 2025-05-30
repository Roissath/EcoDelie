// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { resolve } from 'path';

import { existsSync, mkdirSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const facturesDir = join(__dirname, '..', 'public', 'factures');
  if (!existsSync(facturesDir)) {
    mkdirSync(facturesDir, { recursive: true });
    console.log(' Dossier public/factures créé automatiquement');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use(cookieParser());
 
  app.enableCors({
    origin: 'http://localhost:3000', // front
    credentials: true,
  })
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //  Sert les PDF via http://localhost:3001/factures/xxx.pdf
app.useStaticAssets(resolve('./uploads'), {
  prefix: '/uploads',
});

  await app.listen(3001);
  console.log('✅ Serveur NestJS démarré sur http://localhost:3001');


  
}
bootstrap();
