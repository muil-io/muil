import { Res, Req, Body, Controller, Post, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LocalAuthGuard, AuthGuard } from 'shared/guards';
import { CreateUserDto, UpdateUserDto, UpdatePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.createUser(createUserDto);

    const token = this.jwtService.sign(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: this.configService.get<string>('NODE_ENV') !== 'development' ? 'none' : undefined,
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() { user }, @Res() res: Response) {
    const token = this.jwtService.sign(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: this.configService.get<string>('NODE_ENV') !== 'development' ? 'none' : undefined,
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: this.configService.get<string>('NODE_ENV') !== 'development' ? 'none' : undefined,
      maxAge: 0,
    });
    return res.status(HttpStatus.OK).send();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() { user }) {
    return this.authService.getUser({ id: user.id });
  }

  @Post('me')
  @UseGuards(AuthGuard)
  async update(@Req() { user }, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(user.id, updateUserDto.name);
  }

  @Post('password')
  @UseGuards(AuthGuard)
  async password(@Req() { user }, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(
      user.id,
      updatePasswordDto.oldPassword,
      updatePasswordDto.newPassword,
    );
  }
}
