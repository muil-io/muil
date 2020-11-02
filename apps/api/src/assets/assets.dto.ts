import { IsString, IsOptional } from 'class-validator';

export class CloudStorageSetDto {
  @IsString()
  readonly type: 'aws' | 'cloudinary';

  @IsString()
  @IsOptional()
  readonly awsBucketName?: string | null;

  @IsString()
  @IsOptional()
  readonly awsAccessKeyId?: string | null;

  @IsString()
  @IsOptional()
  readonly awsSecretAccessKey?: string | null;

  @IsString()
  @IsOptional()
  readonly cloudinaryCloudName?: string | null;

  @IsString()
  @IsOptional()
  readonly cloudinaryApiKey?: string | null;

  @IsString()
  @IsOptional()
  readonly cloudinaryApiSecert?: string | null;
}
