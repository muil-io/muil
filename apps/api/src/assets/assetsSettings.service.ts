import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import { NotFoundError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';
import { CloudStorageCreateInput } from '@prisma/client';
import { UploadOptions } from '@muil/cloud-storage';

@Injectable()
export class AssetsSettingsService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string) {
    const { awsSecretAccessKey, cloudinaryApiSecret, ...cloudStorage } =
      (await this.prisma.cloudStorage.findOne({ where: { projectId } })) ?? {};
    return cloudStorage;
  }

  async getUploadOptions(projectId: string, folder?: string) {
    let uploadOptions: UploadOptions;

    const assetsSettings = await this.prisma.cloudStorage.findOne({ where: { projectId } });
    const deafultCloudStorageType = this.configService.get<string>('CLOUD_STORAGE_TYPE');

    if (assetsSettings?.type === 'aws') {
      uploadOptions = {
        aws: {
          bucketName: assetsSettings.awsBucketName,
          accessKeyId: assetsSettings.awsAccessKeyId,
          secretAccessKey: CryptoJS.AES.decrypt(
            assetsSettings.awsSecretAccessKey,
            this.configService.get<string>('SECRET'),
          ).toString(CryptoJS.enc.Utf8),
          folder,
        },
      };
    } else if (assetsSettings?.type === 'cloudinary') {
      uploadOptions = {
        cloudinary: {
          cloudName: assetsSettings.cloudinaryCloudName,
          apiKey: assetsSettings.cloudinaryApiKey,
          apiSecret: CryptoJS.AES.decrypt(
            assetsSettings.cloudinaryApiSecret,
            this.configService.get<string>('SECRET'),
          ).toString(CryptoJS.enc.Utf8),
          folder,
        },
      };
    } else if (deafultCloudStorageType === 'aws') {
      uploadOptions = {
        aws: {
          bucketName: this.configService.get<string>('AWS_BUCKET_NAME'),
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          folder,
        },
      };
    } else if (deafultCloudStorageType === 'cloudinary') {
      uploadOptions = {
        cloudinary: {
          cloudName: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
          apiKey: this.configService.get<string>('CLOUDINARY_API_KEY'),
          apiSecret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
          folder,
        },
      };
    } else {
      throw new NotFoundError('Cloud storage provider is not defined');
    }

    return uploadOptions;
  }

  async set(data: CloudStorageCreateInput) {
    const {
      awsSecretAccessKey,
      cloudinaryApiSecret,
      ...cloudStorage
    } = await this.prisma.cloudStorage.upsert({
      where: { projectId: data.projectId },
      update: {
        ...data,
        awsSecretAccessKey: data.awsSecretAccessKey
          ? CryptoJS.AES.encrypt(
              data.awsSecretAccessKey,
              this.configService.get<string>('SECRET'),
            ).toString()
          : undefined,
        cloudinaryApiSecret: data.cloudinaryApiSecret
          ? CryptoJS.AES.encrypt(
              data.cloudinaryApiSecret,
              this.configService.get<string>('SECRET'),
            ).toString()
          : undefined,
      },
      create: data,
    });
    return cloudStorage;
  }

  async delete(projectId: string) {
    const cloudStorage = await this.prisma.cloudStorage.findOne({ where: { projectId } });
    if (!cloudStorage) {
      return {};
    }

    await this.prisma.cloudStorage.delete({ where: { projectId } });
    return {};
  }
}
