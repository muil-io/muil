import * as fs from 'fs';
import AWS from 'aws-sdk';
import * as Azure from '@azure/storage-file';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuid } from 'uuid';
import FileType from 'file-type';
import streamifier from 'streamifier';
import { AWSOptions, AzureOptions, CloudinaryOptions, UploadOptions } from './types';

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
  const { Location: url } = await s3.upload({ Bucket: bucketName, Body, Key: filename }).promise();

  return url;
}

export async function azureUpload(
  filename: string,
  data: Buffer,
  options: AzureOptions,
): Promise<string>;
export async function azureUpload(
  filename: string,
  filePath: string,
  options: AzureOptions,
): Promise<string>;
export async function azureUpload(
  filename: string,
  file: Buffer | string,
  options: AzureOptions,
): Promise<string> {
  const {
    SharedKeyCredential,
    FileURL,
    Aborter,
    DirectoryURL,
    ShareURL,
    StorageURL,
    ServiceURL,
  } = Azure;

  if (!filename) {
    const { ext } =
      typeof file === 'string' ? await FileType.fromFile(file) : await FileType.fromBuffer(file);
    // eslint-disable-next-line no-param-reassign
    filename = `${uuid()}.${ext}`;
  }

  const { accountName, accountKey, containerName, folder = '' } = options;

  if (!accountName || !accountKey || !containerName)
    throw new Error('accountName, accountKey, containerName are required');

  const sharedKeyCredential = new SharedKeyCredential(accountName, accountKey);

  const pipeline = StorageURL.newPipeline(sharedKeyCredential);
  const serviceURL = new ServiceURL(`https://${accountName}.file.core.windows.net`, pipeline);

  const shareURL = ShareURL.fromServiceURL(serviceURL, containerName);

  const directoryURL = DirectoryURL.fromShareURL(shareURL, folder);

  const f = typeof file === 'string' ? await fs.promises.readFile(file) : file;

  const fileURL = FileURL.fromDirectoryURL(directoryURL, filename);

  await fileURL.create(Aborter.none, f.length);
  await fileURL.uploadRange(Aborter.none, f, 0, f.length);

  return fileURL.url;
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
    const { secure_url: secureUrl } = await cloudinary.uploader.upload(file, {
      folder: options.folder,
      public_id: filename.split('.').slice(0, -1).join('.'),
    });

    return secureUrl;
  }

  const { secure_url: secureUrl } = await new Promise((res, rej) =>
    streamifier
      .createReadStream(file)
      .pipe(
        cloudinary.uploader.upload_stream(
          { folder: options.folder, public_id: filename.split('.').slice(0, -1).join('.') },
          (error, d) => (error ? rej(error) : res(d)),
        ),
      ),
  );

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

  if (options.azure) {
    return typeof file === 'string'
      ? azureUpload(filename, file, options.azure)
      : azureUpload(filename, file, options.azure);
  }

  if (options.cloudinary) {
    return typeof file === 'string'
      ? cloudinaryUpload(filename, file, options.cloudinary)
      : cloudinaryUpload(filename, file, options.cloudinary);
  }

  throw new Error('Cloud storage options is missing');
}

export default upload;
