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