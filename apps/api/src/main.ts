import * as fs from 'fs';
import http from 'http';
import https from 'https';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { ExceptionsInterceptor } from 'shared/interceptor/ExceptionsInterceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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

  await app.init();

  const port = app.get('ConfigService').get('PORT') || 3000;

  if (
    app.get('ConfigService').get('PRIVATE_KEY') &&
    app.get('ConfigService').get('PUBLIC_CERTIFICATE')
  ) {
    https
      .createServer(
        {
          key: fs.readFileSync(app.get('ConfigService').get('PRIVATE_KEY')),
          cert: fs.readFileSync(app.get('ConfigService').get('PUBLIC_CERTIFICATE')),
        },
        server,
      )
      .listen(port);
  } else {
    http.createServer(server).listen(port);
  }
}

bootstrap();
