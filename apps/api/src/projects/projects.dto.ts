import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class SmtpDto {
  @IsOptional()
  @IsString()
  readonly defaultFrom?: string;

  @IsString()
  readonly host: string;

  @IsString()
  readonly user: string;

  @IsString()
  readonly pass: string;

  @IsNumber()
  readonly port: number;

  @IsBoolean()
  readonly secure: boolean;
}
