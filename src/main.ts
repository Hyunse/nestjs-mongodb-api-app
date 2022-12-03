import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Session
  app.use(
    session({
      secret: 'my-nestjs-session-secret',
      resave: false,
      saveUninitialized: false
    })
  )

  await app.listen(port);
}
bootstrap();
