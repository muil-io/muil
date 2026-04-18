/// <reference types="node" />
import * as fs from 'fs';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { v4 as uuid } from 'uuid';
import { AWSOptions, CloudinaryOptions, UploadOptions } from './types';

// eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
const esmImport = new Function('m', 'return import(m)') as <T>(m: string) => Promise<T>;

async function detectExt(file: Buffer | string): Promise<string> {
  const { fileTypeFromFile, fileTypeFromBuffer } = await esmImport<typeof import('file-type')>(
    'file-type',
  );
  const result =
    typeof file === 'string' ? await fileTypeFromFile(file) : await fileTypeFromBuffer(file);
  if (!result) throw new Error('Unable to detect file type');
  return result.ext;
}

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
    const ext = await detectExt(file);
    // eslint-disable-next-line no-param-reassign
    filename = `${uuid()}.${ext}`;
  }

  const { accessKeyId, secretAccessKey, bucketName } = options;

  const s3 = new S3Client({
    region: options.region || process.env.AWS_REGION,
    ...(accessKeyId && secretAccessKey ? { credentials: { accessKeyId, secretAccessKey } } : {}),
  });

  const Body = typeof file === 'string' ? await fs.promises.readFile(file) : file;
  const uploader = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Body,
      Key: options.folder ? `${options.folder}/${filename}` : filename,
    },
  });

  const result = await uploader.done();
  if (!result.Location) throw new Error('S3 upload did not return a Location');
  return result.Location;
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
    const ext = await detectExt(file);
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
