import { IsOptional, IsString } from 'class-validator';

export class EmailOptionsDto {
  @IsString()
  readonly subject: string;

  @IsOptional()
  @IsString()
  readonly from: string;

  @IsOptional()
  @IsString({ each: true })
  readonly to: string | string[];

  @IsOptional()
  @IsString({ each: true })
  readonly cc?: string | string[];

  @IsOptional()
  @IsString({ each: true })
  readonly bcc?: string | string[];
}
