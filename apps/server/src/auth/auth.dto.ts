import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly projectId: string;

  @IsString()
  readonly projectName: string;
}
