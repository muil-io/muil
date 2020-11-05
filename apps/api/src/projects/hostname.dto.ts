import { IsString } from 'class-validator';

export class SetHostnameDto {
  @IsString()
  readonly hostname?: string;
}
