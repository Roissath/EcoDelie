import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Pour parser les cookies (utile pour JWT sécurisé en HTTP-only)
  app.use(cookieParser());

  // 🌍 Pour autoriser les appels API depuis le front (ex: http://localhost:3001)
  app.enableCors({
    origin: ['http://localhost:3001'], // 🔁 à adapter selon ton front
    credentials: true, // Permet d’envoyer les cookies (important pour auth sécurisée)
  });

  // ✅ Validation automatique avec DTOs et suppression des champs non autorisés
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore les champs non déclarés dans le DTO
      forbidNonWhitelisted: true, // rejette les champs inconnus
      transform: true, // transforme les types (ex: string → number)
    }),
  );

  await app.listen(3000);
  console.log(' Serveur NestJS démarré sur http://localhost:3000');
}
bootstrap();
