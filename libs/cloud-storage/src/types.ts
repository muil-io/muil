export type AWSOptions = {
  bucketName: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  folder?: string;
};

export type CloudinaryOptions = {
  folder?: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export type UploadOptions = {
  aws?: AWSOptions;
  cloudinary?: CloudinaryOptions;
};
