import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from 'shared/modules/prisma';
import { ApiKeysModule } from 'apiKeys';
import { AssetsModule } from 'assets';
import { AuthModule } from 'auth';
import { LogsModule } from 'logs';
import { ProjectsModule } from 'projects';
import { SmtpModule } from 'smtp';
import { TemplatesModule } from 'templates';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: { colorize: true, translateTime: true },
        serializers: {
          req: (req) => ({
            ...req,
            headers: undefined,
          }),
          res: (res) => ({
            ...res,
            headers: undefined,
          }),
        },
      },
    }),
    {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('SECRET'),
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
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
