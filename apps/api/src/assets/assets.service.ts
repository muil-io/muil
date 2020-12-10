import { Injectable } from '@nestjs/common';
import { upload } from '@muil/cloud-storage';
import { AssetsSettingsService } from './assetsSettings.service';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsSettingsService: AssetsSettingsService) {}

  async upload(projectId: string, branchId: string = 'master', file) {
    try {
      const uploadOptions = await this.assetsSettingsService.getUploadOptions(
        projectId,
        `${projectId}/${branchId}`,
      );

      const url = await upload(file.originalname, file.buffer, uploadOptions);
      return { url };
    } catch (err) {
      throw new Error('Assets upload failed, please check cloud storage configuration in portal');
    }
  }
}
