import { IsString, IsOptional } from 'class-validator';

export class CloudStorageSetDto {
  @IsString()
  readonly type: 'aws' | 'azure' | 'cloudinary';

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
  readonly azureAccountName?: string | null;

  @IsString()
  @IsOptional()
  readonly azureAccountKey?: string | null;

  @IsString()
  @IsOptional()
  readonly azureContainerName?: string | null;

  @IsString()
  @IsOptional()
  readonly azureFolder?: string | null;

  @IsString()
  @IsOptional()
  readonly cloudinaryFolder?: string | null;

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
