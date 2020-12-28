import { Res, Req, Body, Controller, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LocalAuthGuard, AuthGuard } from 'shared/guards';
import { ProjectsService } from 'projects/projects.service';
import { UsersService } from 'users';
import {
  CreateUserDto,
  UpdatePasswordDto,
  ResetPasswordDto,
  ForgotPasswordDto,
  InviteUserDto,
  AcceptInviteUserDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    let projectId = 'default';
    if (createUserDto.projectName) {
      const { id } = await this.projectsService.create({ name: createUserDto.projectName });
      projectId = id;
    }

    const user = await this.usersService.create({ ...createUserDto, projectId });

    const token = this.jwtService.sign(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('HTTP_SECURE') === 'true',
      sameSite: this.configService.get<string>('HTTP_SECURE') === 'true' ? 'none' : undefined,
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
      secure: this.configService.get<string>('HTTP_SECURE') === 'true',
      sameSite: this.configService.get<string>('HTTP_SECURE') === 'true' ? 'none' : undefined,
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: this.configService.get<string>('HTTP_SECURE') === 'true',
      sameSite: this.configService.get<string>('HTTP_SECURE') === 'true' ? 'none' : undefined,
      maxAge: 0,
    });
    return res.status(HttpStatus.OK).send();
  }

  @Post('password')
  @UseGuards(AuthGuard)
  async password(@Req() { user }, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(
      user.id,
      updatePasswordDto.newPassword,
      updatePasswordDto.oldPassword,
    );
  }

  @Post('forgotPassword')
  async forgotPassword(
    @Req() { headers: { origin } },
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.authService.sendResetPasswordEmail(origin, forgotPasswordDto.email);
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res: Response) {
    const user = await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
    const token = this.jwtService.sign(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('HTTP_SECURE') === 'true',
      sameSite: this.configService.get<string>('HTTP_SECURE') === 'true' ? 'none' : undefined,
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('invite')
  @UseGuards(AuthGuard)
  async invite(@Req() { headers: { origin }, user }, @Body() inviteUserDto: InviteUserDto) {
    this.authService.sendInviteUserEmail(user, origin, inviteUserDto.email);
  }

  @Post('acceptInvite')
  async acceptInvite(@Body() acceptInviteUserDto: AcceptInviteUserDto, @Res() res: Response) {
    const { projectId, email } = this.jwtService.verify(acceptInviteUserDto.token);

    const user = await this.usersService.create({ ...acceptInviteUserDto, email, projectId });

    const token = this.jwtService.sign(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('HTTP_SECURE') === 'true',
      sameSite: this.configService.get<string>('HTTP_SECURE') === 'true' ? 'none' : undefined,
      maxAge: 3600000,
    });

    return res.status(HttpStatus.OK).send(user);
  }
}
