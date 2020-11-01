import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sha512 from 'crypto-js/sha512';
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
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('PrismaService') private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const {
        cookies: { jwt },
      } = request;

      if (jwt) {
        const decodedToken = this.jwtService.verify(jwt);
        request.user = decodedToken;
        return true;
      }

      return false;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class AuthGuardWithApiKey implements CanActivate {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('PrismaService') private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const {
        cookies: { jwt },
        headers,
      } = request;

      if (jwt) {
        const decodedToken = this.jwtService.verify(jwt);
        request.user = decodedToken;
        return true;
      }

      const apiKey = headers['x-api-key'];
      if (apiKey) {
        const [id, , projectId] = apiKey.split('.');

        const { apiKeyHash, enabled } = await this.prisma.apiKeys.findOne({ where: { id } });
        if (!enabled || apiKeyHash !== sha512(apiKey).toString()) {
          return false;
        }

        request.user = {
          projectId,
        };
        return true;
      }

      return false;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class RenderLimitGuard implements CanActivate {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { projectId },
    } = context.switchToHttp().getRequest();

    const { plan } = await this.prisma.projects.findOne({ where: { id: projectId } });
    const renderCount = await this.prisma.logs.count({
      where: { projectId, OR: [{ type: 'html' }, { type: 'png' }, { type: 'pdf' }] },
    });

    if (plan === 'free' && renderCount > 1000) {
      return false;
    }

    return true;
  }
}
