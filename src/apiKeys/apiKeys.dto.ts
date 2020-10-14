import { IsString } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  readonly name: string;
}
