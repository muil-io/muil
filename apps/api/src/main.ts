import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ExceptionsInterceptor } from 'shared/interceptor/ExceptionsInterceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const corsOrigin = app.get('ConfigService').get('CORS_ORIGIN');
  if (corsOrigin) {
    app.use(cors({ origin: corsOrigin, credentials: true }));
  }

  const nodeEnv = app.get('ConfigService').get('NODE_ENV');
  const sentryDsn = app.get('ConfigService').get('SENTRY_DSN');
  if (nodeEnv === 'production' && sentryDsn) {
    Sentry.init({ dsn: sentryDsn });
    app.use(Sentry.Handlers.requestHandler());
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExceptionsInterceptor());

  await app.listen(3000);
}

bootstrap();
