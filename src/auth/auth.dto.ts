import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsString()
  readonly password: string;
}
