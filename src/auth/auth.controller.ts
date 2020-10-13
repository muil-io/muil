import { Res, Req, Body, Controller, Post, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LocalAuthGuard, JwtAuthGuard } from 'shared/guards';
import { CreateUserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() { email, password, name }: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.createUser(email, password, name);

    const token = this.jwtService.sign({ id: user.id, email: user.email, name: user.name });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'none',
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() { user }, @Res() res: Response) {
    const token = this.jwtService.sign({ id: user.id, email: user.email, name: user.name });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'none',
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() { user }) {
    return this.authService.getUser(user.email);
  }
}
