import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = process.env.PORT || 3333;
  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Session
  const RedisStore = createRedisStore(session);
  const redisHost: string = configService.get('redis.host');
  const redisPort: number = configService.get('redis.port');
  const redisClient = createClient({
    socket: {
      host: redisHost,
      port: redisPort
    },
    legacyMode: true
  });

  redisClient.on('connect', () => {
    console.log('redis connected')
  })
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'my-nestjs-session-secret',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
