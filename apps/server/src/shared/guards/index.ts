import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/modules/prisma/prisma.service';
import { comparePassword } from 'shared/utils/password';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const {
        body: { email, password },
      } = request;

      const { password: storedPassword, ...user } = await this.prisma.users.findOne({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      if (!comparePassword(password, storedPassword)) {
        throw new UnauthorizedException();
      }

      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('ConfigService') private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const {
        cookies: { jwt },
      } = request;

      const decodedToken = this.jwtService.verify(jwt);
      request.user = decodedToken;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
