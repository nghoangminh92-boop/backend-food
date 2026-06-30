import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
// @ts-ignore
const cookieParser = require('cookie-parser');
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { delayMiddleware } from './core/delay.middleware';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/api/v1', { exclude: ['/'] });

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.use(delayMiddleware);

  await app.listen(PORT);
}

require('dotenv').config();
bootstrap();
