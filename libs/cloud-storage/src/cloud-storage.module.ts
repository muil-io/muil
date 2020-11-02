import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { s3Upload, cloudinaryUpload, upload } from './cloudStorage';
import { AWSOptions, CloudinaryOptions, UploadOptions } from './types';

@Module({
  providers: [CloudStorageService],
  exports: [CloudStorageService],
})
export class CloudStorageModule {
  async s3Upload(filename: string, data: Buffer, options: AWSOptions): Promise<string>;
  async s3Upload(filename: string, filePath: string, options: AWSOptions): Promise<string>;
  async s3Upload(filename: string, file: Buffer | string, options: AWSOptions): Promise<string> {
    return typeof file === 'string'
      ? s3Upload(filename, file, options)
      : s3Upload(filename, file, options);
  }

  async cloudinaryUpload(
    filename: string,
    data: Buffer,
    options: CloudinaryOptions,
  ): Promise<string>;
  async cloudinaryUpload(
    filename: string,
    filePath: string,
    options: CloudinaryOptions,
  ): Promise<string>;
  async cloudinaryUpload(
    filename: string,
    file: Buffer | string,
    options: CloudinaryOptions,
  ): Promise<string> {
    return typeof file === 'string'
      ? cloudinaryUpload(filename, file, options)
      : cloudinaryUpload(filename, file, options);
  }

  async upload(filename: string, data: Buffer, options: UploadOptions): Promise<string>;
  async upload(filename: string, filePath: string, options: UploadOptions): Promise<string>;
  async upload(filename: string, file: Buffer | string, options: UploadOptions): Promise<string> {
    return typeof file === 'string'
      ? upload(filename, file, options)
      : upload(filename, file, options);
  }
}
