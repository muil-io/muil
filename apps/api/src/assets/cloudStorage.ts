import { S3 } from 'aws-sdk';

type AWSOptions = {
  bucketName: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

type CloudStorageOptions = {
  aws?: AWSOptions;
};

const upload = async (
  file: Buffer | Uint8Array | string,
  fileName: string,
  options: CloudStorageOptions,
): Promise<string> => {
  if (options.aws) {
    const { accessKeyId = undefined, secretAccessKey = undefined, bucketName } = options.aws;
    const s3 = new S3({ accessKeyId, secretAccessKey });

    const { Location: url } = await s3
      .upload({ Bucket: bucketName, Body: file, Key: fileName })
      .promise();

    return url;
  }

  return null;
};

export default upload;
