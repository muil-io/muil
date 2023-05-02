import * as fs from 'fs';
import AWS from 'aws-sdk';
import { v2 as cloudinary } from 'cloudinary';
import FileType from 'file-type';
import streamifier from 'streamifier';
import { v4 as uuid } from 'uuid';
import { AWSOptions, CloudinaryOptions, UploadOptions } from './types';

export async function s3Upload(
  filename: string,
  data: Buffer,
  options: AWSOptions,
): Promise<string>;
export async function s3Upload(
  filename: string,
  filePath: string,
  options: AWSOptions,
): Promise<string>;
export async function s3Upload(
  filename: string,
  file: Buffer | string,
  options: AWSOptions,
): Promise<string> {
  if (!filename) {
    const { ext } =
      typeof file === 'string' ? await FileType.fromFile(file) : await FileType.fromBuffer(file);
    // eslint-disable-next-line no-param-reassign
    filename = `${uuid()}.${ext}`;
  }

  const { accessKeyId, secretAccessKey, bucketName } = options;

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
  });

  const Body = typeof file === 'string' ? await fs.promises.readFile(file) : file;
  const { Location: url } = await s3
    .upload({
      Bucket: bucketName,
      Body,
      Key: options.folder ? `${options.folder}/${filename}` : filename,
    })
    .promise();

  return url;
}

export async function cloudinaryUpload(
  filename: string,
  data: Buffer,
  options: CloudinaryOptions,
): Promise<string>;
export async function cloudinaryUpload(
  filename: string,
  filePath: string,
  options: CloudinaryOptions,
): Promise<string>;
export async function cloudinaryUpload(
  filename: string,
  file: Buffer | string,
  options: CloudinaryOptions,
): Promise<string> {
  if (!filename) {
    const { ext } =
      typeof file === 'string' ? await FileType.fromFile(file) : await FileType.fromBuffer(file);
    // eslint-disable-next-line no-param-reassign
    filename = `${uuid()}.${ext}`;
  }

  cloudinary.config({
    cloud_name: options.cloudName,
    api_key: options.apiKey,
    api_secret: options.apiSecret,
  });

  if (typeof file === 'string') {
    const { secure_url: secureUrl } = (await cloudinary.uploader.upload(file, {
      folder: options.folder,
      public_id: filename.split('.').slice(0, -1).join('.'),
    })) as { secure_url: string };

    return secureUrl;
  }

  const { secure_url: secureUrl } = (await new Promise((res, rej) =>
    streamifier
      .createReadStream(file)
      .pipe(
        cloudinary.uploader.upload_stream(
          { folder: options.folder, public_id: filename.split('.').slice(0, -1).join('.') },
          (error, d) => (error ? rej(error) : res(d)),
        ),
      ),
  )) as { secure_url: string };

  return secureUrl;
}

export async function upload(
  filename: string,
  data: Buffer,
  options: UploadOptions,
): Promise<string>;
export async function upload(
  filename: string,
  filePath: string,
  options: UploadOptions,
): Promise<string>;
export async function upload(
  filename: string = uuid(),
  file: Buffer | string,
  options: UploadOptions,
): Promise<string> {
  if (options.aws) {
    return typeof file === 'string'
      ? s3Upload(filename, file, options.aws)
      : s3Upload(filename, file, options.aws);
  }

  if (options.cloudinary) {
    return typeof file === 'string'
      ? cloudinaryUpload(filename, file, options.cloudinary)
      : cloudinaryUpload(filename, file, options.cloudinary);
  }

  throw new Error('Cloud storage options is missing');
}

export default upload;
