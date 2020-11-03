import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotFoundError } from 'shared/exceptions';
import { PrismaService } from 'shared/modules/prisma';
import { CloudStorageCreateInput } from '@prisma/client';
import { UploadOptions } from '@muil/cloud-storage';

@Injectable()
export class AssetsSettingsService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async get(projectId: string) {
    return (await this.prisma.cloudStorage.findOne({ where: { projectId } })) ?? {};
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
          secretAccessKey: assetsSettings.awsSecretAccessKey,
          folder,
        },
      };
    } else if (assetsSettings?.type === 'cloudinary') {
      uploadOptions = {
        cloudinary: {
          cloudName: assetsSettings.cloudinaryCloudName,
          apiKey: assetsSettings.cloudinaryApiKey,
          apiSecret: assetsSettings.cloudinaryApiKey,
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
    return this.prisma.cloudStorage.upsert({
      where: { projectId: data.projectId },
      update: data,
      create: data,
    });
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
