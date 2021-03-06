import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly projectId?: string;

  @IsOptional()
  @IsString()
  readonly projectName?: string;
}

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword: string;

  @IsString()
  readonly newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  readonly token: string;

  @IsString()
  readonly newPassword: string;
}

export class ForgotPasswordDto {
  @IsString()
  readonly email: string;
}

export class InviteUserDto {
  @IsString()
  readonly email: string;
}

export class AcceptInviteUserDto {
  @IsString()
  readonly token: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
