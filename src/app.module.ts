import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'shared/modules/prisma';
import { ApiKeysModule } from 'apiKeys';
import { AuthModule } from 'auth';

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
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
    PrismaModule,
    AuthModule,
    ApiKeysModule,
  ],
})
export class AppModule {}
