import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { ExceptionsInterceptor } from 'shared/interceptor/ExceptionsInterceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));

  const corsOrigin = app.get('ConfigService').get('CORS_ORIGIN');
  if (corsOrigin) {
    app.enableCors({ origin: corsOrigin.split(','), credentials: true });
  }

  const sentryDsn = app.get('ConfigService').get('SENTRY_DSN');
  if (sentryDsn) {
    Sentry.init({ dsn: sentryDsn });
    app.use(Sentry.Handlers.requestHandler());
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExceptionsInterceptor());

  await app.listen(app.get('ConfigService').get('PORT') || 3000);
}

bootstrap();
