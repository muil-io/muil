import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from 'shared/modules/prisma';
import { ApiKeysModule } from 'apiKeys';
import { AssetsModule } from 'assets';
import { AuthModule } from 'auth';
import { LogsModule } from 'logs';
import { ProjectsModule } from 'projects';
import { TemplatesModule } from 'templates';
import { SmtpModule } from 'smtp';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: { colorize: true, translateTime: true },
      },
    }),
    {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECERT'),
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PrismaModule,
    ApiKeysModule,
    AssetsModule,
    AuthModule,
    LogsModule,
    ProjectsModule,
    SmtpModule,
    TemplatesModule,
  ],
})
export class AppModule {}
